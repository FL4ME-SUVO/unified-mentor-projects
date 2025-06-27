import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Globe, Mail, Phone, Users, DollarSign, Star, BookOpen, ArrowLeft, Image as ImageIcon, Quote, Compass } from 'lucide-react';
import supabase from '../lib/supabaseClient'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'map', label: 'Map' },
];

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollege = async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .eq('_id', id)
        .single()
      if (error) {
        setError('Failed to fetch college details.')
        setCollege(null)
      } else {
        setCollege(data)
      }
      setLoading(false)
    }
    fetchCollege()
  }, [id])

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!college) return <div className="p-8 text-center text-red-600">College not found.</div>;

  // Gallery images
  const gallery = college.galleryImages && college.galleryImages.length > 0
    ? college.galleryImages.map(img => img.startsWith('http') ? img : 'http://localhost:5000' + img)
    : [];

  // Testimonials
  const testimonials = college.testimonials || [];

  // Map embed
  const mapEmbed = college.location
    ? `https://www.google.com/maps?q=${encodeURIComponent(college.location)}&output=embed`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-10 px-2 sm:px-0">
      <div className="max-w-5xl mx-auto">
        <Link to="/college-list" className="flex items-center text-blue-600 hover:text-blue-800 mb-8 text-lg font-semibold">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to List
        </Link>
        {/* Hero Section */}
        <div className="relative rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="relative h-64 sm:h-80 bg-gradient-to-r from-blue-700 to-indigo-700 flex items-end">
            {college.bannerImage && (
              <img
                src={college.bannerImage.startsWith('http') ? college.bannerImage : 'http://localhost:5000' + college.bannerImage}
                alt={college.name}
                className="w-full h-full object-cover absolute inset-0 z-0"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
            {/* Floating Profile Image */}
            {college.profileImage && (
              <img
                src={college.profileImage.startsWith('http') ? college.profileImage : 'http://localhost:5000' + college.profileImage}
                alt={college.name}
                className="absolute left-12 -bottom-16 w-36 h-36 rounded-2xl border-4 border-white shadow-2xl object-cover bg-white z-20 transition-transform hover:scale-105"
                style={{ transition: 'transform 0.3s' }}
              />
            )}
            <div className="relative z-20 px-16 pb-10">
              <h1 className="text-5xl font-extrabold text-white drop-shadow flex items-center gap-4 mb-3">
                {college.name}
                {college.type && (
                  <span className="ml-2 px-4 py-1 bg-blue-200 text-blue-800 rounded-2xl text-base font-bold shadow">{college.type}</span>
                )}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90 text-lg font-medium">
                {college.location && (
                  <span className="flex items-center gap-2"><MapPin className="h-6 w-6" /> {college.location}</span>
                )}
                {college.country && (
                  <span className="flex items-center gap-2"><Globe className="h-6 w-6" /> {college.country}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Floating Profile Image Spacer */}
        <div className="h-20 sm:h-24" />
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div className="bg-blue-50 rounded-2xl p-7 flex flex-col items-center shadow-lg animate-fade-in">
            <DollarSign className="h-7 w-7 text-green-600 mb-2" />
            <div className="font-extrabold text-2xl">{college.tuition || 'N/A'}</div>
            <div className="text-sm text-gray-500 mt-1">Tuition</div>
          </div>
          <div className="bg-purple-50 rounded-2xl p-7 flex flex-col items-center shadow-lg animate-fade-in">
            <Star className="h-7 w-7 text-yellow-500 mb-2" />
            <div className="font-extrabold text-2xl">{college.acceptanceRate || 'N/A'}</div>
            <div className="text-sm text-gray-500 mt-1">Acceptance Rate</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-7 flex flex-col items-center shadow-lg animate-fade-in">
            <BookOpen className="h-7 w-7 text-blue-600 mb-2" />
            <div className="font-extrabold text-2xl">{college.topPrograms && college.topPrograms.length > 0 ? college.topPrograms.slice(0, 2).join(', ') : 'N/A'}</div>
            <div className="text-sm text-gray-500 mt-1">Top Programs</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex space-x-3 mb-10 border-b border-gray-200">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-3 font-bold rounded-t-2xl text-lg transition-all duration-200 ${tab === t.key ? 'bg-blue-600 text-white shadow -mb-px' : 'text-gray-600 hover:text-blue-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {tab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 text-gray-700 text-lg"><Building className="h-6 w-6" /> <span className="font-semibold">Type:</span> {college.type || 'N/A'}</div>
                  <div className="flex items-center gap-3 text-gray-700 text-lg"><Mail className="h-6 w-6" /> <span className="font-semibold">Email:</span> {college.email || 'N/A'}</div>
                  <div className="flex items-center gap-3 text-gray-700 text-lg"><Phone className="h-6 w-6" /> <span className="font-semibold">Phone:</span> {college.phone || 'N/A'}</div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-3 text-gray-700 text-lg"><Globe className="h-6 w-6" /> <span className="font-semibold">Website:</span> {college.website ? <a href={college.website.startsWith('http') ? college.website : 'https://' + college.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{college.website}</a> : 'N/A'}</div>
                  <div className="flex items-center gap-3 text-gray-700 text-lg"><Users className="h-6 w-6" /> <span className="font-semibold">Students:</span> {college.students ? college.students.toLocaleString() : 'N/A'}</div>
                  <div className="flex items-center gap-3 text-gray-700 text-lg"><Star className="h-6 w-6" /> <span className="font-semibold">Rating:</span> {college.rating || 'N/A'}</div>
                </div>
              </div>
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-blue-700 mb-3">About</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{college.description}</p>
              </div>
              <div className="mt-10 flex justify-center">
                <a href={college.website ? (college.website.startsWith('http') ? college.website : 'https://' + college.website) : '#'} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold rounded-2xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-xl">Visit Website</a>
              </div>
            </div>
          )}
          {tab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3"><ImageIcon className="h-6 w-6" /> Gallery</h2>
              {gallery.length === 0 ? (
                <div className="text-gray-500 text-lg">No images uploaded yet.</div>
              ) : (
                <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                  {gallery.map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx+1}`} className="w-72 h-52 object-cover rounded-2xl border shadow-lg" />
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === 'testimonials' && (
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3"><Quote className="h-6 w-6" /> Testimonials</h2>
              {testimonials.length === 0 ? (
                <div className="text-gray-500 text-lg">No testimonials yet.</div>
              ) : (
                <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="min-w-[340px] bg-blue-50 rounded-2xl p-6 shadow-lg flex flex-col gap-3 border-2 border-transparent hover:border-blue-400 transition">
                      <div className="text-gray-700 italic text-lg">"{t.text}"</div>
                      <div className="font-semibold text-blue-700 mt-2 text-base">- {t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                      {t.featured && <span className="inline-block mt-2 px-2 py-1 bg-yellow-400 text-white text-xs rounded font-bold">Featured</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === 'map' && (
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3"><Compass className="h-6 w-6" /> Location Map</h2>
              {mapEmbed ? (
                <div className="rounded-2xl overflow-hidden border shadow-lg w-full max-w-2xl mx-auto">
                  <iframe
                    src={mapEmbed}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="College Location Map"
                  ></iframe>
                </div>
              ) : (
                <div className="text-gray-500 text-lg">No map available.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails; 