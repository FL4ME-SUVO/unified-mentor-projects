import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Award, 
  TrendingUp, 
  Brain, 
  Target, 
  ArrowRight,
  ArrowLeft,
  Star,
  Trophy,
  Lightbulb,
  BookOpen,
  Users,
  BarChart3,
  GraduationCap
} from 'lucide-react';

const TestCompletion = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Simulate score calculation
    const timer = setTimeout(() => {
      setScore(Math.floor(Math.random() * 3) + 3); // Random score between 3-5
      setShowResults(true);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const percentage = (score / totalQuestions) * 100;
  const performance = percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Average' : 'Needs Improvement';

  const recommendations = [
    {
      icon: Brain,
      title: "Logical Reasoning",
      description: "Your logical thinking skills are strong. Consider careers in computer science, engineering, or law.",
      strength: "High"
    },
    {
      icon: BookOpen,
      title: "Verbal Ability", 
      description: "Good communication skills. Great for careers in marketing, journalism, or education.",
      strength: "Medium"
    },
    {
      icon: BarChart3,
      title: "Numerical Skills",
      description: "Solid mathematical foundation. Consider finance, accounting, or data science.",
      strength: "High"
    }
  ];

  const nextSteps = [
    {
      icon: Target,
      title: "Explore Careers",
      description: "Discover career paths that match your aptitude strengths"
    },
    {
      icon: GraduationCap,
      title: "Find Colleges",
      description: "Browse colleges that excel in your areas of interest"
    },
    {
      icon: Users,
      title: "Connect with Mentors",
      description: "Get guidance from professionals in your chosen field"
    }
  ];

  const sections = [
    {
      title: "Your Score",
      content: (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-48 h-48 mx-auto mb-8"
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                className="text-blue-600"
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percentage / 100) }}
                transition={{ duration: 2, delay: 1 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <div className="text-3xl font-bold text-gray-900">{score}/{totalQuestions}</div>
                <div className="text-lg text-gray-600">{percentage}%</div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mb-6"
          >
            <div className="text-2xl font-bold text-gray-900 mb-2">{performance}</div>
            <p className="text-gray-600">Great job on completing the aptitude test!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="flex justify-center space-x-4"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 2.2 + i * 0.1 }}
              >
                <Star className={`h-8 w-8 ${i < score ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )
    },
    {
      title: "Your Strengths",
      content: (
        <div className="space-y-6">
          {recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-3 bg-blue-100 rounded-xl"
                  >
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rec.strength === 'High' ? 'bg-green-100 text-green-800' :
                        rec.strength === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rec.strength}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{rec.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )
    },
    {
      title: "Next Steps",
      content: (
        <div className="space-y-6">
          {nextSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-blue-600"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )
    }
  ];

  if (!showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <Brain className="w-full h-full text-blue-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Results...</h2>
          <p className="text-gray-600">Please wait while we process your test results</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-6"
          >
            <Trophy className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Completed!</h1>
          <p className="text-xl text-gray-600">Here's your detailed analysis and recommendations</p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            {sections.map((section, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSection(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentSection === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {section.title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          {sections[currentSection].content}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/career-selection"
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 shadow-xl text-lg"
            >
              <span>Explore Careers</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 bg-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full"
          >
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Your results have been saved!</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestCompletion;