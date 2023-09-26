import 'dotenv/config';

export const PORT = process.env.PORT as string;

export const NODE_ENV = process.env.NODE_ENV as string;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
