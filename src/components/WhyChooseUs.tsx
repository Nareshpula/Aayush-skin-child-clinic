import React from 'react';
import { motion } from 'framer-motion';
import { User, ScanLine, HeartPulse, FileText } from 'lucide-react';

const features = [
  {
    icon: <User className="w-8 h-8 text-blue-600" aria-label="Expert Radiologist Icon" />, 
    title: "Expert Radiologists",
    description: "Experienced professionals providing top-quality care and diagnostics."
  },
  {
    icon: <ScanLine className="w-8 h-8 text-pink-600" aria-label="MRI Scan Icon" />, 
    title: "Cutting-Edge Technology",
    description: "Advanced equipment and modern infrastructure for accurate diagnostics."
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-red-600" aria-label="Patient-Centric Approach Icon" />,
    title: "Patient-Centric Approach",
    description: "Focusing on comfort, clarity, and individualized patient care throughout."
  },
  {
    icon: <FileText className="w-8 h-8 text-green-600" aria-label="Rapid Reporting Icon" />,
    title: "Rapid Reporting",
    description: "Providing fast, accurate results to facilitate timely clinical decisions."
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
              Why Choose Jyothi Diagnostic Centre?
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Jyothi Diagnostic Centre is committed to providing accurate, timely, and affordable diagnostic services with a patient-first approach.
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
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Medical-Team.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL01lZGljYWwtVGVhbS53ZWJwIiwiaWF0IjoxNzQwMjEyNTI1LCJleHAiOjE4OTc4OTI1MjV9.Lz6ySfGE7DBDIiyRzbnv89gorl23BF2PMoOTgvxIPQo"
                alt="Medical team providing diagnostic services"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;