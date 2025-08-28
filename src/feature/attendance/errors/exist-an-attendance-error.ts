export class ExistAnAttendanceError extends Error {
	private code: number;
	constructor(message: string, code: number = 400) {
		super(message);
		this.name = "ExistAnAttendanceError";
		this.message = message;
		this.code = code;
	}
}
