import React from 'react';
import Hero from '../components/Hero';
import CentersOfExcellence from '../components/CentersOfExcellence';
import DermatologySection from '../components/DermatologySection';
import MillionsSection from '../components/MillionsSection';
import StatisticsSection from '../components/StatisticsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import GoogleReviews from '../components/GoogleReviews';
import VisitUs from '../components/VisitUs';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import FindDoctor from '../components/FindDoctor';

const Home = () => {
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
      <GoogleReviews />
      <VisitUs />
      <ContactForm />
    </>
  );
};

export default Home;