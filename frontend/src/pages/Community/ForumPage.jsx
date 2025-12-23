import React, { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import PostCard from '../../components/forum/PostCard.jsx';
import { fetchPosts, createPost } from '../../api/forumApi.js';
import { connectSocket, disconnectSocket, getSocket } from '../../utils/socketClient.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const ForumPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [typingUsers, setTypingUsers] = useState({});
  const [newPostNotification, setNewPostNotification] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();

    // Connect to WebSocket
    const token = localStorage.getItem('lb_token');
    if (token) {
      const socket = connectSocket(token);

      // Listen for new posts
      socket.on('post-created', (newPost) => {
        setPosts((prev) => [newPost, ...prev]);
        setNewPostNotification(`New post: ${newPost.title}`);
        setTimeout(() => setNewPostNotification(null), 5000);
      });

      // Listen for new comments
      socket.on('comment-added', ({ comment, postId }) => {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, commentsCount: (post.commentsCount || 0) + 1 }
              : post
          )
        );
      });

      // Listen for like updates
      socket.on('post-like-updated', ({ postId, likes }) => {
        setPosts((prev) =>
          prev.map((post) => (post._id === postId ? { ...post, likes: { length: likes } } : post))
        );
      });

      // Listen for typing indicators
      socket.on('user-typing', ({ userName, postId }) => {
        setTypingUsers((prev) => ({
          ...prev,
          [postId]: userName,
        }));
      });

      socket.on('user-stopped-typing', ({ postId }) => {
        setTypingUsers((prev) => {
          const updated = { ...prev };
          delete updated[postId];
          return updated;
        });
      });

      return () => {
        disconnectSocket();
      };
    }
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createPost({
        title: form.title,
        content: form.content,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      
      // Socket will handle the real-time update
      setForm({ title: '', content: '', tags: '' });
      setCreateMode(false);
    } catch (err) {
      console.error(err);
      alert('Failed to post');
    }
  };

  return (
    <div className="min-h-screen theme-bg">
      <Navbar />
      
      {/* New Post Notification */}
      <AnimatePresence>
        {newPostNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {newPostNotification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold theme-text">Community Forum</h1>
            <p className="text-xs theme-text-muted">
              Ask doubts, share resources, and get faculty-verified answers in real time.
              <span className="ml-2 text-emerald-400">● Live</span>
            </p>
          </div>
          <button
            onClick={() => setCreateMode((v) => !v)}
            className="rounded-full bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-400 transition"
          >
            {createMode ? 'Cancel' : '+ New Post'}
          </button>
        </div>

        {createMode && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleCreate}
            className="space-y-2 theme-card text-xs"
          >
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title your question..."
              className="theme-input"
              required
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Explain your doubt or start a discussion..."
              rows={4}
              className="theme-input"
              required
            />
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Tags (comma-separated, e.g. react, dsa, placements)"
              className="theme-input"
            />
            <button
              type="submit"
              className="rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Post Question
            </button>
          </motion.form>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-xs theme-text-muted mt-2">Loading posts...</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} typingUser={typingUsers[p._id]} />
          ))}
        </div>

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-slate-400">No posts yet. Be the first to post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
