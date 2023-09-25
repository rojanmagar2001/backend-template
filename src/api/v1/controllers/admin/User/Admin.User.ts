import AdminUserService from '@/api/v1/services/admin/User/User.Service';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Request, type Response } from 'express';

const create = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const user = await AdminUserService.create({
    postData,
  });

  return res.status(HTTPSTATUS.CREATED).send(
    new HttpResponse({
      message: 'User successfully created',
      data: user,
    }),
  );
});

const AdminUserController = { create };

export default AdminUserController;
