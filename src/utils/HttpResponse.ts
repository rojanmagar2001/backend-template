import { type HTTPSTATUS } from '@/enums/HttpStatus.enum';

interface HttpResponseProps {
  message?: string;
  statusCode?: HTTPSTATUS;
  data?: Record<string, unknown> | unknown[];
}

class HttpResponse {
  public readonly success: boolean;
  public readonly message: string | undefined;
  public readonly data: Record<string, unknown> | unknown[] | undefined;

  constructor({ statusCode, message, data }: HttpResponseProps) {
    statusCode = statusCode ?? 200;

    if (statusCode >= 300) {
      this.success = false;
    } else {
      this.success = true;
    }

    this.message = message;
    this.data = data;
  }
}

export default HttpResponse;
