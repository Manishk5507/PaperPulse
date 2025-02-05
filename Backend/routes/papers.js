import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getPapers,
  uploadPaper,
  getPaperById
} from '../controllers/paperController.js';

const router = express.Router();

router.get('/', getPapers);
router.get('/:id', getPaperById);
router.post('/', auth, uploadPaper);

export default router;