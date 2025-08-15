export class AttendanceEntity {
  constructor(
    public cpf: string,
    public name: string,
    public service: "PAV" | "RCN",
    public queue_type: "N" | "P",
    public ticket_number?: string,
    public status?:
      | "AGUARDANDO"
      | "CHAMADO"
      | "ATENDIMENTO"
      | "ATENDIDO"
      | "AUSENTE",
    public id?: number,
    public guiche?: string
  ) {
    if (!cpf) throw new Error("CPF é obrigatório");
    if (!name) throw new Error("Nome é obrigatório");
    if (!service) throw new Error("Serviço é obrigatório");
    if (!queue_type) throw new Error("Fila é obrigatório");
  }
}
