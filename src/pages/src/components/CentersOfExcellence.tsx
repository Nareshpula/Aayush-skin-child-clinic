import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
// Define the content for each tab
const tabContent = {
  childCare: {
    title: "Child Care",
    description: "Every child is unique, and at Aayush Hospital, we are committed to fostering their overall growth and well-being through a comprehensive range of specialized and personalized pediatric services. As India's leading multi-specialty pediatric healthcare provider, our dedication to excellence is upheld by a team of highly trained and certified pediatricians, along with a compassionate support staff, available around the clock to ensure the best possible care.",
    specialties: [
      "General Pediatrics",
      "Children's Nutrition",
      "Pediatric Infectious Disease",
      "Developmental & Behavioral Pediatrics",
      "Vaccinations & Immunizations",
      "Expert NICU & PICU Services",
      "Growth&Development Monitoring",
      "Newborn Care & Well-Baby Checkups",
      "Advanced Lab Services"
    ],
    routes: {
      "General Pediatrics": "/general-pediatrics",
      "Children's Nutrition": "/childrens-nutrition",
      "Pediatric Infectious Disease": "/pediatric-infectious-diseases",
      "Developmental & Behavioral Pediatrics": "/developmental-behavioral-pediatrics",
      "Vaccinations & Immunizations": "/vaccinations-immunizations",
      "Expert NICU & PICU Services": "/picu-nicu",
      "Growth&Development Monitoring": "/growth-development-monitoring",
      "Newborn Care & Well-Baby Checkups": "/newborn-care-well-baby-checkups",
      "Advanced Lab Services": "/advanced-lab-services"
    },
    bgColor: "#895ab8",
    hoverBgColor: "#7a3a95"
  },
  skinCare: {
    title: "Skin Care",
    description: "At Aayush Child & Skin Hospital, our dermatology department offers advanced treatments for all skin conditions, helping patients achieve healthy, radiant skin through personalized care plans. Our expert dermatologists combine innovative technology with personalized care to address a wide range of skin concerns for patients of all ages.",
    specialties: [
      "Dullness Treatment",
      "Acne & Acne Scars",
      "Pigmentation Solutions",
      "Anti-Ageing Therapies",
      "Dryness & Hydration",
      "Stretch Mark Removal",
      "Tattoo Removal",
      "Mole Removal",
      "Wart Removal"
    ],
    routes: {
      "Dullness Treatment": "/dullness",
      "Acne & Acne Scars": "/acne",
      "Pigmentation Solutions": "/pigmentation",
      "Anti-Ageing Therapies": "/anti-ageing",
      "Dryness & Hydration": "/dryness",
      "Stretch Mark Removal": "/stretch-mark-removal",
      "Tattoo Removal": "/tattoo-removal",
      "Mole Removal": "/mole-removal",
      "Wart Removal": "/wart-removal"
    },
    bgColor: "#895ab8",
    hoverBgColor: "#7a3a95"
  },
  hairCare: {
    title: "Hair Care",
    description: "Our Hair Care Center offers comprehensive solutions for all hair and scalp concerns. From advanced hair loss treatments to scalp therapies, our specialized team provides personalized care using cutting-edge technology and proven methods to help you achieve healthier, stronger hair and restore your confidence.",
    specialties: [
      "Hair Loss Treatment",
      "PRP Hair Therapy",
      "Mesotherapy Treatment",
      "Laser Hair Removal",
      "Tattoo Removal"
    ],
    routes: {
      "Hair Loss Treatment": "/hair-loss-treatment",
      "PRP Hair Therapy": "/prp-hair-therapy",
      "Mesotherapy Treatment": "/mesotherapy-treatment",
      "Laser Hair Removal": "/laser-hair-removal",
      "Tattoo Removal": "/tattoo-removal"
    },
    bgColor: "#895ab8",
    hoverBgColor: "#7a3a95"
  }
};

const CentersOfExcellence = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('childCare');
  
  // Preload tab images
  useEffect(() => {
    const tabImages = [
      "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/child-care-images.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvY2hpbGQtY2FyZS1pbWFnZXMuanBnIiwiaWF0IjoxNzQyNzQ4OTEzLCJleHAiOjE5MDA0Mjg5MTN9.wQtyUQ_WfUdQNz3ewt4xLZMzt7y06EgB9Whg1zaVuco",
      "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/skin-care-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvc2tpbi1jYXJlLWltYWdlLmpwZyIsImlhdCI6MTc0Mjc0OTQyNCwiZXhwIjoxOTAwNDI5NDI0fQ.jWW3BxqeES8A5XwOPLWnkTn0TQPSaSRnRUvRxicOd_w",
      "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Hair-loss-treatment.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvSGFpci1sb3NzLXRyZWF0bWVudC5qcGVnIiwiaWF0IjoxNzQ4NjYwMTA5LCJleHAiOjE4NDMyNjgxMDl9.GLwo7ctBuDexMq4c4OqA5qLClrQFzUu-O2XyCnmttzc"
    ];
    
    tabImages.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6">
            Our Centers of Excellence
          </h2>
          <p className="text-sm md:text-[16px] text-[#1b1a1b] max-w-2xl mx-auto">
            We invite you to explore our premier centers of medical expertise. Discover the exceptional healthcare services we provide, carefully designed to meet the highest global standards and dedicated to ensuring your well-being at every step of your journey with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {/* Child Care Tab */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setActiveTab('childCare')}
            className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group mx-auto cursor-pointer h-48 sm:h-40 md:h-48 ${
              activeTab === 'childCare' ? 'ring-4 ring-[#7E42A2]/50' : ''
            }`}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/child-care-images.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvY2hpbGQtY2FyZS1pbWFnZXMuanBnIiwiaWF0IjoxNzQyNzQ4OTEzLCJleHAiOjE5MDA0Mjg5MTN9.wQtyUQ_WfUdQNz3ewt4xLZMzt7y06EgB9Whg1zaVuco"
                alt="Child Care"
                className="w-full h-full object-cover image-rendering-crisp transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-110"
                loading="eager"
                decoding="async"
               width="300"
               height="200"
               fetchpriority="high"
              />
            </div>
            <div className={`absolute bottom-0 left-0 right-0 bg-[#7E42A2] py-3 px-4 ${
              activeTab === 'childCare' ? 'bg-opacity-100' : 'bg-opacity-80'
            }`}>
              <h3 className="text-xl font-bold text-white text-center">Child Care</h3>
            </div>
          </motion.button>

          {/* Skin Care Tab */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setActiveTab('skinCare')}
            className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group mx-auto cursor-pointer h-48 sm:h-40 md:h-48 w-full ${
              activeTab === 'skinCare' ? 'ring-4 ring-[#EBDCFB]/70' : ''
            }`}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/skin-care-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvc2tpbi1jYXJlLWltYWdlLmpwZyIsImlhdCI6MTc0Mjc0OTQyNCwiZXhwIjoxOTAwNDI5NDI0fQ.jWW3BxqeES8A5XwOPLWnkTn0TQPSaSRnRUvRxicOd_w"
                alt="Skin Care"
                className="w-full h-full object-cover object-center image-rendering-crisp transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-110"
                loading="eager"
                decoding="async"
               width="380"
               height="200"
               fetchpriority="high"
              />
            </div>
            <div className={`absolute bottom-0 left-0 right-0 bg-[#EBDCFB] py-3 px-4 ${
              activeTab === 'skinCare' ? 'bg-opacity-100' : 'bg-opacity-80'
            }`}>
              <h3 className="text-xl font-bold text-black text-center">Skin Care</h3>
            </div>
          </motion.button>
          
          {/* Hair Care Tab */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setActiveTab('hairCare')}
            className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group mx-auto cursor-pointer h-48 sm:h-40 md:h-48 w-full ${
              activeTab === 'hairCare' ? 'ring-4 ring-[#D8BFD8]/70' : ''
            }`}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Hair-loss-treatment.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvSGFpci1sb3NzLXRyZWF0bWVudC5qcGVnIiwiaWF0IjoxNzQ4NjYwMTA5LCJleHAiOjE4NDMyNjgxMDl9.GLwo7ctBuDexMq4c4OqA5qLClrQFzUu-O2XyCnmttzc"
                alt="Hair Care"
                className="w-full h-full object-cover image-rendering-crisp transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-110"
                loading="eager"
                decoding="async"
               width="380"
               height="200"
               fetchpriority="high"
              />
            </div>
            <div className={`absolute bottom-0 left-0 right-0 bg-[#D8BFD8] py-3 px-4 ${
              activeTab === 'hairCare' ? 'bg-opacity-100' : 'bg-opacity-80'
            }`}>
              <h3 className="text-xl font-bold text-black text-center">Hair Care</h3>
            </div>
          </motion.button>
        </div>

        {/* Content Section - Dynamically changes based on active tab */}
        <AnimatePresence>
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-12 md:mt-24 grid md:grid-cols-2 max-w-6xl mx-auto relative"
          >
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/20 transform -translate-x-1/2"></div>
            
            {/* Left Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 md:pr-12 mb-12 md:mb-0"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#000000]">{tabContent[activeTab].title}</h2>
              <p className="text-sm md:text-[16px] text-[#1b1a1b] leading-relaxed">
                {tabContent[activeTab].description}
              </p>
            </motion.div>

            {/* Right Column - Specialties Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:pl-12"
            >
              {tabContent[activeTab].specialties.map((specialty, index) => (
                <motion.div
                  key={specialty}
                  className="flex justify-center"
                >
                  <motion.button
                  className={`py-2.5 px-3 rounded-full text-white text-xs md:text-sm font-medium 
                    transition-all duration-300 shadow-md hover:shadow-lg
                    text-center leading-tight min-w-[120px] h-[42px] flex items-center justify-center
                    max-w-full`}
                  style={{ 
                    backgroundColor: tabContent[activeTab].bgColor,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const route = tabContent[activeTab].routes[specialty];
                    if (route) {
                      navigate(route);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: tabContent[activeTab].hoverBgColor 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {specialty}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CentersOfExcellence;