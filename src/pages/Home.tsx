import React from 'react';
import Hero from '../components/Hero';
import CentersOfExcellence from '../components/CentersOfExcellence';
import MriTesla from '../components/MriTesla';
import UltrasoundServices from '../components/UltrasoundServices';
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
      <MriTesla />
      <UltrasoundServices />
      <StatisticsSection />
      <WhyChooseUs />
      <GoogleReviews />
      <VisitUs />
      <ContactForm />
    </>
  );
};

export default Home;