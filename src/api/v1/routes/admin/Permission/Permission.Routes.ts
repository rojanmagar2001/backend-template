import Controller from '@/api/v1/controllers/admin/Permission/Admin.Permission';
import {
  PermissionCreateSchema,
  PermissionUpdateSchema,
} from '@/api/v1/validators/admin/Permission/Permission.Validator';
import { isAuthenticated, isAuthorized } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/permission', isAuthenticated, isAuthorized, validate(PermissionCreateSchema), Controller.create);

router.put('/permission/:id', isAuthenticated, isAuthorized, validate(PermissionUpdateSchema), Controller.create);

const AdminPermissionRoutes = router;

export default AdminPermissionRoutes;
