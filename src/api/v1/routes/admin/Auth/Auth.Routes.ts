import AdminAuthController from '@/api/v1/controllers/admin/Auth/Admin.Auth';
import { UserLoginSchema } from '@/api/v1/validators/admin/Auth/Auth.Validator';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/auth/login', validate(UserLoginSchema), AdminAuthController.login);

const AdminAuthRoutes = router;

export default AdminAuthRoutes;
