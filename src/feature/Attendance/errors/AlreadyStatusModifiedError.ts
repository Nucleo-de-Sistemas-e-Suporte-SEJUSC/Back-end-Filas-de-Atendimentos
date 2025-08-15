export class AlreadyStatusModifiedError extends Error {
  private code: number;
  constructor(message: string, code: number = 400) {
    super(message);
    this.name = "AlreadyStatusModifiedError";
    this.message = message;
    this.code = code;
  }
}
