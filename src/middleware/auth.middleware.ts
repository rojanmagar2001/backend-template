import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import HttpException from '@/utils/HttpException';
import jwt from 'jsonwebtoken';
import { type NextFunction, type Request, type Response } from 'express';
import { AdminPrisma } from '@/loaders/prisma';
import { JWT_SECRET } from '@/loaders/env';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['access-token'];

    try {
      const decode = jwt.verify(token, JWT_SECRET) as { id: number };

      const user = await AdminPrisma.user.findUnique({
        where: { id: decode.id },
        select: {
          id: true,
          name: true,
        },
      });

      if (!user) {
        next(new HttpException(HTTPSTATUS.UNAUTHORIZED, 'User not found.'));
      }

      res.locals.user = user;
      next();
    } catch (jwtError) {
      next(new HttpException(HTTPSTATUS.UNAUTHORIZED, 'Invalid token.'));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const hasAccessRights = async (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const method = req.method;

  const route = path.split('/').filter((i) => i !== '')[0];

  const loggedUser = res.locals.user;

  try {
    if (!loggedUser.id) throw new HttpException(HTTPSTATUS.UNAUTHORIZED, 'Not Authorized');

    const user = await AdminPrisma.user.findUnique({
      where: {
        id: loggedUser.id,
      },
      select: {
        role: {
          select: {
            permissions: {
              select: {
                name: true,
                access: true,
              },
            },
          },
        },
      },
    });

    if (user?.role?.permissions === undefined) throw new HttpException(HTTPSTATUS.UNAUTHORIZED, 'Not Authorized');

    const permissions = user.role.permissions;

    if (permissions === undefined || !permissions || permissions.length === 0)
      throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Forbidden route');

    const permission = permissions.find((i) => i.name === route);

    if (!permission) throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Forbidden route');

    switch (method) {
      case 'POST': {
        if (permission.access === 'readonly') throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Forbidden method');
        break;
      }
      case 'PUT': {
        if (permission.access === 'readonly') throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Forbidden method');
        break;
      }
      case 'DELETE': {
        if (permission.access !== 'readwriteanddelete')
          throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Forbidden method');
        break;
      }
      case 'GET': {
        break;
      }
      case 'PATCH': {
        if (permission.access === 'readonly') throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Forbidden method');
        break;
      }
      default: {
        throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Forbidden method');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
