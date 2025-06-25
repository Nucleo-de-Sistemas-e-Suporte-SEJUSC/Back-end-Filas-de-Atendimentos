// Arquivo: test-db.ts
import mysql from 'mysql2/promise';
import 'dotenv/config';

// Exatamente a mesma configuração do seu server.ts
const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function testConnection() {
  let connection;
  try {
    console.log('Tentando conectar ao banco de dados...');
    console.log('Config:', {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        database: dbConfig.database,
        password: dbConfig.password ? '******' : 'NÃO DEFINIDA' // Não mostrar a senha no log
    });

    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexão bem-sucedida!');
    
  } catch (error) {
    console.error('❌ Falha na conexão:', error);

  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexão fechada.');
    }
  }
}

testConnection();