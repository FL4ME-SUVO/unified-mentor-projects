import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Building, Mail, Globe, Star, Trophy, Users, LogOut, Settings, Bell, GraduationCap, ArrowLeft, Camera, Phone, Globe as GlobeIcon, Facebook, Instagram, Twitter, MapPin, Image as ImageIcon, Quote, Trash2 } from 'lucide-react';
import supabase from '../lib/supabaseClient'
import API_URL from '../lib/api';

const statsMock = [
  { label: 'Ranking', value: '12', icon: Trophy, color: 'bg-yellow-100 text-yellow-800' },
  { label: 'Rating', value: '4.5/5', icon: Star, color: 'bg-blue-100 text-blue-800' },
  { label: 'Total Students', value: '8,500', icon: Users, color: 'bg-green-100 text-green-800' },
  { label: 'Placement Rate', value: '92%', icon: Trophy, color: 'bg-purple-100 text-purple-800' },
];

const tabSections = [
  { key: 'overview', label: 'Overview' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'financials', label: 'Financials' },
  { key: 'placements', label: 'Placements' },
  { key: 'campus', label: 'Campus Life' },
];

const defaultCollegeImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400';
const defaultBanner = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1200';
const defaultMapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609826074!2d72.74109995!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63fdc6b0c47%3A0x8c5e5b0b0b0b0b0b!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus';

const CollegeDashboard = () => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('overview');
  const [collegeImage, setCollegeImage] = useState(defaultCollegeImage);
  const [bannerImage, setBannerImage] = useState(defaultBanner);
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([
    { name: 'Amit Sharma', text: 'The campus life and faculty are amazing!', role: 'Alumnus, 2022' },
    { name: 'Priya Singh', text: 'Great placement opportunities and support.', role: 'Student, 2024' }
  ]);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '', role: '' });
  const fileInputRef = useRef();
  const bannerInputRef = useRef();
  const galleryInputRef = useRef();
  const navigate = useNavigate();
  const [editOverview, setEditOverview] = useState(false);
  const [overviewForm, setOverviewForm] = useState({
    name: '',
    description: '',
    type: '',
    location: '',
    website: '',
    phone: ''
  });
  const [editingTestimonialIdx, setEditingTestimonialIdx] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', text: '' });
  const [editFinancials, setEditFinancials] = useState(false);
  const [financialsForm, setFinancialsForm] = useState({
    tuition: '',
    hostel: '',
    scholarships: ''
  });
  const [editPlacements, setEditPlacements] = useState(false);
  const [placementsForm, setPlacementsForm] = useState({
    avgPackage: '',
    highestPackage: '',
    placementRate: '',
    topRecruiters: ''
  });
  const [editCampus, setEditCampus] = useState(false);
  const [campusForm, setCampusForm] = useState({
    facilities: '',
    clubs: '',
    highlights: ''
  });
  const [colleges, setColleges] = useState([]);

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
    const token = localStorage.getItem('collegeToken');
    if (!token) {
      navigate('/college-login');
      return;
    }
    fetch(`${API_URL}/api/colleges/me`, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setCollege(data);
          if (data.profileImage) {
            setCollegeImage(API_URL + data.profileImage);
          }
          if (data.bannerImage) {
            setBannerImage(API_URL + data.bannerImage);
          }
          if (data.galleryImages) {
            setGalleryImages(data.galleryImages.map(url => API_URL + url));
          }
        } else {
          setError(data.error || 'Failed to load college data');
          localStorage.removeItem('collegeToken');
          localStorage.removeItem('college');
          navigate('/college-login');
        }
      })
      .catch(() => {
        setError('Network error');
        localStorage.removeItem('collegeToken');
        localStorage.removeItem('college');
        navigate('/college-login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    if (college) {
      setOverviewForm({
        name: college.name || '',
        description: college.description || '',
        type: college.type || '',
        location: college.location || '',
        website: college.website || '',
        phone: college.phone || ''
      });
      setFinancialsForm({
        tuition: college.tuition || '',
        hostel: college.hostel || '',
        scholarships: college.scholarships || ''
      });
      setPlacementsForm({
        avgPackage: college.avgPackage || '',
        highestPackage: college.highestPackage || '',
        placementRate: college.placementRate || '',
        topRecruiters: college.topRecruiters ? college.topRecruiters.join(', ') : ''
      });
      setCampusForm({
        facilities: college.facilities ? college.facilities.join(', ') : '',
        clubs: college.clubs || '',
        highlights: college.highlights || ''
      });
    }
  }, [college]);

  const handleLogout = () => {
    localStorage.removeItem('collegeToken');
    localStorage.removeItem('college');
    navigate('/college-login');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    const token = localStorage.getItem('collegeToken');
    try {
      const res = await fetch(`${API_URL}/api/colleges/me`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        localStorage.removeItem('collegeToken');
        localStorage.removeItem('college');
        navigate('/college-login');
      } else {
        alert('Failed to delete account.');
      }
    } catch {
      alert('Network error.');
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/upload-image`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: formData
      });
      const data = await res.json();
      if (data.imageUrl) {
        setCollegeImage(API_URL + data.imageUrl);
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('banner', file);
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/upload-banner`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        body: formData
      });
      const data = await res.json();
      if (data.imageUrl) {
        setBannerImage(API_URL + data.imageUrl);
      }
    } catch (err) {
      alert('Banner upload failed');
    }
  };

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/upload-gallery`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        body: formData
      });
      const data = await res.json();
      if (data.imageUrls) {
        setGalleryImages(prev => [...prev, ...data.imageUrls.map(url => API_URL + url)]);
      }
    } catch (err) {
      alert('Gallery upload failed');
    }
  };

  // Testimonials logic
  const handleTestimonialChange = (e) => {
    setNewTestimonial({ ...newTestimonial, [e.target.name]: e.target.value });
  };
  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (newTestimonial.name && newTestimonial.text) {
      setTestimonials([...testimonials, newTestimonial]);
      setNewTestimonial({ name: '', text: '', role: '' });
    }
  };

  const handleOverviewChange = (e) => {
    setOverviewForm({ ...overviewForm, [e.target.name]: e.target.value });
  };

  const handleOverviewSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(overviewForm)
      });
      const data = await res.json();
      if (res.ok) {
        setCollege(data);
        setEditOverview(false);
      } else {
        alert(data.error || 'Failed to update overview');
      }
    } catch {
      alert('Network error');
    }
  };

  // Delete gallery image
  const handleDeleteGalleryImage = async (imgUrl) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/delete-gallery-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ imageUrl: imgUrl })
      });
      if (res.ok) {
        setGalleryImages(galleryImages.filter(img => img !== imgUrl));
      } else {
        alert('Failed to delete image');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleTestimonialFormChange = (e) => {
    setTestimonialForm({ ...testimonialForm, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateTestimonial = async (e) => {
    e.preventDefault();
    let updatedTestimonials;
    if (editingTestimonialIdx !== null) {
      // Edit existing
      updatedTestimonials = testimonials.map((t, idx) =>
        idx === editingTestimonialIdx ? testimonialForm : t
      );
    } else {
      // Add new
      updatedTestimonials = [...testimonials, testimonialForm];
    }
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ testimonials: updatedTestimonials })
      });
      const data = await res.json();
      if (res.ok) {
        setTestimonials(updatedTestimonials);
        setTestimonialForm({ name: '', role: '', text: '' });
        setEditingTestimonialIdx(null);
      } else {
        alert(data.error || 'Failed to update testimonials');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleEditTestimonial = (idx) => {
    setEditingTestimonialIdx(idx);
    setTestimonialForm(testimonials[idx]);
  };

  const handleRemoveTestimonial = async (idx) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const updatedTestimonials = testimonials.filter((_, i) => i !== idx);
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ testimonials: updatedTestimonials })
      });
      const data = await res.json();
      if (res.ok) {
        setTestimonials(updatedTestimonials);
        setTestimonialForm({ name: '', role: '', text: '' });
        setEditingTestimonialIdx(null);
      } else {
        alert(data.error || 'Failed to delete testimonial');
      }
    } catch {
      alert('Network error');
    }
  };

  // Feature/unfeature testimonial
  const handleFeatureTestimonial = async (idx) => {
    const updatedTestimonials = testimonials.map((t, i) =>
      i === idx ? { ...t, featured: !t.featured } : t
    );
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ testimonials: updatedTestimonials })
      });
      if (res.ok) {
        setTestimonials(updatedTestimonials);
      } else {
        alert('Failed to update testimonial');
      }
    } catch {
      alert('Network error');
    }
  };

  // Report testimonial
  const handleReportTestimonial = async (idx) => {
    if (!window.confirm('Report this testimonial as inappropriate?')) return;
    const updatedTestimonials = testimonials.map((t, i) =>
      i === idx ? { ...t, reported: true } : t
    );
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ testimonials: updatedTestimonials })
      });
      if (res.ok) {
        setTestimonials(updatedTestimonials);
      } else {
        alert('Failed to report testimonial');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleFinancialsChange = (e) => {
    setFinancialsForm({ ...financialsForm, [e.target.name]: e.target.value });
  };

  const handleFinancialsSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          tuition: financialsForm.tuition,
          hostel: financialsForm.hostel,
          scholarships: financialsForm.scholarships
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCollege(data);
        setEditFinancials(false);
      } else {
        alert(data.error || 'Failed to update financials');
      }
    } catch {
      alert('Network error');
    }
  };

  const handlePlacementsChange = (e) => {
    setPlacementsForm({ ...placementsForm, [e.target.name]: e.target.value });
  };
  const handleCampusChange = (e) => {
    setCampusForm({ ...campusForm, [e.target.name]: e.target.value });
  };

  const handlePlacementsSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          avgPackage: placementsForm.avgPackage,
          highestPackage: placementsForm.highestPackage,
          placementRate: placementsForm.placementRate,
          topRecruiters: placementsForm.topRecruiters.split(',').map(r => r.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCollege(data);
        setEditPlacements(false);
      } else {
        alert(data.error || 'Failed to update placements');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleCampusSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('collegeToken');
      const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          facilities: campusForm.facilities.split(',').map(f => f.trim()).filter(Boolean),
          clubs: campusForm.clubs,
          highlights: campusForm.highlights
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCollege(data);
        setEditCampus(false);
      } else {
        alert(data.error || 'Failed to update campus life');
      }
    } catch {
      alert('Network error');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

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
                  <p className="text-xs text-gray-500 -mt-1">College Dashboard</p>
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
              <button onClick={handleDeleteAccount} className="p-2 text-red-400 hover:text-red-600" title="Delete Account">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 mb-8">
        <img
          src={bannerImage}
          alt="College Banner"
          className="w-full h-full object-cover object-center rounded-b-3xl shadow-lg"
        />
        <button
          className="absolute bottom-4 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center"
          onClick={() => bannerInputRef.current.click()}
          title="Upload Banner Image"
        >
          <Camera className="h-5 w-5" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={bannerInputRef}
          className="hidden"
          onChange={handleBannerChange}
        />
      </div>

      <div className="container-responsive-xl py-6 sm:py-8">
        {/* College Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative group w-32 h-32 flex-shrink-0 mx-auto sm:mx-0">
              <img
                src={collegeImage}
                alt="College"
                className="w-32 h-32 object-cover rounded-2xl border-4 border-blue-100 shadow group-hover:opacity-80 transition"
              />
              <button
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center"
                onClick={() => fileInputRef.current.click()}
                title="Upload College Picture"
              >
                <Camera className="h-5 w-5" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">{college?.name} <Badge variant="outline">College</Badge></h2>
              <div className="flex flex-wrap gap-4 mt-2 text-gray-700">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {college?.email}</div>
                <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> {college?.country}</div>
              </div>
              <div className="mt-4 text-gray-600 text-base leading-relaxed">
                {college?.description || 'No description provided.'}
              </div>
              <div className="mt-2 text-sm text-blue-600 font-medium">Created At: {new Date(college?.createdAt).toLocaleString()}</div>
              {/* Contact & Social Info */}
              <div className="mt-4 flex flex-wrap gap-6 items-center text-gray-700">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {college?.phone || 'N/A'}</div>
                <div className="flex items-center gap-2"><GlobeIcon className="h-4 w-4" /> {college?.website ? (
                  <a href={college.website.startsWith('http') ? college.website : `https://${college.website}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">{college.website.replace(/^https?:\/\//, '')}</a>
                ) : 'N/A'}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {college?.location || 'N/A'}</div>
                <div className="flex items-center gap-2">
                  {college?.facebook && <a href={college.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><Facebook className="h-4 w-4" /></a>}
                  {college?.instagram && <a href={college.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><Instagram className="h-4 w-4" /></a>}
                  {college?.twitter && <a href={college.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><Twitter className="h-4 w-4" /></a>}
                </div>
              </div>
              <div className="mt-4">
                {/* Type Selector: Only show if not set */}
                {(!college?.type || college?.type === '') ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const type = e.target.type.value;
                      if (!type) return;
                      try {
                        const token = localStorage.getItem('collegeToken');
                        const res = await fetch(`${API_URL}/api/colleges/${college._id}`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                          },
                          body: JSON.stringify({ type })
                        });
                        const data = await res.json();
                        if (res.ok) {
                          setCollege(data);
                        } else {
                          alert(data.error || 'Failed to update type');
                        }
                      } catch {
                        alert('Network error');
                      }
                    }}
                    className="flex items-center gap-2 mt-2"
                  >
                    <label htmlFor="type" className="font-medium text-gray-700">Type:</label>
                    <select
                      id="type"
                      name="type"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                      <option value="Deemed">Deemed</option>
                    </select>
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Save</button>
                  </form>
                ) : (
                  <div className="text-sm text-gray-700 mt-2"><span className="font-semibold">Type:</span> {college.type}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[{
            label: 'Ranking',
            value: college?.ranking || 'N/A',
            icon: Trophy,
            color: 'bg-yellow-100 text-yellow-800'
          }, {
            label: 'Rating',
            value: college?.rating ? `${college.rating}/5` : 'N/A',
            icon: Star,
            color: 'bg-blue-100 text-blue-800'
          }, {
            label: 'Total Students',
            value: college?.students || 'N/A',
            icon: Users,
            color: 'bg-green-100 text-green-800'
          }, {
            label: 'Placement Rate',
            value: college?.placementRate || 'N/A',
            icon: Trophy,
            color: 'bg-purple-100 text-purple-800'
          }].map(stat => (
            <div key={stat.label} className={`rounded-2xl bg-white shadow border border-gray-100 flex flex-col items-center py-6 px-2 ${stat.color}`}>
              <span className="rounded-full p-2 mb-2 bg-white/80"><stat.icon className="h-6 w-6" /></span>
              <span className="font-bold text-xl">{stat.value}</span>
              <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 sm:mb-8 border border-gray-100 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {tabSections.map(section => (
              <button
                key={section.key}
                onClick={() => setTab(section.key)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  tab === section.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">{section.label}</span>
                <span className="sm:hidden">{section.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 min-h-[200px]">
          {tab === 'overview' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">About</h3>
                {!editOverview && (
                  <button onClick={() => setEditOverview(true)} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit</button>
                )}
              </div>
              {!editOverview ? (
                <div>
                  <p className="text-gray-700 mb-2">{college?.description || 'No description provided.'}</p>
                  <div className="flex flex-wrap gap-4 text-gray-700 mb-2">
                    <div><span className="font-semibold">Type:</span> {college?.type || 'N/A'}</div>
                    <div><span className="font-semibold">Location:</span> {college?.location || 'N/A'}</div>
                    <div><span className="font-semibold">Website:</span> {college?.website || 'N/A'}</div>
                    <div><span className="font-semibold">Phone:</span> {college?.phone || 'N/A'}</div>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">Created At: {new Date(college?.createdAt).toLocaleString()}</div>
                </div>
              ) : (
                <form onSubmit={handleOverviewSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">College Name</label>
                    <input type="text" name="name" value={overviewForm.name} onChange={handleOverviewChange} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" value={overviewForm.description} onChange={handleOverviewChange} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select name="type" value={overviewForm.type} onChange={handleOverviewChange} className="w-full border rounded px-3 py-2" required>
                      <option value="">Select Type</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                      <option value="Deemed">Deemed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input type="text" name="location" value={overviewForm.location} onChange={handleOverviewChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <input type="text" name="website" value={overviewForm.website} onChange={handleOverviewChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input type="text" name="phone" value={overviewForm.phone} onChange={handleOverviewChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save</button>
                    <button type="button" onClick={() => setEditOverview(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Cancel</button>
                  </div>
                </form>
              )}
              {/* Map Embed */}
              <div className="mt-6">
                <h4 className="text-base font-semibold text-blue-700 mb-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</h4>
                <div className="rounded-xl overflow-hidden border shadow-lg w-full max-w-xl">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(college?.location || '')}&output=embed`}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="College Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
          {tab === 'gallery' && (
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Gallery</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                {galleryImages.length === 0 && <div className="text-gray-500">No images uploaded yet.</div>}
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Gallery ${idx+1}`} className="w-40 h-32 object-cover rounded-xl border shadow" />
                    <button
                      type="button"
                      onClick={() => handleDeleteGalleryImage(img)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition"
                      title="Delete Image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={galleryInputRef}
                className="hidden"
                onChange={handleGalleryChange}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
                onClick={() => galleryInputRef.current.click()}
              >
                <Camera className="h-5 w-5" /> Upload Images
              </button>
            </div>
          )}
          {tab === 'testimonials' && (
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2"><Quote className="h-5 w-5" /> Testimonials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {testimonials.length === 0 && <div className="text-gray-500">No testimonials yet.</div>}
                {testimonials.map((t, idx) => (
                  <div key={idx} className={`relative bg-blue-50 rounded-xl p-5 shadow flex flex-col gap-2 border-2 ${t.featured ? 'border-yellow-400' : 'border-transparent'}`}>
                    {t.featured && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded font-bold">Featured</span>
                    )}
                    <div className="text-gray-700 italic">"{t.text}"</div>
                    <div className="font-semibold text-blue-700 mt-2">- {t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleFeatureTestimonial(idx)}
                        className={`px-3 py-1 rounded text-xs font-semibold ${t.featured ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-yellow-500 transition`}
                      >
                        {t.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        onClick={() => handleReportTestimonial(idx)}
                        className={`px-3 py-1 rounded text-xs font-semibold ${t.reported ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-500 transition`}
                        disabled={t.reported}
                      >
                        {t.reported ? 'Reported' : 'Report'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'financials' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">Financials</h3>
                {!editFinancials && (
                  <button onClick={() => setEditFinancials(true)} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit</button>
                )}
              </div>
              {!editFinancials ? (
                <div className="space-y-2">
                  <div><span className="font-semibold">Tuition Fees:</span> {college?.tuition || 'N/A'}</div>
                  <div><span className="font-semibold">Hostel Fees:</span> {college?.hostel || 'N/A'}</div>
                  <div><span className="font-semibold">Scholarships/Financial Aid:</span> {college?.scholarships || 'N/A'}</div>
                </div>
              ) : (
                <form onSubmit={handleFinancialsSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tuition Fees</label>
                    <input type="text" name="tuition" value={financialsForm.tuition} onChange={handleFinancialsChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Hostel Fees</label>
                    <input type="text" name="hostel" value={financialsForm.hostel} onChange={handleFinancialsChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Scholarships/Financial Aid</label>
                    <textarea name="scholarships" value={financialsForm.scholarships} onChange={handleFinancialsChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save</button>
                    <button type="button" onClick={() => setEditFinancials(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}
          {tab === 'placements' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">Placements</h3>
                {!editPlacements && (
                  <button onClick={() => setEditPlacements(true)} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit</button>
                )}
              </div>
              {!editPlacements ? (
                <div className="space-y-2">
                  <div><span className="font-semibold">Average Package:</span> {college?.avgPackage || 'N/A'}</div>
                  <div><span className="font-semibold">Highest Package:</span> {college?.highestPackage || 'N/A'}</div>
                  <div><span className="font-semibold">Placement Rate:</span> {college?.placementRate || 'N/A'}</div>
                  <div><span className="font-semibold">Top Recruiters:</span> {college?.topRecruiters ? college.topRecruiters.join(', ') : 'N/A'}</div>
                </div>
              ) : (
                <form onSubmit={handlePlacementsSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Average Package</label>
                    <input type="text" name="avgPackage" value={placementsForm.avgPackage} onChange={handlePlacementsChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Highest Package</label>
                    <input type="text" name="highestPackage" value={placementsForm.highestPackage} onChange={handlePlacementsChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Placement Rate</label>
                    <input type="text" name="placementRate" value={placementsForm.placementRate} onChange={handlePlacementsChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Top Recruiters (comma separated)</label>
                    <input type="text" name="topRecruiters" value={placementsForm.topRecruiters} onChange={handlePlacementsChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save</button>
                    <button type="button" onClick={() => setEditPlacements(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}
          {tab === 'campus' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">Campus Life</h3>
                {!editCampus && (
                  <button onClick={() => setEditCampus(true)} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit</button>
                )}
              </div>
              {!editCampus ? (
                <div className="space-y-2">
                  <div><span className="font-semibold">Facilities:</span> {college?.facilities ? college.facilities.join(', ') : 'N/A'}</div>
                  <div><span className="font-semibold">Clubs/Events:</span> {college?.clubs || 'N/A'}</div>
                  <div><span className="font-semibold">Highlights:</span> {college?.highlights || 'N/A'}</div>
                </div>
              ) : (
                <form onSubmit={handleCampusSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Facilities (comma separated)</label>
                    <input type="text" name="facilities" value={campusForm.facilities} onChange={handleCampusChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Clubs/Events</label>
                    <input type="text" name="clubs" value={campusForm.clubs} onChange={handleCampusChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Highlights</label>
                    <textarea name="highlights" value={campusForm.highlights} onChange={handleCampusChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save</button>
                    <button type="button" onClick={() => setEditCampus(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeDashboard; 