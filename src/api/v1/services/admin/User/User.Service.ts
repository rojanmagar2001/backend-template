import { type UserCreateInput } from '@/api/v1/validators/admin/User/User.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { type CreateParams } from '@/interfaces/services/Admin.Interface';
import { AdminPrisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
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

const AdminUserService = { create };

export default AdminUserService;
