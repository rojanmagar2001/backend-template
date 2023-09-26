import Service from '@/api/v1/services/admin/User/User.Service';
import { HTTPSTATUS } from '@/enums/HttpStatus.enum';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Request, type Response } from 'express';

const create = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const user = await Service.create({
    postData,
  });

  return res.status(HTTPSTATUS.CREATED).send(
    new HttpResponse({
      message: 'User created successfully',
      data: user,
    }),
  );
});

const getAll = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page as string | undefined;
  const limit = req.query.limit as string | undefined;

  const { users, docs } = await Service.getAll({ page, limit });

  return res.send(
    new HttpResponse({
      data: users,
      docs,
    }),
  );
});

const getSingle = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await Service.getById({
    id,
  });

  return res.send(
    new HttpResponse({
      data: user,
    }),
  );
});

const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const loggedUserData = res.locals.user;

  await Service.deleteById({
    id,
    loggedUserData,
  });

  return res.send(
    new HttpResponse({
      message: 'User deleted successfully',
    }),
  );
});

const AdminUserController = { create, getAll, getSingle, delete: deleteItem };

export default AdminUserController;
