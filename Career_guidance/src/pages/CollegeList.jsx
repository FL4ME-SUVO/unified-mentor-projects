import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Eye,
  Target,
  Building,
  Shield,
  Settings,
  Palette,
  Microscope
} from 'lucide-react';
import supabase from '../lib/supabaseClient'
import API_URL from '../lib/api';

const CollegeList = () => {
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [colleges, setColleges] = useState([]);
  const [saving, setSaving] = useState({});
  const [quickViewCollege, setQuickViewCollege] = useState(null);

  const locations = [
    { id: 'all', name: 'All Locations', flag: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400", icon: Globe },
    { id: 'mumbai', name: 'Mumbai, India', flag: "https://images.unsplash.com/photo-1562774053-701939374585?w=400", icon: MapPin },
    { id: 'bangalore', name: 'Bangalore, India', flag: "https://images.unsplash.com/photo-1562774053-701939374585?w=400", icon: MapPin },
    { id: 'delhi', name: 'Delhi, India', flag: "https://images.unsplash.com/photo-1562774053-701939374585?w=400", icon: MapPin },
    { id: 'newyork', name: 'New York, USA', flag: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400", icon: MapPin },
    { id: 'sanfrancisco', name: 'San Francisco, USA', flag: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400", icon: MapPin },
    { id: 'london', name: 'London, UK', flag: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400", icon: MapPin },
    { id: 'toronto', name: 'Toronto, Canada', flag: "https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400", icon: MapPin }
  ];

  const programs = [
    { id: 'all', name: 'All Programs', icon: BookOpen },
    { id: 'engineering', name: 'Engineering', icon: Settings },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'medicine', name: 'Medicine', icon: Heart },
    { id: 'arts', name: 'Arts & Humanities', icon: Palette },
    { id: 'science', name: 'Science', icon: Microscope }
  ];

  const types = [
    { id: 'all', name: 'All Types', icon: Building },
    { id: 'public', name: 'Public', icon: Shield },
    { id: 'private', name: 'Private', icon: Award },
    { id: 'deemed', name: 'Deemed', icon: Star }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
      if (error) {
        console.error('Failed to fetch colleges:', error)
        setColleges([])
      } else {
        setColleges(data)
      }
    }
    fetchColleges()

    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}/api/users/saved-colleges`, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(res => res.json())
        .then(data => setFavorites(data.map(college => college._id)))
        .catch(() => {});
    }
  }, []);

  const handleSaveCollege = async (collegeId, isSaved) => {
    setSaving(prev => ({ ...prev, [collegeId]: true }));
    const token = localStorage.getItem('token');
    try {
      if (isSaved) {
        await fetch(`${API_URL}/api/users/saved-colleges/${collegeId}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        });
        setFavorites(prev => prev.filter(id => id !== collegeId));
      } else {
        await fetch(`${API_URL}/api/users/saved-colleges/${collegeId}`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token }
        });
        setFavorites(prev => [...prev, collegeId]);
      }
    } catch (err) {
      alert('Failed to update favorites. Please log in.');
    } finally {
      setSaving(prev => ({ ...prev, [collegeId]: false }));
    }
  };

  // Helper to determine if a college is in India or International
  const getCountry = (college) => {
    if (!college.country) return 'international';
    return college.country.toLowerCase() === 'india' ? 'india' : 'international';
  };

  // Filter colleges based on selected country
  const filteredColleges = colleges.filter(college => {
    if (selectedCountry === 'all') return true;
    return getCountry(college) === selectedCountry;
  })
  .filter(college =>
    (selectedLocation === 'all' || (college.location && college.location.toLowerCase() === selectedLocation)) &&
    (selectedProgram === 'all' || (college.topPrograms && college.topPrograms.includes(selectedProgram))) &&
    (selectedType === 'all' || (college.type && college.type.toLowerCase() === selectedType)) &&
    (college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (college.location && college.location.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'fees':
        return (a.tuition || '').localeCompare(b.tuition || '');
      case 'students':
        return (b.students || 0) - (a.students || 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const selectedCollegesData = colleges.filter(college => selectedColleges.includes(college._id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container-responsive-xl py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EduGuide
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Your College Search Partner</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                to="/college-selection" 
                className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                <span className="hidden sm:inline">Continue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive-xl py-6 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Find Your Perfect College
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover colleges that match your career goals and preferences. 
            Compare programs, costs, and opportunities to make the best choice.
          </p>
        </div>

        {/* Country Selector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2 flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="country-select" className="font-medium text-gray-700">Search Colleges in:</label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
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
                <option value="low">Low ($2K-$5K)</option>
                <option value="medium">Medium ($5K-$10K)</option>
                <option value="high">High ($50K+)</option>
              </select>
            </div>

            {/* Sort By Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full px-3 py-3 sm:py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base bg-white"
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="fees">Fees</option>
                <option value="students">Students</option>
              </select>
            </div>
          </div>

          {/* Favorites Toggle - Centered and mobile-friendly */}
          <div className="mt-4 sm:mt-6 flex justify-center">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`inline-flex items-center px-4 sm:px-6 py-3 sm:py-4 border rounded-xl font-medium transition-all duration-200 touch-friendly ${
                showFavorites
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {showFavorites ? (
                <>
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">Show Favorites Only</span>
                  <span className="sm:hidden">Favorites Only</span>
                </>
              ) : (
                <>
                  <HeartOff className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">Show All Colleges</span>
                  <span className="sm:hidden">Show All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selected Colleges Summary */}
        {selectedColleges.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-lg font-semibold text-gray-900">
                Selected Colleges ({selectedColleges.length})
              </h3>
              <button
                onClick={() => setSelectedColleges([])}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center self-start sm:self-auto"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCollegesData.map(college => (
                <span
                  key={college._id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  <img src={college.profileImage ? (college.profileImage.startsWith('http') ? college.profileImage : 'http://localhost:5000' + college.profileImage) : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'} alt={college.name} className="h-6 w-6 sm:h-8 sm:w-8 rounded-full mr-2" />
                  <span className="hidden sm:inline">{college.name}</span>
                  <span className="sm:hidden">{college.name.split(' ')[0]}</span>
                  <button
                    onClick={() => handleSaveCollege(college._id, favorites.includes(college._id))}
                    disabled={saving[college._id]}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="space-y-4 sm:space-y-0">
            {/* Type Filters */}
            <div className="space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Building className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 font-medium text-base sm:text-lg">College Type:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {types.map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedType(type.id)}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 touch-friendly ${
                        selectedType === type.id
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-center">{type.name}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{sortedColleges.length}</span> colleges
          </p>
        </div>

        {/* Colleges Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${selectedLocation}-${selectedProgram}-${searchTerm}-${priceRange}-${showFavorites}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            {sortedColleges.map((college, index) => (
              <motion.div
                key={college._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  <img 
                    src={college.bannerImage ? (college.bannerImage.startsWith('http') ? college.bannerImage : 'http://localhost:5000' + college.bannerImage) : (college.profileImage ? (college.profileImage.startsWith('http') ? college.profileImage : 'http://localhost:5000' + college.profileImage) : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400')} 
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSaveCollege(college._id, favorites.includes(college._id))}
                    disabled={saving[college._id]}
                    className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(college._id) ? 'fill-current text-red-500' : 'text-white'}`} />
                  </motion.button>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{college.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{college.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{college.description}</p>
                  {college.country && (
                    <div className="text-xs text-gray-500 mb-1">Country: {college.country}</div>
                  )}
                  {college.location && (
                    <div className="text-xs text-gray-500 mb-1">Location: {college.location}</div>
                  )}
                  {college.type && (
                    <div className="text-xs text-gray-500 mb-1">Type: {college.type}</div>
                  )}
                  {college.email && (
                    <div className="text-xs text-gray-500 mb-1">Email: {college.email}</div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-600">Students</div>
                        <div className="text-sm font-semibold text-gray-900">{college.students ? college.students.toLocaleString() : 'N/A'}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-600">Fees</div>
                        <div className="text-sm font-semibold text-gray-900">{college.tuition}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-purple-600" />
                      <div>
                        <div className="text-xs text-gray-600">Acceptance</div>
                        <div className="text-sm font-semibold text-gray-900">{college.acceptanceRate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-600">Placement</div>
                        <div className="text-sm font-semibold text-gray-900">{college.placement}</div>
                      </div>
                    </div>
                  </div>

                  {/* Top Programs */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {(college.topPrograms ? college.topPrograms.slice(0, 3) : []).map((program, index) => (
                        <motion.span
                          key={`${college._id}-program-${program}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {program}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      onClick={() => navigate(`/college/${college._id}`)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                      onClick={() => setQuickViewCollege(college)}
                    >
                      <BookOpen className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {sortedColleges.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600 px-4">
              Try adjusting your search terms or filters to find more colleges.
            </p>
          </div>
        )}

        {/* Continue Button */}
        {selectedColleges.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              to="/college-selection"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="hidden sm:inline">Continue with {selectedColleges.length} Selected College{selectedColleges.length !== 1 ? 's' : ''}</span>
              <span className="sm:hidden">Continue ({selectedColleges.length})</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewCollege && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setQuickViewCollege(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                onClick={() => setQuickViewCollege(null)}
              >
                <X className="h-6 w-6" />
              </button>
              {/* Banner */}
              <div className="h-40 rounded-t-2xl overflow-hidden relative bg-gradient-to-r from-blue-600 to-indigo-600">
                {quickViewCollege.bannerImage && (
                  <img
                    src={quickViewCollege.bannerImage.startsWith('http') ? quickViewCollege.bannerImage : 'http://localhost:5000' + quickViewCollege.bannerImage}
                    alt={quickViewCollege.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="px-6 py-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                  {quickViewCollege.name}
                  {quickViewCollege.type && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">{quickViewCollege.type}</span>
                  )}
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-2">
                  {quickViewCollege.location && (
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {quickViewCollege.location}</span>
                  )}
                  {quickViewCollege.country && (
                    <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {quickViewCollege.country}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-yellow-500 font-bold text-lg mb-2">
                  <Star className="h-5 w-5" /> {quickViewCollege.rating || 'N/A'}
                </div>
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <DollarSign className="h-5 w-5" /> {quickViewCollege.tuition || 'N/A'}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setQuickViewCollege(null);
                      navigate(`/college/${quickViewCollege._id}`);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setQuickViewCollege(null)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeList; 