import http from 'http';
import app from '@/loaders/app';
import { PORT } from '@/loaders/env';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
