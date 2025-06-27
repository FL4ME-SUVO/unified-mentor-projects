import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  MapPin, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  Globe, 
  Search, 
  CheckCircle, 
  Star,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Heart,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  ArrowUp,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  Calendar,
  BookOpenCheck,
  GraduationCap as GraduationCapIcon,
  Building2,
  Briefcase,
  Lightbulb,
  Rocket,
  Eye,
  EyeOff,
  Lock,
  User,
  Phone as PhoneIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  UserCheck,
  Brain,
  Code,
  Microscope,
  Palette,
  Calculator,
  BookOpen as BookOpenIcon,
  Building,
  School,
  University,
  Crown,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Database,
  X,
  Menu,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [college, setCollege] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    let scrollTimeout;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          // Use 15px threshold for immediate response
          setIsScrolled(scrollTop > 15);
          setIsScrolling(true);
          
          // Clear previous timeout
          clearTimeout(scrollTimeout);
          
          // Set timeout to detect when scrolling stops
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Check for logged-in user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
    // Check for logged-in college
    const storedCollege = localStorage.getItem('college');
    if (storedCollege) setCollege(JSON.parse(storedCollege));
    else setCollege(null);
  }, []);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      icon: <Code className="w-8 h-8 text-blue-600" />,
      text: "EduGuide helped me find the perfect engineering college. The aptitude test was incredibly accurate!",
      college: "IIT Bombay"
    },
    {
      name: "Arjun Patel",
      role: "Business Student",
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      text: "The college comparison feature saved me hours of research. Highly recommended!",
      college: "Stanford University"
    },
    {
      name: "Zara Khan",
      role: "Medical Student",
      icon: <Microscope className="w-8 h-8 text-purple-600" />,
      text: "Found my dream medical school through EduGuide's comprehensive database.",
      college: "Harvard Medical School"
    }
  ];

  const features = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Comprehensive Database",
      description: "Access detailed information on 500+ colleges worldwide with real-time data."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "AI-Powered Matching",
      description: "Get personalized college recommendations based on your profile and preferences."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Aptitude Assessment",
      description: "Take comprehensive tests to understand your strengths and career potential."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Explore opportunities in India and abroad with our extensive network."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Information",
      description: "All data is verified and updated regularly for accuracy and reliability."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Results",
      description: "Get immediate insights and recommendations without waiting."
    }
  ];

  const stats = [
    { number: "500+", label: "Colleges", icon: <Building2 className="h-6 w-6" /> },
    { number: "50K+", label: "Students", icon: <Users className="h-6 w-6" /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <MessageCircle className="h-6 w-6" /> }
  ];

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Founder & CEO",
      icon: <Crown className="w-8 h-8 text-blue-600" />,
      bio: "Former IIT professor with 15+ years in education technology"
    },
    {
      name: "Arjun Patel",
      role: "CTO",
      icon: <Brain className="w-8 h-8 text-green-600" />,
      bio: "Tech leader with expertise in AI and machine learning"
    },
    {
      name: "Zara Khan",
      role: "Head of Product",
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      bio: "Product strategist focused on user experience and growth"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-100 ease-out navbar-optimized navbar-transition ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-110 navbar-item">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-[color,background] duration-100 ease-out navbar-item ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}>
                  EduGuide
                </h1>
                <p className={`text-xs transition-[color] duration-100 ease-out -mt-1 navbar-item ${
                  isScrolled ? 'text-gray-500' : 'text-white/80'
                }`}>
                  Your College Search Partner
                </p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#about" className={`transition-all duration-200 ease-out font-medium text-sm px-3 py-2 rounded-lg transform hover:scale-105 navbar-item ${
                isScrolled 
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white hover:bg-white/20'
              }`}>
                About
              </a>
              <a href="#features" className={`transition-all duration-200 ease-out font-medium text-sm px-3 py-2 rounded-lg transform hover:scale-105 navbar-item ${
                isScrolled 
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white hover:bg-white/20'
              }`}>
                Features
              </a>
              <a href="#contact" className={`transition-all duration-200 ease-out font-medium text-sm px-3 py-2 rounded-lg transform hover:scale-105 navbar-item ${
                isScrolled 
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white hover:bg-white/20'
              }`}>
                Contact
              </a>
              {user ? (
                <>
                  <Link to="/student-dashboard" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition mr-2">
                    Dashboard
                  </Link>
                  <div className="relative">
                    <button onClick={() => setShowUserMenu(v => !v)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
                      <User className="h-5 w-5" />
                      <span>{user.name.split(' ')[0]}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); window.location.reload(); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              ) : college ? (
                <>
                  <Link to="/college-dashboard" className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium hover:bg-green-200 transition mr-2">
                    Dashboard
                  </Link>
                  <div className="relative">
                    <button onClick={() => setShowUserMenu(v => !v)} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">
                      <Building2 className="h-5 w-5" />
                      <span>{college.name.split(' ')[0]}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                        <button onClick={() => { localStorage.removeItem('collegeToken'); localStorage.removeItem('college'); setCollege(null); window.location.reload(); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/student-login" className={`transition-all duration-200 ease-out font-medium text-sm px-3 py-2 rounded-lg transform hover:scale-105 navbar-item ${
                isScrolled 
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white hover:bg-white/20'
              }`}>
                Student Login
              </Link>
                  <Link to="/college-login" className={`transition-all duration-200 ease-out font-medium text-sm px-3 py-2 rounded-lg transform hover:scale-105 navbar-item ${
                isScrolled 
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white hover:bg-white/20'
              }`}>
                College Portal
              </Link>
                  <Link to="/student-signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 ease-out transform hover:scale-105 font-medium text-sm navbar-item">
                Get Started
              </Link>
                </>
              )}
            </nav>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-lg transition-all duration-200 ease-out transform hover:scale-110 navbar-item ${
                  isScrolled 
                    ? 'hover:bg-gray-100 text-gray-600' 
                    : 'hover:bg-white/20 text-white'
                }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md animate-fade-in mobile-menu-optimized">
          <div className="absolute top-0 left-0 right-0 bg-slate-900/95 shadow-2xl p-8 animate-slide-down mobile-menu-optimized">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all duration-300 ease-out transform hover:scale-110 navbar-item"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center space-y-8 text-center pt-16">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold text-slate-100 hover:text-blue-400 transition-all duration-300 ease-out transform hover:scale-105 navbar-item">
                  About
                </a>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold text-slate-100 hover:text-blue-400 transition-all duration-300 ease-out transform hover:scale-105 navbar-item">
                  Features
                </a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold text-slate-100 hover:text-blue-400 transition-all duration-300 ease-out transform hover:scale-105 navbar-item">
                  Contact
                </a>
                <div className="w-4/5 h-px bg-slate-700 my-4"></div>
              {user ? (
                <div className="w-full flex flex-col items-center space-y-2">
                  <Link to="/student-dashboard" className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition mb-2 text-center">
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium">
                    <User className="h-5 w-5" />
                    <span>{user.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); window.location.reload(); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 bg-white rounded mt-2">Logout</button>
                </div>
              ) : college ? (
                <div className="w-full flex flex-col items-center space-y-2">
                  <Link to="/college-dashboard" className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium hover:bg-green-200 transition mb-2 text-center">
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-xl font-medium">
                    <Building2 className="h-5 w-5" />
                    <span>{college.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={() => { localStorage.removeItem('collegeToken'); localStorage.removeItem('college'); setCollege(null); window.location.reload(); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 bg-white rounded mt-2">Logout</button>
                </div>
              ) : (
                <>
                  <Link to="/student-login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-slate-200 hover:text-blue-400 transition-all duration-300 ease-out transform hover:scale-105 navbar-item">
                  Student Login
                </Link>
                  <Link to="/college-login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-slate-200 hover:text-blue-400 transition-all duration-300 ease-out transform hover:scale-105 navbar-item">
                  College Portal
                </Link>
                  <Link to="/student-signup" onClick={() => setIsMobileMenuOpen(false)} className="mt-6 w-full max-w-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300 ease-out transform hover:scale-105 font-semibold text-lg navbar-item">
                  Get Started
                </Link>
                </>
              )}
              </div>
          </div>
        </div>
        )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900 w-full">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: {
                color: {
                  value: "transparent",
                },
              },
              fpsLimit: 20,
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
                  distance: 120,
                  enable: true,
                  opacity: 0.6,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: isScrolling ? 0.1 : 0.3,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 600,
                  },
                  value: isScrolling ? 20 : 40,
                },
                opacity: {
                  value: 0.8,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 3, max: 5 },
                },
              },
              detectRetina: false,
              fullScreen: {
                enable: false,
                zIndex: -1
              },
              responsive: [
                {
                  breakpoint: 768,
                  options: {
                    particles: {
                      number: {
                        value: 20
                      },
                      links: {
                        distance: 100
                      }
                    }
                  }
                }
              ]
            }}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-slate-800 text-blue-400 rounded-full text-sm font-medium mb-8"
            >
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ students worldwide
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight px-4"
            >
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-200 to-indigo-100 bg-clip-text text-transparent"> College Path</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Discover engineering and management universities worldwide. Get personalized recommendations, 
              take aptitude tests, and make informed decisions about your educational future.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/student-signup"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 shadow-xl flex items-center justify-center text-base sm:text-lg w-full"
                >
                  Start Your Journey <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/college-list"
                  className="group border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center text-base sm:text-lg bg-white w-full"
                >
                  <Search className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Browse Colleges
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/career-selection"
                  className="group border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-300 flex items-center justify-center text-base sm:text-lg bg-white w-full"
                >
                  <Briefcase className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Browse Careers
                </Link>
            </motion.div>
            </motion.div>
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 sm:p-6 bg-white/10 rounded-xl shadow-lg border border-white/20"
                >
                  <div className="flex items-center justify-center mb-3 sm:mb-4 text-blue-300">
                    <div className="w-5 h-5 sm:w-6 sm:h-6">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.number}</h3>
                  <p className="text-sm sm:text-base text-gray-300 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Everything You Need
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and information to help you make the best decision for your future
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/40 hover:from-blue-50/80 hover:to-indigo-50/40 transition-all duration-300 border border-white/50 shadow-xl hover:shadow-2xl"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="text-white w-6 h-6 sm:w-8 sm:h-8">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{feature.title}</h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aptitude Test Section */}
      <section id="aptitude" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <motion.div 
              animate={{ 
                rotate: [0, 2, -2, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center">
                    <Brain className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Discover Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Strengths</span>
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Take our engaging, science-backed aptitude test to uncover your unique talents and career potential. Get instant, personalized recommendations to guide your educational journey.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/aptitude-test"
                className="inline-block bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 shadow-xl text-lg"
              >
                Start Aptitude Test <ArrowRight className="ml-3 h-6 w-6 inline" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              How It Works
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple steps to find your perfect college and start your journey
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: "1",
                title: "Create Your Profile",
                description: "Sign up and provide your academic background, entrance exam scores, and career interests.",
                gradient: "from-blue-600 to-indigo-600"
              },
              {
                number: "2", 
                title: "Take Aptitude Test",
                description: "Complete our comprehensive aptitude assessment to understand your strengths and potential.",
                gradient: "from-green-600 to-emerald-600"
              },
              {
                number: "3",
                title: "Get Recommendations", 
                description: "Receive personalized college recommendations based on your profile and test results.",
                gradient: "from-purple-600 to-pink-600"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div 
                    className={`w-24 h-24 bg-gradient-to-r ${step.gradient} rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              What Our Students Say
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from students who found their perfect college through EduGuide
            </p>
          </div>
          <div className="relative">
            <div className="flex justify-center mb-12">
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/80 to-blue-50/80 rounded-3xl p-12 md:p-16 border border-white/50 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl shadow-lg border-2 border-white/80">
                    {testimonials[currentTestimonial].icon}
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-8 italic leading-relaxed max-w-3xl mx-auto">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600 mb-2">{testimonials[currentTestimonial].role}</p>
                  <p className="text-blue-600 font-semibold">{testimonials[currentTestimonial].college}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-white/80 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-white/50"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-3 bg-white/80 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-white/50"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              About EduGuide
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're on a mission to democratize access to quality college guidance
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h4 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h4>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To democratize access to quality college guidance by providing every student with the tools, 
                information, and support they need to make informed decisions about their education and future career.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every student, regardless of their background or location, deserves access to 
                comprehensive, accurate, and personalized guidance for their educational journey.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
              <Target className="w-16 h-16 mx-auto mb-8" />
              <h4 className="text-3xl font-bold mb-6 text-center">Our Vision</h4>
              <p className="text-center text-blue-100 leading-relaxed text-lg">
                To become the world's most trusted platform for educational guidance, 
                helping millions of students find their perfect path to success.
              </p>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="text-center">
            <h4 className="text-3xl font-bold text-gray-900 mb-12">Meet Our Team</h4>
            <div className="grid md:grid-cols-3 gap-12">
              {team.map((member, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white/80 to-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg">
                      {member.icon}
                    </div>
                  </div>
                  <h5 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h5>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-blue-100 mb-12">
            Join thousands of students who have found their perfect college with EduGuide
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/student-signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center text-lg"
              >
                Get Started Now <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/college-list"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg"
              >
                <Search className="mr-3 h-6 w-6" />
                Explore Colleges
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h4 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h4>
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-2">Email</h5>
                    <p className="text-gray-600 text-lg">hello@eduguide.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-2">Phone</h5>
                    <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-2">Address</h5>
                    <p className="text-gray-600 text-lg">123 Education Street, Tech City, TC 12345</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h5 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h5>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition-all duration-300">
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition-all duration-300">
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition-all duration-300">
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition-all duration-300">
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/80 to-blue-50/80 rounded-3xl p-10 border border-white/50 shadow-2xl">
              <h4 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h4>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/80"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/80"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/80"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/80"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg"
                >
                  Send Message <Send className="ml-3 h-6 w-6" />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">EduGuide</h3>
                  <p className="text-xs text-gray-400">Your College Search Partner</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Helping students find their perfect college path with comprehensive guidance and AI-powered recommendations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">College Search</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Aptitude Tests</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Career Guidance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Application Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Connect</h4>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Subscribe to our newsletter for updates and tips.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 EduGuide. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Index; 