import AdminPermissionController from '@/api/v1/controllers/admin/Permission/Admin.Permission';
import { PermissionCreateSchema } from '@/api/v1/validators/admin/Permission/Permission.Validator';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/permission', validate(PermissionCreateSchema), AdminPermissionController.create);

const AdminPermissionRoutes = router;

export default AdminPermissionRoutes;
