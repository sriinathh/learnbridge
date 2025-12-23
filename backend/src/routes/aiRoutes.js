import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  uploadResumeController,
  analyzeResumeController,
  generateSkillGapsController,
  generateLearningPlanController,
  generateCareerRoadmapController,
  getCareerRoadmapController,
  adaptiveEngineRecalculateController,
  chatbotController,
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/upload-resume', protect, upload.single('resume'), uploadResumeController);
router.post('/analyze-resume', protect, analyzeResumeController);
router.post('/generate-skill-gaps', protect, generateSkillGapsController);
router.post('/generate-learning-plan', protect, generateLearningPlanController);
router.post('/generate-career-roadmap', protect, generateCareerRoadmapController);
router.get('/career-roadmap', protect, getCareerRoadmapController);
router.post('/adaptive-engine-recalculate', protect, adaptiveEngineRecalculateController);
router.post('/chatbot', protect, chatbotController);

export default router;