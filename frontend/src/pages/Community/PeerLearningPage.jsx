import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { motion } from 'framer-motion';

const PeerLearningPage = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const leaderboardData = [
    { rank: 1, name: 'Alex Kumar', points: 2850, streak: 45, avatar: '👨‍💻', level: 'Expert', badges: 12 },
    { rank: 2, name: 'Sarah Chen', points: 2720, streak: 38, avatar: '👩‍💼', level: 'Expert', badges: 10 },
    { rank: 3, name: 'Raj Patel', points: 2590, streak: 42, avatar: '🧑‍💻', level: 'Advanced', badges: 9 },
    { rank: 4, name: 'Emily Watson', points: 2450, streak: 35, avatar: '👩‍🎓', level: 'Advanced', badges: 8 },
    { rank: 5, name: 'Michael Zhang', points: 2380, streak: 30, avatar: '👨‍🎓', level: 'Advanced', badges: 8 },
    { rank: 6, name: 'Priya Sharma', points: 2210, streak: 28, avatar: '👩‍💻', level: 'Intermediate', badges: 7 },
    { rank: 7, name: 'David Lee', points: 2150, streak: 25, avatar: '🧑‍💼', level: 'Intermediate', badges: 6 },
    { rank: 8, name: 'You', points: 1980, streak: 22, avatar: '😊', level: 'Intermediate', badges: 5, isCurrentUser: true }
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day DSA Challenge',
      desc: 'Solve 1 LeetCode problem daily for 30 days',
      participants: 145,
      reward: '500 XP + DSA Master Badge',
      difficulty: 'Medium',
      timeLeft: '12 days',
      progress: 60,
      status: 'active'
    },
    {
      id: 2,
      title: 'Build & Deploy Weekend',
      desc: 'Create and deploy a full-stack project in 48 hours',
      participants: 89,
      reward: '800 XP + Builder Badge',
      difficulty: 'Hard',
      timeLeft: '3 days',
      progress: 0,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'System Design Sprint',
      desc: 'Design 5 scalable systems with peer reviews',
      participants: 67,
      reward: '600 XP + Architect Badge',
      difficulty: 'Hard',
      timeLeft: '8 days',
      progress: 40,
      status: 'active'
    },
    {
      id: 4,
      title: 'Code Review Master',
      desc: 'Review 20 peer code submissions and get reviewed',
      participants: 120,
      reward: '400 XP + Reviewer Badge',
      difficulty: 'Easy',
      timeLeft: '15 days',
      progress: 0,
      status: 'upcoming'
    }
  ];

  const myAchievements = [
    { name: '🔥 7 Day Streak', desc: 'Learned for 7 consecutive days', date: '2 days ago' },
    { name: '💯 100 Problems', desc: 'Solved 100 coding problems', date: '5 days ago' },
    { name: '🚀 First Project', desc: 'Deployed first full-stack project', date: '1 week ago' },
    { name: '🎯 Goal Crusher', desc: 'Completed a custom goal', date: '2 weeks ago' },
    { name: '🤝 Team Player', desc: 'Helped 10 peers', date: '3 weeks ago' }
  ];

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return 'bg-green-500/20 text-green-300';
    if (diff === 'Medium') return 'bg-amber-500/20 text-amber-300';
    return 'bg-red-500/20 text-red-300';
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-slate-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-5xl">🤝</div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Peer Learning
              </h1>
              <p className="text-slate-400 mt-1">Compete, collaborate, and grow together</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mt-8 flex gap-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'leaderboard'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'challenges'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            🎯 Challenges
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'achievements'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            🏅 My Achievements
          </button>
        </div>

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-bold mb-6">🏆 Top Learners This Month</h2>
              <div className="space-y-3">
                {leaderboardData.map((user) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: user.rank * 0.05 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      user.isCurrentUser
                        ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/50'
                        : 'bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl font-bold ${getRankColor(user.rank)}`}>
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                      </div>
                      <div className="text-4xl">{user.avatar}</div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {user.name}
                          {user.isCurrentUser && <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">You</span>}
                        </div>
                        <div className="text-sm text-slate-400">{user.level} • {user.badges} badges</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-400">{user.points}</div>
                      <div className="text-xs text-slate-400">🔥 {user.streak} day streak</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="text-slate-400 text-sm mb-2">Your Rank</div>
                <div className="text-3xl font-bold text-purple-400">#8</div>
                <div className="text-xs text-slate-500 mt-1">Top 5% globally</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="text-slate-400 text-sm mb-2">Total XP</div>
                <div className="text-3xl font-bold text-pink-400">1,980</div>
                <div className="text-xs text-green-400 mt-1">+120 this week</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="text-slate-400 text-sm mb-2">Current Streak</div>
                <div className="text-3xl font-bold text-orange-400">22 🔥</div>
                <div className="text-xs text-slate-500 mt-1">Personal best: 30</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-4">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: challenge.id * 0.1 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{challenge.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                      {challenge.status === 'active' && (
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Active</span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{challenge.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-400">Participants</div>
                    <div className="font-semibold">{challenge.participants} learners</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Time Left</div>
                    <div className="font-semibold">{challenge.timeLeft}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Reward</div>
                    <div className="font-semibold text-sm">{challenge.reward}</div>
                  </div>
                </div>
                {challenge.status === 'active' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <button
                  className={`w-full rounded-lg px-6 py-3 font-semibold transition ${
                    challenge.status === 'active'
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                  }`}
                >
                  {challenge.status === 'active' ? 'Continue Challenge' : 'Join Challenge'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-bold mb-6">🏅 Your Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myAchievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-lg bg-slate-800/50 p-4"
                  >
                    <div className="text-2xl mb-2">{achievement.name.split(' ')[0]}</div>
                    <div className="font-semibold">{achievement.name.substring(2)}</div>
                    <div className="text-sm text-slate-400 mt-1">{achievement.desc}</div>
                    <div className="text-xs text-slate-500 mt-2">{achievement.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6">
              <h3 className="text-xl font-bold mb-4">🎯 Next Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">🔥 30 Day Streak</div>
                    <div className="text-sm text-slate-400">8 more days to go!</div>
                  </div>
                  <div className="text-2xl">73%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">💯 200 Problems</div>
                    <div className="text-sm text-slate-400">145 / 200 completed</div>
                  </div>
                  <div className="text-2xl">73%</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/community-groups"
            className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-center font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition"
          >
            💬 Join Study Groups
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PeerLearningPage;
