import { type UserCreateInput } from '@/api/v1/validators/admin/User/User.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import {
  type GetAllParams,
  type CreateParams,
  type GetParams,
  type DeleteParams,
} from '@/interfaces/services/Admin.Interface';
import { AdminPrisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
import { getPageDocs, pagination } from '@/utils/Pagination';
import { toNumber } from '@/utils/Params';
import bcrypt from 'bcrypt';

const create = async (data: CreateParams<UserCreateInput>) => {
  const { postData } = data;

  const name = postData.name.toLowerCase();
  const username = postData.username.toLowerCase();
  const email = postData.email.toLowerCase();

  const alreadyExist = await AdminPrisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (alreadyExist) throw new HttpException(HTTPSTATUS.BADREQUEST, 'User already exist');

  const dob = new Date(postData.dob);

  if (isNaN(dob.getTime())) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Date Sent');

  const password = await bcrypt.hash(postData.password, 10);

  const user = await AdminPrisma.user.create({
    data: {
      ...postData,
      name,
      username,
      email,
      password,
    },
    select: {
      id: true,
      name: true,
      contact: true,
      username: true,
      email: true,
    },
  });

  return user;
};

const getAll = async (data: GetAllParams) => {
  const { page, limit, skip } = pagination(data);

  const [users, count] = await Promise.all([
    AdminPrisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip,
    }),
    AdminPrisma.user.count(),
  ]);

  const docs = getPageDocs({ page, limit, count });

  return { users, docs };
};

const getById = async (data: GetParams) => {
  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid User Id');

  const user = await AdminPrisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      contact: true,
      username: true,
      email: true,
      dob: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      role: {
        select: {
          name: true,
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

  if (!user) throw new HttpException(HTTPSTATUS.NOTFOUND, 'User does not exist');

  return user;
};

const deleteById = async (data: DeleteParams) => {
  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid User Id');

  if (id === data.loggedUserData?.id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Cannot delete your own account');

  const validUser = await AdminPrisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!validUser) throw new HttpException(HTTPSTATUS.NOTFOUND, 'User does not exist');

  const user = await AdminPrisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

const AdminUserService = { create, getAll, getById, deleteById };

export default AdminUserService;
