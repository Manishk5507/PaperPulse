// routes/test.js
import express from 'express';
import { sendVerificationEmail } from '../utils/emailSender.js';

const router = express.Router();

router.get('/test-email', async (req, res) => {
  try {
    await sendVerificationEmail('recipient@example.com', 'test-token');
    res.send('Email sent successfully');
  } catch (error) {
    res.status(500).send(`Email failed: ${error.message}`);
  }
});

export default router;