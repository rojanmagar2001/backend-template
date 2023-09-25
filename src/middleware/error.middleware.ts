import { NODE_ENV } from '@/loaders/env';
import type HttpException from '@/utils/HttpException';
import { type NextFunction, type Request, type Response } from 'express';

const errorMiddleware = (error: HttpException, _req: Request, res: Response, _next: NextFunction): Response => {
  const statusCode: number = error.status > 300 ? error.status : 500;
  const success = false;
  const message = error.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success,
    message,
    stack: NODE_ENV === 'development' && error?.stack,
  });
};

export default errorMiddleware;
