import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { motion } from 'framer-motion';

const InternshipFitPage = () => {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzefit = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        fitScore: 78,
        matchStrength: 'Strong Match',
        topSkillMatches: [
          { skill: 'React.js', match: 95 },
          { skill: 'JavaScript', match: 92 },
          { skill: 'REST APIs', match: 88 },
          { skill: 'Git', match: 85 }
        ],
        missingSkills: [
          { skill: 'TypeScript', importance: 'high', learnTime: '2 weeks' },
          { skill: 'Redux', importance: 'medium', learnTime: '1 week' },
          { skill: 'Testing (Jest)', importance: 'medium', learnTime: '1 week' }
        ],
        improvements: [
          'Add TypeScript to your skill set - required for this role',
          'Include metrics in project descriptions (e.g., "improved performance by 40%")',
          'Highlight any collaborative projects or team experiences',
          'Mention any relevant side projects or open source contributions'
        ],
        strongPoints: [
          'Solid React.js experience with multiple projects',
          'Good understanding of modern web development',
          'Experience with version control (Git/GitHub)',
          'Portfolio demonstrates practical application of skills'
        ],
        estimatedChance: '75%',
        competitionLevel: 'Medium - 150+ applicants expected',
        preparationTime: '2-3 weeks to strengthen profile'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-5xl">🎯</div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Internship Fit Analyzer
              </h1>
              <p className="text-slate-400 mt-1">Check your match score & get personalized improvement tips</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-3">Your Resume/Skills</label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume text or list your skills..."
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none resize-none"
                rows="5"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3">Job Description</label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the internship job description..."
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none resize-none"
                rows="5"
              />
            </div>
            <button
              onClick={analyzefit}
              disabled={loading || !resume || !jobDesc}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 font-semibold text-white hover:from-sky-500 hover:to-indigo-500 disabled:opacity-50 transition"
            >
              {loading ? 'Analyzing Fit...' : '🎯 Analyze My Fit'}
            </button>
          </div>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-sky-900/30 to-indigo-900/30 p-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-sky-400 mb-2">{result.fitScore}%</div>
                <div className="text-xl font-semibold text-slate-200">{result.matchStrength}</div>
                <div className="text-sm text-slate-400 mt-2">Estimated Selection Chance: {result.estimatedChance}</div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4">
                <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-4 rounded-full" style={{width: `${result.fitScore}%`}}></div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="text-xl font-bold mb-4">✅ Top Skill Matches</h3>
              <div className="space-y-3">
                {result.topSkillMatches.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-slate-300">{item.skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: `${item.match}%`}}></div>
                      </div>
                      <span className="text-sm text-green-400 w-12">{item.match}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="text-xl font-bold mb-4">⚠️ Missing Skills to Learn</h3>
              <div className="space-y-3">
                {result.missingSkills.map((item, idx) => (
                  <div key={idx} className="rounded-lg bg-slate-800/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{item.skill}</span>
                      <span className={`text-xs px-2 py-1 rounded ${item.importance === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {item.importance} priority
                      </span>
                    </div>
                    <div className="text-sm text-slate-400">⏱️ Learn in: {item.learnTime}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="text-xl font-bold mb-4">💡 Improvements to Make</h3>
              <ul className="space-y-2">
                {result.improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-400">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="text-lg font-bold mb-3">💪 Your Strong Points</h3>
                <ul className="space-y-2">
                  {result.strongPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-green-400">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="text-lg font-bold mb-3">📊 Competition Info</h3>
                <div className="text-sm text-slate-300 mb-3">{result.competitionLevel}</div>
                <div className="text-sm text-slate-400">🕒 Preparation Time: {result.preparationTime}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/ai/skill-gap-engine" className="flex-1 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-center font-semibold text-white hover:from-sky-500 hover:to-indigo-500 transition">
                🎯 Analyze Skill Gaps
              </Link>
              <Link to="/dashboard" className="flex-1 rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-slate-300 hover:bg-slate-800 transition">
                ← Back to Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InternshipFitPage;
