import React from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { motion } from 'framer-motion';

const CommunityPage = () => {
  const { theme } = useTheme();

  const communityFeatures = [
    {
      icon: '👥',
      title: 'Study Groups',
      description: 'Join or create study groups with peers learning similar technologies',
      members: '5,000+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💬',
      title: 'Discussion Forums',
      description: 'Get help, share knowledge, and discuss topics with the community',
      posts: '50K+',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🎤',
      title: 'Live Sessions',
      description: 'Weekly live coding sessions, workshops, and Q&A with industry experts',
      sessions: '100+',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🏆',
      title: 'Coding Challenges',
      description: 'Participate in weekly coding challenges and compete with peers',
      challenges: '200+',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📝',
      title: 'Knowledge Base',
      description: 'Access curated articles, tutorials, and guides written by the community',
      articles: '1,000+',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🤝',
      title: 'Mentorship Program',
      description: 'Get paired with experienced developers for 1-on-1 guidance',
      mentors: '500+',
      color: 'from-teal-500 to-green-500'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'SDE at Amazon',
      image: '👩‍💻',
      quote: 'The community helped me land my dream job. The mock interviews and peer support were invaluable!',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Rahul Kumar',
      role: 'Full Stack Developer at Google',
      image: '👨‍💻',
      quote: 'Best learning community I\'ve ever been part of. The mentorship program changed my career trajectory.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Ananya Reddy',
      role: 'Software Engineer at Microsoft',
      image: '👩‍💼',
      quote: 'Weekly coding challenges kept me motivated. Made lifelong friends and learned so much together!',
      color: 'from-purple-500 to-pink-500'
    }
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
            Join Our Community
          </h1>
          <p className="text-lg theme-text-muted max-w-3xl mx-auto">
            Learn, grow, and succeed together with thousands of passionate developers
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: '10K+', label: 'Active Members' },
            { value: '500+', label: 'Daily Posts' },
            { value: '100+', label: 'Weekly Events' },
            { value: '95%', label: 'Placement Rate' }
          ].map((stat, idx) => (
            <div key={idx} className="theme-card p-6 text-center border border-indigo-500/30">
              <div className="text-3xl font-bold text-indigo-400 mb-2">{stat.value}</div>
              <div className="text-sm theme-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {communityFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              className="theme-card p-6 border border-slate-700 hover:border-indigo-500 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm theme-text-muted mb-3">
                {feature.description}
              </p>
              <div className="text-xs text-indigo-400 font-semibold">
                {feature.members || feature.posts || feature.sessions || feature.challenges || feature.articles || feature.mentors} {feature.members ? 'Members' : feature.posts ? 'Posts' : feature.sessions ? 'Sessions' : feature.challenges ? 'Challenges' : feature.articles ? 'Articles' : 'Mentors'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="theme-card p-6 border border-slate-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl mb-4`}>
                  {testimonial.image}
                </div>
                <p className="text-sm theme-text-muted italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-xs text-indigo-400">{testimonial.role}</div>
                </div>
              </motion.div>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-lg theme-text-muted mb-8 max-w-2xl mx-auto">
            Become part of India's fastest-growing tech learning community
          </p>
          <motion.a
            href="/auth/student"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg text-lg"
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            Join Community →
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;
