import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMagic, FaRocket, FaRegClock, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineTemplate } from 'react-icons/hi';

const features = [
  {
    icon: <FaMagic className="h-8 w-8 text-white" />,
    title: 'AI-Powered Content Generation',
    description: "Leverage Google's Gemini AI to create compelling resumes and cover letters tailored to your industry.",
    color: 'from-purple-500 to-indigo-600',
    delay: 0.2
  },
  {
    icon: <HiOutlineTemplate className="h-8 w-8 text-white" />,
    title: 'Professional Templates',
    description: 'Choose from a variety of ATS-friendly templates designed by HR professionals.',
    color: 'from-blue-500 to-cyan-600',
    delay: 0.4
  },
  {
    icon: <FaRegClock className="h-8 w-8 text-white" />,
    title: 'Real-time Preview',
    description: 'See changes instantly as you edit, ensuring your document looks perfect before export.',
    color: 'from-green-500 to-teal-600',
    delay: 0.6
  },
  {
    icon: <FaRocket className="h-8 w-8 text-white" />,
    title: 'Quick Export',
    description: 'Export your documents in multiple formats including PDF and Word, ready for submission.',
    color: 'from-orange-500 to-pink-600',
    delay: 0.8
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    content: 'The AI suggestions helped me highlight achievements I would have otherwise overlooked. Landed my dream job!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    color: 'from-pink-500 to-rose-600',
    delay: 0.2
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    content: 'The modern templates and real-time preview feature made creating my resume a breeze.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    color: 'from-violet-500 to-purple-600',
    delay: 0.4
  }
];

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10 pt-16 pb-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
              Create Your Perfect <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Resume & Cover Letter</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-xl mx-auto">
              Craft professional resumes and cover letters in minutes with our AI-powered builder.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/signup" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white font-medium hover:from-blue-600 hover:to-purple-700">
                Get Started Free
              </Link>
              <Link to="/login" className="px-6 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold">Everything you need to land your dream job</h2>
            <p className="mt-4 text-lg text-gray-400">Our AI-powered platform helps you create professional documents that get noticed.</p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative p-6 bg-gray-800 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${feature.color}`} />
                <div className="relative z-10 flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-300 mt-2">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">Trusted by job seekers worldwide</h2>
            <p className="mt-4 text-lg text-gray-400">See what our users have to say about their success stories.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="relative bg-gray-900 p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: t.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${t.color} opacity-10 rounded-xl`} />
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white" />
                    <div>
                      <h4 className="font-bold text-white">{t.name}</h4>
                      <span className="text-blue-400 text-sm">{t.role}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">{t.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white">Ready to boost your career?</h2>
          <p className="mt-4 text-lg text-gray-200">Join thousands of professionals who have landed their dream jobs using our platform.</p>
          <Link to="/signup" className="mt-6 inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100">
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400">&copy; 2025 Smart Resume Builder. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaGithub className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
