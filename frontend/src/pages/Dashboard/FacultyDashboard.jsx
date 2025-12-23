import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Navbar from '../../components/common/Navbar.jsx';
import { motion } from 'framer-motion';
import { getFacultyOverview } from '../../api/facultyApi.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getFacultyOverview();
        setOverview(data);
      } catch (err) {
        console.error('Failed to load faculty overview:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  const courses = overview?.courses || [];
  const totalStudents = overview?.totalStudents || 0;
  const insights = overview?.insights || [];

  return (
    <div className="min-h-screen theme-bg">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 theme-text">
            Mentor Command Center, {user?.name || 'Mentor'} 👨‍🏫
          </h1>
          <p className="text-sm theme-text-muted">
            Design learning plans, monitor cohorts, go live with sessions, and let AI highlight what your students need most.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card title="Active Courses">
            <div className="text-3xl font-bold text-indigo-300 mb-1">{courses.length}</div>
            <p className="text-[10px] text-slate-400">with adaptive learning enabled</p>
          </Card>

          <Card title="Total Learners">
            <div className="text-3xl font-bold text-emerald-300 mb-1">{totalStudents}</div>
            <p className="text-[10px] text-slate-400">across all your cohorts</p>
          </Card>

          <Card title="Live Sessions">
            <div className="text-3xl font-bold text-amber-300 mb-1">3</div>
            <p className="text-[10px] text-slate-400">scheduled this week</p>
          </Card>

          <Card title="AI Suggestions">
            <div className="text-3xl font-bold text-sky-300 mb-1">{insights.length}</div>
            <p className="text-[10px] text-slate-400">learning interventions</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Courses Section */}
          <Card title="Your Courses & Learning Plans" className="lg:col-span-2">
            <div className="space-y-3">
              {courses.length > 0 ? (
                <div className="space-y-2">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="flex items-center justify-between rounded-xl bg-slate-950/80 px-4 py-3 border border-slate-800"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-slate-100">{course.title}</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {course.students || 0} students · {course.level || 'intermediate'} level
                        </p>
                        {!course.approved && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 rounded">
                            Pending Approval
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/courses/${course._id}`}
                          className="rounded-full border border-slate-700 px-4 py-2 text-xs hover:bg-slate-800 transition"
                        >
                          Open
                        </Link>
                        <Link
                          to={`/courses/${course._id}/edit`}
                          className="rounded-full border border-indigo-500/70 px-4 py-2 text-xs text-indigo-300 hover:bg-indigo-500/10 transition"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">
                  No courses yet. Create your first course to get started!
                </p>
              )}
              <div className="flex gap-2 pt-2">
                <Link
                  to="/courses/new"
                  className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400 transition"
                >
                  + Create Course
                </Link>
                <Link
                  to="/ai/chatbot"
                  className="rounded-full border border-slate-700 px-4 py-2 text-xs hover:bg-slate-800 transition"
                >
                  Ask LearnBuddy for Quiz Ideas
                </Link>
              </div>
            </div>
          </Card>

          {/* AI Insights */}
          <Card title="AI-Generated Insights">
            <div className="space-y-2">
              {insights.length > 0 ? (
                insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-lg bg-slate-950/80 px-3 py-2 border border-slate-800"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                    <p className="text-[11px] text-slate-300">{insight}</p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-slate-400">No insights available yet.</p>
              )}
            </div>
            <p className="mt-3 text-[10px] text-slate-500">
              Insights based on quiz performance, engagement, and learning path progress.
            </p>
          </Card>

          {/* Student Progress */}
          <Card title="Student Progress Overview">
            {overview?.studentProgress && overview.studentProgress.length > 0 ? (
              <div className="space-y-2">
                {overview.studentProgress.slice(0, 5).map((student, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-slate-950/80 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-semibold">{student.user?.name || 'Student'}</p>
                      <p className="text-[10px] text-slate-400">
                        {student.totalStudyMinutesLastWeek || 0} min/week
                      </p>
                    </div>
                    <span className="text-xs text-indigo-300">
                      {student.learningSpeedLabel || 'average'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">No student data available yet.</p>
            )}
          </Card>
        </div>

        {/* Announcements & Sessions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Announcements">
            <div className="space-y-2">
              <div className="rounded-lg bg-slate-950/80 px-3 py-2 border border-slate-800">
                <p className="text-[11px] text-slate-300">
                  Project milestone review on Friday.
                </p>
              </div>
              <div className="rounded-lg bg-slate-950/80 px-3 py-2 border border-slate-800">
                <p className="text-[11px] text-slate-300">
                  Weekly live doubt session recording is uploaded.
                </p>
              </div>
            </div>
            <button className="mt-3 rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-400 transition">
              + Post New Announcement
            </button>
          </Card>

          <Card title="Mentorship Sessions">
            <p className="text-[11px] text-slate-300 mb-3">
              Manage 1:1 and group mentoring, with AI-generated agendas.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-slate-700 px-4 py-2 text-xs hover:bg-slate-800 transition">
                Schedule Live Session
              </button>
              <button className="rounded-full border border-slate-700 px-4 py-2 text-xs hover:bg-slate-800 transition">
                View Past Sessions
              </button>
              <button className="rounded-full border border-indigo-500/70 px-4 py-2 text-xs text-indigo-300 hover:bg-indigo-500/10 transition">
                Generate Agenda (AI)
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
