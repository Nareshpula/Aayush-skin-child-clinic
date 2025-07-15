import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Define menu items to match NavBar
const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/#skin-care', label: 'Skin Care' },
  { path: '/#child-care', label: 'Child Care' },
  { path: '#contact-form', label: 'Enquiries & Queries' },
  { path: '#visit-us', label: 'Visit Us' }
];

// Define service items from NavBar
const skinCareServices = [
  { path: '/dullness', label: 'Dullness' },
  { path: '/acne', label: 'Acne & Acne Scars' },
  { path: '/laser-hair-removal', label: 'Laser Hair Removal' },
  { path: '/hair-loss-treatment', label: 'Hair Loss Treatment' },
  { path: '/prp-hair-therapy', label: 'PRP Hair Therapy' },
  { path: '/mesotherapy-treatment', label: 'Mesotherapy Treatment' },
  { path: '/pigmentation', label: 'Pigmentation' },
  { path: '/anti-ageing', label: 'Anti-Ageing' },
  { path: '/dryness', label: 'Dryness' },
  { path: '/stretch-mark-removal', label: 'Stretch Mark Removal' },
  { path: '/tattoo-removal', label: 'Tattoo Removal' },
  { path: '/mole-removal', label: 'Mole Removal' },
  { path: '/wart-removal', label: 'Wart Removal' }
];

const childCareServices = [
  { path: '/general-pediatrics', label: 'General Pediatrics' },
  { path: '/childrens-nutrition', label: 'Children Nutrition' },
  { path: '/pediatric-infectious-diseases', label: 'Pediatric Infectious Disease' },
  { path: '/developmental-behavioral-pediatrics', label: 'Developmental & Behavioral Pediatrics' },
  { path: '/vaccinations-immunizations', label: 'Vaccinations & Immunizations' },
  { path: '/picu-nicu', label: 'NICU & PICU' },
  { path: '/growth-development-monitoring', label: 'Growth & Development Monitoring' },
  { path: '/newborn-care-well-baby-checkups', label: 'Newborn Care & Well-Baby Checkups' },
  { path: '/advanced-lab-services', label: 'Advanced Lab Services' }
];

const EntrainerSection = () => (
  <div className="bg-[#2f919b] text-white py-4">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-lg font-semibold">Stay Connected with Us</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white/80 transition duration-300">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-white/80 transition duration-300">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-white/80 transition duration-300">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-white/80 transition duration-300">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const CustomFooter = () => {
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-form');
    
    if (location.pathname === '/') {
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact-form';
    }
  };

  const handleVisitUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const visitUsSection = document.getElementById('visit-us');
    
    if (location.pathname === '/') {
      visitUsSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#visit-us';
    }
  };

  return (
    <footer className="bg-[#fdf6ff]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <h3 className="font-['Montserrat'] text-lg md:text-2xl font-extrabold tracking-wider text-[#685392]">
                AAYUSH
              </h3>
              <div className="mx-2 h-8 md:h-12 w-0.5 bg-[#685392]/70 rounded-full"></div>
              <div className="flex flex-col">
                <span className="font-['Montserrat'] text-base md:text-lg font-extrabold text-[#7e3a93] tracking-wide">
                  Child & Skin
                </span>
                <span className="font-['Montserrat'] text-sm md:text-base font-bold text-[#7e3a93]/90 tracking-wide">
                  Hospital
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-black/70 transition duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-black/70 transition duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-black/70 transition duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-black/70 transition duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#5b4186]">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.path.startsWith('#') ? (
                    <a 
                      href={link.path} 
                      onClick={
                        link.path === '#contact-form' ? handleContactClick : 
                        link.path === '#visit-us' ? handleVisitUsClick : 
                        undefined
                      }
                      className="text-black/90 hover:text-black transition duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-black/90 hover:text-black transition duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#5b4186]">Skin Care</h4>
              <ul className="space-y-2">
                {skinCareServices.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.path} 
                      className="text-black/90 hover:text-black transition duration-300"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#5b4186]">Child Care</h4>
              <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
                {childCareServices.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.path} 
                      className="text-black/90 hover:text-black transition duration-300"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#5b4186]">Working Hours</h4>
            <ul className="space-y-2">
              <li className="text-black/90">NICU & PICU Emergency</li>
              <li className="font-semibold">24/7 Hours</li>
              <li className="text-black/90 mt-4">OPD Mon-Sat</li>
              <li className="font-semibold">09:00 AM IST – 09:00 PM IST</li>             
              <li className="text-black/90 mt-4">Sunday</li>
              <li className="font-semibold">10:30 AM IST – 01:00 PM IST</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#7a3a95] py-4 text-center text-white">
        <p>Copyright ©{new Date().getFullYear()}. All Rights Reserved by Aayush Child & Skin Hospital</p>
      </div>
    </footer>
  );
};

export default CustomFooter;