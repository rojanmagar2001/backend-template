import { PERMISSION } from '@/enums/Permission.enum';
import { AccessRight } from '@prisma/client';
import * as z from 'zod';

export const PermissionCreateSchema = z.object({
  body: z
    .object({
      name: z.nativeEnum(PERMISSION, { required_error: 'Name is required' }),
      access: z.nativeEnum(AccessRight, { required_error: 'Access is required' }),
      roleId: z.number({ required_error: 'Role Id is required' }),
    })
    .strict(),
});

export const PermissionUpdateSchema = z.object({
  body: z
    .object({
      name: z.nativeEnum(PERMISSION, { required_error: 'Name is required' }).optional(),
      access: z.nativeEnum(AccessRight, { required_error: 'Access is required' }).optional(),
    })
    .strict(),
});

export type PermissionCreateInput = z.infer<typeof PermissionCreateSchema>['body'];
export type PermissionUpdateInput = z.infer<typeof PermissionUpdateSchema>['body'];
