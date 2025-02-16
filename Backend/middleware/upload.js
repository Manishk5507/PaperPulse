import multer from 'multer';

// Configure memory storage (file stays in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export const uploadMiddleware = upload.single('file'); // 'file' = form field name