import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '@/loaders/env';
import jwt from 'jsonwebtoken';

interface GenerateTokenProps {
  id: number;
  type: 'access' | 'refresh';
}

export function generateToken(data: GenerateTokenProps) {
  const { id, type } = data;

  if (type === 'access') {
    return jwt.sign({ id }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
  }

  return jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: '15d' });
}
