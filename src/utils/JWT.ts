import { JWT_SECRET } from '@/loaders/env';
import jwt from 'jsonwebtoken';

interface GenerateTokenProps {
  id: number;
  expiresIn: string;
}

export function generateToken(data: GenerateTokenProps) {
  const { id, expiresIn } = data;

  return jwt.sign({ id }, JWT_SECRET, { expiresIn });
}
