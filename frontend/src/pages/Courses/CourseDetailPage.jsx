import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    setLoading(true);
    try {
      // Mock course data - replace with API call
      const mockCourse = {
        _id: id,
        title: 'Full Stack Web Development',
        description: 'Learn MERN stack from scratch to build production-ready web applications. Master MongoDB, Express.js, React, and Node.js with hands-on projects.',
        instructor: 'John Doe',
        duration: '12 weeks',
        level: 'Intermediate',
        category: 'Web Development',
        rating: 4.8,
        enrolledCount: 1234,
        videos: [
          { id: 1, title: 'Introduction to Full Stack Development', duration: '15:30', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 2, title: 'Setting Up Your Development Environment', duration: '22:45', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 3, title: 'MongoDB Basics', duration: '28:15', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 4, title: 'Building RESTful APIs with Express', duration: '35:20', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 5, title: 'React Fundamentals', duration: '42:10', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ],
        quiz: {
          title: 'Full Stack Development Assessment',
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: 'What does MERN stack stand for?',
              options: [
                'MySQL, Express, React, Node',
                'MongoDB, Express, React, Node',
                'MongoDB, Ember, React, Next',
                'MySQL, Express, Redux, Node'
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: 'Which is the default port for a MongoDB server?',
              options: ['3000', '5000', '27017', '8080'],
              correctAnswer: 2
            },
            {
              id: 3,
              question: 'What is JSX in React?',
              options: [
                'A JavaScript library',
                'A syntax extension for JavaScript',
                'A CSS framework',
                'A database query language'
              ],
              correctAnswer: 1
            },
            {
              id: 4,
              question: 'Which HTTP method is used to update data?',
              options: ['GET', 'POST', 'PUT', 'DELETE'],
              correctAnswer: 2
            },
            {
              id: 5,
              question: 'What is Express.js?',
              options: [
                'A front-end framework',
                'A database',
                'A Node.js web application framework',
                'A testing library'
              ],
              correctAnswer: 2
            }
          ]
        }
      };
      setCourse(mockCourse);
      setEnrolled(true); // Auto-enroll for demo
    } catch (err) {
      console.error('Failed to load course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = () => {
    if (!course?.quiz) return;
    
    let correct = 0;
    course.quiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / course.quiz.questions.length) * 100);
    setQuizScore(score);
    
    // Show certificate if passed
    if (score >= course.quiz.passingScore) {
      setTimeout(() => setShowCertificate(true), 2000);
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 800, 600);

    // Border
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 760, 560);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', 400, 120);

    // Student name
    ctx.font = 'italic 32px Arial';
    ctx.fillStyle = '#6366f1';
    ctx.fillText(user?.name || 'Student Name', 400, 250);

    // Course details
    ctx.font = '24px Arial';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('has successfully completed', 400, 300);
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(course?.title || 'Course Title', 400, 350);

    // Score
    ctx.font = '20px Arial';
    ctx.fillStyle = '#22c55e';
    ctx.fillText(`Score: ${quizScore}%`, 400, 400);

    // Date
    ctx.font = '18px Arial';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 400, 480);

    // Download
    const link = document.createElement('a');
    link.download = `certificate-${course?.title?.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-slate-400">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-slate-400 mb-4">{course.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span>👤 {course.instructor}</span>
            <span>⏱️ {course.duration}</span>
            <span>📊 {course.level}</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              {course.rating} ({course.enrolledCount} students)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {enrolled && !showQuiz && !showCertificate && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={course.videos[currentVideo]?.url}
                    title={course.videos[currentVideo]?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{course.videos[currentVideo]?.title}</h3>
                  <p className="text-sm text-slate-400">Duration: {course.videos[currentVideo]?.duration}</p>
                </div>
              </div>
            )}

            {/* Quiz */}
            {showQuiz && !showCertificate && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="text-2xl font-bold mb-6">{course.quiz.title}</h2>
                
                {quizScore === null ? (
                  <div className="space-y-6">
                    {course.quiz.questions.map((q, idx) => (
                      <div key={q.id} className="p-4 rounded-lg bg-slate-800/50">
                        <p className="font-semibold mb-3">{idx + 1}. {q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((option, optIdx) => (
                            <label key={optIdx} className="flex items-center gap-3 cursor-pointer hover:bg-slate-700/50 p-2 rounded">
                              <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={optIdx}
                                onChange={() => handleAnswerSelect(q.id, optIdx)}
                                className="w-4 h-4"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < course.quiz.questions.length}
                      className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold"
                    >
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className={`text-6xl font-bold mb-4 ${quizScore >= course.quiz.passingScore ? 'text-green-400' : 'text-red-400'}`}>
                      {quizScore}%
                    </div>
                    <p className="text-xl mb-4">
                      {quizScore >= course.quiz.passingScore ? '🎉 Congratulations! You passed!' : '😔 Keep learning and try again!'}
                    </p>
                    <p className="text-slate-400 mb-6">
                      Passing score: {course.quiz.passingScore}%
                    </p>
                    {quizScore >= course.quiz.passingScore && (
                      <p className="text-green-400">Certificate will be generated shortly...</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Certificate */}
            {showCertificate && (
              <div className="rounded-xl border border-indigo-500 bg-gradient-to-br from-indigo-950 to-purple-950 p-8 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
                <p className="text-lg mb-6">You've earned your certificate for completing</p>
                <p className="text-2xl font-bold text-indigo-400 mb-8">{course.title}</p>
                <button
                  onClick={generateCertificate}
                  className="px-8 py-3 bg-green-500 hover:bg-green-400 rounded-lg font-semibold text-lg"
                >
                  📥 Download Certificate
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video List */}
            {!showQuiz && !showCertificate && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <h3 className="font-bold mb-4">📚 Course Content</h3>
                <div className="space-y-2">
                  {course.videos.map((video, idx) => (
                    <button
                      key={video.id}
                      onClick={() => setCurrentVideo(idx)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        currentVideo === idx
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{video.title}</span>
                        <span className="text-xs">{video.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Button */}
            {enrolled && !showQuiz && !showCertificate && (
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-3 bg-purple-500 hover:bg-purple-400 rounded-lg font-semibold"
              >
                🧠 Take Quiz
              </button>
            )}

            {/* Progress */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="font-bold mb-4">📊 Your Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Videos Watched</span>
                    <span>{currentVideo + 1}/{course.videos.length}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500"
                      style={{ width: `${((currentVideo + 1) / course.videos.length) * 100}%` }}
                    />
                  </div>
                </div>
                {quizScore !== null && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quiz Score</span>
                      <span>{quizScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500"
                        style={{ width: `${quizScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
