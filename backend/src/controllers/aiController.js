import { upload } from '../middleware/uploadMiddleware.js'; // used from routes
import {
  analyzeResume,
  generateSkillProfile,
  generateLearningPlan,
  recalculateAdaptivePlan,
  chatWithLearnBuddy,
} from '../services/ai/services.js';
import { generateCareerRoadmap } from '../services/ai/careerRoadmapService.js';
import { ResumeData, SkillProfile, LearningPath } from '../models/AIModels.js';
import { Roadmap } from '../models/DomainModels.js';

// POST /api/ai/upload-resume (multipart)
export const uploadResumeController = async (req, res, next) => {
  try {
    console.log('Upload request received');
    const file = req.file;
    if (!file) {
      console.log('No file in request');
      return res.status(400).json({ message: 'No resume uploaded' });
    }
    console.log('File uploaded:', file.path);
    console.log('Analyzing resume for user:', req.user._id);
    const doc = await analyzeResume(req.user._id, file.path);
    console.log('Resume analyzed successfully');
    res.json(doc);
  } catch (err) {
    console.error('Upload controller error:', err);
    next(err);
  }
};

// POST /api/ai/analyze-resume
export const analyzeResumeController = async (req, res, next) => {
  try {
    const doc = await ResumeData.findOne({ user: req.user._id });
    if (!doc) return res.status(404).json({ message: 'No resume found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// POST /api/ai/generate-skill-gaps
export const generateSkillGapsController = async (req, res, next) => {
  try {
    const { targetRole } = req.body;
    const resume = await ResumeData.findOne({ user: req.user._id });
    if (!resume) return res.status(404).json({ message: 'No resume found' });

    const profile = await generateSkillProfile({
      userId: req.user._id,
      parsedResume: resume.parsed,
      roleTarget: targetRole || 'general',
    });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// POST /api/ai/generate-learning-plan
export const generateLearningPlanController = async (req, res, next) => {
  try {
    const sp = await SkillProfile.findOne({ user: req.user._id });
    if (!sp) return res.status(404).json({ message: 'No skill profile found' });
    const plan = await generateLearningPlan({ userId: req.user._id, skillProfile: sp });
    res.json(plan);
  } catch (err) {
    next(err);
  }
};

// POST /api/ai/generate-career-roadmap
export const generateCareerRoadmapController = async (req, res, next) => {
  try {
    const { targetRole } = req.body;
    const roadmap = await generateCareerRoadmap(req.user._id, targetRole);
    res.json(roadmap);
  } catch (err) {
    next(err);
  }
};

// GET /api/ai/career-roadmap
export const getCareerRoadmapController = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOne({ user: req.user._id });
    if (!roadmap) return res.status(404).json({ message: 'No roadmap found' });
    res.json(roadmap);
  } catch (err) {
    next(err);
  }
};

// POST /api/ai/adaptive-engine-recalculate
export const adaptiveEngineRecalculateController = async (req, res, next) => {
  try {
    const result = await recalculateAdaptivePlan(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// POST /api/ai/chatbot
export const chatbotController = async (req, res, next) => {
  try {
    const { message } = req.body;
    const data = await chatWithLearnBuddy({ userId: req.user._id, message });
    res.json(data);
  } catch (err) {
    next(err);
  }
};
