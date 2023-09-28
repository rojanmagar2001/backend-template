import {
  type PermissionUpdateInput,
  type PermissionCreateInput,
} from '@/api/v1/validators/admin/Permission/Permission.Validator';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import { type UpdateParams, type CreateParams, type DeleteParams } from '@/interfaces/services/Admin.Interface';
import { prisma } from '@/loaders/prisma';
import HttpException from '@/utils/HttpException';
import { toNumber } from '@/utils/Params';

const create = async (data: CreateParams<PermissionCreateInput>) => {
  const { postData } = data;

  const name = postData.name.toLowerCase();

  const alreadyExist = await prisma.permission.findUnique({
    where: {
      permissionIdentifier: {
        name,
        roleId: postData.roleId,
      },
    },
  });

  if (alreadyExist) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Same permission already exist');

  const validRole = await prisma.role.findUnique({
    where: {
      id: postData.roleId,
    },
  });

  if (!validRole) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Role Id');

  const permission = await prisma.permission.create({
    data: {
      ...postData,
      name,
      //   createdById: loggedUserData.id,
      //   updatedById: loggedUserData.id,
    },
  });

  return permission;
};

const updatedById = async (data: UpdateParams<PermissionUpdateInput>) => {
  const { postData, loggedUserData } = data;
  const { name } = postData;

  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Permission Id');

  const validPermission = await prisma.permission.findUnique({
    where: {
      id,
    },
  });

  if (!validPermission) throw new HttpException(HTTPSTATUS.NOTFOUND, 'Permission does not exist');

  if (name !== undefined && name !== validPermission.name) {
    const alreadyExist = await prisma.permission.findUnique({
      where: {
        permissionIdentifier: {
          name,
          roleId: validPermission.roleId,
        },
      },
    });

    if (alreadyExist) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Same permission already exist in role');
  }

  const permission = await prisma.permission.update({
    where: {
      id,
    },
    data: {
      ...postData,
      updatedById: loggedUserData?.id,
    },
  });

  return permission;
};

const deleteById = async (data: DeleteParams) => {
  const id = toNumber(data.id);

  if (!id) throw new HttpException(HTTPSTATUS.BADREQUEST, 'Invalid Permission Id');

  const permission = await prisma.permission.findUnique({
    where: {
      id,
    },
  });

  return permission;
};

const AdminPermissionService = { create, updatedById, deleteById };

export default AdminPermissionService;
