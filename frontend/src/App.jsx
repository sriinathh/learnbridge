import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OfflineIndicator from './components/common/OfflineIndicator.jsx';
import LandingPage from './pages/Landing/LandingPage.jsx';
import StudentAuthPage from './pages/Auth/StudentAuthPage.jsx';
import FacultyAuthPage from './pages/Auth/FacultyAuthPage.jsx';
import AdminAuthPage from './pages/Auth/AdminAuthPage.jsx';
import AuthSuccessPage from './pages/Auth/AuthSuccessPage.jsx';
import StudentDashboard from './pages/Dashboard/StudentDashboard.jsx';
import FacultyDashboard from './pages/Dashboard/FacultyDashboard.jsx';
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx';
import ResumeUploadPage from './pages/AI/ResumeUploadPage.jsx';
import SkillGapReportPage from './pages/AI/SkillGapReportPage.jsx';
import LearningPathPage from './pages/AI/LearningPathPage.jsx';
import AdaptiveTrackerPage from './pages/AI/AdaptiveTrackerPage.jsx';
import ChatbotPage from './pages/AI/ChatbotPage.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import ForumPage from './pages/Community/ForumPage.jsx';
import ThreadDetailPage from './pages/Community/ThreadDetailPage.jsx';
import InternshipHubPage from './pages/Internships/InternshipHubPage.jsx';
import InternshipDetailPage from './pages/Internships/InternshipDetailPage.jsx';
import StudentProfilePage from './pages/Profile/StudentProfilePage.jsx';
import CourseBrowsePage from './pages/Courses/CourseBrowsePage.jsx';
import CourseDetailPage from './pages/Courses/CourseDetailPage.jsx';
import SkillGapEnginePage from './pages/AI/SkillGapEnginePage.jsx';
import JobRoleMatchPage from './pages/AI/JobRoleMatchPage.jsx';
import WeeklyGoalsPage from './pages/AI/WeeklyGoalsPage.jsx';
import CodeMentorPage from './pages/AI/CodeMentorPage.jsx';
import ProjectGeneratorPage from './pages/AI/ProjectGeneratorPage.jsx';
import InterviewBotPage from './pages/AI/InterviewBotPage.jsx';
import SkillRoadmapPage from './pages/AI/SkillRoadmapPage.jsx';
import InternshipFitPage from './pages/AI/InternshipFitPage.jsx';
import CertificateAnalyzerPage from './pages/AI/CertificateAnalyzerPage.jsx';
import CustomGoalEnginePage from './pages/Goals/CustomGoalEnginePage.jsx';
import PeerLearningPage from './pages/Community/PeerLearningPage.jsx';
import CommunityGroupsPage from './pages/Community/CommunityGroupsPage.jsx';
import GroupDetailPage from './pages/Community/GroupDetailPage.jsx';
import FeaturesPage from './pages/Features/FeaturesPage.jsx';
import CommunityPage from './pages/Community/CommunityPage.jsx';
import CareerPage from './pages/Career/CareerPage.jsx';

function App() {
  return (
    <>
      <OfflineIndicator />
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Public info pages */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/community-info" element={<CommunityPage />} />
        <Route path="/careers" element={<CareerPage />} />

      {/* Auth routes */}
      <Route path="/auth/student" element={<StudentAuthPage />} />
      <Route path="/auth/faculty" element={<FacultyAuthPage />} />
      <Route path="/auth/admin" element={<AdminAuthPage />} />
      <Route path="/auth/success" element={<AuthSuccessPage />} />

      {/* Dashboards - Student dashboard public for testing */}
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route
        path="/dashboard/faculty"
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* AI module - Resume upload public for testing */}
      <Route path="/ai/resume-upload" element={<ResumeUploadPage />} />
      <Route path="/ai/skill-gap-engine" element={<SkillGapEnginePage />} />
      <Route path="/ai/job-match" element={<JobRoleMatchPage />} />
      <Route path="/ai/weekly-goals" element={<WeeklyGoalsPage />} />
      <Route path="/ai/code-mentor" element={<CodeMentorPage />} />
      <Route path="/ai/project-generator" element={<ProjectGeneratorPage />} />
      <Route path="/ai/interview-bot" element={<InterviewBotPage />} />
      <Route path="/ai/skill-roadmap" element={<SkillRoadmapPage />} />
      <Route path="/ai/internship-fit" element={<InternshipFitPage />} />
      <Route path="/ai/certificate-analyzer" element={<CertificateAnalyzerPage />} />
      <Route path="/custom-goals" element={<CustomGoalEnginePage />} />
      <Route path="/peer-learning" element={<PeerLearningPage />} />
      <Route path="/community-groups" element={<CommunityGroupsPage />} />
      <Route path="/community-groups/:id" element={<GroupDetailPage />} />
      <Route
        path="/ai/skill-gaps"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <SkillGapReportPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai/learning-path"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <LearningPathPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai/adaptive-tracker"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <AdaptiveTrackerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai/chatbot"
        element={
          <ProtectedRoute allowedRoles={['student', 'faculty']}>
            <ChatbotPage />
          </ProtectedRoute>
        }
      />

      {/* Community forum */}
      <Route
        path="/community"
        element={
          <ProtectedRoute allowedRoles={['student', 'faculty']}>
            <ForumPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community/:id"
        element={
          <ProtectedRoute allowedRoles={['student', 'faculty']}>
            <ThreadDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Courses - Public for testing */}
      <Route path="/courses" element={<CourseBrowsePage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />

      {/* Internship hub - Public for testing */}
      <Route path="/internships" element={<InternshipHubPage />} />
      <Route path="/internships/:id" element={<InternshipDetailPage />} />

      {/* Student profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App;
