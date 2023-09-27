import Service from '@/api/v1/services/admin/Auth/Auth.Service';
import asyncHandler from '@/handlers/async.handler';
import HttpResponse from '@/utils/HttpResponse';
import { type Request, type Response } from 'express';

const login = asyncHandler(async (req: Request, res: Response) => {
  const postData = req.body;

  const data = await Service.login(postData);

  res.cookie('access-token', data.accessToken, {
    secure: true,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 900000, // 15 min
  });

  res.cookie('refresh-token', data.refreshToken, {
    secure: true,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 1296000000, // 15 day
  });

  return res.send(
    new HttpResponse({
      message: 'User logged in successfully',
      data: data.permissions,
    }),
  );
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies['refresh-token'];
  const loggedUserData = res.locals.user;

  await Service.logout({ loggedUserData, token });

  res.clearCookie('access-token');
  res.clearCookie('refresh-token');

  return res.send(
    new HttpResponse({
      message: 'User logged out successfully',
    }),
  );
});

const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies['refresh-token'];

  const data = await Service.refresh({ token });

  res.cookie('access-token', data.accessToken, {
    secure: true,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 900000, // 15 min
  });

  res.cookie('refresh-token', data.refreshToken, {
    secure: true,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 1296000000, // 15 day
  });

  return res.send(
    new HttpResponse({
      message: 'Token refreshed successfully',
    }),
  );
});

const AdminAuthController = { login, logout, refresh };

export default AdminAuthController;
