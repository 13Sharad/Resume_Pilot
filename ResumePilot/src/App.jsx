import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navigation from './components/layout/Navigation';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import ResumeBuilder from './components/resume/ResumeBuilder';
import CoverLetterBuilder from './components/coverletter/CoverLetterBuilder.jsx';
import ATSScoreChecker from './components/dashboard/ATSScoreChecker';
import LandingPage from './components/landing/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes accessible to logged in users, including guests */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <ResumeBuilder />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cover-letter"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <CoverLetterBuilder />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ats-checker"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <ATSScoreChecker />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
