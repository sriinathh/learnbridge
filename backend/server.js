// server.js
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();  // Load .env

import { connectDB } from './src/config/db.js';
import app from './src/app.js';
import { PORT } from './src/config/env.js';
import { initializeSocket } from './src/socket/socketServer.js';

// Google OAuth middleware
import session from 'express-session';
import passport from './src/auth/googleAuth.js';

// Validate Google OAuth configuration
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('⚠️  Google OAuth credentials not configured. Google Sign In will not work.');
} else {
  console.log('✅ Google OAuth configured');
}

// Connect DB (await so server only starts after DB is reachable)
await connectDB();

// ---- SESSION (required for Google OAuth) ----
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ---- ROUTES (AUTH, GOOGLE, API) ----
import authRoutes from './src/routes/authRoutes.js';
import googleRoutes from './src/routes/googleRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/', googleRoutes); 

// Create HTTP + WebSocket
const httpServer = createServer(app);
const io = initializeSocket(httpServer);
app.set('io', io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 WebSocket server initialized`);
});
