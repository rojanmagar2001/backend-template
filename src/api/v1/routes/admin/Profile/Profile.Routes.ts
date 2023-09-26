import Controller from '@/api/v1/controllers/admin/Profile/Admin.Profile';
import { PasswordUpdateSchema, ProfileUpdateSchema } from '@/api/v1/validators/admin/Profile/Profile.Validator';
import { isAuthenticated } from '@/middleware/auth.middleware';
import validate from '@/middleware/validation.middleware';
import { Router } from 'express';

const router = Router();

router.get('/profile', isAuthenticated, Controller.get);

router.put('/profile', isAuthenticated, validate(ProfileUpdateSchema), Controller.update);

router.put('/profile/password', isAuthenticated, validate(PasswordUpdateSchema), Controller.updatePassword);

const AdminProfileRoutes = router;

export default AdminProfileRoutes;
