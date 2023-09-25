import AdminRoleController from '@/api/v1/controllers/admin/Role/Admin.Role';
import { RoleCreateSchema } from '@/api/v1/validators/admin/Role/Role.Validator';
import { hasAccessRights } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/role', hasAccessRights, validate(RoleCreateSchema), AdminRoleController.create);

router.get('/role/:id', hasAccessRights, AdminRoleController.getSingle);

const AdminRoleRoutes = router;

export default AdminRoleRoutes;
