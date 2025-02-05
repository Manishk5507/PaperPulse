import express from 'express';
import { auth, admin } from '../middleware/auth.js';
import { 
  getAllPendingPapers,
  approvePaper,
  rejectPaper
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/papers/pending', auth, admin, getAllPendingPapers);
router.patch('/approve/:id', auth, admin, approvePaper);
router.patch('/reject/:id', auth, admin, rejectPaper);

export default router;