import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Stethoscope } from 'lucide-react';

const CentersOfExcellence = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Our Centers of Excellence
          </h2>
          <p className="text-base md:text-[16px] text-[#1b1a1b] max-w-2xl mx-auto">
            We invite you to explore our premier centers of medical expertise. Discover the exceptional healthcare services we provide, carefully designed to meet the highest global standards and dedicated to ensuring your well-being at every step of your journey with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
          >
            <div className="aspect-[3/2] w-full h-48 overflow-hidden">
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/child-care-images.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvY2hpbGQtY2FyZS1pbWFnZXMuanBnIiwiaWF0IjoxNzQyNzQ4OTEzLCJleHAiOjE5MDA0Mjg5MTN9.wQtyUQ_WfUdQNz3ewt4xLZMzt7y06EgB9Whg1zaVuco"
                alt="Child Care"
                className="w-full h-full object-cover image-rendering-crisp transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-110"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-[#7E42A2] py-3 px-4">
              <h3 className="text-xl font-bold text-white text-center">Child Care</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
          >
            <div className="aspect-[3/2] w-full h-48 overflow-hidden">
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/skin-care-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvc2tpbi1jYXJlLWltYWdlLmpwZyIsImlhdCI6MTc0Mjc0OTQyNCwiZXhwIjoxOTAwNDI5NDI0fQ.jWW3BxqeES8A5XwOPLWnkTn0TQPSaSRnRUvRxicOd_w"
                alt="Skin Care"
                className="w-full h-full object-cover object-center image-rendering-crisp transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-110"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-[#EBDCFB] py-3 px-4">
              <h3 className="text-xl font-bold text-black text-center">Skin Care</h3>
            </div>
          </motion.div>
        </div>

        {/* Child Care Section */}
        <div className="mt-24 grid md:grid-cols-2 max-w-6xl mx-auto relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/20 transform -translate-x-1/2"></div>
          
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 pr-12"
          >
            <h2 className="text-3xl font-bold text-[#000000]">Child Care</h2>
            <p className="text-base md:text-[16px] text-[#1b1a1b] leading-relaxed">
              Every child is unique, and at Aayush Hospital, we are committed to fostering their overall growth and well-being through a comprehensive range of specialized and personalized pediatric services. As India's leading multi-specialty pediatric healthcare provider, our dedication to excellence is upheld by a team of highly trained and certified pediatricians, along with a compassionate support staff, available around the clock to ensure the best possible care.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center text-black hover:text-gray-700 transition-colors duration-300 group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="font-semibold">Know More</span>
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </motion.a>
          </motion.div>

          {/* Right Column - Specialties Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-x-3 gap-y-2 pl-12"
          >
            {[
              "General Pediatrics",
              "Children's Nutrition",
              "Pediatric Infectious Disease",
              "Developmental & Behavioral Pediatrics",
              "Vaccinations & Immunizations",
              "Expert NICU & PICU Services",
              "Growth&Development Monitoring",
              "Newborn Care & Well-Baby Checkups",
              "Advanced Lab Services"
            ].map((specialty, index) => (
              <motion.button
                key={specialty}
                className={`py-2.5 px-3 rounded-full bg-[#895ab8] text-white text-xs md:text-sm font-medium 
                  hover:bg-[#7a3a95] transition-all duration-300 shadow-md hover:shadow-lg
                  text-center leading-tight min-w-[120px] h-[42px] flex items-center justify-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {specialty}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CentersOfExcellence;