import express, { type Request, type Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorMiddleware from '@/middleware/error.middleware';
import AdminPermissionRoutes from '@/api/v1/routes/admin/Permission/Permission.Routes';
import AdminRoleRoutes from '@/api/v1/routes/admin/Role/Role.Routes';
import AdminUserRoutes from '@/api/v1/routes/admin/User/User.Routes';
import AdminAuthRoutes from '@/api/v1/routes/admin/Auth/Auth.Routes';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(compression());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(helmet.hsts({ maxAge: 15552000 }));
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));

app.disable('etag').disable('x-powered-by');

app.use(cookieParser());

app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
  return res.format({
    html: function () {
      res.send(
        `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Welcome</title>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico">
                  </head>
                  <body
                    style="
                      display: flex;
                      flex-direction: column;
                      font-family: san-serif;
                    "
                  >
                    <div style="margin: 20rem; text-align: center; display: flex; flex-direction: column;">
                      <h1 style="color: #050a22; font-size:42px;">Welcome to our Eureka Traders Backend Server 📡</h1>
                      <p style="color: #3366ff; font-size:24px;">Server is currently active...........</p>
                    </div>
                  </body>
                </html>`,
      );
    },
    text: function () {
      res.send('Welcome to our Eureka Traders Backend');
    },
    json: function () {
      res.send({ message: 'Welcome to our Eureka Traders Backend' });
    },
  });
});

// ?Admin Routes
app.use('/api/v1/admin', AdminPermissionRoutes, AdminRoleRoutes, AdminUserRoutes, AdminAuthRoutes);

app.use(errorMiddleware);

export default app;
