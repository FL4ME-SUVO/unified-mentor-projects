import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import CollegeSignup from "./pages/CollegeSignup";
import CareerSelection from "./pages/CareerSelection";
import LocationSelection from "./pages/LocationSelection";
import CollegeList from "./pages/CollegeList";
import CollegeSelection from "./pages/CollegeSelection";
import CollegeComparisonPage from "./pages/CollegeComparisonPage";
import AptitudeTest from "./pages/AptitudeTest";
import TestCompletion from "./pages/TestCompletion";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import CollegeLogin from "./pages/CollegeLogin";
import CollegeDashboard from "./pages/CollegeDashboard";
import CollegeDetails from './pages/CollegeDetails';

// Route guard for admin
const RequireAdmin = ({ children }) => {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/college-signup" element={<CollegeSignup />} />
      <Route path="/career-selection" element={<CareerSelection />} />
      <Route path="/location-selection" element={<LocationSelection />} />
      <Route path="/college-list" element={<CollegeList />} />
      <Route path="/college-selection" element={<CollegeSelection />} />
      <Route path="/college-comparison" element={<CollegeComparisonPage />} />
      <Route path="/aptitude-test" element={<AptitudeTest />} />
      <Route path="/test-completion" element={<TestCompletion />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={
        <RequireAdmin>
          <AdminDashboard />
        </RequireAdmin>
      } />
      <Route path="/about" element={<About />} />
      <Route path="/college-login" element={<CollegeLogin />} />
      <Route path="/college-dashboard" element={<CollegeDashboard />} />
      <Route path="/college/:id" element={<CollegeDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App; 