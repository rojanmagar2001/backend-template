import { type UserLoginInput } from '@/api/v1/validators/admin/Auth/Auth.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { type LoggedUserData } from '@/interfaces/services/Admin.Interface';
import { JWT_REFRESH_SECRET } from '@/loaders/env';
import { prisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
import { generateToken } from '@/utils/JWT';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (data: UserLoginInput) => {
  const { user, password } = data;

  const validUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: user }, { email: user }],
    },
    include: {
      role: {
        include: {
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

  if (!validUser) throw new HttpException(HTTPSTATUS.NOTFOUND, 'Invalid Credentials');

  const comparePassword = await bcrypt.compare(password, validUser.password);

  if (!comparePassword) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Credentials');

  const accessToken = generateToken({ id: validUser.id, type: 'access' });

  const refreshToken = generateToken({ id: validUser.id, type: 'refresh' });

  return {
    accessToken,
    refreshToken,
    permissions: validUser.role?.permissions,
  };
};

interface TokenPayload {
  exp: number;
  id: number;
}

const logout = async (data: { loggedUserData: LoggedUserData; token: string }) => {
  const { loggedUserData } = data;

  const user = await prisma.user.findUnique({
    where: {
      id: loggedUserData.id,
    },
  });

  if (!user) throw new HttpException(HTTPSTATUS.NOTFOUND, 'User does not exist');

  const now = Math.floor(Date.now() / 1000); // current timestamp

  const token = user.token.filter((i) => {
    try {
      const decoded = jwt.verify(i, JWT_REFRESH_SECRET) as TokenPayload;

      return decoded.exp > now;
    } catch (err) {
      console.log(err);
      return false;
    }
  });

  await prisma.user.update({
    where: {
      id: loggedUserData.id,
    },
    data: {
      token,
    },
  });
};

const refresh = async (data: { token: string }) => {
  try {
    const decoded = jwt.verify(data.token, JWT_REFRESH_SECRET) as TokenPayload;

    const validUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!validUser) throw new HttpException(HTTPSTATUS.NOTFOUND, 'User does not exist');

    const reuse = validUser.token.find((i) => i === data.token);

    if (reuse) throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Token reuse detected');

    const now = Math.floor(new Date().getTime() / 1000); // current timestamp

    const token = validUser.token.filter((i) => {
      try {
        const decoded = jwt.verify(i, JWT_REFRESH_SECRET) as TokenPayload;

        return decoded.exp > now;
      } catch (err) {
        console.log(err);
        return false;
      }
    });
    token.push(data.token);

    const user = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        token,
      },
    });

    const accessToken = generateToken({ id: user.id, type: 'access' });
    const refreshToken = generateToken({ id: user.id, type: 'refresh' });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new HttpException(HTTPSTATUS.UNAUTHORIZED, 'Invalid Token');
  }
};

const AdminAuthService = {
  login,
  logout,
  refresh,
};

export default AdminAuthService;
