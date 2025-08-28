export class AlreadyStatusModifiedError extends Error {
	public readonly statusCode: number;
	public readonly code: string;
	public readonly error: string;
	constructor() {
		super("O status do atendimento já foi modificado, atualize a página");
		this.name = "AlreadyStatusModifiedError";
		this.statusCode = 409;
		this.code = "CONFLICT_ERROR";
		this.error = "Bad Request";
	}
}
