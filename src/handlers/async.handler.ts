import { type NextFunction, type Request, type Response } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
const asyncHandler = (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res);
  } catch (err) {
    next(err);
  }
};

export default asyncHandler;
