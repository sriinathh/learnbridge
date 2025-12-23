import React from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { motion } from 'framer-motion';

const CareerPage = () => {
  const { theme } = useTheme();

  const careerPaths = [
    {
      role: 'Full Stack Developer',
      salary: '₹8-25 LPA',
      demand: 'Very High',
      companies: ['Google', 'Amazon', 'Flipkart', 'Swiggy'],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      role: 'Backend Engineer',
      salary: '₹10-30 LPA',
      demand: 'Very High',
      companies: ['Microsoft', 'Netflix', 'Uber', 'PhonePe'],
      skills: ['Java/Python', 'SQL', 'Microservices', 'Kafka'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      role: 'Frontend Developer',
      salary: '₹7-22 LPA',
      demand: 'High',
      companies: ['Meta', 'Airbnb', 'Razorpay', 'Cred'],
      skills: ['React', 'TypeScript', 'Next.js', 'CSS'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      role: 'DevOps Engineer',
      salary: '₹12-35 LPA',
      demand: 'Very High',
      companies: ['Amazon', 'Microsoft', 'PayPal', 'Atlassian'],
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      color: 'from-orange-500 to-red-500'
    },
    {
      role: 'Data Engineer',
      salary: '₹10-28 LPA',
      demand: 'High',
      companies: ['Google', 'Uber', 'Swiggy', 'Ola'],
      skills: ['Python', 'Spark', 'SQL', 'Airflow'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      role: 'Cloud Architect',
      salary: '₹15-40 LPA',
      demand: 'Very High',
      companies: ['AWS', 'Azure', 'Google Cloud', 'IBM'],
      skills: ['AWS/Azure/GCP', 'Terraform', 'Security', 'Architecture'],
      color: 'from-teal-500 to-green-500'
    }
  ];

  const successStories = [
    {
      name: 'Vikram Singh',
      from: 'Final Year Student',
      to: 'SDE-2 at Google',
      package: '₹42 LPA',
      image: '👨‍💻',
      story: 'Started from zero coding knowledge, cracked Google in 10 months!',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Sneha Patel',
      from: 'Non-CS Background',
      to: 'Full Stack at Amazon',
      package: '₹35 LPA',
      image: '👩‍💻',
      story: 'Career switched from mechanical to software. Best decision ever!',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Arjun Reddy',
      from: '2 Years Experience',
      to: 'Senior SDE at Microsoft',
      package: '₹55 LPA',
      image: '👨‍💼',
      story: 'Leveled up from service-based to product-based company!',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const jobPlatforms = [
    { name: 'Naukri.com', link: 'https://www.naukri.com/', icon: '💼' },
    { name: 'LinkedIn Jobs', link: 'https://www.linkedin.com/jobs/', icon: '💼' },
    { name: 'Indeed', link: 'https://www.indeed.co.in/', icon: '💼' },
    { name: 'Glassdoor', link: 'https://www.glassdoor.co.in/Job/', icon: '💼' },
    { name: 'AngelList', link: 'https://angel.co/jobs', icon: '🚀' },
    { name: 'Instahyre', link: 'https://www.instahyre.com/', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen theme-bg" data-theme={theme}>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Your Career Starts Here
          </h1>
          <p className="text-lg theme-text-muted max-w-3xl mx-auto">
            Explore top tech roles, learn required skills, and land your dream job
          </p>
        </motion.div>

        {/* Career Paths */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Top Career Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((path, idx) => (
              <motion.div
                key={idx}
                className="theme-card p-6 border border-slate-700 hover:border-indigo-500 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
              >
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${path.color} text-white text-xs font-bold mb-4`}>
                  {path.demand} Demand
                </div>
                <h3 className="text-xl font-bold mb-2">{path.role}</h3>
                <div className="text-2xl font-bold text-green-400 mb-4">{path.salary}</div>
                
                <div className="mb-4">
                  <div className="text-xs text-indigo-400 font-semibold mb-2">Top Hiring Companies:</div>
                  <div className="flex flex-wrap gap-2">
                    {path.companies.map((company, cidx) => (
                      <span key={cidx} className="px-2 py-1 bg-slate-800 rounded text-xs">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-purple-400 font-semibold mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, sidx) => (
                      <span key={sidx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, idx) => (
              <motion.div
                key={idx}
                className="theme-card p-6 border border-slate-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-4xl mb-4 mx-auto`}>
                  {story.image}
                </div>
                <h3 className="font-bold text-lg text-center mb-2">{story.name}</h3>
                <div className="text-center mb-4">
                  <div className="text-sm theme-text-muted">{story.from}</div>
                  <div className="text-indigo-400 font-bold my-1">→</div>
                  <div className="text-sm font-semibold text-indigo-400">{story.to}</div>
                  <div className="text-xl font-bold text-green-400 mt-2">{story.package}</div>
                </div>
                <p className="text-xs theme-text-muted text-center italic">"{story.story}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Platforms */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Top Job Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {jobPlatforms.map((platform, idx) => (
              <motion.a
                key={idx}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-card p-4 text-center border border-slate-700 hover:border-indigo-500 transition-all"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}
              >
                <div className="text-3xl mb-2">{platform.icon}</div>
                <div className="text-xs font-semibold">{platform.name}</div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center theme-card p-12 border border-indigo-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Start Your Career Journey Today</h2>
          <p className="text-lg theme-text-muted mb-8 max-w-2xl mx-auto">
            Get personalized career guidance, skill development roadmap, and direct connections to top companies
          </p>
          <div className="flex justify-center gap-4">
            <motion.a
              href="/auth/student"
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg text-lg"
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started →
            </motion.a>
            <motion.a
              href="/ai/resume"
              className="inline-block px-8 py-4 border-2 border-indigo-500 text-indigo-400 font-bold rounded-lg text-lg"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerPage;
