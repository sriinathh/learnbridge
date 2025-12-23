# LEARNBRIDGE+ V2.0 - Complete Setup Guide
https://res.cloudinary.com/dfeyi8eom/image/upload/Screenshot_23-12-2025_113514_localhost_pxitg9.jpg 

## 🚀 Quick Start

This guide will help you set up the complete LEARNBRIDGE+ V2.0 application from scratch.

## Prerequisites

- **Node.js** v20.19.0 or higher (v22.11.0+ recommended)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**
- **Git**

## 📁 Project Structure

```
learnbridge-plus-v2/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── config/   # Database, environment config
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Auth, error handling
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic (AI services)
│   │   └── utils/        # Helper functions
│   └── server.js        # Entry point
│
└── frontend/         # React + Vite application
    ├── src/
    │   ├── api/         # API client functions
    │   ├── components/  # Reusable components
    │   ├── context/     # React Context (Auth)
    │   ├── pages/       # Page components
    │   └── styles/      # CSS files
    └── vite.config.js
```

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/learnbridge-plus
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/learnbridge-plus

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Optional - for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# AI/LLM Configuration
LLM_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
MISTRAL_API_KEY=your-mistral-api-key
```

### 4. Create Uploads Directory

```bash
mkdir uploads
```

### 5. Start MongoDB

**Local MongoDB:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# OR
mongod
```

**MongoDB Atlas:**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string and add it to `.env`

### 6. Start Backend Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend should now be running on `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Server

```bash
npm run dev
```

The frontend should now be running on `http://localhost:5173`

## 📝 Initial Setup Steps

### 1. Create Admin User

You can create an admin user through the registration flow or directly in MongoDB:

```javascript
// In MongoDB shell or Compass
use learnbridge-plus

db.users.insertOne({
  name: "Admin User",
  email: "admin@learnbridge.com",
  password: "$2a$10$...", // bcrypt hash of your password
  role: "admin",
  isVerified: true
})
```

Or use the registration endpoint and manually update the role in the database.

### 2. Test the Application

1. **Landing Page**: Visit `http://localhost:5173`
2. **Register**: Click "Join as Student" and create an account
3. **Login**: Use your credentials to log in
4. **Dashboard**: Explore the student dashboard

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/verify-otp` - Verify email OTP
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Faculty/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses/:id/quiz/submit` - Submit quiz

### AI Features
- `POST /api/ai/upload-resume` - Upload resume (multipart)
- `POST /api/ai/analyze-resume` - Get resume analysis
- `POST /api/ai/generate-skill-gaps` - Generate skill gap report
- `POST /api/ai/generate-learning-plan` - Generate learning path
- `POST /api/ai/chatbot` - Chat with LearnBuddy

### Gamification
- `GET /api/gamification/stats` - Get user stats
- `GET /api/gamification/leaderboard` - Get leaderboard
- `POST /api/gamification/add-xp` - Add XP
- `POST /api/gamification/update-streak` - Update streak

### Forum
- `GET /api/forum/posts` - List forum posts
- `POST /api/forum/posts` - Create post
- `GET /api/forum/posts/:id` - Get post details
- `POST /api/forum/posts/:id/comments` - Add comment
- `POST /api/forum/posts/:id/like` - Like post

### Internships
- `GET /api/internships` - List internships
- `GET /api/internships/:id` - Get internship details
- `POST /api/internships/:id/apply` - Apply for internship

## 🎯 Features Overview

### ✅ Implemented Features

1. **Landing Page** - Modern, animated landing page with all sections
2. **Authentication** - JWT-based auth with OTP verification
3. **Role-Based Dashboards** - Student, Faculty, Admin
4. **AI Resume Analyzer** - PDF parsing and analysis
5. **AI Skill Gap Analysis** - Identify missing skills
6. **AI Learning Path Generator** - Personalized learning plans
7. **AI Chatbot (LearnBuddy)** - Conversational AI mentor
8. **Gamification** - XP, Levels, Badges, Streaks, Leaderboard
9. **Course Management** - Create, enroll, take quizzes
10. **Community Forum** - Post, comment, like
11. **Internship Hub** - Browse and apply for internships
12. **Profile Page** - Comprehensive student profile

### 🚧 Features to Enhance

1. **Real-time Chat** - WebSocket integration for forum
2. **Video Lessons** - Video player integration
3. **PWA Support** - Offline mode and installable app
4. **Voice Learning** - Multilingual voice responses
5. **AI Proctoring** - Exam monitoring
6. **Facial Attendance** - Face recognition

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Verify network connectivity for Atlas

**Module Import Errors:**
- Ensure `package.json` has `"type": "module"`
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Port Already in Use:**
- Change `PORT` in `.env`
- Or kill the process using port 5000

### Frontend Issues

**Tailwind CSS Not Working:**
- Ensure `@tailwindcss/vite` is installed
- Check `vite.config.js` has Tailwind plugin
- Restart dev server

**API Connection Errors:**
- Verify `VITE_API_URL` in frontend `.env`
- Ensure backend is running
- Check CORS settings in backend

**Build Errors:**
- Clear cache: `rm -rf node_modules/.vite`
- Reinstall dependencies
- Check Node.js version compatibility

## 📦 Production Deployment

### Backend

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name learnbridge-backend
   ```

### Frontend

1. Build for production:
   ```bash
   npm run build
   ```
2. Serve with a web server (nginx, Apache, or Vercel/Netlify)

### Environment Variables

Ensure all production environment variables are set:
- Strong `JWT_SECRET`
- Production `MONGO_URI`
- Valid API keys for AI services
- Proper `CLIENT_URL`

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs in console
3. Verify all environment variables are set
4. Ensure all dependencies are installed

## 🎉 You're All Set!

Your LEARNBRIDGE+ V2.0 application should now be running. Start by:
1. Visiting the landing page
2. Creating a student account
3. Exploring the dashboard
4. Uploading a resume
5. Generating your learning path

Happy learning! 🚀

