import Service from '@/api/v1/services/admin/Role/Role.Service';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Response, type Request } from 'express';

const create = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const role = await Service.create({
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

  const role = await Service.getById({
    id,
  });

  return res.send(
    new HttpResponse({
      data: role,
    }),
  );
});

const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await Service.deleteById({
    id,
  });

  return res.send(
    new HttpResponse({
      message: 'Role deleted successfully',
    }),
  );
});

const AdminRoleController = { create, getSingle, delete: deleteItem };

export default AdminRoleController;
