import Service from '@/api/v1/services/admin/Permisision/Permission.Service';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Request, type Response } from 'express';

const create = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const permission = await Service.create({
    postData,
  });

  return res.status(HTTPSTATUS.CREATED).send(
    new HttpResponse({
      message: 'Permission created successfully',
      data: permission,
    }),
  );
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const postData = req.body;

  const permission = await Service.updatedById({
    id,
    postData,
  });

  return res.send(
    new HttpResponse({
      message: 'Permission updated successfully',
      data: permission,
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
      message: 'Permission deleted successfully',
    }),
  );
});

const AdminPermissionController = { create, update, delete: deleteItem };

export default AdminPermissionController;
