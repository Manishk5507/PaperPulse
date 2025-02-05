import express from 'express';
import { auth, admin } from '../middleware/auth.js';
import {
  addCollege,
  getColleges
} from '../controllers/collegeController.js';

const router = express.Router();

router.post('/', auth, admin, addCollege);
router.get('/', getColleges);

export default router;