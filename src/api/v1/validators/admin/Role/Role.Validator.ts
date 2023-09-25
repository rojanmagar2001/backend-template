import * as z from 'zod';

export const RoleCreateSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required' }).max(60, 'Name cannot exceed 60 characters'),
    })
    .strict(),
});

export type RoleCreateInput = z.infer<typeof RoleCreateSchema>['body'];
