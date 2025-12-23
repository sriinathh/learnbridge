import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import ThemeSwitcher from './ThemeSwitcher.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goDashboard = () => {
    if (!user) return;
    if (user.role === 'student') navigate('/dashboard/student');
    else if (user.role === 'faculty') navigate('/dashboard/faculty');
    else navigate('/dashboard/admin');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 border-b backdrop-blur" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.95)' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
  <img
    src="https://res.cloudinary.com/dfeyi8eom/image/upload/Black_White_Minimal_Modern_Beauty_Fashion_Brand_Logo_gbtljp.png"
    alt="LearnBridge Logo"
    className="h-8 w-8 rounded-lg object-cover"
  />

  <span className="text-sm font-semibold tracking-widest text-white">
    LEARNBRIDGE+ <span className="text-indigo-400"></span>
  </span>
</Link>

        
        <div className="flex items-center gap-3 text-xs">
          <Link to="/features" className="text-slate-200 hover:text-white transition">
            Features
          </Link>
          <Link to="/community-info" className="text-slate-200 hover:text-white transition">
            Community
          </Link>
          <Link to="/careers" className="text-slate-200 hover:text-white transition">
            Careers
          </Link>
          
          {user ? (
            <>
              <button
                onClick={goDashboard}
                className="rounded-full bg-indigo-500 px-3 py-1.5 font-semibold text-white hover:bg-indigo-400"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="rounded-full border border-slate-600 px-3 py-1.5 text-slate-200 hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth/student"
              className="rounded-full bg-indigo-500 px-3 py-1.5 font-semibold text-white hover:bg-indigo-400"
            >
              Join Now
            </Link>

          )}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;