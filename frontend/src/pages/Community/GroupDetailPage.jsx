import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { motion } from 'framer-motion';

const GroupDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [newResource, setNewResource] = useState({ title: '', url: '' });
  const [showResourceModal, setShowResourceModal] = useState(false);

  const groupInfo = {
    id: 1,
    name: 'MERN Stack Warriors',
    description: 'A community for developers learning and mastering the MERN stack (MongoDB, Express, React, Node.js). Share projects, ask questions, and grow together!',
    members: 245,
    created: '3 months ago',
    topic: 'Web Development',
    activity: 'Very Active',
    emoji: '🌐',
    isAdmin: false,
    isMember: true
  };

  const messages = [
    { id: 1, user: 'Alex Kumar', avatar: '👨‍💻', message: 'Hey everyone! Just deployed my first MERN app to Heroku 🎉', time: '10:30 AM', isOwn: false },
    { id: 2, user: 'Sarah Chen', avatar: '👩‍💼', message: 'Congrats Alex! Did you use MongoDB Atlas for the database?', time: '10:32 AM', isOwn: false },
    { id: 3, user: 'You', avatar: '😊', message: 'That\'s awesome! I\'m working on authentication with JWT right now.', time: '10:35 AM', isOwn: true },
    { id: 4, user: 'Raj Patel', avatar: '🧑‍💻', message: 'Nice! For JWT, make sure to store the refresh token securely. I can share my implementation if you want.', time: '10:38 AM', isOwn: false },
    { id: 5, user: 'You', avatar: '😊', message: 'That would be really helpful, thanks!', time: '10:40 AM', isOwn: true },
    { id: 6, user: 'Emily Watson', avatar: '👩‍🎓', message: 'Anyone working on real-time features with Socket.io?', time: '10:45 AM', isOwn: false }
  ];

  const members = [
    { id: 1, name: 'Alex Kumar', avatar: '👨‍💻', role: 'Admin', level: 'Expert', joinedDays: 90 },
    { id: 2, name: 'Sarah Chen', avatar: '👩‍💼', role: 'Moderator', level: 'Expert', joinedDays: 85 },
    { id: 3, name: 'You', avatar: '😊', role: 'Member', level: 'Intermediate', joinedDays: 30 },
    { id: 4, name: 'Raj Patel', avatar: '🧑‍💻', role: 'Member', level: 'Advanced', joinedDays: 75 },
    { id: 5, name: 'Emily Watson', avatar: '👩‍🎓', role: 'Member', level: 'Intermediate', joinedDays: 60 },
    { id: 6, name: 'Michael Zhang', avatar: '👨‍🎓', role: 'Member', level: 'Advanced', joinedDays: 45 },
    { id: 7, name: 'Priya Sharma', avatar: '👩‍💻', role: 'Member', level: 'Beginner', joinedDays: 15 },
    { id: 8, name: 'David Lee', avatar: '🧑‍💼', role: 'Member', level: 'Intermediate', joinedDays: 20 }
  ];

  const resources = [
    { id: 1, title: 'React Hooks Complete Guide', type: 'article', url: 'https://example.com', sharedBy: 'Alex Kumar', date: '2 days ago', likes: 15 },
    { id: 2, title: 'MongoDB Aggregation Tutorial', type: 'video', url: 'https://youtube.com', sharedBy: 'Sarah Chen', date: '3 days ago', likes: 22 },
    { id: 3, title: 'Express.js Best Practices', type: 'document', url: 'https://docs.com', sharedBy: 'Raj Patel', date: '5 days ago', likes: 18 },
    { id: 4, title: 'JWT Authentication Implementation', type: 'code', url: 'https://github.com', sharedBy: 'Emily Watson', date: '1 week ago', likes: 31 },
    { id: 5, title: 'Socket.io Real-time Chat', type: 'project', url: 'https://example.com', sharedBy: 'Michael Zhang', date: '1 week ago', likes: 25 }
  ];

  const events = [
    { id: 1, title: 'Weekly Code Review Session', date: 'Tomorrow, 6:00 PM', attendees: 12, type: 'online' },
    { id: 2, title: 'MERN Stack Project Showcase', date: 'Friday, 7:00 PM', attendees: 28, type: 'online' },
    { id: 3, title: 'MongoDB Performance Workshop', date: 'Next Week Mon, 5:00 PM', attendees: 45, type: 'online' }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const shareResource = () => {
    console.log('Sharing resource:', newResource);
    setShowResourceModal(false);
    setNewResource({ title: '', url: '' });
  };

  const getResourceIcon = (type) => {
    const icons = {
      article: '📄',
      video: '🎥',
      document: '📋',
      code: '💻',
      project: '🚀'
    };
    return icons[type] || '📎';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10">
        {/* Group Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{groupInfo.emoji}</div>
              <div>
                <h1 className="text-3xl font-bold">{groupInfo.name}</h1>
                <p className="text-slate-400 mt-1">{groupInfo.members} members • Created {groupInfo.created}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-300 hover:bg-slate-800 transition">
                ⚙️ Settings
              </button>
              <button className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500 transition">
                Leave Group
              </button>
            </div>
          </div>
          <p className="text-slate-300">{groupInfo.description}</p>
          <div className="flex gap-3 mt-4">
            <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded">{groupInfo.topic}</span>
            <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded">{groupInfo.activity}</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'chat'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'members'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            👥 Members ({members.length})
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'resources'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📚 Resources ({resources.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'events'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📅 Events ({events.length})
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 lb-scroll">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.isOwn ? 'bg-cyan-600' : 'bg-slate-800'} rounded-lg p-4`}>
                      {!msg.isOwn && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{msg.avatar}</span>
                          <span className="text-sm font-semibold">{msg.user}</span>
                        </div>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <div className="text-xs text-slate-400 mt-2">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: member.id * 0.05 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 hover:border-cyan-500/50 transition"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-3">{member.avatar}</div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <div className="text-xs text-slate-400 mb-2">{member.level}</div>
                    <div className="text-xs bg-slate-800 px-2 py-1 rounded mb-2">{member.role}</div>
                    <div className="text-xs text-slate-500">Joined {member.joinedDays} days ago</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowResourceModal(true)}
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition"
              >
                + Share Resource
              </button>
            </div>
            <div className="space-y-3">
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: resource.id * 0.05 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-cyan-500/50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="text-3xl">{getResourceIcon(resource.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{resource.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">Shared by {resource.sharedBy} • {resource.date}</p>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline">
                          {resource.url}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-slate-400 hover:text-red-400">
                        ❤️ {resource.likes}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: event.id * 0.1 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-cyan-500/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">📅 {event.date}</p>
                    <p className="text-sm text-slate-400">👥 {event.attendees} attending</p>
                  </div>
                  <button className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition">
                    Join Event
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Share Resource Modal */}
        {showResourceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-4">Share Resource</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    placeholder="e.g., React Hooks Tutorial"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">URL</label>
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={shareResource}
                  className="flex-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition"
                >
                  Share
                </button>
                <button
                  onClick={() => setShowResourceModal(false)}
                  className="flex-1 rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link
            to="/community-groups"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            ← Back to Groups
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
