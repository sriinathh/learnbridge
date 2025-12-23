import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar.jsx';
import axios from 'axios';

const CourseBrowsePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      // Use mock data directly for testing
      setCourses(getMockCourses());
      
      // Uncomment below to use real API
      // const { data } = await axios.get('/api/courses');
      // setCourses(data);
    } catch (err) {
      console.error('Failed to load courses:', err);
      setCourses(getMockCourses());
    } finally {
      setLoading(false);
    }
  };

  const getMockCourses = () => [
    {
      _id: '1',
      title: 'Full Stack Web Development',
      description: 'Learn MERN stack from scratch to build production-ready web applications',
      instructor: 'John Doe',
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      enrolledCount: 1234,
      rating: 4.8,
      videoCount: 45,
      quizCount: 8,
      certificateAvailable: true,
    },
    {
      _id: '2',
      title: 'React & TypeScript Masterclass',
      description: 'Master modern React with TypeScript, Hooks, Context, and advanced patterns',
      instructor: 'Sarah Kim',
      duration: '8 weeks',
      level: 'Advanced',
      category: 'Frontend',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      enrolledCount: 892,
      rating: 4.9,
      videoCount: 32,
      quizCount: 6,
      certificateAvailable: true,
    },
    {
      _id: '3',
      title: 'Python for Data Science',
      description: 'Learn Python, NumPy, Pandas, and machine learning fundamentals',
      instructor: 'Alex Chen',
      duration: '10 weeks',
      level: 'Beginner',
      category: 'Data Science',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      enrolledCount: 2156,
      rating: 4.7,
      videoCount: 52,
      quizCount: 10,
      certificateAvailable: true,
    },
    {
      _id: '4',
      title: 'Node.js & Express Backend Development',
      description: 'Build RESTful APIs, authentication, databases, and deploy to production',
      instructor: 'Mike Johnson',
      duration: '6 weeks',
      level: 'Intermediate',
      category: 'Backend',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      enrolledCount: 756,
      rating: 4.6,
      videoCount: 28,
      quizCount: 5,
      certificateAvailable: true,
    },
    {
      _id: '5',
      title: 'Machine Learning A-Z',
      description: 'Complete ML course covering regression, classification, clustering, and deep learning',
      instructor: 'Emma Davis',
      duration: '16 weeks',
      level: 'Advanced',
      category: 'Machine Learning',
      thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
      enrolledCount: 1543,
      rating: 4.9,
      videoCount: 68,
      quizCount: 12,
      certificateAvailable: true,
    },
    {
      _id: '6',
      title: 'UI/UX Design Fundamentals',
      description: 'Learn design principles, Figma, prototyping, and user research methods',
      instructor: 'Lisa Wang',
      duration: '6 weeks',
      level: 'Beginner',
      category: 'Design',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      enrolledCount: 987,
      rating: 4.8,
      videoCount: 24,
      quizCount: 4,
      certificateAvailable: true,
    },
  ];

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(c => c.category === filter || c.level === filter);

  const categories = ['all', 'Web Development', 'Frontend', 'Backend', 'Data Science', 'Machine Learning', 'Design'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen theme-bg">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 theme-text"> Browse Courses</h1>
          <p className="theme-text-muted">Explore our collection of high-quality courses with video lectures, quizzes, and certificates</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === cat
                  ? 'bg-indigo-500 text-white'
                  : 'theme-bg-secondary theme-text hover:opacity-80'
              }`}
            >
              {cat === 'all' ? 'All Courses' : cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-4 theme-text-muted">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="group theme-card overflow-hidden hover:border-indigo-500 transition"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 rounded-full text-xs font-semibold">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg group-hover:text-indigo-400 transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span> {course.instructor}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                       {course.videoCount} videos
                    </span>
                    <span className="flex items-center gap-1">
                      {course.quizCount} quizzes
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-400"></span>
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-slate-400 text-xs">({course.enrolledCount})</span>
                    </div>
                    {course.certificateAvailable && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        Certificate
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-slate-400">No courses found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBrowsePage;
