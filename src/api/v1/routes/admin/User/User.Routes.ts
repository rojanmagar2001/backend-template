import AdminUserController from '@/api/v1/controllers/admin/User/Admin.User';
import { UserCreateSchema } from '@/api/v1/validators/admin/User/User.Validator';
import { hasAccessRights, isAuthorized } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/user', isAuthorized, hasAccessRights, validate(UserCreateSchema), AdminUserController.create);

const AdminUserRoutes = router;

export default AdminUserRoutes;
