import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CollegeComparison from '../components/CollegeComparison';
import supabase from '../lib/supabaseClient'

const CollegeComparisonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [allColleges, setAllColleges] = useState([]);

  // Get selected colleges from location state or localStorage
  useEffect(() => {
    if (location.state?.selectedColleges) {
      setSelectedColleges(location.state.selectedColleges);
    } else {
      // Fallback to localStorage if no state
      const stored = localStorage.getItem('selectedColleges');
      if (stored) {
        setSelectedColleges(JSON.parse(stored));
      }
    }
  }, [location.state]);

  // Fetch all colleges from backend
  useEffect(() => {
    const fetchColleges = async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
      if (error) {
        setAllColleges([])
      } else {
        setAllColleges(data)
      }
    }
    fetchColleges()
  }, [])

  const handleBackToCollegeList = () => {
    navigate('/college-selection');
  };

  const handleRemoveCollege = (collegeId) => {
    const updatedColleges = selectedColleges.filter(id => id !== collegeId);
    setSelectedColleges(updatedColleges);
    localStorage.setItem('selectedColleges', JSON.stringify(updatedColleges));
  };

  const handleAddCollege = () => {
    // Navigate back to college selection to add more colleges
    navigate('/college-selection', { 
      state: { 
        selectedColleges,
        showComparison: false 
      } 
    });
  };

  const handleContinue = () => {
    // Implement your continue logic here, or navigate to the next page
  };

  // Filter colleges based on selected IDs (using _id)
  const collegesToCompare = allColleges.filter(college => 
    selectedColleges.includes(college._id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToCollegeList}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Back to college list"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">College Comparison</h1>
                <p className="text-sm text-gray-600">
                  Compare {collegesToCompare.length} selected college{collegesToCompare.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToCollegeList}
                className="inline-flex items-center px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400 transition-all duration-200 mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <button
                onClick={handleContinue}
                className="inline-flex items-center px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollegeComparison
          colleges={collegesToCompare}
          onRemoveCollege={handleRemoveCollege}
          onAddCollege={handleAddCollege}
        />
      </div>
    </div>
  );
};

export default CollegeComparisonPage; 