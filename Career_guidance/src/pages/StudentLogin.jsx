import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  Phone,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import supabase from '../lib/supabaseClient'
import API_URL from '../lib/api';

const StudentLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
      if (error || !data) {
        setError('Invalid credentials');
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/student-dashboard';
      }
    } catch (err) {
      setError('Network error');
    }
    setIsLoading(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');
    setSignupSuccess('');
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      setSignupLoading(false);
      return;
    }
    if (signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters long');
      setSignupLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupData.firstName + ' ' + signupData.lastName,
          email: signupData.email,
          password: signupData.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setSignupError(data.error || 'Signup failed');
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        setSignupSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          window.location.href = '/student-dashboard';
        }, 1500);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setSignupError('Network error');
    }
    setSignupLoading(false);
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Welcome to EduGuide
          </h1>
          <p className="text-gray-600 text-sm">
            Your journey to success starts here
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-white/20 backdrop-blur-sm rounded-lg p-1 mb-6 max-w-md mx-auto">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              !isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {isLogin && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-lg mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Sign In</h2>
              <p className="text-gray-600 text-sm">Access your account</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  Email
                </label>
                <div className="relative">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400" placeholder="Enter your email" required />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><Sparkles className="h-4 w-4 text-gray-400" /></div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-blue-600" />
                  Password
                </label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 pr-12" placeholder="Enter your password" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />{error}
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-gray-600">Remember me</span></label>
                <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Forgot password?</Link>
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                {isLoading ? (<div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Signing in...</div>) : (<>Sign In<ArrowRight className="ml-2 h-4 w-4" /></>)}
              </button>
            </form>
          </div>
        )}

        {/* Signup Form */}
        {!isLogin && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Create Account</h2>
              <p className="text-gray-600 text-sm">Join our community</p>
            </div>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center"><User className="h-4 w-4 mr-2 text-blue-600" />First Name</label>
                  <input type="text" name="firstName" value={signupData.firstName} onChange={handleSignupChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm" placeholder="John" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center"><User className="h-4 w-4 mr-2 text-blue-600" />Last Name</label>
                  <input type="text" name="lastName" value={signupData.lastName} onChange={handleSignupChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm" placeholder="Doe" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center"><Mail className="h-4 w-4 mr-2 text-blue-600" />Email</label>
                  <input type="email" name="email" value={signupData.email} onChange={handleSignupChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm" placeholder="john@example.com" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center"><Phone className="h-4 w-4 mr-2 text-blue-600" />Phone</label>
                  <input type="tel" name="phone" value={signupData.phone} onChange={handleSignupChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm" placeholder="+1234567890" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center"><Lock className="h-4 w-4 mr-2 text-blue-600" />Password</label>
                  <div className="relative">
                    <input type={showSignupPassword ? 'text' : 'password'} name="password" value={signupData.password} onChange={handleSignupChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm pr-10" placeholder="Password" required />
                    <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">{showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center"><Lock className="h-4 w-4 mr-2 text-blue-600" />Confirm</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm pr-10" placeholder="Confirm" required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                  </div>
                </div>
              </div>
              {signupError && <div className="flex items-center p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"><AlertCircle className="h-4 w-4 mr-2" />{signupError}</div>}
              {signupSuccess && <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm"><CheckCircle className="h-4 w-4 mr-2" />{signupSuccess}</div>}
              <div className="flex items-start pt-1">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5" required />
                <span className="ml-2 text-gray-600 text-sm">I agree to the <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms</Link> and <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy</Link></span>
              </div>
              <button type="submit" disabled={signupLoading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                {signupLoading ? (<div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Creating account...</div>) : (<>Create Account<ArrowRight className="ml-2 h-4 w-4" /></>)}
              </button>
            </form>
          </div>
        )}

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm transition-colors flex items-center justify-center">
            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;