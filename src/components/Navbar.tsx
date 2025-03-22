import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, ScanLine } from 'lucide-react';

// Define menu items once to avoid duplication
const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  {
    path: '#services',
    label: 'Services',
    dropdown: [
      { label: 'Digital X-rays', path: '/digital-xrays' },
      { label: 'Pregnancy Scans', path: '/ultrasound-pregnancy-scanning' },
      { label: 'Ultrasound & Color Doppler', path: '/ultrasound-scanning' },
      { label: 'CT Scan', path: '/ct-scan' },
      { label: '3.0 Tesla Open Flare MRI', path: '/tesla-mri-scan' }
    ]
  },
  { path: '/doctors', label: 'Doctors' },
  { path: '#contact-form', label: 'Appointments & Queries' },
  { path: '#visit-us', label: 'Visit Us' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [showScanTooltip, setShowScanTooltip] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleVisitUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      const visitUsSection = document.getElementById('visit-us');
      visitUsSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { replace: true });
      // Wait for navigation to complete before scrolling
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('visit-us')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    }
    
    setIsOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact-form');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { replace: true });
      // Wait for navigation to complete before scrolling
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    }
    
    setIsOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollPosition <= 100 && isScrolled) {
      setIsScrolled(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset scroll state when location changes
  useEffect(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 100);
  }, [location]);

  return (
    <nav className={`fixed w-full top-0 left-0 right-0 z-[9999] ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`flex justify-between items-center h-24 ${
          isScrolled ? 'border-b border-gray-200/50' : 'border-b border-black/50'
        }`}>
          <Link to="/" className="flex items-center gap-4 flex-1 group">
            <div className="relative w-auto h-16 flex items-center">
              <img 
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Jyohi-diagnostics-logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0p5b2hpLWRpYWdub3N0aWNzLWxvZ28uc3ZnIiwiaWF0IjoxNzQxMDc5MjgzLCJleHAiOjE4OTg3NTkyODN9.3-uIY78ikzZkxuKgYiDzssJqw2ErUA7SoXx2AnpkH-U"
                alt="Jyothi Diagnostics Logo"
                className="h-full w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h1 className={`font-['Montserrat'] text-lg md:text-xl font-bold tracking-wide drop-shadow-sm ${
                'text-[#685392]'
              }`}>
                Jyothi Diagnostics
              </h1>
              <p className={`font-['Open_Sans'] text-[10px] md:text-sm font-light mt-0.5 ${
                'text-[#7e3a93]'
              }`}>
                The Best Comprehensive Diagnostics
              </p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search Scan's, Services"
                className={`pl-10 pr-4 py-2 rounded-full w-44 focus:w-56 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6f42c1] ${
                  'bg-white shadow-sm border border-gray-200 text-black placeholder-gray-500'
                }`}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#6f42c1]" />
            </div>
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <a 
                href="tel:9100752753" 
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2.5 rounded-full hover:bg-purple-700 transition duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </a>
              <button className="flex items-center space-x-2 bg-teal-500 text-white px-6 py-2.5 rounded-full hover:bg-teal-600 transition duration-300 whitespace-nowrap">
                <ScanLine className="w-4 h-4" />
                <span>24/7 CT & MRI Scans Available</span>
              </button>
            </div>
            {/* Mobile icons */}
            <div className="md:hidden flex items-center space-x-3">
              <div className="relative">
                <button 
                  onMouseEnter={() => setShowScanTooltip(true)}
                  onMouseLeave={() => setShowScanTooltip(false)}
                  className="flex items-center justify-center w-10 h-10 bg-[#6f42c1] rounded-full hover:bg-[#5a359d] transition-colors duration-300"
                >
                  <ScanLine className="w-5 h-5 text-white" />
                </button>
                {showScanTooltip && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap shadow-lg z-50">
                    24/7 CT & MRI Scans Available
                  </div>
                )}
              </div>
              <a 
                href="tel:9100752753"
                className="flex items-center justify-center w-10 h-10 bg-[#6f42c1] rounded-full hover:bg-[#5a359d] transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className={`hidden md:block py-4 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        } ${isScrolled ? 'border-t border-gray-200/50' : 'border-t border-black/50'}`}>
          <ul className="flex justify-center space-x-8">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li 
                  key={index} 
                  className={`group relative ${
                    isActive ? 'text-blue-600' : ''
                  }`}
                >
                  {item.dropdown ? (
                    <>
                      <a 
                        href={item.path} 
                       className="font-medium transition-colors text-black hover:text-gray-600 cursor-pointer relative pb-2"
                       onClick={(e) => e.preventDefault()}
                      >
                        {item.label}
                        <span className="ml-1">▼</span>
                      </a>
                     <ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full w-64 bg-white shadow-lg rounded-md py-2 z-50 transition-all duration-300 ease-in-out">
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <li key={dropIndex}>
                            <Link 
                              to={dropItem.path}
                              onClick={handleMenuClick}
                             className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#dfcde7] transition-all duration-300 hover:translate-x-2"
                            >
                              {dropItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`font-medium transition-colors text-black hover:text-gray-600 ${
                        location.pathname === item.path && item.path !== '/' ? 'text-blue-600' : ''
                      }`}
                      onClick={
                        item.path === '/' ? handleHomeClick :
                        item.path === '#visit-us' ? handleVisitUsClick : 
                        item.path === '#contact-form' ? handleContactClick : 
                        () => {
                          handleMenuClick();
                          window.scrollTo(0, 0);
                        }
                      }
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-24 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-20 space-y-1 sm:px-3 max-h-[calc(100vh-96px)] overflow-y-auto border-t border-gray-200">
            {menuItems.map((item, index) => {
              if (item.dropdown) {
                return (
                  <div key={index} className="space-y-1">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-gray-900 font-medium hover:bg-gray-100/80 rounded-lg transition-colors duration-200"
                    >
                      <span>{item.label}</span>
                      <span className={`transform transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    <div className={`pl-6 space-y-1 transition-all duration-200 ${mobileServicesOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <Link
                          key={dropIndex}
                          to={dropItem.path}
                          className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100/80 rounded-lg transition-colors duration-200"
                          onClick={() => {
                            handleMenuClick();
                            setMobileServicesOpen(false);
                          }}
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`block px-3 py-2.5 hover:bg-gray-100/80 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path && item.path !== '/' ? 'text-blue-600' : 'text-gray-900'
                  }`}
                  onClick={
                    item.path === '/' ? handleHomeClick :
                    item.path === '#visit-us' ? handleVisitUsClick : 
                    item.path === '#contact-form' ? handleContactClick : 
                    () => {
                      handleMenuClick();
                      window.scrollTo(0, 0);
                    }
                  }
                >{item.label}</Link>
              );
            })}
            <div className="mt-4 space-y-2">
            <a 
              href="tel:9100752753"
              className="block w-full bg-purple-600 text-white px-6 py-2.5 rounded-full hover:bg-purple-700 transition duration-300 text-center shadow-md"
            >
              <span className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </span>
            </a>
            <button className="w-full bg-teal-500 text-white px-6 py-2.5 rounded-full hover:bg-teal-600 transition duration-300 shadow-md">
              <span className="flex items-center justify-center">
                <ScanLine className="w-4 h-4 mr-2" />
                24/7 CT & MRI Scans Available
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;