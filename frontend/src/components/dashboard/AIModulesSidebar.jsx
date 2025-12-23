import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AIModulesSidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState('essential');

  const categories = {
    essential: {
      title: 'Essential',
      color: 'gray',
      gradient: 'from-gray-400 via-gray-500 to-gray-600',
      modules: [
        {
          path: '/ai/resume-upload',
          icon: '📄',
          title: 'Upload Resume',
          desc: 'ATS analysis & insights',
          gradient: 'from-purple-500 via-pink-500 to-rose-500',
          badge: 'HOT'
        },
        {
          path: '/courses',
          icon: '📚',
          title: 'Browse Courses',
          desc: 'Videos & certificates',
          gradient: 'from-blue-500 via-cyan-500 to-sky-500'
        },
        {
          path: '/internships',
          icon: '💼',
          title: 'Find Internships',
          desc: 'AI-matched opportunities',
          gradient: 'from-green-500 via-emerald-500 to-teal-500',
          badge: 'NEW'
        },
        {
          path: '/profile',
          icon: '⚙️',
          title: 'Edit Profile',
          desc: 'Update information',
          gradient: 'from-gray-600 via-gray-700 to-slate-700'
        }
      ]
    },
    learning: {
      title: 'AI Learning',
      color: 'violet',
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
      modules: [
        { path: '/ai/skill-gap-engine', icon: '🎯', title: 'Skill Gap Engine', desc: '30+ role matches', gradient: 'from-violet-500 to-purple-500' },
        { path: '/ai/job-match', icon: '💡', title: 'Job Role Match', desc: 'Best career roles', gradient: 'from-pink-500 to-rose-500' },
        { path: '/ai/learning-path', icon: '🗺️', title: 'Learning Path', desc: 'Adaptive roadmap', gradient: 'from-cyan-500 to-blue-500' },
        { path: '/ai/weekly-goals', icon: '📅', title: 'Weekly Goals', desc: 'Tasks & projects', gradient: 'from-amber-500 to-orange-500' },
        { path: '/ai/skill-roadmap', icon: '🛣️', title: 'Skill Roadmap', desc: 'Beginner → Advanced', gradient: 'from-lime-500 to-green-500' },
        { path: '/ai/career-advisor', icon: '🎓', title: 'Career Advisor', desc: 'Best career paths', gradient: 'from-rose-500 to-pink-500' }
      ]
    },
    tools: {
      title: 'AI Tools',
      color: 'green',
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      modules: [
        { path: '/ai/code-mentor', icon: '👨‍💻', title: 'AI Code Mentor', desc: 'Debug & optimize', gradient: 'from-green-500 to-emerald-500' },
        { path: '/ai/project-generator', icon: '🚀', title: 'Project Generator', desc: 'Industry ideas', gradient: 'from-fuchsia-500 to-pink-500' },
        { path: '/ai/interview-bot', icon: '🎤', title: 'Interview Bot', desc: 'HR & tech prep', gradient: 'from-red-500 to-orange-500', badge: 'LIVE' },
        { path: '/ai/chatbot', icon: '💬', title: 'AI Chat Assistant', desc: 'Doubts & concepts', gradient: 'from-emerald-500 to-teal-500' }
      ]
    },
    analytics: {
      title: 'Analytics',
      color: 'purple',
      gradient: 'from-purple-400 via-indigo-500 to-blue-600',
      modules: [
        { path: '/ai/internship-fit', icon: '🎯', title: 'Internship Fit', desc: 'Match score', gradient: 'from-sky-500 to-indigo-500' },
        { path: '/ai/certificate-analyzer', icon: '🏆', title: 'Certificate Analyzer', desc: 'Skill extraction', gradient: 'from-teal-500 to-cyan-500' },
        { path: '/ai/analytics', icon: '📊', title: 'Learning Analytics', desc: 'Progress & trends', gradient: 'from-purple-500 to-indigo-500' }
      ]
    },
    community: {
      title: 'Goals & Community',
      color: 'yellow',
      gradient: 'from-yellow-400 via-amber-500 to-orange-600',
      modules: [
        { path: '/ai/custom-goals', icon: '🎯', title: 'Custom Goals', desc: 'Crack FAANG', gradient: 'from-yellow-500 to-amber-500' },
        { path: '/ai/peer-learning', icon: '🤝', title: 'Peer Learning', desc: 'Challenges', gradient: 'from-blue-500 to-purple-500' }
      ]
    }
  };

  const ModuleCard = ({ module, isEssential = false }) => (
    <Link
      to={module.path}
      className={`group relative block rounded-${isEssential ? '2xl' : 'xl'} bg-gradient-to-br ${module.gradient} ${isEssential ? 'px-4 py-4' : 'px-3 py-2.5'} hover:shadow-2xl transition-all overflow-hidden hover:scale-105`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="relative flex items-center gap-3">
        <div className={`${isEssential ? 'text-3xl' : 'text-xl'} drop-shadow-lg`}>
          {module.icon}
        </div>
        <div className="flex-1">
          <div className={`${isEssential ? 'text-sm' : 'text-[11px]'} font-black text-white leading-tight flex items-center gap-2`}>
            {module.title}
            {module.badge && (
              <span className="px-1.5 py-0.5 text-[8px] font-black bg-white/30 backdrop-blur-sm rounded-md animate-pulse">
                {module.badge}
              </span>
            )}
          </div>
          <div className={`${isEssential ? 'text-[10px]' : 'text-[9px]'} text-white/90 font-medium mt-0.5`}>
            {module.desc}
          </div>
        </div>
        <div className="text-white/60 group-hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );

  const CategoryHeader = ({ categoryKey, category }) => {
    const isExpanded = expandedCategory === categoryKey;
    return (
      <button
        onClick={() => setExpandedCategory(isExpanded ? null : categoryKey)}
        className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${category.gradient}`} />
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 group-hover:text-gray-700">
            {category.title}
          </span>
          <span className="px-1.5 py-0.5 text-[8px] font-bold bg-gray-100 text-gray-600 rounded-full">
            {category.modules.length}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  };

  return (
    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 pb-3 mb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-green-400 via-blue-500 to-purple-600" />
          <h3 className="text-sm font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Modules
          </h3>
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Explore 20+ AI tools designed to accelerate your learning journey
        </p>
      </div>

      {/* Categories */}
      {Object.entries(categories).map(([key, category]) => (
        <div key={key} className="space-y-2">
          <CategoryHeader categoryKey={key} category={category} />
          
          <AnimatePresence>
            {expandedCategory === key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 overflow-hidden"
              >
                {category.modules.map((module, idx) => (
                  <motion.div
                    key={module.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ModuleCard module={module} isEssential={key === 'essential'} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Footer Stats */}
      <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 mt-6">
        <div className="grid grid-cols-3 gap-2 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-3 border-2 border-green-200">
          <div className="text-center">
            <div className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              20+
            </div>
            <div className="text-[8px] uppercase font-bold text-gray-500">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AI
            </div>
            <div className="text-[8px] uppercase font-bold text-gray-500">Powered</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-[8px] uppercase font-bold text-gray-500">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModulesSidebar;
