import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar.jsx';
import { motion } from 'framer-motion';
import { getAdminOverview, listUsers, approveCourse, approveInternship } from '../../api/adminApi.js';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Card = ({ title, children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`theme-card text-xs shadow-lg ${className}`}
  >
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider theme-text-secondary">{title}</p>
    {children}
  </motion.div>
);

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getAdminOverview();
        setOverview(data);
      } catch (err) {
        console.error('Failed to load admin overview:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleApproveCourse = async (courseId) => {
    try {
      await approveCourse(courseId);
      // Reload data
      const { data } = await getAdminOverview();
      setOverview(data);
    } catch (err) {
      console.error('Failed to approve course:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = overview?.stats || {};
  const recentUsers = overview?.recentUsers || [];

  const userDistribution = [
    { name: 'Students', value: stats.students || 0, color: '#6366f1' },
    { name: 'Faculty', value: stats.faculty || 0, color: '#0ea5e9' },
    { name: 'Admins', value: stats.admins || 0, color: '#22c55e' },
  ];

  return (
    <div className="min-h-screen theme-bg">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 theme-text">Admin Control Center 🛠</h1>
          <p className="text-sm theme-text-muted">
            Approve mentors & courses, manage internships, monitor community, and track global analytics.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card title="Total Users">
            <div className="text-3xl font-bold text-indigo-300 mb-1">{stats.totalUsers || 0}</div>
            <p className="text-[10px] text-slate-400">Students, mentors, and admins</p>
          </Card>

          <Card title="Pending Mentor Approvals">
            <div className="text-3xl font-bold text-amber-300 mb-1">{stats.pendingMentors || 0}</div>
            <p className="text-[10px] text-slate-400">Background & profile verification</p>
          </Card>

          <Card title="Courses Awaiting Approval">
            <div className="text-3xl font-bold text-emerald-300 mb-1">{stats.pendingCourses || 0}</div>
            <p className="text-[10px] text-slate-400">For LMS catalog</p>
          </Card>

          <Card title="Internship Listings Pending">
            <div className="text-3xl font-bold text-sky-300 mb-1">{stats.pendingInternships || 0}</div>
            <p className="text-[10px] text-slate-400">Company verification queue</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-2">
              <Link
                to="/admin/users"
                className="block rounded-lg bg-slate-950/80 px-3 py-2 text-xs hover:bg-slate-800 transition border border-slate-800"
              >
                👥 Manage Users
              </Link>
              <Link
                to="/admin/mentors"
                className="block rounded-lg bg-slate-950/80 px-3 py-2 text-xs hover:bg-slate-800 transition border border-slate-800"
              >
                ✅ Approve Mentors
              </Link>
              <Link
                to="/admin/courses"
                className="block rounded-lg bg-slate-950/80 px-3 py-2 text-xs hover:bg-slate-800 transition border border-slate-800"
              >
                📚 Approve Courses
              </Link>
              <Link
                to="/admin/internships"
                className="block rounded-lg bg-slate-950/80 px-3 py-2 text-xs hover:bg-slate-800 transition border border-slate-800"
              >
                💼 Manage Internships
              </Link>
              <Link
                to="/admin/community"
                className="block rounded-lg bg-slate-950/80 px-3 py-2 text-xs hover:bg-slate-800 transition border border-slate-800"
              >
                💬 Moderate Community
              </Link>
            </div>
          </Card>

          {/* User Distribution */}
          <Card title="User Distribution">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Users */}
          <Card title="Recent Users">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between rounded-lg bg-slate-950/80 px-2 py-1.5 border border-slate-800"
                  >
                    <div>
                      <p className="text-[11px] font-semibold">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                      user.role === 'student' ? 'bg-indigo-500/20 text-indigo-300' :
                      user.role === 'faculty' ? 'bg-sky-500/20 text-sky-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-slate-400">No recent users</p>
              )}
            </div>
          </Card>
        </div>

        {/* System Notifications & Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="System Notifications">
            <div className="space-y-2">
              <div className="rounded-lg bg-slate-950/80 px-3 py-2 border border-slate-800">
                <p className="text-[11px] text-slate-300">
                  15 new students registered in the last 24 hours.
                </p>
              </div>
              <div className="rounded-lg bg-slate-950/80 px-3 py-2 border border-slate-800">
                <p className="text-[11px] text-slate-300">
                  3 courses flagged for low completion rates – check insights.
                </p>
              </div>
              <div className="rounded-lg bg-slate-950/80 px-3 py-2 border border-slate-800">
                <p className="text-[11px] text-slate-300">
                  2 community posts reported by users – review moderation queue.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Global Analytics Snapshot">
            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span>Average course completion rate:</span>
                <span className="font-semibold text-indigo-300">72%</span>
              </div>
              <div className="flex justify-between">
                <span>Active daily learners:</span>
                <span className="font-semibold text-emerald-300">1,120</span>
              </div>
              <div className="flex justify-between">
                <span>Average weekly streak:</span>
                <span className="font-semibold text-amber-300">9.4 days</span>
              </div>
              <div className="flex justify-between">
                <span>Resumes improved with AI:</span>
                <span className="font-semibold text-sky-300">4,250</span>
              </div>
              <div className="flex justify-between">
                <span>Active internship listings:</span>
                <span className="font-semibold text-purple-300">82</span>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Governance */}
        <Card title="AI Governance & Settings">
          <p className="mb-3 text-[11px] text-slate-300">
            Control AI providers, rate limits, logging, and compliance preferences.
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-slate-700 px-4 py-2 text-xs hover:bg-slate-800 transition">
              AI Provider Settings
            </button>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-xs hover:bg-slate-800 transition">
              Logging & Privacy
            </button>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-xs hover:bg-slate-800 transition">
              Export Analytics
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
