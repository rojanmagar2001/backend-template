import { type RoleCreateInput } from '@/api/v1/validators/admin/Role/Role.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { type GetParams, type CreateParams, type DeleteParams } from '@/interfaces/services/Admin.Interface';
import { prisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
import { toNumber } from '@/utils/Params';

const create = async (data: CreateParams<RoleCreateInput>) => {
  const { postData } = data;

  const name = postData.name.toLowerCase();

  const alreadyExist = await prisma.role.findUnique({
    where: {
      name,
    },
  });

  if (alreadyExist) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Role already exist');

  const role = await prisma.role.create({
    data: {
      name,
    },
  });

  return role;
};

const getById = async (data: GetParams) => {
  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Role Id');

  const role = await prisma.role.findUnique({
    where: {
      id,
    },
    include: {
      permissions: true,
    },
  });

  if (!role) throw new HttpException(HTTPSTATUS.NOTFOUND, 'Role does not exist');

  return role;
};

const getAll = async () => {
  const roles = await prisma.role.findMany();

  return roles;
};

const deleteById = async (data: DeleteParams) => {
  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Role Id');

  const validRole = await prisma.role.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
    },
  });

  if (!validRole) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Role does not exist');

  if (validRole.users.length > 0)
    throw new HttpException(HTTPSTATUS.FORBIDDEN, 'Users exist in this role. Please delete users first');

  const role = await prisma.role.delete({
    where: {
      id,
    },
  });

  return role;
};

const AdminRoleService = { create, getById, getAll, deleteById };

export default AdminRoleService;
