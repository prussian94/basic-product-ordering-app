class CustomException {
  constructor(
    public message: string,
    public code: number,
    public statusCode: number
  ) {
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
  }
}

module.exports = CustomException;
