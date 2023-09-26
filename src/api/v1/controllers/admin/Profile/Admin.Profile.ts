import Service from '@/api/v1/services/admin/Profile/Profile.Service';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Request, type Response } from 'express';

const get = asyncHandler(async (_req: Request, res: Response) => {
  const loggedUserData = res.locals.user;

  const data = await Service.getById({ id: loggedUserData.id });

  return res.send(
    new HttpResponse({
      data,
    }),
  );
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;
  const loggedUserData = res.locals.user;

  const data = await Service.updateById({
    id: loggedUserData.id,
    postData,
  });

  return res.send(
    new HttpResponse({
      message: 'Profile updated successfully',
      data,
    }),
  );
});

const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;
  const loggedUserData = res.locals.user;

  await Service.updatePassword({
    id: loggedUserData.id,
    postData,
  });

  return res.send(
    new HttpResponse({
      message: 'Password updated successfully',
    }),
  );
});

const AdminProfileController = { get, update, updatePassword };

export default AdminProfileController;
