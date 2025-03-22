import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
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
    <footer className="bg-[#e5f9f8] text-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Jyothi Diagnostics</h3>
            <p className="text-black/90 mb-4">
              Providing quality diagnostic services with advanced technology and expert care.
            </p>
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
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-black/90 hover:text-black transition duration-300">Home</Link></li>
              <li><Link to="/about" className="text-black/90 hover:text-black transition duration-300">About Us</Link></li>
              <li><Link to="/#services" className="text-black/90 hover:text-black transition duration-300">Services</Link></li>
              <li><a href="#contact-form" onClick={handleContactClick} className="text-black/90 hover:text-black transition duration-300">Contact</a></li>
              <li><a href="#visit-us" onClick={handleVisitUsClick} className="text-black/90 hover:text-black transition duration-300">Visit Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link to="/digital-xrays" className="text-black/90 hover:text-black transition duration-300">Digital X-rays</Link></li>
              <li><Link to="/ultrasound-pregnancy-scanning" className="text-black/90 hover:text-black transition duration-300">Pregnancy Scans</Link></li>
              <li><Link to="/ultrasound-scanning" className="text-black/90 hover:text-black transition duration-300">Ultrasound & Color Doppler</Link></li>
              <li><Link to="/ct-scan" className="text-black/90 hover:text-black transition duration-300">CT Scan</Link></li>
              <li><Link to="/tesla-mri-scan" className="text-black/90 hover:text-black transition duration-300">3.0 Tesla Open Flare MRI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Working Hours</h4>
            <ul className="space-y-2">
              <li className="text-black/90">CT & MRI Scans Emergency</li>
              <li className="font-semibold">24/7 Hours</li>
              <li className="text-black/90 mt-4">OPD Mon-Sat</li>
              <li className="font-semibold">09:00 AM IST – 09:00 PM IST</li>             
              <li className="text-black/90 mt-4">Sunday</li>
              <li className="font-semibold">10:30 AM IST – 01:00 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/20 mt-12 pt-8 text-center text-black/90">
          <p>&copy; {new Date().getFullYear()} Jyothi Diagnostics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;