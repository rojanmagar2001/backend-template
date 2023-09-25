import AdminUserController from '@/api/v1/controllers/admin/User/Admin.User';
import { UserCreateSchema } from '@/api/v1/validators/admin/User/User.Validator';
import { isAuthenticated, isAuthorized } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/user', isAuthenticated, isAuthorized, validate(UserCreateSchema), AdminUserController.create);

router.get('/user/list', isAuthenticated, isAuthorized, AdminUserController.getAll);

const AdminUserRoutes = router;

export default AdminUserRoutes;
