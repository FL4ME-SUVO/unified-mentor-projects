import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Microscope,
  Flag
} from 'lucide-react';
import supabase from '../lib/supabaseClient'

const LocationSelection = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const locations = [
    {
      id: 'india',
      name: 'INDIA',
      flag: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
      icon: MapPin,
      description: 'Study in prestigious Indian institutions with affordable education and excellent opportunities.',
      colleges: 125,
      avgTuition: '$2,000 - $8,000',
      livingCost: '$300 - $800/month',
      climate: 'Tropical to Temperate',
      language: 'English, Hindi',
      topColleges: ['IIT Bombay', 'BITS Pilani', 'Delhi University', 'JNU'],
      favorite: false,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
      advantages: [
        'Affordable education costs',
        'Strong technical education',
        'Growing job market',
        'Cultural familiarity',
        'Close to family'
      ]
    },
    {
      id: 'abroad',
      name: 'ABROAD',
      flag: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
      icon: Globe,
      description: 'Explore international education opportunities with world-class universities and global exposure.',
      colleges: 85,
      avgTuition: '$25,000 - $60,000',
      livingCost: '$1,000 - $3,000/month',
      climate: 'Various',
      language: 'English, Local Languages',
      topColleges: ['Stanford University', 'MIT', 'Imperial College London', 'University of Toronto'],
      favorite: false,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
      advantages: [
        'World-class education',
        'Global exposure',
        'International networking',
        'Research opportunities',
        'Multicultural experience'
      ]
    }
  ];

  const toggleFavorite = (locationId) => {
    setSelectedLocations(prev => 
      prev.includes(locationId) 
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showFavorites || selectedLocations.includes(location.id);
    
    return matchesSearch && matchesFavorites;
  });

  const selectedLocationsData = locations.filter(location => selectedLocations.includes(location.id));

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
                to="/college-list" 
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
            Choose Your Study Location
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Select where you'd like to pursue your education. Choose between studying in India or abroad.
          </p>
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
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 sm:py-4 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
              />
            </div>
          </div>

          {/* Favorites Toggle - Centered and mobile-friendly */}
          <div className="flex justify-center">
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
                  <span className="hidden sm:inline">Show All Locations</span>
                  <span className="sm:hidden">Show All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selected Locations Summary */}
        {selectedLocations.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-lg font-semibold text-gray-900">
                Selected Locations ({selectedLocations.length})
              </h3>
              <button
                onClick={() => setSelectedLocations([])}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center self-start sm:self-auto"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedLocationsData.map(location => (
                <span
                  key={location.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  <img src={location.image} alt={location.name} className="h-6 w-6 sm:h-8 sm:w-8 rounded-full mr-2" />
                  <span className="hidden sm:inline">{location.name}</span>
                  <span className="sm:hidden">{location.name}</span>
                  <button
                    onClick={() => toggleFavorite(location.id)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Locations Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${searchTerm}-${showFavorites}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                  selectedLocations.includes(location.id)
                    ? 'border-blue-500 shadow-blue-100'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(location.id)}
                    className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${selectedLocations.includes(location.id) ? 'fill-current text-red-500' : 'text-white'}`} />
                  </motion.button>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                      <location.icon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">{location.name}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{location.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{location.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-600">Colleges</div>
                        <div className="text-sm font-semibold text-gray-900">{location.colleges}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-600">Avg Tuition</div>
                        <div className="text-sm font-semibold text-gray-900">{location.avgTuition}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <div>
                        <div className="text-xs text-gray-600">Living Cost</div>
                        <div className="text-sm font-semibold text-gray-900">{location.livingCost}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-600">Language</div>
                        <div className="text-sm font-semibold text-gray-900">{location.language}</div>
                      </div>
                    </div>
                  </div>

                  {/* Advantages */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Advantages</h4>
                    <div className="space-y-1">
                      {location.advantages.map((advantage, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-gray-600">{advantage}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Top Colleges */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Colleges</h4>
                    <div className="flex flex-wrap gap-2">
                      {location.topColleges.slice(0, 3).map((college, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {college}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFavorite(location.id)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      selectedLocations.includes(location.id)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedLocations.includes(location.id) ? (
                      <span className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Selected</span>
                        <span className="sm:hidden">Selected</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Select {location.name}</span>
                        <span className="sm:hidden">Select</span>
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No locations found</h3>
            <p className="text-gray-600 px-4">
              Try adjusting your search terms to find more locations.
            </p>
          </div>
        )}

        {/* Continue Button */}
        {selectedLocations.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              to="/college-list"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="hidden sm:inline">Continue with {selectedLocations.length} Selected Location{selectedLocations.length !== 1 ? 's' : ''}</span>
              <span className="sm:hidden">Continue ({selectedLocations.length})</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelection; 