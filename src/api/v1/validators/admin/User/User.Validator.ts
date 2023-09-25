import * as z from 'zod';

export const UserCreateSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).max(60, 'Name cannot exceed 60 characters'),
    username: z
      .string({ required_error: 'Username is required' })
      .max(20, 'Username cannot exceed 20 characters')
      .refine((value) => /^[a-zA-Z][-a-zA-Z0-9_]*$/.test(value), {
        message: 'Message can only contain alphabets, hyphens(-), digits and underscores(_)',
      }),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email or malicious activities traced...'),
    password: z
      .string({ required_error: 'Password is required' })
      .refine((value) => /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value), {
        message:
          'Password must contain at least one uppercase letter, one digit and one special characters and have minimum 8 characters',
      }),
    contact: z.string({ required_error: 'Contact is required' }),
    roleId: z.number({ required_error: 'RoleId is required' }),
    dob: z.string({ required_error: 'Date Of Birth is required' }),
  }),
});

export type UserCreateInput = z.infer<typeof UserCreateSchema>['body'];
