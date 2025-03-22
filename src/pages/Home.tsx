import React from 'react';
import Hero from '../components/Hero';
import OrganTests from '../components/OrganTests';
import Services from '../components/Services';
import MriTesla from '../components/MriTesla';
import UltrasoundServices from '../components/UltrasoundServices';
import StatisticsSection from '../components/StatisticsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import GoogleReviews from '../components/GoogleReviews';
import VisitUs from '../components/VisitUs';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO />
      <Hero />
      <OrganTests />
      <Services />
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