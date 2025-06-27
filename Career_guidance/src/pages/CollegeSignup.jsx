import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { 
  Building2, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Globe,
  Award,
  Users,
  BookOpen,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import API_URL from '../lib/api';

const CollegeSignup = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    country: '',
    website: '',
    establishedYear: '',
    accreditation: '',
    totalStudents: '',
    programs: []
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const programs = [
    'Computer Science Engineering', 'Mechanical Engineering', 'Electrical Engineering',
    'Civil Engineering', 'Electronics & Communication', 'Information Technology',
    'Business Administration', 'Data Science', 'Artificial Intelligence',
    'Biotechnology', 'Architecture', 'Chemical Engineering'
  ];

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProgramToggle = (program) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter(p => p !== program)
        : [...prev.programs, program]
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/colleges/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.collegeName,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          description: formData.address,
          students: formData.totalStudents,
          location: `${formData.city}, ${formData.state}`,
          type: formData.accreditation,
          website: formData.website,
          established: formData.establishedYear,
          phone: formData.phone,
          topPrograms: formData.programs
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Signup failed');
      } else {
        // Optionally, auto-login after signup
        const loginRes = await fetch(`${API_URL}/api/colleges/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem('collegeToken', loginData.token);
          localStorage.setItem('college', JSON.stringify(loginData.college));
          navigate('/college-dashboard');
        } else {
          alert(loginData.error || 'Login after signup failed');
        }
      }
    } catch (err) {
      alert('Network error');
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 30,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 100,
                links: {
                  opacity: 1,
                }
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: false,
        }}
        className="absolute inset-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
              >
                <GraduationCap className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  EduGuide
                </h1>
                <p className="text-sm text-blue-200 -mt-1">Your College Search Partner</p>
              </div>
            </Link>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <ArrowLeft className="h-4 w-4 text-blue-300" />
              <Link to="/" className="text-sm text-blue-300 hover:text-white transition-colors">
                Back to Home
              </Link>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-white mb-3"
            >
              Register Your College
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-blue-200 text-lg"
            >
              Join our platform and connect with thousands of students worldwide
            </motion.p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                      : 'bg-white/20 text-blue-300'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: College Information */}
              {currentStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">College Information</h3>
                    <p className="text-blue-200">Tell us about your institution</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="collegeName" className="block text-sm font-medium text-blue-200 mb-3">
                        College/University Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="collegeName"
                          name="collegeName"
                          type="text"
                          required
                          className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Enter college name"
                          value={formData.collegeName}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="establishedYear" className="block text-sm font-medium text-blue-200 mb-3">
                        Established Year
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Award className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="establishedYear"
                          name="establishedYear"
                          type="number"
                          min="1800"
                          max="2024"
                          required
                          className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="e.g., 1995"
                          value={formData.establishedYear}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-3">
                        Official Email
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="admin@college.edu"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="phone" className="block text-sm font-medium text-blue-200 mb-3">
                        Contact Phone
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="website" className="block text-sm font-medium text-blue-200 mb-3">
                      Website URL
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                      </div>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="https://www.college.edu"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label htmlFor="city" className="block text-sm font-medium text-blue-200 mb-3">
                        City
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label htmlFor="state" className="block text-sm font-medium text-blue-200 mb-3">
                        State/Province
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        className="block w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <label htmlFor="country" className="block text-sm font-medium text-blue-200 mb-3">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        className="block w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="" className="bg-slate-800">Select country</option>
                        <option value="india" className="bg-slate-800">India</option>
                        <option value="usa" className="bg-slate-800">United States</option>
                        <option value="uk" className="bg-slate-800">United Kingdom</option>
                        <option value="canada" className="bg-slate-800">Canada</option>
                        <option value="australia" className="bg-slate-800">Australia</option>
                        <option value="germany" className="bg-slate-800">Germany</option>
                        <option value="france" className="bg-slate-800">France</option>
                        <option value="singapore" className="bg-slate-800">Singapore</option>
                        <option value="other" className="bg-slate-800">Other</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label htmlFor="address" className="block text-sm font-medium text-blue-200 mb-3">
                      Full Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      required
                      className="block w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm resize-none"
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Academic Information */}
              {currentStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Academic Information</h3>
                    <p className="text-blue-200">Details about your programs and accreditation</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="accreditation" className="block text-sm font-medium text-blue-200 mb-3">
                        Accreditation
                      </label>
                      <input
                        id="accreditation"
                        name="accreditation"
                        type="text"
                        className="block w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="e.g., NAAC, AICTE, UGC"
                        value={formData.accreditation}
                        onChange={handleChange}
                      />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="totalStudents" className="block text-sm font-medium text-blue-200 mb-3">
                        Total Students
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Users className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="totalStudents"
                          name="totalStudents"
                          type="number"
                          min="1"
                          className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="e.g., 5000"
                          value={formData.totalStudents}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-blue-200 mb-4">
                      Programs Offered
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {programs.map((program, index) => (
                        <motion.button
                          key={program}
                          type="button"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          onClick={() => handleProgramToggle(program)}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 text-sm font-medium backdrop-blur-sm ${
                            formData.programs.includes(program)
                              ? 'border-purple-500 bg-purple-500/20 text-purple-200 shadow-lg shadow-purple-500/25'
                              : 'border-white/20 bg-white/10 text-blue-200 hover:border-white/40 hover:bg-white/20'
                          }`}
                        >
                          {program}
                        </motion.button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-blue-300">Select all programs you offer</p>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Account Security */}
              {currentStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Account Security</h3>
                    <p className="text-blue-200">Create a secure password for your account</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-3">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="block w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                          ) : (
                            <Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                          )}
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-blue-300">Must be at least 8 characters long</p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200 mb-3">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          className="block w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                          ) : (
                            <Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Previous
                  </motion.button>
                )}
                
                {currentStep < 3 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl ml-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2" />
                        Register College
                      </div>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Login Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-blue-200">
              Already have an account?{' '}
              <Link to="/college-login" className="font-semibold text-blue-400 hover:text-white transition-colors">
                Sign in here
              </Link>
            </p>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 grid grid-cols-3 gap-6 text-center"
          >
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <Zap className="h-6 w-6 text-yellow-400 mb-2" />
              <span className="text-sm text-blue-200">Free Registration</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <Star className="h-6 w-6 text-purple-400 mb-2" />
              <span className="text-sm text-blue-200">Student Analytics</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <Shield className="h-6 w-6 text-green-400 mb-2" />
              <span className="text-sm text-blue-200">24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSignup; 