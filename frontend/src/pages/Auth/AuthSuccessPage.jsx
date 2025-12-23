import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { me } from "../../api/authApi";

export default function AuthSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token) {
      setToken(token);
      
      // Fetch user details
      me(token)
        .then((user) => {
          setUser(user);
          navigate("/dashboard/student");
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          navigate("/auth/student");
        });
    } else {
      navigate("/auth/student");
    }
  }, [searchParams, setToken, setUser, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="text-slate-400 mt-4">Completing sign in...</p>
      </div>
    </div>
  );
}
