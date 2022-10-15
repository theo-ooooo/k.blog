class apiError extends Error {
  statusCode: number;
  result: boolean;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.result = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default apiError;
