import { type UserLoginInput } from '@/api/v1/validators/admin/Auth/Auth.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { AdminPrisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
import { generateToken } from '@/utils/JWT';
import bcrypt from 'bcrypt';

const login = async (data: UserLoginInput) => {
  const { user, password } = data;

  const validUser = await AdminPrisma.user.findFirst({
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

  const token = generateToken({ id: validUser.id, expiresIn: '7d' });

  return {
    token,
    permissions: validUser.role?.permissions,
  };
};

const AdminAuthService = {
  login,
};

export default AdminAuthService;
