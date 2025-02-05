import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validate.js';
import { registerSchema } from '../middleware/validate.js';

const router = express.Router();
router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', loginUser);
export default router;