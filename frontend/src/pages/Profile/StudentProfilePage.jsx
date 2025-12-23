import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { fetchParsedResume } from '../../api/aiApi.js';
import { uploadProfilePhoto, deleteProfilePhoto } from '../../api/userApi.js';
import { motion, AnimatePresence } from 'framer-motion';
// TODO: add dedicated profile/internship APIs later

const Tag = ({ children, variant = 'default' }) => {
  const base = 'inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium';
  const styles =
    variant === 'skill'
      ? 'bg-sky-500/15 text-sky-200 border border-sky-500/40'
      : variant === 'interest'
      ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30'
      : 'bg-slate-800 text-slate-200 border border-slate-700';
  return <span className={`${base} ${styles}`}>{children}</span>;
};

const StudentProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const { theme } = useTheme();
  const [resumeData, setResumeData] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  // Example: load parsed resume for resume score / skill gap view
  useEffect(() => {
    const load = async () => {
      try {
        setLoadingResume(true);
        const { data } = await fetchParsedResume();
        setResumeData(data);
      } catch {
        // ignore if none
      } finally {
        setLoadingResume(false);
      }
    };
    load();
  }, []);

  // TODO: replace with real backend data
  const mockCompletedCourses = [
    { title: 'Modern JavaScript Foundations', status: 'Completed' },
    { title: 'React & State Management', status: 'In Progress' },
  ];
  const mockRoadmapProgress = 64; // %
  const mockRecommendedInternships = [
    { company: 'TechNova Labs', role: 'Frontend Intern', match: 92 },
    { company: 'DataEdge AI', role: 'ML Intern', match: 81 },
  ];
  
  const achievements = [
    { name: '🔥 7 Day Streak', desc: 'Learned for 7 consecutive days', date: '2 days ago' },
    { name: '💯 100 Problems', desc: 'Solved 100 coding problems', date: '5 days ago' },
    { name: '🚀 First Project', desc: 'Deployed first full-stack project', date: '1 week ago' },
    { name: '🎯 Goal Crusher', desc: 'Completed a custom goal', date: '2 weeks ago' }
  ];
  
  const activityFeed = [
    { action: 'Completed 30-Day DSA Challenge', time: '2 days ago', icon: '' },
    { action: 'Solved 5 LeetCode problems', time: 'Yesterday', icon: '' },
    { action: 'Joined MERN Stack Warriors group', time: '3 days ago', icon: '' },
    { action: 'Earned DSA Master badge', time: '4 days ago', icon: '' },
    { action: 'Shared React Hooks tutorial', time: '5 days ago', icon: '' }
  ];
  
  const skillsData = [
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 70 },
    { name: 'JavaScript', level: 85 },
    { name: 'MongoDB', level: 65 },
    { name: 'Python', level: 55 }
  ];
  
  const stats = {
    learningHours: 180,
    problemsSolved: 145,
    projectsCompleted: 8,
    certificatesEarned: 5
  };

  const profile = user?.profile || {};
  const gam = user?.gamification || {};
  
  // Get full photo URL with backend server
  const getPhotoUrl = (photoUrl) => {
    if (!photoUrl) return null;
    // If it's already a full URL, return as is
    if (photoUrl.startsWith('http')) return photoUrl;
    // Otherwise, prepend backend URL
    const backendUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${backendUrl}${photoUrl}`;
  };
  
  const photoUrl = getPhotoUrl(profile.photoUrl);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Image size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    setUploadError(null);
    
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      
      const response = await uploadProfilePhoto(formData);
      
      // Refresh user data to get new photo URL
      await refreshUser();
      
      // Close modal and reset state
      setShowPhotoModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Force page reload to ensure photo displays
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  // Handle photo deletion
  const handlePhotoDelete = async () => {
    if (!window.confirm('Are you sure you want to remove your profile photo?')) return;
    
    setUploading(true);
    try {
      await deleteProfilePhoto();
      await refreshUser();
      setShowPhotoModal(false);
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Failed to delete photo');
    } finally {
      setUploading(false);
    }
  };

  // Reset modal state when closing
  const closeModal = () => {
    setShowPhotoModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  return (
    <div className="min-h-screen theme-bg" data-theme={theme}>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 space-y-8">
        {/* Top: avatar + basic info + XP panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 md:flex-row"
        >
          <div className="flex flex-1 items-center gap-5 theme-card p-6">
            <div className="relative group">
              {/* Animated ring effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-green-100 to-blue-100 shadow-2xl">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={user?.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-black bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 text-white">
                    {user?.name?.[0] || 'S'}
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setShowPhotoModal(true)}
                    className="text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                  >
                    📷 Change
                  </button>
                </div>
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-4 border-white shadow-lg">
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
              </div>
              {/* Edit button */}
              <button
                onClick={() => setShowPhotoModal(true)}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Change photo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-black theme-text mb-1">{user?.name}</h1>
              <p className="text-sm theme-text-muted">{user?.email}</p>
              <p className="mt-2 text-xs theme-text-secondary inline-flex items-center gap-2">
                <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700 font-semibold">{profile.year || 'Year N/A'}</span>
                <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold">{profile.branch || 'Branch N/A'}</span>
              </p>
            </div>
          </div>
          <div className="grid flex-1 gap-4 theme-card p-6 md:grid-cols-3">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">XP Points</p>
              <p className="text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{gam.xp ?? 0}</p>
              <p className="text-xs theme-text-muted mt-2">
                Level {gam.level ?? 1} · {gam.badges?.length || 0} badges
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Streak Fire</p>
              <p className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{gam.streakDays ?? 0}</p>
              <p className="text-xs theme-text-muted mt-2">days in a row </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Progress</p>
              <p className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">{mockRoadmapProgress}%</p>
              <div className="mt-3 h-2.5 w-full rounded-full bg-gray-100 shadow-inner overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockRoadmapProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Middle: Skills & Interests + Resume Score / Skill Gaps */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 rounded-2xl theme-card p-6"
          >
            <p className="text-sm font-black theme-text">Skills & Interests</p>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-widest font-bold text-gray-500">Skills</p>
              <div className="flex flex-wrap gap-2">
                {(profile.skills || ['JavaScript', 'React', 'Node.js']).map((s, idx) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-semibold border border-green-200 hover:shadow-md transition-shadow"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-widest font-bold text-gray-500">Interests</p>
              <div className="flex flex-wrap gap-2">
                {(profile.interests || ['Frontend', 'AI/ML']).map((i, idx) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-semibold border border-blue-200 hover:shadow-md transition-shadow"
                  >
                    {i}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 rounded-2xl theme-card p-6"
          >
            <p className="text-sm font-black theme-text">
              Resume Score & Skill Gap Analysis
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Resume Score</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  className="text-4xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
                >
                  {profile.resumeScore ?? 0}
                </motion.p>
                <p className="text-[10px] font-medium text-gray-500 mt-1">Based on AI Resume Analyzer</p>
              </div>
              <div className="text-xs theme-text-muted">
                {loadingResume && <p>Loading resume insights...</p>}
                {!loadingResume && !resumeData && (
                  <p>No resume analyzed yet. Upload one from the AI Resume page.</p>
                )}
                {!loadingResume && resumeData && (
                  <p>
                    Parsed skills: {resumeData.parsed?.technicalSkills?.length || 0} · Projects:{' '}
                    {resumeData.parsed?.projects?.length || 0} · Certs:{' '}
                    {resumeData.parsed?.certifications?.length || 0}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 text-xs">
              <a
                href="/ai/resume-upload"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-white font-semibold hover:shadow-lg transition-shadow"
              >
                Improve Resume
              </a>
              <a
                href="/ai/skill-gaps"
                className="rounded-full border-2 border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50 transition-colors"
              >
                View Skill Gap Report
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[
            { label: 'Learning Hours', value: `${stats.learningHours}h`, gradient: 'from-purple-500 to-indigo-500' },
            { label: 'Problems Solved', value: stats.problemsSolved, gradient: 'from-cyan-500 to-blue-500' },
            { label: 'Projects', value: stats.projectsCompleted, gradient: 'from-green-500 to-emerald-500' },
            { label: 'Certificates', value: stats.certificatesEarned, gradient: 'from-amber-500 to-orange-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="rounded-2xl theme-card p-5 text-center hover:scale-105 transition-transform"
            >
              <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl theme-card p-6"
        >
          <h2 className="text-xl font-black theme-text mb-6 flex items-center gap-2">
            <span className="text-2xl"></span> Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 p-4 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{achievement.name.split(' ')[0]}</div>
                <div className="text-sm font-bold text-gray-800">{achievement.name.substring(2)}</div>
                <div className="text-xs text-gray-600 mt-1">{achievement.desc}</div>
                <div className="text-[10px] font-semibold text-gray-400 mt-2">{achievement.date}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Chart & Activity Feed */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl theme-card p-6"
          >
            <h2 className="text-xl font-black theme-text mb-6 flex items-center gap-2">
              <span className="text-xl">📊</span> Skills Progress
            </h2>
            <div className="space-y-4">
              {skillsData.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-bold theme-text">{skill.name}</span>
                    <span className="font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 shadow-inner overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.8 + idx * 0.1 }}
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2.5 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl theme-card p-6"
          >
            <h2 className="text-xl font-black theme-text mb-6 flex items-center gap-2">
              <span className="text-xl"></span> Recent Activity
            </h2>
            <div className="space-y-3">
              {activityFeed.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium theme-text">{activity.action}</div>
                    <div className="text-xs font-semibold text-gray-400 mt-1">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Completed Courses + Recommended Internships */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4 rounded-2xl theme-card p-6"
          >
            <p className="text-sm font-black theme-text">Course Progress</p>
            <ul className="space-y-3">
              {mockCompletedCourses.map((c, idx) => (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="flex items-center justify-between rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 px-4 py-3 hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-bold theme-text text-sm">{c.title}</p>
                    <p className="text-xs font-medium text-gray-500 mt-1">{c.status}</p>
                  </div>
                  <button className="rounded-full border-2 border-gray-300 px-4 py-1.5 text-xs font-semibold hover:bg-gray-50 transition-colors">
                    View
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4 rounded-2xl theme-card p-6"
          >
            <p className="text-sm font-black theme-text">Recommended Internships</p>
            <ul className="space-y-3">
              {mockRecommendedInternships.map((i, idx) => (
                <motion.li
                  key={i.company + i.role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="flex items-center justify-between rounded-xl bg-gradient-to-br from-white to-green-50 border-2 border-green-200 px-4 py-3 hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <div>
                    <p className="font-black text-gray-800 text-sm">
                      {i.role} @ {i.company}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">
                      Match Score:{' '}
                      <span className="font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">{i.match}%</span>
                    </p>
                  </div>
                  <button className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-1.5 text-xs font-black text-white hover:shadow-lg transition-shadow">
                    View & Apply
                  </button>
                </motion.li>
              ))}
            </ul>
            <a
              href="/internships"
              className="inline-block rounded-full border-2 border-gray-300 px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Open Internship Hub
            </a>
          </motion.div>
        </div>
      </div>

      {/* Photo Upload Modal */}
      <AnimatePresence>
        {showPhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-800">Update Profile Photo</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Preview */}
              <div className="mb-6">
                <div className="relative mx-auto w-40 h-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-green-100 to-blue-100 shadow-2xl">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                    ) : photoUrl ? (
                      <img src={photoUrl} alt="Current" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-5xl font-black bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 text-white">
                        {user?.name?.[0] || 'S'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {uploadError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {uploadError}
                </div>
              )}

              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📁 Choose Photo
                </button>

                {selectedFile && (
                  <button
                    onClick={handlePhotoUpload}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span>✓</span>
                        <span>Upload Photo</span>
                      </>
                    )}
                  </button>
                )}

                {profile.photoUrl && (
                  <button
                    onClick={handlePhotoDelete}
                    disabled={uploading}
                    className="w-full bg-red-50 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🗑️ Remove Current Photo
                  </button>
                )}

                <p className="text-xs text-gray-500 text-center mt-2">
                  Supported: JPG, PNG, GIF • Max size: 5MB
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentProfilePage;
