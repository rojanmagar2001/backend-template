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

const getAll = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page as string | undefined;
  const limit = req.query.limit as string | undefined;

  const { users, docs } = await AdminUserService.getAll({ page, limit });

  return res.send(
    new HttpResponse({
      data: users,
      docs,
    }),
  );
});

const AdminUserController = { create, getAll };

export default AdminUserController;
