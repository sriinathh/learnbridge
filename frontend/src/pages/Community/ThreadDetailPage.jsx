import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar.jsx';
import CommentList from '../../components/forum/CommentList.jsx';
import { getPost, addComment, likePost } from '../../api/forumApi.js';
import { connectSocket, disconnectSocket, getSocket } from '../../utils/socketClient.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { motion } from 'framer-motion';

const ThreadDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const { data } = await getPost(id);
      setPost(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();

    // Connect to WebSocket for real-time updates
    const token = localStorage.getItem('lb_token');
    if (token) {
      const socket = connectSocket(token);

      // Listen for new comments
      socket.on('comment-added', ({ comment, postId }) => {
        if (postId === id) {
          setPost((prev) => ({
            ...prev,
            comments: [...(prev.comments || []), comment],
          }));
        }
      });

      // Listen for like updates
      socket.on('post-like-updated', ({ postId, likes }) => {
        if (postId === id) {
          setPost((prev) => ({
            ...prev,
            likes: { length: likes },
          }));
        }
      });

      // Listen for typing indicators
      socket.on('user-typing', ({ userName, postId }) => {
        if (postId === id && userName !== user?.name) {
          setTypingUsers((prev) => {
            if (!prev.includes(userName)) {
              return [...prev, userName];
            }
            return prev;
          });
        }
      });

      socket.on('user-stopped-typing', ({ postId }) => {
        if (postId === id) {
          setTypingUsers([]);
        }
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [id, user]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await addComment(id, { content: commentText });
      setCommentText('');
      // Socket will handle the real-time update
    } catch (err) {
      console.error(err);
      alert('Failed to comment');
    }
  };

  const handleLike = async () => {
    try {
      await likePost(id);
      // Socket will handle the real-time update
    } catch (err) {
      console.error(err);
    }
  };

  const handleTyping = () => {
    const socket = getSocket();
    if (socket && commentText.trim()) {
      socket.emit('typing', { postId: id });
    } else {
      const socket = getSocket();
      if (socket) {
        socket.emit('stop-typing', { postId: id });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, 500);

    return () => clearTimeout(timer);
  }, [commentText]);

  if (loading && !post) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 pt-24 pb-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-xs text-slate-400 mt-2">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 pt-24 pb-10 text-xs">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-10 space-y-5 text-xs">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-slate-50 mb-1">{post.title}</h1>
              <p className="text-[11px] text-slate-400">
                {post.author?.name || 'User'} · {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            {post.facultyVerified && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-300 border border-emerald-500/40">
                Faculty Verified
              </span>
            )}
          </div>
          <p className="mb-3 text-sm text-slate-200 whitespace-pre-line">{post.content}</p>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {post.tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] text-sky-200 border border-sky-500/25"
                >
                  #{t}
                </span>
              ))}
            </div>
            <button
              onClick={handleLike}
              className="rounded-full border border-slate-700 px-3 py-1.5 text-[11px] text-slate-200 hover:bg-slate-800 transition"
            >
              ❤️ {post.likes?.length || 0} Like
            </button>
          </div>
        </motion.article>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">
              Answers ({post.comments?.length || 0})
            </h2>
            {typingUsers.length > 0 && (
              <p className="text-[10px] text-emerald-400 animate-pulse">
                {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
              </p>
            )}
          </div>
          <CommentList comments={post.comments || []} />
          <form onSubmit={submitComment} className="mt-3 space-y-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              placeholder="Write your answer or suggestion..."
              className="w-full rounded-md bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-1 ring-slate-700 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-4 py-2 text-[11px] font-semibold text-white hover:bg-indigo-400 transition"
            >
              Post Answer
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
};

export default ThreadDetailPage;
