import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock,
  ArrowRight,
  ArrowLeft,
  Building2,
  CheckCircle,
  X,
  Heart,
  HeartOff,
  Globe,
  Award,
  TrendingUp,
  BookOpen,
  Phone,
  Mail,
  ExternalLink,
  BarChart3,
  Calendar,
  BookOpenCheck,
  GraduationCap as GraduationCapIcon,
  Settings,
  Palette,
  Microscope
} from 'lucide-react';
import CollegeComparison from '../components/CollegeComparison';
import supabase from '../lib/supabaseClient'

const CollegeSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedColleges, setSelectedColleges] = useState(() => {
    if (location.state?.selectedColleges) {
      return location.state.selectedColleges;
    }
    const stored = localStorage.getItem('selectedColleges');
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [colleges, setColleges] = useState([]);

  const locations = [
    { id: 'all', name: 'All Locations', flag: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400" },
    { id: 'mumbai', name: 'Mumbai, India', flag: "https://images.unsplash.com/photo-1562774053-701939374585?w=400" },
    { id: 'bangalore', name: 'Bangalore, India', flag: "https://images.unsplash.com/photo-1562774053-701939374585?w=400" },
    { id: 'delhi', name: 'Delhi, India', flag: "https://images.unsplash.com/photo-1562774053-701939374585?w=400" },
    { id: 'newyork', name: 'New York, USA', flag: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400" },
    { id: 'sanfrancisco', name: 'San Francisco, USA', flag: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400" },
    { id: 'london', name: 'London, UK', flag: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400" },
    { id: 'toronto', name: 'Toronto, Canada', flag: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400" }
  ];

  const programs = [
    { id: 'all', name: 'All Programs', icon: BookOpen },
    { id: 'engineering', name: 'Engineering', icon: Settings },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'medicine', name: 'Medicine', icon: Heart },
    { id: 'arts', name: 'Arts & Humanities', icon: Palette },
    { id: 'science', name: 'Science', icon: Microscope }
  ];

  useEffect(() => {
    const fetchColleges = async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
      if (error) {
        setColleges([])
      } else {
        setColleges(data)
      }
    }
    fetchColleges()
  }, [])

  useEffect(() => {
    if (location.state?.selectedColleges) {
      setSelectedColleges(location.state.selectedColleges);
    }
  }, [location.state]);

  // Helper to determine if a college is in India or International
  const getCountry = (location) => {
    const indiaLocations = ['mumbai', 'bangalore', 'delhi'];
    if (indiaLocations.includes(location)) return 'india';
    return 'international';
  };

  // Filter colleges by country
  const filteredColleges = colleges.filter(college => {
    if (selectedCountry === 'all') return true;
    return getCountry(college.location) === selectedCountry;
  });

  // When country changes, clear selected colleges if any do not match
  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setSelectedColleges(prev => prev.filter(id => {
      const college = colleges.find(c => c._id === id);
      return college && getCountry(college.location) === value;
    }));
  };

  // Toggle college selection
  const toggleSelection = (collegeId) => {
    setSelectedColleges(prev => 
      prev.includes(collegeId) 
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId]
    );
  };

  // At the point where you render CollegeComparison:
  const selectedCollegesData = colleges.filter(college => selectedColleges.includes(college._id));

  const handleCompareColleges = () => {
    // Store selected colleges in localStorage for the comparison page
    localStorage.setItem('selectedColleges', JSON.stringify(selectedColleges));
    // Navigate to the dedicated comparison page
    navigate('/college-comparison', { 
      state: { selectedColleges } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EduGuide
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Your College Search Partner</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-blue-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-200 transform hover:scale-105 mr-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </button>
              <Link 
                to="/aptitude-test" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Select Your Top Colleges
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your preferred colleges and compare them side by side. 
            We'll help you make the best decision for your future.
          </p>
        </div>

        {/* Country Selector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2 flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="country-select" className="font-medium text-gray-700">Search Colleges in:</label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            <option value="all">All</option>
            <option value="india">India</option>
            <option value="international">International</option>
          </select>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
          {/* Search Bar - Full width on mobile */}
          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 sm:py-4 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
              />
            </div>
          </div>

          {/* Filters Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="block w-full px-3 py-3 sm:py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base bg-white"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Program Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Program</label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="block w-full px-3 py-3 sm:py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base bg-white"
              >
                {programs.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="block w-full px-3 py-3 sm:py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base bg-white"
              >
                <option value="all">All Prices</option>
                <option value="low">Low ($3K-$5K)</option>
                <option value="medium">Medium ($6K-$10K)</option>
                <option value="high">High ($50K+)</option>
              </select>
            </div>

            {/* Compare Button */}
            <div className="flex items-end">
              <button
                onClick={handleCompareColleges}
                className="w-full inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border rounded-xl font-medium transition-all duration-200 touch-friendly bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
              >
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="hidden sm:inline">Compare</span>
                <span className="sm:hidden">Compare</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Colleges Summary */}
        {selectedColleges.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Selected Colleges ({selectedColleges.length})
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCompareColleges}
                  className="inline-flex items-center px-4 py-2 border rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare Colleges
                </button>
                <button
                  onClick={() => setSelectedColleges([])}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedColleges.map(id => {
                const college = colleges.find(c => c._id === id);
                return (
                  <span key={id} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                    {college ? college.name : id}
                  <button
                      type="button"
                      className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => setSelectedColleges(selectedColleges.filter(cid => cid !== id))}
                      aria-label="Remove"
                    >
                      ×
                  </button>
                </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Comparison Modal/Section */}
        <AnimatePresence>
          {showComparison && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <div className="bg-white rounded-2xl shadow-2xl border max-w-full w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col overflow-y-auto p-0 relative">
                {/* Modal Header: Only title, no close button here */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b rounded-t-2xl px-4 sm:px-8 pt-6 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowComparison(false)}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label="Back to college list"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">College Comparison</h2>
                  </div>
                    </div>
                <div className="flex-1 min-h-0 px-2 sm:px-6 py-4 overflow-x-auto">
                  <CollegeComparison
                    colleges={selectedCollegesData}
                    onRemoveCollege={id => setSelectedColleges(selectedColleges.filter(cid => cid !== id))}
                    onAddCollege={() => {}}
                  />
                    </div>
                {/* Modern action buttons row including Close */}
                <div className="sticky bottom-0 z-20 flex flex-wrap gap-3 justify-center pt-4 pb-4 border-t bg-white px-2 sm:px-6">
                  <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition border border-gray-300">Export Comparison</button>
                  <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition border border-gray-300">Share Comparison</button>
                  <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition border border-blue-600">Save to Favorites</button>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="px-5 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg font-semibold hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredColleges.map(college => {
            let imageUrl = null;
            if (college.profileImage) {
              imageUrl = college.profileImage.startsWith('http')
                ? college.profileImage
                : `http://localhost:5000${college.profileImage}`;
            } else if (college.bannerImage) {
              imageUrl = college.bannerImage.startsWith('http')
                ? college.bannerImage
                : `http://localhost:5000${college.bannerImage}`;
            }
            return (
              <div key={college._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={college.name + ' logo'}
                    className="w-14 h-14 rounded-full object-cover border border-blue-200 shadow-sm bg-white mb-2"
                  />
                ) : (
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold mb-2">
                    <Building2 className="h-7 w-7" />
                  </span>
                )}
                <h3 className="text-lg font-semibold mb-1 text-center">{college.name}</h3>
                <span className="text-xs text-gray-500 mb-1 text-center">{college.location}</span>
                {college.type && (
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 rounded px-2 py-0.5 mb-2 text-center">{college.type}</span>
                )}
                <button
                  onClick={() => toggleSelection(college._id)}
                  className={`mt-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedColleges.includes(college._id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {selectedColleges.includes(college._id) ? 'Remove' : 'Compare'}
                </button>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more colleges.
            </p>
          </div>
        )}

        {/* Continue Button */}
        {selectedColleges.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/aptitude-test"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Continue with {selectedColleges.length} Selected College{selectedColleges.length !== 1 ? 's' : ''}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeSelection; 