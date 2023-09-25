import AdminRoleService from '@/api/v1/services/admin/Role/Role.Service';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Response, type Request } from 'express';

const create = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const role = await AdminRoleService.create({
    postData,
  });

  return res.status(HTTPSTATUS.CREATED).send(
    new HttpResponse({
      message: 'Role created Successfully',
      data: role,
    }),
  );
});

const getSingle = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const role = await AdminRoleService.getById({
    id,
  });

  return res.send(
    new HttpResponse({
      data: role,
    }),
  );
});

const AdminRoleController = { create, getSingle };

export default AdminRoleController;
