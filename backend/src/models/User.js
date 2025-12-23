import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    // password optional because Google users won’t have one
    password: { type: String },

    googleId: { type: String }, // Google OAuth Support

    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      default: 'student'
    },

    isVerified: { type: Boolean, default: false },

    otp: String,
    otpExpiresAt: Date,

    profile: {
      photoUrl: String,
      year: String,
      branch: String,
      skills: [String],
      interests: [String],
      resumeScore: Number
    },

    gamification: {
      xp: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      streakDays: { type: Number, default: 0 },
      badges: [{ type: String }],
      lastActiveDate: String
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
