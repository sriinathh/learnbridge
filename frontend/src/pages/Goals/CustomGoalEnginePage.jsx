import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { motion } from 'framer-motion';

const CustomGoalEnginePage = () => {
  const [goalType, setGoalType] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [timeline, setTimeline] = useState('6');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predefinedGoals = [
    { id: 'faang', name: ' Crack FAANG', desc: 'Get into top tech companies' },
    { id: 'startup', name: 'Join Startup', desc: 'Work at a fast-growing startup' },
    { id: 'freelance', name: ' Become Freelancer', desc: 'Start freelancing career' },
    { id: 'fullstack', name: ' Master Full-Stack', desc: 'Become full-stack developer' },
    { id: 'ml', name: 'ML Engineer', desc: 'Transition to machine learning' },
    { id: 'devops', name: ' DevOps Expert', desc: 'Master DevOps practices' }
  ];

  const generatePlan = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        goalName: goalType === 'custom' ? customGoal : predefinedGoals.find(g => g.id === goalType)?.name || 'Crack FAANG',
        timeline: `${timeline} months`,
        phases: [
          {
            phase: 'Phase 1: Foundation (Months 1-2)',
            objectives: [
              'Master Data Structures (Arrays, LinkedLists, Trees, Graphs)',
              'Learn Algorithm Patterns (Two Pointers, Sliding Window, DP)',
              'Solve 50+ LeetCode Easy problems',
              'Build strong CS fundamentals'
            ],
            dailyTasks: [
              '2 hours - DSA problem solving',
              '1 hour - System design basics reading',
              '30 mins - Mock interview practice'
            ],
            resources: ['LeetCode', 'Cracking the Coding Interview', 'Educative.io']
          },
          {
            phase: 'Phase 2: Intermediate (Months 3-4)',
            objectives: [
              'Solve 100+ Medium LeetCode problems',
              'Learn System Design fundamentals',
              'Build 2 production-grade projects',
              'Practice behavioral interview questions'
            ],
            dailyTasks: [
              '3 hours - Medium/Hard DSA problems',
              '1 hour - System design case studies',
              '1 hour - Project development'
            ],
            resources: ['System Design Primer', 'Grokking the System Design', 'YouTube channels']
          },
          {
            phase: 'Phase 3: Advanced (Months 5-6)',
            objectives: [
              'Solve 50+ Hard problems',
              'Master advanced system design',
              'Complete 5+ mock interviews',
              'Apply to target companies'
            ],
            dailyTasks: [
              '2 hours - Hard problems + contests',
              '2 hours - Mock interviews',
              '1 hour - Resume & applications'
            ],
            resources: ['Pramp', 'Interviewing.io', 'Blind 75']
          }
        ],
        weeklyMilestones: [
          { week: 4, milestone: 'Complete 50 Easy problems', reward: '🏆 Bronze Badge' },
          { week: 8, milestone: 'Build first production project', reward: '🥈 Silver Badge' },
          { week: 16, milestone: 'Complete 100 Medium problems', reward: '🥇 Gold Badge' },
          { week: 24, milestone: 'Clear 3 mock interviews', reward: '💎 Diamond Badge' }
        ],
        skillsToMaster: [
          { skill: 'Data Structures & Algorithms', priority: 'Critical', progress: 0 },
          { skill: 'System Design', priority: 'Critical', progress: 0 },
          { skill: 'Behavioral Interviews', priority: 'High', progress: 0 },
          { skill: 'Problem Solving Speed', priority: 'High', progress: 0 },
          { skill: 'Communication Skills', priority: 'Medium', progress: 0 }
        ],
        studySchedule: {
          weekdays: '3-4 hours (after work/college)',
          weekends: '6-8 hours',
          totalHours: 600
        },
        targetCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix'],
        estimatedSuccess: '85%'
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
            <div className="text-5xl"></div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Custom Goal Engine
              </h1>
              <p className="text-slate-400 mt-1">Set ambitious goals and get personalized action plans</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Choose Your Goal</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {predefinedGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setGoalType(goal.id)}
                    className={`p-4 rounded-lg border transition ${
                      goalType === goal.id
                        ? 'border-orange-500 bg-orange-500/20'
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-sm">{goal.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{goal.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setGoalType('custom')}
                className={`w-full p-4 rounded-lg border transition ${
                  goalType === 'custom'
                    ? 'border-orange-500 bg-orange-500/20'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold text-sm"> Custom Goal</div>
                <div className="text-xs text-slate-400 mt-1">Create your own personalized goal</div>
              </button>
            </div>

            {goalType === 'custom' && (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-3">Describe Your Goal</label>
                <textarea
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="e.g., Become a blockchain developer, Start AI/ML career, Build SaaS product..."
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-orange-500 focus:outline-none resize-none"
                  rows="3"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-3">Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-orange-500 focus:outline-none"
              >
                <option value="3">3 months - Intensive</option>
                <option value="6">6 months - Recommended</option>
                <option value="9">9 months - Comprehensive</option>
                <option value="12">12 months - Deep Mastery</option>
              </select>
            </div>

            <button
              onClick={generatePlan}
              disabled={loading || !goalType || (goalType === 'custom' && !customGoal)}
              className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 font-semibold text-white hover:from-orange-500 hover:to-red-500 disabled:opacity-50 transition"
            >
              {loading ? 'Generating Plan...' : ' Generate Action Plan'}
            </button>
          </div>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6">
              <h2 className="text-3xl font-bold mb-4">{result.goalName}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-slate-400">Timeline</div>
                  <div className="text-xl font-bold text-orange-400">{result.timeline}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Total Hours</div>
                  <div className="text-xl font-bold text-orange-400">{result.studySchedule.totalHours}h</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Success Rate</div>
                  <div className="text-xl font-bold text-green-400">{result.estimatedSuccess}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Companies</div>
                  <div className="text-xl font-bold text-orange-400">{result.targetCompanies.length}</div>
                </div>
              </div>
            </div>

            {result.phases.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-4">{phase.phase}</h3>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">🎯 Objectives</h4>
                  <ul className="space-y-2">
                    {phase.objectives.map((obj, oidx) => (
                      <li key={oidx} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">📅 Daily Tasks</h4>
                  <div className="space-y-2">
                    {phase.dailyTasks.map((task, tidx) => (
                      <div key={tidx} className="bg-slate-800/50 rounded-lg p-3 text-sm text-slate-300">
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.resources.map((resource, ridx) => (
                      <span key={ridx} className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded text-sm">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="text-xl font-bold mb-4"> Weekly Milestones</h3>
              <div className="space-y-3">
                {result.weeklyMilestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
                    <div>
                      <div className="text-xs text-slate-400">Week {milestone.week}</div>
                      <div className="font-semibold">{milestone.milestone}</div>
                    </div>
                    <div className="text-2xl">{milestone.reward}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="text-lg font-bold mb-4">Skills to Master</h3>
                <div className="space-y-3">
                  {result.skillsToMaster.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold">{skill.skill}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          skill.priority === 'Critical' ? 'bg-red-500/20 text-red-300' :
                          skill.priority === 'High' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {skill.priority}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: `${skill.progress}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="text-lg font-bold mb-4">🎯 Target Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {result.targetCompanies.map((company, idx) => (
                    <span key={idx} className="bg-slate-800/50 text-slate-300 px-3 py-2 rounded-lg text-sm">
                      {company}
                    </span>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-slate-800/30 rounded-lg">
                  <div className="text-xs text-slate-400 mb-2">Study Schedule</div>
                  <div className="text-sm text-slate-300">
                    <div>Weekdays: {result.studySchedule.weekdays}</div>
                    <div>Weekends: {result.studySchedule.weekends}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/peer-learning" className="flex-1 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 text-center font-semibold text-white hover:from-orange-500 hover:to-red-500 transition">
                 Join Peer Challenges
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

export default CustomGoalEnginePage;
