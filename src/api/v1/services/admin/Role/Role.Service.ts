import { type RoleCreateInput } from '@/api/v1/validators/admin/Role/Role.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { type GetParams, type CreateParams } from '@/interfaces/services/Admin.Interface';
import { AdminPrisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
import { toNumber } from '@/utils/Params';

const create = async (data: CreateParams<RoleCreateInput>) => {
  const { postData } = data;

  const name = postData.name.toLowerCase();

  const alreadyExist = await AdminPrisma.role.findUnique({
    where: {
      name,
    },
  });

  if (alreadyExist) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Role already exist');

  const role = await AdminPrisma.role.create({
    data: {
      name,
    },
  });

  return role;
};

const getById = async (data: GetParams) => {
  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Role Id');

  const role = await AdminPrisma.role.findUnique({
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

const AdminRoleService = { create, getById };

export default AdminRoleService;
