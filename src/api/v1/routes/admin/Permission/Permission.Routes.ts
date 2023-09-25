import AdminPermissionController from '@/api/v1/controllers/admin/Permission/Admin.Permission';
import { PermissionCreateSchema } from '@/api/v1/validators/admin/Permission/Permission.Validator';
import { hasAccessRights } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/permission', hasAccessRights, validate(PermissionCreateSchema), AdminPermissionController.create);

const AdminPermissionRoutes = router;

export default AdminPermissionRoutes;
