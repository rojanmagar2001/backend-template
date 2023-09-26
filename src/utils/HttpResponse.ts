import { type HTTPSTATUS } from '@/enums/HttpStatus.enum';

interface HttpResponseProps {
  message?: string;
  statusCode?: HTTPSTATUS;
  data?: Record<string, unknown> | unknown[];
  docs?: Record<string, unknown>;
  others?: Record<string, unknown>;
}

class HttpResponse {
  public readonly success: boolean;
  public readonly message: string | undefined;
  public readonly data: Record<string, unknown> | unknown[] | undefined;
  public readonly docs: Record<string, unknown> | undefined;
  public readonly others: Record<string, unknown> | unknown[] | undefined;

  constructor({ statusCode, message, data, docs, others }: HttpResponseProps) {
    statusCode = statusCode ?? 200;

    if (statusCode >= 300) {
      this.success = false;
    } else {
      this.success = true;
    }

    this.message = message;
    this.data = data;
    this.docs = docs;
    this.others = others;
  }
}

export default HttpResponse;
