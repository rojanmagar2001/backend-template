import * as z from 'zod';

export const UserLoginSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'Username or Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export type UserLoginInput = z.infer<typeof UserLoginSchema>['body'];
