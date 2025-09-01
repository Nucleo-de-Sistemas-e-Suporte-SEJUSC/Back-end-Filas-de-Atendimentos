export class ExistAnAttendanceError extends Error {
	public readonly statusCode: number;
	public readonly code: string;
	public readonly error: string;
	constructor() {
		super("Já existe um atendimento para este usuário nos últimos 10 minutos.");
		this.name = "ExistAnAttendanceError";
		this.statusCode = 409;
		this.code = "CONFLICT_ERROR";
		this.error = "Bad Request";
	}
}
