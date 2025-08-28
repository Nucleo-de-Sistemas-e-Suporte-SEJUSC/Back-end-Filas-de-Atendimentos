export class InternalServerError extends Error {
	public readonly statusCode: number;
	public readonly code: string;
	public readonly error: string;
	constructor() {
		super("Ocorreu um erro interno.");
		this.name = "ExistAnAttendanceError";
		this.statusCode = 500;
		this.code = "INTERNAL_SERVER_ERROR";
		this.error = "Internal Server Error";
	}
}
