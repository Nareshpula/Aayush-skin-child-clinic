import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomFooter from './components/CustomFooter';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import CTScan from './pages/CTScan';
import DigitalXrays from './pages/DigitalXrays.tsx';
import UltrasoundPregnancyScanning from './pages/UltrasoundPregnancyScanning';
import UltrasoundScanning from './pages/UltrasoundScanning';
import TeslaMriScan from './pages/TeslaMriScan';
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
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <ScrollToTop />
          <Navbar />
          <main id="main-content" className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/ct-scan" element={<CTScan />} />
              <Route path="/digital-xrays" element={<DigitalXrays />} />
              <Route path="/ultrasound-pregnancy-scanning" element={<UltrasoundPregnancyScanning />} />
              <Route path="/ultrasound-scanning" element={<UltrasoundScanning />} />
              <Route path="/tesla-mri-scan" element={<TeslaMriScan />} />
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
            <Route path="/book-appointment" element={<BookAppointment />} />
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
    </HelmetProvider>
  );
}

export default App;