import fs from 'fs';
import { createRequire } from 'module';
import { llmComplete } from './llmClient.js';
import { ResumeData, SkillProfile, LearningPath, QuizHistory, ProgressTracking, ChatbotHistory } from '../../models/AIModels.js';
import { Course } from '../../models/DomainModels.js';

// pdf-parse is a CommonJS module
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

// Helper to strip markdown code blocks from LLM responses
const stripMarkdown = (text) => {
  return text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
};

// Resume Analyzer - Combined prompt for faster processing
const RESUME_PARSE_SYSTEM_PROMPT = `You are an expert HR + technical recruiter and ATS system. Given resume text, return STRICT JSON with:
{
  "technicalSkills": [strings],
  "softSkills": [strings],
  "tools": [strings],
  "experience": [strings],
  "projects": [strings],
  "education": [strings],
  "certifications": [strings],
  "atsScore": number (0-100),
  "strengths": [strings],
  "weaknesses": [strings],
  "missingKeywords": [strings],
  "suggestions": [strings]
}
No extra commentary, just valid JSON.`;

export const extractTextFromFile = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  if (filePath.toLowerCase().endsWith('.pdf')) {
    const data = await pdfParse(buffer);
    return data.text;
  }
  return buffer.toString('utf8');
};

export const analyzeResume = async (userId, filePath) => {
  console.log('Extracting text from file:', filePath);
  const text = await extractTextFromFile(filePath);
  console.log('Text extracted, length:', text.length);
  
  const userPrompt = `Resume text:\n"""${text.slice(0, 20000)}"""`;
  console.log('Calling LLM for resume analysis...');
  const completion = await llmComplete({ systemPrompt: RESUME_PARSE_SYSTEM_PROMPT, userPrompt });
  console.log('LLM response received');

  let result;
  try {
    const cleanedResponse = stripMarkdown(completion);
    result = JSON.parse(cleanedResponse);
  } catch (err) {
    console.error('Failed to parse LLM JSON response:', completion);
    throw new Error('Failed to parse resume JSON from LLM');
  }

  // Extract parsed resume data and ATS analysis
  const { atsScore, strengths, weaknesses, missingKeywords, suggestions, ...parsed } = result;
  
  const atsAnalysis = {
    atsScore: atsScore || calculateBasicATSScore(text, parsed),
    strengths: strengths || ['Well-structured resume'],
    weaknesses: weaknesses || [],
    missingKeywords: missingKeywords || [],
    suggestions: suggestions || ['Add more quantifiable achievements'],
  };

  // Update user profile with resume score
  const { User } = await import('../../models/User.js');
  await User.findByIdAndUpdate(userId, {
    'profile.resumeScore': atsAnalysis.atsScore,
  });

  const doc = await ResumeData.findOneAndUpdate(
    { user: userId },
    { rawText: text, parsed, filePath, atsAnalysis },
    { upsert: true, new: true }
  );
  return doc;
};

function calculateBasicATSScore(text, parsed) {
  let score = 50; // Base score
  
  // Check for key sections
  if (parsed.technicalSkills?.length > 0) score += 10;
  if (parsed.experience?.length > 0) score += 10;
  if (parsed.projects?.length > 0) score += 10;
  if (parsed.education?.length > 0) score += 10;
  if (parsed.certifications?.length > 0) score += 10;
  
  // Check for keywords
  const keywords = ['javascript', 'python', 'react', 'node', 'sql', 'api', 'git'];
  const lowerText = text.toLowerCase();
  const foundKeywords = keywords.filter(kw => lowerText.includes(kw));
  score += foundKeywords.length * 2;
  
  return Math.min(100, score);
}

// Skill Gap Service
const SKILL_GAP_SYSTEM_PROMPT = `You are a career coach and technical skills analyst. Given parsed resume data and a target role, output STRICT JSON with: currentSkills[{name,level(0-100)}], missingSkills[string], weakAreas[{name,level}], comparisonSummary (string).`;

export const generateSkillProfile = async ({ userId, parsedResume, roleTarget }) => {
  const userPrompt = JSON.stringify({ parsedResume, roleTarget });
  const completion = await llmComplete({ systemPrompt: SKILL_GAP_SYSTEM_PROMPT, userPrompt });
  const cleanedCompletion = stripMarkdown(completion);
  const result = JSON.parse(cleanedCompletion);

  const doc = await SkillProfile.findOneAndUpdate(
    { user: userId },
    { ...result, roleTarget },
    { upsert: true, new: true }
  );
  return doc;
};

// Learning Plan Service
const LEARNING_PLAN_SYSTEM_PROMPT = `You are an expert curriculum designer. Given a skill profile, design an 8-week learning plan. Return STRICT JSON: { learningPath:[{week,topics[],projects[],practice[],quizzes[]}], skillLevels:{[skillName]:number}, recommendedCourses:[string] }`;

export const generateLearningPlan = async ({ userId, skillProfile }) => {
  const userPrompt = JSON.stringify({ skillProfile });
  const completion = await llmComplete({ systemPrompt: LEARNING_PLAN_SYSTEM_PROMPT, userPrompt });
  const cleanedCompletion = stripMarkdown(completion);
  const result = JSON.parse(cleanedCompletion);

  const doc = await LearningPath.findOneAndUpdate(
    { user: userId },
    {
      learningPath: result.learningPath,
      skillLevels: result.skillLevels,
      lastRecalculatedAt: new Date()
    },
    { upsert: true, new: true }
  );
  return doc;
};

// Adaptive Engine
export const recalculateAdaptivePlan = async (userId) => {
  const [quizStats, progress, skillProfile] = await Promise.all([
    QuizHistory.find({ user: userId }).sort({ createdAt: -1 }).limit(20),
    ProgressTracking.findOne({ user: userId }),
    SkillProfile.findOne({ user: userId })
  ]);

  const avgScore =
    quizStats.length === 0
      ? 0
      : quizStats.reduce((s, q) => s + q.score, 0) / quizStats.length;

  let speedLabel = progress?.learningSpeedLabel || 'average';
  let difficulty = 'medium';

  if (avgScore < 60) difficulty = 'easy';
  if (avgScore > 90) difficulty = 'hard';

  if (progress?.totalStudyMinutesLastWeek < 120) speedLabel = 'slow';
  else if (progress?.totalStudyMinutesLastWeek > 600) speedLabel = 'fast';

  const adjustedSkillProfile = skillProfile
    ? {
        ...skillProfile.toObject(),
        currentSkills: skillProfile.currentSkills.map((s) => {
          let delta = 0;
          if (avgScore > 90) delta = 10;
          if (avgScore < 60) delta = -5;
          return { ...s, level: Math.max(0, Math.min(100, s.level + delta)) };
        })
      }
    : null;

  if (adjustedSkillProfile) {
    await generateLearningPlan({ userId, skillProfile: adjustedSkillProfile });
  }

  const plan = await LearningPath.findOne({ user: userId });
  return { plan, difficulty, speedLabel };
};

// Chatbot (LearnBuddy)
const CHATBOT_SYSTEM_PROMPT = `You are LearnBuddy, an empathetic AI mentor. Explain technical topics clearly, answer doubts, suggest study material, give motivational feedback, and optionally reference the student's learning path. Keep responses concise and structured.`;

export const chatWithLearnBuddy = async ({ userId, message }) => {
  const history = await ChatbotHistory.findOne({ user: userId });
  const learningPath = await LearningPath.findOne({ user: userId });

  const historyText = history
    ? history.messages
        .slice(-10)
        .map((m) => `${m.role === 'user' ? 'Student' : 'LearnBuddy'}: ${m.content}`)
        .join('\n')
    : '';

  const userPrompt = `Conversation history:\n${historyText}\n\nStudent latest message: "${message}"\n\nCurrent learning path (summary):\n${JSON.stringify(
    learningPath?.learningPath?.slice(0, 2) || [],
    null,
    2
  )}`;

  const reply = await llmComplete({ systemPrompt: CHATBOT_SYSTEM_PROMPT, userPrompt });

  const updated = await ChatbotHistory.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        messages: {
          $each: [
            { role: 'user', content: message },
            { role: 'assistant', content: reply }
          ],
          $slice: -20
        }
      }
    },
    { upsert: true, new: true }
  );

  return { reply, history: updated };
};
