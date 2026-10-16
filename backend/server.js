import dns from 'node:dns';
if (!process.env.VERCEL) {
  try {
    dns.setServers(['1.1.1.1', '8.8.8.8']);
  } catch (e) {
    // Ignore DNS override errors in cloud
  }
}

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from './db.js';

// Load route routers
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import clientWorkRoutes from './routes/clientWorks.js';
import testimonialRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors({
  origin: '*', // For local development, allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from uploads directory with range requests support for video streaming
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR, {
  acceptRanges: true,
  cacheControl: true,
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    } else if (filePath.endsWith('.webm')) {
      res.setHeader('Content-Type', 'video/webm');
    } else if (filePath.endsWith('.mov')) {
      res.setHeader('Content-Type', 'video/quicktime');
    }
  }
}));

// Ensure database is initialized before API requests
app.use(async (req, res, next) => {
  // Static files or root check don't strictly require db
  if (req.path === '/' || req.path.startsWith('/uploads')) {
    return next();
  }
  try {
    await db.init();
    next();
  } catch (error) {
    console.error('Database connection error in request:', error);
    res.status(500).json({ message: 'Database connection error', error: error.message });
  }
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/client-works', clientWorkRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

// Root health check route (always returns 200 OK)
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Md Tohidul Islam Portfolio API',
    status: 'Running',
    version: '1.0.0',
    environment: process.env.VERCEL ? 'Vercel Serverless' : 'Local Standalone'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ message: err.message || 'An unexpected server error occurred.' });
});

// Initialize database and start server
const startServer = async () => {
  // On Vercel, serverless environment manages connections without app.listen()
  if (process.env.VERCEL) {
    db.init().catch(err => console.warn('Vercel background DB init warning:', err.message));
    return;
  }

  try {
    console.log('Initializing database...');
    await db.init();
    
    app.listen(PORT, () => {
      console.log(`Backend server successfully running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server locally:', error);
  }
};

startServer();

export default app;
