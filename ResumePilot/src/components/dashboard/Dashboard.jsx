import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileAlt, FaEnvelope, FaSignOutAlt, FaUser, FaChartBar } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const DashboardCard = ({ icon: Icon, title, description, link, gradient }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="relative group transition-all"
  >
    <div className={`absolute inset-0 rounded-2xl ${gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm`} />
    <Link
      to={link}
      className="relative z-10 block h-full p-4 sm:p-8 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className={`p-3 sm:p-4 rounded-xl ${gradient} shadow-md`}>
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <motion.div
          className="h-1.5 w-16 bg-gradient-to-r from-transparent to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-300">{description}</p>
      <div className="mt-4 sm:mt-6">
        <span className="inline-flex items-center text-blue-400 hover:text-blue-300 transition text-sm sm:text-base">
          Get Started
          <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </div>
    </Link>
  </motion.div>
);

const ProfileCard = ({ user, onLogout }) => (
  <motion.div
    variants={itemVariants}
    className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-md"
  >
    <div className="absolute top-0 right-0 p-3 sm:p-4">
      <button
        onClick={onLogout}
        className="text-gray-400 hover:text-red-400 transition"
        title="Sign Out"
      >
        <FaSignOutAlt className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
    <div className="flex items-center space-x-3 sm:space-x-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 rounded-xl shadow-lg">
        <FaUser className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white">{user?.email?.split('@')[0] || 'User'}</h3>
        <p className="text-sm sm:text-base text-gray-400">{user?.email}</p>
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  const dashboardCards = [
    {
      icon: FaFileAlt,
      title: 'Resume Builder',
      description: 'Create and customize your professional resume with our AI-powered tools',
      link: '/resume',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600'
    },
    {
      icon: FaEnvelope,
      title: 'Cover Letter',
      description: 'Generate compelling cover letters tailored to your job applications',
      link: '/cover-letter',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-600'
    },
    {
      icon: FaChartBar,
      title: 'ATS Score Checker',
      description: 'Check your resume\'s ATS compatibility and get detailed insights',
      link: '/ats-checker',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-600'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-6 sm:py-12 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400 via-blue-500 to-transparent"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header + Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-14">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {currentUser?.email?.split('@')[0] || 'User'}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Ready to create your next masterpiece? Let's get started!
            </p>
          </motion.div>
          <ProfileCard user={currentUser} onLogout={handleLogout} />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {dashboardCards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
