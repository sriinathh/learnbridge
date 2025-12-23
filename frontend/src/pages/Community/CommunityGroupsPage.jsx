import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { motion } from 'framer-motion';

const CommunityGroupsPage = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', topic: 'webdev' });

  const myGroups = [
    { id: 1, name: 'MERN Stack Warriors', members: 245, topic: 'Web Development', activity: 'Very Active', emoji: '🌐', description: 'Learning full-stack MERN development together', joined: true },
    { id: 2, name: 'DSA Daily Grinders', members: 189, topic: 'Algorithms', activity: 'Active', emoji: '💻', description: 'Daily LeetCode problem solving', joined: true },
    { id: 3, name: 'React Ninjas', members: 156, topic: 'Frontend', activity: 'Active', emoji: '⚛️', description: 'Master React.js and ecosystem', joined: true }
  ];

  const discoverGroups = [
    { id: 4, name: 'Python for Data Science', members: 312, topic: 'Data Science', activity: 'Very Active', emoji: '🐍', description: 'Learn Python, Pandas, NumPy for data analysis', joined: false },
    { id: 5, name: 'System Design Masters', members: 278, topic: 'System Design', activity: 'Very Active', emoji: '🏗️', description: 'Design scalable distributed systems', joined: false },
    { id: 6, name: 'DevOps Enthusiasts', members: 234, topic: 'DevOps', activity: 'Active', emoji: '⚙️', description: 'Docker, Kubernetes, CI/CD pipelines', joined: false },
    { id: 7, name: 'Machine Learning Lab', members: 267, topic: 'AI/ML', activity: 'Very Active', emoji: '🤖', description: 'Deep learning, neural networks, TensorFlow', joined: false },
    { id: 8, name: 'Cloud Architecture', members: 198, topic: 'Cloud', activity: 'Active', emoji: '☁️', description: 'AWS, Azure, GCP certification prep', joined: false },
    { id: 9, name: 'Blockchain Builders', members: 145, topic: 'Blockchain', activity: 'Moderate', emoji: '⛓️', description: 'Smart contracts, DeFi, Web3', joined: false }
  ];

  const trendingGroups = [
    { id: 10, name: 'Next.js Developers', members: 289, topic: 'Frontend', activity: 'Very Active', emoji: '▲', description: 'Build production Next.js apps', joined: false, trending: true },
    { id: 11, name: 'TypeScript Heroes', members: 256, topic: 'Programming', activity: 'Very Active', emoji: '📘', description: 'Master TypeScript from basics to advanced', joined: false, trending: true },
    { id: 12, name: 'API Design Experts', members: 167, topic: 'Backend', activity: 'Active', emoji: '🔌', description: 'RESTful & GraphQL API design patterns', joined: false, trending: true }
  ];

  const topics = ['All', 'Web Development', 'Data Science', 'AI/ML', 'DevOps', 'Algorithms', 'Cloud', 'Blockchain'];

  const handleCreateGroup = () => {
    console.log('Creating group:', newGroup);
    setShowCreateModal(false);
    setNewGroup({ name: '', description: '', topic: 'webdev' });
  };

  const getActivityColor = (activity) => {
    if (activity === 'Very Active') return 'text-green-400';
    if (activity === 'Active') return 'text-blue-400';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">💬</div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Study Groups
                </h1>
                <p className="text-slate-400 mt-1">Join communities, collaborate, and learn together</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition"
            >
              + Create Group
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mt-8 flex gap-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'discover'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            🔍 Discover Groups
          </button>
          <button
            onClick={() => setActiveTab('mygroups')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'mygroups'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            👥 My Groups ({myGroups.length})
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'trending'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            🔥 Trending
          </button>
        </div>

        {/* Topic Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              className="px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 text-sm hover:bg-slate-700 transition"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* My Groups Tab */}
        {activeTab === 'mygroups' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: group.id * 0.05 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-cyan-500/50 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{group.emoji}</div>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Joined</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{group.description}</p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-400">{group.members} members</span>
                    <span className={getActivityColor(group.activity)}>{group.activity}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-4">{group.topic}</div>
                  <Link
                    to={`/community-groups/${group.id}`}
                    className="w-full block text-center rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition"
                  >
                    Open Group
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Discover Groups Tab */}
        {activeTab === 'discover' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoverGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (group.id - 4) * 0.05 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-cyan-500/50 transition"
                >
                  <div className="text-4xl mb-4">{group.emoji}</div>
                  <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{group.description}</p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-400">{group.members} members</span>
                    <span className={getActivityColor(group.activity)}>{group.activity}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-4">{group.topic}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-500 transition">
                      Join
                    </button>
                    <Link
                      to={`/community-groups/${group.id}`}
                      className="flex-1 text-center rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-300 hover:bg-slate-800 transition"
                    >
                      View
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (group.id - 10) * 0.05 }}
                  className="rounded-2xl border border-orange-500/50 bg-slate-900/80 p-6 hover:border-orange-400 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{group.emoji}</div>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded flex items-center gap-1">
                      🔥 Trending
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{group.description}</p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-400">{group.members} members</span>
                    <span className={getActivityColor(group.activity)}>{group.activity}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-4">{group.topic}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-500 transition">
                      Join
                    </button>
                    <Link
                      to={`/community-groups/${group.id}`}
                      className="flex-1 text-center rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-300 hover:bg-slate-800 transition"
                    >
                      View
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-4">Create New Group</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    placeholder="e.g., React Developers"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    placeholder="What's your group about?"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none resize-none"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Topic</label>
                  <select
                    value={newGroup.topic}
                    onChange={(e) => setNewGroup({ ...newGroup, topic: e.target.value })}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="webdev">Web Development</option>
                    <option value="datascience">Data Science</option>
                    <option value="aiml">AI/ML</option>
                    <option value="devops">DevOps</option>
                    <option value="algorithms">Algorithms</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateGroup}
                  className="flex-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition"
                >
                  Create Group
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityGroupsPage;
