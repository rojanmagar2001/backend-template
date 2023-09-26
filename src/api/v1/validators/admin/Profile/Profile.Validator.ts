import * as z from 'zod';

export const ProfileUpdateSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required' }).max(60, 'Name cannot exceed 60 characters').optional(),
      //   password: z
      //     .string({ required_error: 'Password is required' })
      //     .refine((value) => /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value), {
      //       message:
      //         'Password must contain at least one uppercase letter, one digit and one special characters and have minimum 8 characters',
      //     }).optional(),
      contact: z.string({ required_error: 'Contact is required' }).optional(),
      dob: z.string({ required_error: 'Date Of Birth is required' }).optional(),
    })
    .strict(),
});

export const PasswordUpdateSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .refine((value) => /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value), {
        message:
          'Password must contain at least one uppercase letter, one digit and one special characters and have minimum 8 characters',
      }),
    cpassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  }),
});

export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>['body'];

export type PasswordUpdateInput = z.infer<typeof PasswordUpdateSchema>['body'];
