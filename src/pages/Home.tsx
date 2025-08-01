import React from 'react';
import Hero from '../components/Hero';
import CentersOfExcellence from '../components/CentersOfExcellence';
import DermatologySection from '../components/DermatologySection';
import MillionsSection from '../components/MillionsSection';
import StatisticsSection from '../components/StatisticsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactForm from '../components/ContactForm';
import GoogleReviews from '../components/GoogleReviews';
import VisitUs from '../components/VisitUs';
import BlogSection from '../components/BlogSection';
import SEO from '../components/SEO';
import FindDoctor from '../components/FindDoctor';
import { Suspense, lazy } from 'react';

// Preload the BookAppointment page when on the home page
const preloadCriticalResources = () => {
  const resources = [
    { path: '/src/components/FindDoctor.tsx', as: 'script' },
    { path: '/src/components/CentersOfExcellence.tsx', as: 'script' }
  ];
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.as;
    link.href = resource.path;
    document.head.appendChild(link);
  });
}

// Lazy load components that are below the fold
const LazyGoogleReviews = lazy(() => import('../components/GoogleReviews'));
const LazyBlogSection = lazy(() => import('../components/BlogSection'));
const LazyVisitUs = lazy(() => import('../components/VisitUs'));

const Home = () => {
  // Preload critical resources
  React.useEffect(() => {
    preloadCriticalResources();
  }, []);

  return (
    <>
      <SEO />
      <Hero />
      <FindDoctor />
      <CentersOfExcellence />
      <DermatologySection />
      <MillionsSection />
      <StatisticsSection />
      <WhyChooseUs />
      <ContactForm />
      <Suspense fallback={<div className="h-96 flex items-center justify-center content-visibility-auto">Loading...</div>}>
        <LazyGoogleReviews />
      </Suspense>
      <Suspense fallback={<div className="h-96 flex items-center justify-center content-visibility-auto">Loading...</div>}>
        <LazyVisitUs />
      </Suspense>
      <Suspense fallback={<div className="h-96 flex items-center justify-center content-visibility-auto">Loading...</div>}>
        <LazyBlogSection />
      </Suspense>
    </>
  );
};

export default Home;