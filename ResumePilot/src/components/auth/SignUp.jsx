import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn, guestLogin  } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/dashboard');
    } catch {
      setError('Failed to sign up with Google');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="text-sm text-blue-100 mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-300 bg-red-500/10 p-3 rounded border border-red-500/20 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3.5 text-blue-300" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-xl placeholder-blue-200 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-3.5 text-blue-300" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-xl placeholder-blue-200 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-3.5 text-blue-300" />
            <input
              type="password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-xl placeholder-blue-200 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={async () => {
              try {
                setError('');
                setLoading(true);
                await guestLogin(); // now sets guestMode true & fake user
                navigate('/dashboard');
              } catch {
                setError('Guest sign-in failed');
              }
              setLoading(false);
            }}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all mt-4"
          >
            Continue as Guest
          </motion.button>
        </form>

        <div className="flex items-center justify-between my-6">
          <hr className="border-white/20 w-1/3" />
          <span className="text-sm text-white/60">or</span>
          <hr className="border-white/20 w-1/3" />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
        >
          <FaGoogle className="text-red-400" />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
