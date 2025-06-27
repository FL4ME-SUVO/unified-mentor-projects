import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Calendar,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  X,
  Heart,
  HeartOff,
  Globe,
  Award,
  BarChart3,
  Smile,
  Trophy,
  ArrowLeft,
  Building
} from 'lucide-react';
import supabase from '../lib/supabaseClient'
import API_URL from '../lib/api';

const StudentDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [recentTests, setRecentTests] = useState([]);
  const [savedColleges, setSavedColleges] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data
      fetch(`${API_URL}/api/users/me`, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setUserData(data);
            // Fetch additional data
            fetchUserData(token);
          } else {
            setUserData(null);
            navigate('/student-login');
          }
        })
        .catch(() => {
          setUserData(null);
          navigate('/student-login');
        });
    } else {
      const user = localStorage.getItem('user');
      if (user) {
        setUserData(JSON.parse(user));
        // Try to fetch additional data without token (fallback)
        fetchUserData();
      } else {
        navigate('/student-login');
      }
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      // Fetch test results
      const { data: testsData, error: testsError } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', userData?.id)
      if (!testsError) setRecentTests(testsData)

      // Fetch saved colleges (join with colleges table)
      const { data: savedCollegesData, error: savedCollegesError } = await supabase
        .from('saved_colleges')
        .select('college_id, colleges(*)')
        .eq('user_id', userData?.id)
      if (!savedCollegesError) setSavedColleges(savedCollegesData.map(sc => sc.colleges))

      // Fetch recommendations
      const { data: recsData, error: recsError } = await supabase
        .from('recommendations')
        .select('*')
        .eq('user_id', userData?.id)
      if (!recsError) setRecommendations(recsData)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/student-login');
  };

  const removeSavedCollege = async (collegeId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/users/saved-colleges/${collegeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        setSavedColleges(prev => prev.filter(college => college._id !== collegeId));
      }
    } catch (error) {
      console.error('Error removing saved college:', error);
    }
  };

  // Calculate stats from actual data
  const stats = {
    completedTests: recentTests.length,
    savedColleges: savedColleges.length,
    applications: userData?.applications || 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container-responsive-xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    EduGuide
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Student Dashboard</p>
                </div>
              </Link>
              {/* Back to Home link */}
              <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700 text-sm font-medium ml-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-gray-600">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-responsive-xl py-6 sm:py-8">
        {/* User Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="text-3xl sm:text-4xl">{userData?.avatar || '👤'}</div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{userData?.name || 'Student'}</h2>
              <p className="text-gray-600">{userData?.email}</p>
              <p className="text-sm text-blue-600 font-medium">{userData?.profile || 'Student'}</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-2xl font-bold text-blue-600">{userData?.testScore || 0}%</div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 sm:mb-8 border border-gray-100 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {[
              { id: 'overview', name: 'Overview', icon: <Target className="h-4 w-4" /> },
              { id: 'tests', name: 'Test Results', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'colleges', name: 'Saved Colleges', icon: <BookOpen className="h-4 w-4" /> },
              { id: 'recommendations', name: 'Recommendations', icon: <TrendingUp className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content based on selected tab */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">{stats.completedTests}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Tests Completed</h3>
                <p className="text-xs sm:text-sm text-gray-600">Aptitude assessments taken</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">{stats.savedColleges}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Saved Colleges</h3>
                <p className="text-xs sm:text-sm text-gray-600">Institutions you're interested in</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-purple-600">{stats.applications}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Applications</h3>
                <p className="text-xs sm:text-sm text-gray-600">Applications submitted</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/aptitude-test"
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">Take Aptitude Test</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>

                <Link
                  to="/college-list"
                  className="flex items-center justify-between p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">Browse Colleges</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>

                <Link
                  to="/career-selection"
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">Career Guidance</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'tests' && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Test Results</h3>
            {recentTests.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No test results yet</p>
                <Link
                  to="/aptitude-test"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Take Your First Test
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTests.map(test => (
                  <div key={test._id || test.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-xl space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{test.name || test.testName}</h4>
                        <p className="text-sm text-gray-600">Completed on {new Date(test.date || test.completedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-xl font-bold text-blue-600">{test.score || test.result}%</div>
                      <div className="text-sm text-gray-600">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'colleges' && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Saved Colleges</h3>
            {savedColleges.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No saved colleges yet</p>
                <Link
                  to="/college-list"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Browse Colleges
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {savedColleges.map(college => (
                  <div key={college._id || college.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{college.name}</h4>
                          <p className="text-sm text-gray-600">{college.location}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeSavedCollege(college._id || college.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Heart className="h-5 w-5 fill-current" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-gray-700">{college.rating || 'N/A'}</span>
                      </div>
                      <span className="text-gray-600">{college.tuition || 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'recommendations' && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Career Recommendations</h3>
            {recommendations.length === 0 ? (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No recommendations yet. Complete an aptitude test to get personalized recommendations.</p>
                <Link
                  to="/aptitude-test"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Take Aptitude Test
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {recommendations.map(rec => (
                  <div key={rec._id || rec.id} className="border border-gray-200 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{rec.title || rec.career}</h4>
                        <p className="text-gray-600">{rec.description || rec.reason}</p>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-2xl font-bold text-green-600">{rec.match || rec.score}%</div>
                        <div className="text-sm text-gray-600">Match</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Recommended Colleges:</h5>
                      <div className="flex flex-wrap gap-2">
                        {(rec.colleges || rec.recommendedColleges || []).map((college, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {college}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to="/college-list"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Colleges <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard; 