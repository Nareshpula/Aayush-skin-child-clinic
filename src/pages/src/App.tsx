import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomFooter from './components/CustomFooter';
import { lazy, Suspense } from 'react';
import PerformanceMonitor from './components/PerformanceMonitor';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import DrGSridharProfile from './pages/doctors/dr-g-sridhar';
import DrHimabinduSridharProfile from './pages/doctors/dr-himabindu-sridhar';
import BlogArticle from './pages/BlogArticle';
import NutritionArticle from './pages/NutritionArticle';
import FeverArticle from './pages/FeverArticle';
import VaccinationsImmunizations from './pages/VaccinationsImmunizations.tsx';
import DevelopmentalBehavioralPediatrics from './pages/DevelopmentalBehavioralPediatrics';
import PediatricInfectiousDiseases from './pages/PediatricInfectiousDiseases';
import PicuNicu from './pages/PicuNicu.tsx';
import ChildrensNutrition from './pages/ChildrensNutrition';
import GeneralPediatrics from './pages/GeneralPediatrics';
import AdvancedLabServices from './pages/AdvancedLabServices';
import NewbornCareWellBabyCheckups from './pages/NewbornCareWellBabyCheckups';
import GrowthDevelopmentMonitoring from './pages/GrowthDevelopmentMonitoring';
import AcneArticle from './pages/AcneArticle';
import PigmentationArticle from './pages/PigmentationArticle';
import Pigmentation from './pages/Pigmentation';
import Acne from './pages/Acne';
import Dullness from './pages/Dullness';
import Dryness from './pages/Dryness';
import AntiAgeing from './pages/AntiAgeing';
import LaserHairRemoval from './pages/LaserHairRemoval';
import HairLossTreatment from './pages/HairLossTreatment';
import PRPHairTherapy from './pages/PRPHairTherapy';
import MesotherapyTreatment from './pages/MesotherapyTreatment';
import StretchMarkRemoval from './pages/StretchMarkRemoval';
import TattooRemoval from './pages/TattooRemoval';
import MoleRemoval from './pages/MoleRemoval';
import WartRemoval from './pages/WartRemoval';
import AgingArticle from './pages/AgingArticle';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentsDashboard from './pages/AppointmentsDashboard';
import Unauthorized from './pages/Unauthorized';
import ScrollToTop from '@/components/ScrollToTop';
import DoctorExceptions from './pages/DoctorExceptions';

// Lazy load the BookAppointment page to improve initial load time
const BookAppointmentV2 = lazy(() => import('./pages/BookAppointmentV2'));

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center pt-24 md:pt-36 bg-gradient-to-b from-[#f8f5ff] to-[#f0f0f5]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#7a3a95] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <h3 className="text-xl font-semibold text-[#7a3a95] mb-2">Loading Appointment Page</h3>
      <p className="text-gray-600">Please wait while we prepare your booking experience...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollToTop />
       <PerformanceMonitor />
        <Navbar />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/dr-g-sridhar" element={<DrGSridharProfile />} />
            <Route path="/doctors/dr-himabindu-sridhar" element={<DrHimabinduSridharProfile />} />
            <Route path="/general-pediatrics" element={<GeneralPediatrics />} />
            <Route path="/childrens-nutrition" element={<ChildrensNutrition />} />
           <Route path="/pediatric-infectious-diseases" element={<PediatricInfectiousDiseases />} />
           <Route path="/developmental-behavioral-pediatrics" element={<DevelopmentalBehavioralPediatrics />} />
          <Route path="/picu-nicu" element={<PicuNicu />} />
           <Route path="/vaccinations-immunizations" element={<VaccinationsImmunizations />} />
          <Route path="/growth-development-monitoring" element={<GrowthDevelopmentMonitoring />} />
          <Route path="/advanced-lab-services" element={<AdvancedLabServices />} />
          <Route path="/newborn-care-well-baby-checkups" element={<NewbornCareWellBabyCheckups />} />
          <Route path="/pigmentation" element={<Pigmentation />} />
          <Route path="/dullness" element={<Dullness />} />
          <Route path="/anti-ageing" element={<AntiAgeing />} />
          <Route path="/dryness" element={<Dryness />} />
          <Route path="/laser-hair-removal" element={<LaserHairRemoval />} />
          <Route path="/hair-loss-treatment" element={<HairLossTreatment />} />
          <Route path="/prp-hair-therapy" element={<PRPHairTherapy />} />
          <Route path="/mesotherapy-treatment" element={<MesotherapyTreatment />} />
          <Route path="/stretch-mark-removal" element={<StretchMarkRemoval />} />
          <Route path="/tattoo-removal" element={<TattooRemoval />} />
          <Route path="/mole-removal" element={<MoleRemoval />} />
          <Route path="/wart-removal" element={<WartRemoval />} />
          <Route path="/book-appointment" element={
            <Suspense fallback={<LoadingFallback />}>
              <BookAppointmentV2 />
            </Suspense>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRoles="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/appointments-dashboard" element={
            <ProtectedRoute requiredRoles={['admin', 'reception']}>
              <AppointmentsDashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctor-exceptions" element={
            <ProtectedRoute requiredRoles={['admin', 'reception']}>
              <DoctorExceptions />
            </ProtectedRoute>
          } />
          <Route path="/acne" element={<Acne />} />
            <Route path="/blog/understanding-ear-infections" element={<BlogArticle />} />
            <Route path="/blog/nutritional-deficiencies-impact" element={<NutritionArticle />} />
            <Route path="/blog/when-is-fever-a-concern" element={<FeverArticle />} />
            <Route path="/blog/causes-of-acne-scars" element={<AcneArticle />} />
            <Route path="/blog/understanding-pigmentation" element={<PigmentationArticle />} />
            <Route path="/blog/understanding-aging-face" element={<AgingArticle />} />
          </Routes>
        </main>
        {['/general-pediatrics', '/childrens-nutrition', '/pediatric-infectious-diseases', 
           '/developmental-behavioral-pediatrics', '/vaccinations-immunizations', '/picu-nicu',
           '/growth-development-monitoring', '/newborn-care-well-baby-checkups', '/advanced-lab-services'
         ].includes(location.pathname) ? <CustomFooter /> : <Footer />}
      </div>
    </Router>
  );
}

export default App;