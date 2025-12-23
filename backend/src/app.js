import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import gamificationRoutes from './routes/gamificationRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
const uploadsPath = path.join(__dirname, '..', 'uploads');
console.log('📁 Serving static files from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/admin', adminRoutes);

// Test endpoint for uploads
app.get('/test-uploads', (req, res) => {
  const fs = require('fs');
  const uploadsPath = path.join(__dirname, '..', 'uploads');
  const profilePhotosPath = path.join(uploadsPath, 'profile-photos');
  
  res.json({
    uploadsPath,
    profilePhotosPath,
    uploadsExists: fs.existsSync(uploadsPath),
    profilePhotosExists: fs.existsSync(profilePhotosPath),
    files: fs.existsSync(profilePhotosPath) ? fs.readdirSync(profilePhotosPath) : []
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
