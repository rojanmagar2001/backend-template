import Service from '@/api/v1/services/admin/Auth/Auth.Service';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Request, type Response } from 'express';

const login = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const data = await Service.login(postData);

  res.cookie('access-token', data.token, {
    secure: true,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 604800000, // 7 days
  });

  return res.send(
    new HttpResponse({
      message: 'User logged in successfully',
      data: data.permissions,
    }),
  );
});

const AdminAuthController = { login };

export default AdminAuthController;
