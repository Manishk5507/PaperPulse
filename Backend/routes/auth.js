import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', auth, (req, res) => res.json(req.user));

export default router;