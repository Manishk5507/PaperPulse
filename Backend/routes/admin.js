import express from 'express';
import { auth, admin } from '../middleware/auth.js';
import { 
  approvePaper,
  rejectPaper,
  getAllPendingPapers
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/papers/pending', auth, admin, getAllPendingPapers);
router.patch('/papers/approve/:id', auth, admin, approvePaper);
router.patch('/papers/reject/:id', auth, admin, rejectPaper);

export default router;