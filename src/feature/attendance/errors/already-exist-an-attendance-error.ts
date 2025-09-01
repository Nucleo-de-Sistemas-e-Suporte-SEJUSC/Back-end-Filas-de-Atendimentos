export class AlreadyExistAnAttendanceError extends Error {
	public readonly statusCode: number;
	public readonly code: string;
	public readonly error: string;
	constructor() {
		super("Já existe um atendimento com esse CPF");
		this.name = "AlreadyExistAnAttendanceError";
		this.statusCode = 409;
		this.code = "CONFLICT_ERROR";
		this.error = "Bad Request";
	}
}
