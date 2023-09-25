import { type HTTPSTATUS } from '@/enums/HttpStatus.enum';

class HttpException extends Error {
  public readonly status: HTTPSTATUS;
  public readonly message: string;

  constructor(status: HTTPSTATUS, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
