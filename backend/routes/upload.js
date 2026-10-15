import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import auth from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const ext = path.extname(sanitizedOriginalName) || '.mp4';
    cb(null, `${file.fieldname || 'media'}-${uniqueSuffix}${ext}`);
  }
});

// Allow images and video files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpeg|jpg|png|webp|gif|svg|mp4|webm|mov|mkv|m4v|avi|quicktime)$/i;
  const isExtAllowed = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const isMimeAllowed = file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/');

  if (isExtAllowed || isMimeAllowed) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format. Please upload an image (JPG, PNG, WebP) or video (MP4, WebM, MOV).'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit for high quality 4K video clips, reels, and walkthroughs
});

const handleUploadResponse = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File is too large! Maximum allowed size is 500MB.' });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ message: err.message || 'File upload failed.' });
  }

  const file = req.file || (req.files && req.files[0]);
  if (!file) {
    return res.status(400).json({ message: 'No file received.' });
  }

  const fileUrl = `/uploads/${file.filename}`;
  const isVideo = file.mimetype.startsWith('video/') || /\.(mp4|webm|mov|mkv|m4v|avi)$/i.test(file.filename);

  return res.json({
    message: isVideo ? 'Video uploaded successfully!' : 'File uploaded successfully!',
    url: fileUrl,
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    isVideo
  });
};

// General multi-field uploader (supports 'image', 'video', 'file', 'media')
router.post('/', auth, (req, res) => {
  upload.any()(req, res, (err) => {
    handleUploadResponse(req, res, err);
  });
});

// Dedicated Video Upload Endpoint
router.post('/video', auth, (req, res) => {
  upload.single('video')(req, res, (err) => {
    handleUploadResponse(req, res, err);
  });
});

// Dedicated Image Upload Endpoint
router.post('/image', auth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    handleUploadResponse(req, res, err);
  });
});

export default router;
