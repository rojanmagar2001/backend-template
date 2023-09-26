import Controller from '@/api/v1/controllers/admin/Role/Admin.Role';
import { RoleCreateSchema } from '@/api/v1/validators/admin/Role/Role.Validator';
import { isAuthenticated, isAuthorized } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.post('/role', isAuthenticated, isAuthorized, validate(RoleCreateSchema), Controller.create);

router.get('/role/:id', isAuthenticated, isAuthorized, Controller.getSingle);

router.delete('/role/:id', isAuthenticated, isAuthorized, Controller.delete);

const AdminRoleRoutes = router;

export default AdminRoleRoutes;
