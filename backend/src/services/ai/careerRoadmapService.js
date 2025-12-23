import { llmComplete } from './llmClient.js';
import { Roadmap } from '../../models/DomainModels.js';
import { ResumeData, SkillProfile } from '../../models/AIModels.js';

const ROADMAP_SYSTEM_PROMPT = `You are an expert career coach and technical mentor. Given a user's skills, experience, and target role, generate a comprehensive career roadmap. Return STRICT JSON with:
{
  "targetRole": "string",
  "currentLevel": "beginner|intermediate|advanced",
  "timeline": "3 months|6 months|12 months",
  "milestones": [
    {
      "month": number,
      "title": "string",
      "skills": ["string"],
      "projects": ["string"],
      "resources": ["string"],
      "checkpoints": ["string"]
    }
  ],
  "skillGaps": ["string"],
  "recommendedCourses": ["string"],
  "internshipRecommendations": ["string"],
  "jobReadinessScore": number,
  "nextSteps": ["string"]
}`;

export const generateCareerRoadmap = async (userId, targetRole) => {
  try {
    // Get user's resume and skill profile
    const [resume, skillProfile] = await Promise.all([
      ResumeData.findOne({ user: userId }),
      SkillProfile.findOne({ user: userId }),
    ]);

    const userContext = {
      resume: resume?.parsed || {},
      skills: skillProfile?.currentSkills || [],
      missingSkills: skillProfile?.missingSkills || [],
      targetRole: targetRole || 'Full Stack Developer',
    };

    const userPrompt = `User context:\n${JSON.stringify(userContext, null, 2)}\n\nGenerate a detailed career roadmap for becoming a ${targetRole || 'Full Stack Developer'}.`;

    const completion = await llmComplete({
      systemPrompt: ROADMAP_SYSTEM_PROMPT,
      userPrompt,
    });

    let roadmapData;
    try {
      roadmapData = JSON.parse(completion);
    } catch (err) {
      // Fallback roadmap
      roadmapData = generateFallbackRoadmap(targetRole);
    }

    // Save roadmap
    const roadmap = await Roadmap.findOneAndUpdate(
      { user: userId },
      {
        targetRole: roadmapData.targetRole || targetRole,
        roadmapJson: roadmapData,
      },
      { upsert: true, new: true }
    );

    return roadmap;
  } catch (err) {
    throw new Error(`Failed to generate career roadmap: ${err.message}`);
  }
};

function generateFallbackRoadmap(targetRole) {
  return {
    targetRole: targetRole || 'Full Stack Developer',
    currentLevel: 'beginner',
    timeline: '6 months',
    milestones: [
      {
        month: 1,
        title: 'Foundation Building',
        skills: ['HTML/CSS', 'JavaScript Basics', 'Git'],
        projects: ['Personal Portfolio', 'Todo App'],
        resources: ['MDN Web Docs', 'FreeCodeCamp'],
        checkpoints: ['Complete basic HTML/CSS course', 'Build first project'],
      },
      {
        month: 2,
        title: 'Frontend Development',
        skills: ['React', 'State Management', 'API Integration'],
        projects: ['Weather App', 'E-commerce Frontend'],
        resources: ['React Documentation', 'YouTube Tutorials'],
        checkpoints: ['Build React app', 'Deploy to Vercel'],
      },
    ],
    skillGaps: ['Backend Development', 'Database Design'],
    recommendedCourses: ['Full Stack Bootcamp', 'Node.js Mastery'],
    internshipRecommendations: ['Frontend Developer Intern', 'Web Development Intern'],
    jobReadinessScore: 45,
    nextSteps: ['Complete foundational courses', 'Build portfolio projects'],
  };
}

