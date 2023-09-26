import { type PasswordUpdateInput, type ProfileUpdateInput } from '@/api/v1/validators/admin/Profile/Profile.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { type UpdateParams, type GetParams } from '@/interfaces/services/Admin.Interface';
import { AdminPrisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
import { toNumber } from '@/utils/Params';
import bcrypt from 'bcrypt';

const getById = async (data: GetParams) => {
  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid User Id');

  const profile = await AdminPrisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      contact: true,
      email: true,
      username: true,
      dob: true,
      image: true,
      role: {
        select: {
          name: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!profile) throw new HttpException(HTTPSTATUS.NOTFOUND, 'User does not exist');

  return profile;
};

const updateById = async (data: UpdateParams<ProfileUpdateInput>) => {
  const { postData } = data;

  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid User Id');

  const validProfile = await AdminPrisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!validProfile) throw new HttpException(HTTPSTATUS.NOTFOUND, 'User does not exist');

  const name = postData.name?.toLowerCase();

  let dob: Date | undefined;

  if (postData.dob !== undefined) {
    dob = new Date(postData.dob);

    if (isNaN(dob.getTime())) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Date of Birth');
  }

  const profile = await AdminPrisma.user.update({
    where: {
      id,
    },
    data: {
      ...postData,
      name,
      dob,
    },
  });

  return profile;
};

const updatePassword = async (data: UpdateParams<PasswordUpdateInput>) => {
  const { postData } = data;

  if (postData.password !== postData.cpassword)
    throw new HttpException(HTTPSTATUS.BADREQUEST, 'Confirm password does not match the password');

  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid User Password');

  const validProfile = await AdminPrisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!validProfile) throw new HttpException(HTTPSTATUS.NOTFOUND, 'User does not exist');

  const { oldPassword } = postData;

  if (!(await bcrypt.compare(oldPassword, validProfile.password)))
    throw new HttpException(HTTPSTATUS.BADREQUEST, 'Old password does not match');

  if (oldPassword === postData.password)
    throw new HttpException(HTTPSTATUS.BADREQUEST, 'Password cannot be same as old password');

  const password = await bcrypt.hash(postData.password, 10);

  const profile = await AdminPrisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });

  return profile;
};

const AdminProfileService = { getById, updateById, updatePassword };

export default AdminProfileService;
