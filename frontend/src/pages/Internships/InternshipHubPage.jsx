import React, { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import InternshipCard from '../../components/internships/InternshipCard.jsx';
import { fetchInternships } from '../../api/internshipApi.js';

const InternshipHubPage = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', mode: 'all' });

  const loadInternships = async () => {
    setLoading(true);
    try {
      // Use mock data directly for testing
      setInternships(getMockInternships());
      
      // Uncomment below to use real API
      // const { data } = await fetchInternships({
      //   q: filters.search || undefined,
      //   mode: filters.mode === 'all' ? undefined : filters.mode,
      // });
      // setInternships(data);
    } catch (err) {
      console.error(err);
      setInternships(getMockInternships());
    } finally {
      setLoading(false);
    }
  };

  const getMockInternships = () => [
    {
      _id: '1',
      title: 'Full Stack Developer Intern',
      company: 'TechCorp Solutions',
      location: 'Remote',
      mode: 'remote',
      duration: '3-6 months',
      stipend: '$800/month',
      description: 'Join our dynamic team to build cutting-edge web applications using MERN stack.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
      applicationDeadline: '2025-12-31',
      posted: '2 days ago',
    },
    {
      _id: '2',
      title: 'Data Science Intern',
      company: 'AI Innovations Inc.',
      location: 'San Francisco, CA',
      mode: 'hybrid',
      duration: '6 months',
      stipend: '$1000/month',
      description: 'Work with machine learning models and big data analytics to solve real-world problems.',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy'],
      applicationDeadline: '2025-12-20',
      posted: '1 week ago',
    },
    {
      _id: '3',
      title: 'UI/UX Design Intern',
      company: 'Creative Studio Labs',
      location: 'New York, NY',
      mode: 'onsite',
      duration: '4 months',
      stipend: '$600/month',
      description: 'Design beautiful user interfaces and create exceptional user experiences.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
      applicationDeadline: '2025-12-15',
      posted: '3 days ago',
    },
    {
      _id: '4',
      title: 'Mobile App Developer Intern',
      company: 'AppVentures Inc.',
      location: 'Austin, TX',
      mode: 'hybrid',
      duration: '5 months',
      stipend: '$900/month',
      description: 'Develop cross-platform mobile applications using React Native and Flutter.',
      skills: ['React Native', 'Flutter', 'Firebase', 'iOS', 'Android'],
      applicationDeadline: '2026-01-10',
      posted: '5 days ago',
    },
    {
      _id: '5',
      title: 'DevOps Intern',
      company: 'CloudScale Technologies',
      location: 'Remote',
      mode: 'remote',
      duration: '6 months',
      stipend: '$850/month',
      description: 'Learn about CI/CD pipelines, containerization, and cloud infrastructure.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Linux'],
      applicationDeadline: '2025-12-25',
      posted: '1 day ago',
    },
    {
      _id: '6',
      title: 'Cybersecurity Intern',
      company: 'SecureNet Systems',
      location: 'Boston, MA',
      mode: 'onsite',
      duration: '4-6 months',
      stipend: '$950/month',
      description: 'Assist in penetration testing, vulnerability assessments, and security audits.',
      skills: ['Network Security', 'Ethical Hacking', 'Python', 'Wireshark', 'Kali Linux'],
      applicationDeadline: '2026-01-05',
      posted: '4 days ago',
    },
  ];

  useEffect(() => {
    loadInternships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitFilters = (e) => {
    e.preventDefault();
    loadInternships();
  };

  return (
    <div className="min-h-screen theme-bg">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-bold theme-text">Internship &amp; Placement Hub</h1>
            <p className="text-xs theme-text-muted">
              Discover AI-matched opportunities based on your skills, interests, and resume.
            </p>
          </div>
          <form onSubmit={submitFilters} className="flex flex-wrap items-center gap-2 text-xs">
            <input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by role, company, skill..."
              className="theme-input w-52"
            />
            <select
              value={filters.mode}
              onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
              className="theme-input"
            >
              <option value="all">All modes</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-400"
            >
              Filter
            </button>
          </form>
        </div>

        {loading && <p className="text-xs theme-text-muted">Loading internships...</p>}

        <div className="grid gap-4 md:grid-cols-2">
          {internships.map((i) => (
            <InternshipCard key={i._id} internship={i} />
          ))}
        </div>

        {!loading && !internships.length && (
          <p className="text-xs text-slate-500">No internships found for current filters.</p>
        )}
      </div>
    </div>
  );
};

export default InternshipHubPage;
