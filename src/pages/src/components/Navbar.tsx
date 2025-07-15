import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';

// Preload critical images
const LOGO_URL = "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Skin-pages-image/Aayush-logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2tpbi1wYWdlcy1pbWFnZS9BYXl1c2gtbG9nby5wbmciLCJpYXQiOjE3NDM2OTk3MzAsImV4cCI6MTkwMTM3OTczMH0.pg25T9SRSiXE0jn46_vxVzTK_vlJGURYwbeRpbjnIF0";

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  {
    path: '#skin-care',
    label: 'Skin Care',
    dropdown: [
      { label: 'Dullness', path: '/dullness' },
      { label: 'Acne & Acne Scars', path: '/acne' },
      { label: 'Laser Hair Removal', path: '/laser-hair-removal' },
      { label: 'Hair Loss Treatment', path: '/hair-loss-treatment' },
      { label: 'PRP Hair Therapy', path: '/prp-hair-therapy' },
      { label: 'Mesotherapy Treatment', path: '/mesotherapy-treatment' },
      { label: 'Pigmentation', path: '/pigmentation' },
      { label: 'Anti-Ageing', path: '/anti-ageing' },
      { label: 'Dryness', path: '/dryness' },
      { label: 'Stretch Mark Removal', path: '/stretch-mark-removal' },
      { label: 'Tattoo Removal', path: '/tattoo-removal' },
      { label: 'Mole Removal', path: '/mole-removal' },
      { label: 'Wart Removal', path: '/wart-removal' }
    ]
  },
  {
    path: '#child-care',
    label: 'Child Care',
    dropdown: [
      { label: 'General Pediatrics', path: '/general-pediatrics' },
      { label: 'Children Nutrition', path: '/childrens-nutrition' },
      { label: 'Pediatric Infectious Disease', path: '/pediatric-infectious-diseases' },
      { label: 'Developmental & Behavioral Pediatrics', path: '/developmental-behavioral-pediatrics' },
      { label: 'Vaccinations & Immunizations', path: '/vaccinations-immunizations' },
      { label: 'NICU & PICU', path: '/picu-nicu' },
      { label: 'Growth & Development Monitoring', path: '/growth-development-monitoring' },
      { label: 'Newborn Care & Well-Baby Checkups', path: '/newborn-care-well-baby-checkups' },
      { label: 'Advanced Lab Services', path: '/advanced-lab-services' }
    ]
  },
  {
    path: '#hair-care',
    label: 'Hair Care',
    dropdown: [
      { label: 'Laser Hair Removal', path: '/laser-hair-removal' },
      { label: 'Hair Loss Treatment', path: '/hair-loss-treatment' },
      { label: 'PRP Hair Therapy', path: '/prp-hair-therapy' },
      { label: 'Mesotherapy Treatment', path: '/mesotherapy-treatment' }
    ]
  },
  { path: '#contact-form', label: 'Enquiries & Queries' },
  { path: '#visit-us', label: 'Visit Us' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);
  const [showScanTooltip, setShowScanTooltip] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
    
  const toggleMobileCategory = (category: string) => {
    if (mobileOpenCategory === category) {
      setMobileOpenCategory(null);
    } else {
      setMobileOpenCategory(category);
    }
  };
  
  const handleVisitUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      const visitUsSection = document.getElementById('visit-us');
      visitUsSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
     // Use direct navigation for better performance
     window.location.href = '/#visit-us';
    }
    
    setIsOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact-form');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
     // Use direct navigation for better performance
     window.location.href = '/#contact-form';
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
        <div className={`flex justify-between items-center h-16 md:h-24 ${
          isScrolled ? 'border-b border-gray-200/50' : 'border-b border-black/50'
        }`}>
          <Link to="/" className="flex items-center gap-1 md:gap-4 flex-shrink-0 group">
            <div className="relative w-auto h-8 md:h-16 flex items-center overflow-hidden">
              <img 
                fetchpriority="high"
                src={LOGO_URL}
                alt="Aayush Logo"
                className="h-full w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500 max-h-8 md:max-h-16 min-w-[28px] gpu-accelerated will-change-transform"
                width="64"
                height="64"
              />
            </div>
            <div className="flex items-center overflow-hidden flex-shrink">
              <h1 className="font-['Montserrat'] text-xs md:text-2xl font-extrabold tracking-wider text-[#685392] drop-shadow-sm whitespace-nowrap">
                AAYUSH
              </h1>
              <div className="mx-1 md:mx-2 h-6 md:h-12 w-0.5 bg-[#685392]/70 rounded-full"></div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-['Montserrat'] text-[10px] md:text-lg font-extrabold text-[#7e3a93] tracking-wide truncate">
                  Child & Skin
                </span>
                <span className="font-['Montserrat'] text-[9px] md:text-base font-bold text-[#7e3a93]/90 tracking-wide truncate">
                  Hospital
                </span>
              </div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="tel:9676079516" 
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2.5 rounded-full hover:bg-purple-700 transition duration-300 whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </a>
              <a 
                href="tel:9676079516"
                className="flex items-center space-x-2 bg-teal-500 text-white px-6 py-2.5 rounded-full hover:bg-teal-600 transition duration-300 whitespace-nowrap"
              >
                <img 
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/emergency-call.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvZW1lcmdlbmN5LWNhbGwucG5nIiwiaWF0IjoxNzQyNjQ2NzYxLCJleHAiOjE5MDAzMjY3NjF9.uTwUHtPGSv3Hr4ejMdtf525dEIhyPiH4-EJrQ9H2Gyw"
                  alt="Emergency"
                  className="w-6 h-6 animate-pulse"
                />
                <span>Pediatric Emergency</span>
              </a>
              <Link
                to="/login" 
                className="flex items-center space-x-2 bg-[#783b94] text-white px-6 py-2.5 rounded-full hover:bg-[#6a2a85] transition duration-300" 
              >
                <span>Login</span>
              </Link>
            </div>
            {/* Mobile icons */}
            <div className="md:hidden flex items-center space-x-2">
              <div className="relative z-20 xs:block hidden">
                <button
                  onMouseEnter={() => setShowScanTooltip(true)}
                  onMouseLeave={() => setShowScanTooltip(false)}
                  className="flex items-center justify-center w-8 h-8 bg-[#6f42c1] rounded-full hover:bg-[#5a359d] transition-colors duration-300"
                >
                  <ScanLine className="w-4 h-4 text-white" />
                </button>
                {showScanTooltip && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap shadow-lg z-50">
                    24/7 NICU & PICU Available
                  </div>
                )}
              </div>
              <a 
                href="tel:9676079516"
                className="flex items-center justify-center w-9 h-9 bg-[#6f42c1] rounded-full hover:bg-[#5a359d] transition-colors duration-300 z-20"
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 z-20"
              >
                {isOpen ? <X className="w-5 h-5 text-gray-900" /> : <Menu className="w-5 h-5 text-gray-900" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className={`hidden md:block py-2 md:py-4 transition-all duration-300 ${
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
                             className={`block px-4 py-3 text-sm text-gray-700 hover:text-white transition-all duration-300 hover:translate-x-2 ${
                               item.label === 'Skin Care' ? 'hover:bg-[#ffc0cb]' : 
                               item.label === 'Hair Care' ? 'hover:bg-[#D8BFD8]' : 
                               'hover:bg-[#50b8b9]'
                             }`}
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
      <div className={`md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out z-10 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-20 space-y-1 sm:px-3 max-h-[calc(100vh-64px)] overflow-y-auto border-t border-gray-200">
            {menuItems.map((item, index) => {
              if (item.dropdown) {
                return (
                  <div key={index} className="space-y-1 mb-2">
                   <button
                     onClick={() => toggleMobileCategory(item.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-gray-900 font-medium hover:bg-gray-100/80 rounded-lg transition-colors duration-200 min-h-[44px]"
                   >
                     <span>{item.label}</span>
                     <span className={`transform transition-transform duration-200 ${mobileOpenCategory === item.label ? 'rotate-180' : ''}`}>▼</span>
                   </button>
                   <div className={`pl-6 space-y-1 transition-all duration-200 ${mobileOpenCategory === item.label ? 'opacity-100 max-h-[50vh] overflow-y-auto' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                     {item.dropdown.map((dropItem, dropIndex) => (
                       <Link
                         key={dropIndex}
                         to={dropItem.path}
                          className={`block px-3 py-2.5 text-gray-700 hover:text-white rounded-lg transition-colors duration-200 relative z-20 min-h-[44px] flex items-center ${
                           item.label === 'Skin Care' ? 'hover:bg-[#ffc0cb]' : 
                           item.label === 'Hair Care' ? 'hover:bg-[#D8BFD8]' : 
                           'hover:bg-[#50b8b9]'
                         }`}
                         onClick={() => {
                           handleMenuClick();
                           setMobileOpenCategory(null);
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
                  style={{ position: 'relative', zIndex: 20 }}
                  onClick={
                    item.path === '/' ? handleHomeClick :
                    item.path === '#visit-us' ? handleVisitUsClick : 
                    item.path === '#contact-form' ? handleContactClick : 
                    () => {
                      handleMenuClick();
                      setMobileOpenCategory(null);
                      if (item.path !== '#') {
                        window.scrollTo(0, 0);
                      }
                    }
                  }
                >{item.label}</Link>
              );
            })}
            <div className="mt-6 space-y-3 relative z-10">
            <a 
              href="tel:9676079516"
              className="block w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 text-center shadow-md"
            >
              <span className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </span>
            </a>
            <a 
              href="tel:9676079516" 
              className="block w-full bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition duration-300 shadow-md text-center"
            >
              <span className="flex items-center justify-center">
                <img 
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/emergency-call.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvZW1lcmdlbmN5LWNhbGwucG5nIiwiaWF0IjoxNzQyNjQ2NzYxLCJleHAiOjE5MDAzMjY3NjF9.uTwUHtPGSv3Hr4ejMdtf525dEIhyPiH4-EJrQ9H2Gyw"
                  alt="Emergency"
                  className="w-6 h-6 mr-2 animate-pulse"
                />
                <span className="whitespace-normal">Pediatric Emergency</span>
              </span>
            </a>
            <Link
              to="/login"
              className="block w-full bg-[#783b94] text-white px-6 py-3 rounded-full hover:bg-[#6a2a85] transition duration-300 shadow-md text-center"
            >
              <span className="flex items-center justify-center">
                Login
              </span>
            </Link>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;