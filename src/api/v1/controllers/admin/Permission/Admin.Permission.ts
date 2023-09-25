import AdminPermissionService from '@/api/v1/services/admin/Permisision/Permission.Service';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Request, type Response } from 'express';

const create = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const permission = await AdminPermissionService.create({
    postData,
  });

  return res.status(HTTPSTATUS.CREATED).send(
    new HttpResponse({
      message: 'Permission successfully created',
      data: permission,
    }),
  );
});

const AdminPermissionController = { create };

export default AdminPermissionController;
