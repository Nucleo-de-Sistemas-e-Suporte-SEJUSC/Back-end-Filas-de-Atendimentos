export class AlreadyExistAnAttendanceError extends Error {
  private code: number;
  constructor(message: string, code: number = 400) {
    super(message);
    this.name = "AlreadyExistAnAttendanceError";
    this.message = message;
    this.code = code;
  }
}
