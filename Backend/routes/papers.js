import express from "express";
import { auth } from "../middleware/auth.js";
import { uploadMiddleware } from "../middleware/upload.js";
import {
  getPapers,
  uploadPaper,
  getPaperById,
} from "../controllers/paperController.js";

const router = express.Router();

router.get("/", getPapers);
router.get("/:id", getPaperById);
router.post("/upload", auth, uploadMiddleware, uploadPaper);

export default router;
