import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileUpload, FaChartBar } from 'react-icons/fa';

const ATSScoreChecker = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'application/msword' || uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(uploadedFile);
      // Here you would typically send the file to your backend for ATS analysis
      // For now, we'll simulate a score
      setLoading(true);
      setTimeout(() => {
        setScore({
          overall: 85,
          keywords: 90,
          formatting: 80,
          skills: 85,
          experience: 88
        });
        setLoading(false);
      }, 2000);
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const ScoreCard = ({ title, score, color }) => (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
      <h4 className="text-gray-400 text-sm mb-2">{title}</h4>
      <div className="flex items-center">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${color}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span className="ml-2 text-white font-semibold">{score}%</span>
      </div>
    </div>
  );

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-md">
              <FaChartBar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <motion.div
              className="h-1.5 w-16 bg-gradient-to-r from-transparent to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">ATS Score Checker</h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
            Upload your resume to check its ATS compatibility and get detailed insights
          </p>

          {!score ? (
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-4 sm:p-8 text-center">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaFileUpload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
                <span className="text-sm sm:text-base text-gray-300 mb-2">
                  {file ? file.name : 'Click to upload your resume'}
                </span>
                <span className="text-xs sm:text-sm text-gray-400">
                  Supports PDF and Word documents
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Overall Score</h4>
                <div className="flex items-center justify-center">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-700"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="10"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * score.overall) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-white">{score.overall}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ScoreCard title="Keywords Match" score={score.keywords} color="bg-blue-500" />
                <ScoreCard title="Formatting" score={score.formatting} color="bg-purple-500" />
                <ScoreCard title="Skills" score={score.skills} color="bg-yellow-500" />
                <ScoreCard title="Experience" score={score.experience} color="bg-pink-500" />
              </div>

              <button
                onClick={() => {
                  setFile(null);
                  setScore(null);
                }}
                className="mt-6 w-full py-2 sm:py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-sm sm:text-base"
              >
                Upload Another Resume
              </button>
            </div>
          )}

          {loading && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-gray-300 border-t-green-500"></div>
              <p className="mt-2 text-sm sm:text-base text-gray-400">Analyzing your resume...</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ATSScoreChecker;