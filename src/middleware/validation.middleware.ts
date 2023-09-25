import { type NextFunction, type Request, type Response } from 'express';

import { type AnyZodObject } from 'zod';

// interface ZodIssue {
//   message: string;
//   path: string[];
// }

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.issues[0].message,
    });
  }
};

export default validate;
