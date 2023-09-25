import { type PermissionCreateInput } from '@/api/v1/validators/admin/Permission/Permission.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { type CreateParams } from '@/interfaces/services/Admin.Interface';
import { AdminPrisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';

const create = async (data: CreateParams<PermissionCreateInput>) => {
  const { postData } = data;

  const name = postData.name.toLowerCase();

  const alreadyExist = await AdminPrisma.permission.findUnique({
    where: {
      permissionIdentifier: {
        name,
        roleId: postData.roleId,
      },
    },
  });

  if (alreadyExist) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Same permission already exist');

  const validRole = await AdminPrisma.role.findUnique({
    where: {
      id: postData.roleId,
    },
  });

  if (!validRole) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Role Id');

  const permission = await AdminPrisma.permission.create({
    data: {
      ...postData,
      name,
      //   createdById: loggedUserData.id,
      //   updatedById: loggedUserData.id,
    },
  });

  return permission;
};

const AdminPermissionService = { create };

export default AdminPermissionService;
