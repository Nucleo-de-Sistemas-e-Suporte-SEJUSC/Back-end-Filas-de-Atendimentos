import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import 'dotenv/config';

const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.use(cors());
app.use(express.json());

interface FormData {
  cpf?: string; // CPF agora é opcional
  name: string;
  services: 'RCN' | 'PAV' | 'NAO ENVELHECER';
  fila: 'N' | 'P';
}

app.post('/api/generate-ticket', async (req: Request, res: Response) => {
  const data: FormData = req.body;
  console.log(data)


  if (!data.name || !data.services || !data.fila) {
    res.status(400).json({ message: 'Os campos nome, serviço e fila são obrigatórios.' });
    return;
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();


    // 1. Conta quantos tickets do mesmo serviço E TIPO DE FILA foram criados HOJE
    const countSql = `
      SELECT COUNT(*) as daily_count 
      FROM tickets 
      WHERE service = ? AND queue_type = ? AND DATE(created_at) = CURDATE()
    `;
    // para QUALQUER serviço nos últimos 20 segundos ou minutos (a definir).
    const checkCooldownSql = `
      SELECT * FROM tickets 
      WHERE name = ? AND created_at >= NOW() - INTERVAL 20 SECOND
    `;
    const [existingTickets] = await connection.execute(checkCooldownSql, [data.name]);

    if (Array.isArray(existingTickets) && existingTickets.length > 0) {
      res.status(409).json({ message: 'Você já realizou um atendimento nos últimos 20 segundos. Por favor, aguarde.' });
      await connection.end();
      return;
    }

    const [countResult] = await connection.execute(countSql, [data.services, data.fila]);
    
    const count = (countResult as any)[0].daily_count;
    const nextNumber = count + 1;


    const formattedNumber = String(nextNumber).padStart(3, '0');


    const ticketNumber = `${data.services}-${data.fila}-${formattedNumber}`;
    
    const insertSql = 'INSERT INTO tickets (cpf, name, service, queue_type, ticket_number) VALUES (?, ?, ?, ?, ?)';
    const values = [data.cpf || null, data.name, data.services, data.fila, ticketNumber];
    
    const [result] = await connection.execute(insertSql, values);
    const insertedId = (result as any).insertId;

    await connection.commit();

    console.log(`Ticket inserido com o ID: ${insertedId} e Senha: ${ticketNumber}`);

    res.status(201).json({
      message: 'Senha gerada com sucesso!',
      ticket: { 
        id: insertedId, 
        ticket_number: ticketNumber,
        ...data 
      },
    });

  } catch (error: any) {
    if (connection) await connection.rollback();
    console.error('Erro no servidor:', error);

    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});


app.patch('/api/tickets/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params; // Pega o ID do ticket da URL
  const { status } = req.body; // Pega o novo status do corpo da requisição ('ATENDIDO' ou 'AUSENTE')

  if (!status || !['ATENDIDO', 'AUSENTE', 'EM ATENDIMENTO'].includes(status)) {
    return;
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    let sql: string;
    let values: (string | number)[] = [];

    if (status === 'ATENDIDO') {
      // Se a pessoa foi atendida, apenas atualiza o status
      sql = 'UPDATE tickets SET status = ? WHERE id = ?';
      values = [status, id];
    } else if (status === 'EM ATENDIMENTO') {
      // Se a pessoa está em atendimento, atualiza o status e a hora da chamada
      sql = 'UPDATE tickets SET status = ?, ultima_chamada_em = NOW() WHERE id = ?';
      values = [status, id];
    } else { // status === 'AUSENTE'
      // Se a pessoa não compareceu, atualiza o status E a hora da chamada
      sql = 'UPDATE tickets SET status = ?, ultima_chamada_em = NOW() WHERE id = ?';
      values = [status, id];
    } 

    const [result] = await connection.execute(sql, values);
    

    if ((result as any).affectedRows === 0) {
      return;
    }

    res.status(200).json({ message: `Ticket #${id} marcado como ${status}.` });

  } catch (error) {
    console.error("Erro ao atualizar status do ticket:", error);
    res.status(500).json({ message: "Ocorreu um erro no servidor ao atualizar o status." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.get('/api/tickets', async (req: Request, res: Response) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        
     
        const sql = `
            SELECT * FROM tickets
            WHERE 
                -- Pega quem está aguardando...
                status = 'AGUARDANDO' 
                -- OU quem estava ausente e já pode ser chamado de novo
                OR (status = 'AUSENTE' AND ultima_chamada_em <= NOW() - INTERVAL 10 SECOND)
                -- OU quem está em atendimento
                OR status = 'EM ATENDIMENTO'
            -- Ordena o resultado final pela ordem de chegada
            ORDER BY created_at ASC
            
        `;
        
        const [rows] = await connection.execute(sql);

        console.log(rows)
        
        res.status(200).json(rows);
        return;

    } catch (error) {
        console.error("Erro ao buscar a fila de tickets:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor ao buscar a fila." });
        return;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});