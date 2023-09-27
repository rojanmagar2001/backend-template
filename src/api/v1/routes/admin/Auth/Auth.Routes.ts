import Controller from '@/api/v1/controllers/admin/Auth/Admin.Auth';
import { UserLoginSchema } from '@/api/v1/validators/admin/Auth/Auth.Validator';
import { isAuthenticated } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/auth/login', validate(UserLoginSchema), Controller.login);

router.get('/auth/logout', isAuthenticated, Controller.logout);

router.get('/auth/refresh', Controller.refresh);

const AdminAuthRoutes = router;

export default AdminAuthRoutes;
