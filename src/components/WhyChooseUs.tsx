import React from 'react';
import { motion } from 'framer-motion';
import { User, ScanLine, HeartPulse, FileText } from 'lucide-react';

const features = [
  {
    icon: <User className="w-8 h-8 text-blue-600" aria-label="Expert Radiologist Icon" />, 
    title: "Pediatric & Dermatology Experts",
    description: "Specialized doctors providing compassionate care for children's health and advanced skin treatments."
  },
  {
    icon: <ScanLine className="w-8 h-8 text-pink-600\" aria-label="MRI Scan Icon" />, 
    title: "State-of-the-Art Technology",
    description: "Modern medical equipment ensuring precise diagnosis and effective treatment for pediatric and skin conditions."
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-red-600\" aria-label="Patient-Centric Approach Icon" />,
    title: "Patient-Centric Approach",
    description: "Personalized treatment plans with a warm and friendly approach, ensuring comfort for both kids and adults."
  },
  {
    icon: <FileText className="w-8 h-8 text-green-600\" aria-label="Rapid Reporting Icon" />,
    title: "Fast & Accurate Diagnosis",
    description: "Quick and reliable test results for early intervention and effective treatment planning."
  }
];

const WhyChooseUs = () => {
  return (
    <motion.section
      className="py-12 md:py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
            >
              Why Choose Aayush ?
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience top-tier pediatric and dermatology care with expert doctors, advanced treatments, and compassionate service at Aayush Child & Skin Hospital.
            </motion.p>
            <motion.div className="space-y-6">
              {features.map((feature, index) => ( 
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 bg-[#C9D6AE] rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                >
                  <div className="p-3 rounded-lg bg-white/90 backdrop-blur-sm flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div
            className="relative mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Team-Image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1UZWFtLUltYWdlLmpwZyIsImlhdCI6MTc0Mjg5NDIzMiwiZXhwIjoxOTAwNTc0MjMyfQ.qlX0wTgH-P1cS3BnoZxXRtTUTW9K9mgPB9USTWf6cPw"
                alt="Medical team providing diagnostic services"
                className="w-full h-full object-cover image-rendering-crisp transform-gpu will-change-transform"
                loading="eager"
               width="600"
               height="450"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent backdrop-filter backdrop-brightness-105 backdrop-contrast-105"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;