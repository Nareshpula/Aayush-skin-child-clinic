import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UltrasoundServices = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100 rounded-[100px] rotate-45 transform translate-x-[-8rem]" />
      <div className="absolute left-40 top-20 w-24 h-24 grid grid-cols-4 gap-1">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-gray-300 rounded-full" />
        ))}
      </div>
      <div className="absolute left-10 bottom-20 w-24 h-24 grid grid-cols-4 gap-1">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-gray-300 rounded-full" />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
          {/* Content */}
          <div className="lg:w-1/2 lg:pl-16 mb-10 lg:mb-0 z-10">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-[#2c2c2c] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ultrasound Scans with High-End Machines and Expert Doctors
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience accurate and reliable diagnostic services with our advanced ultrasound technology, 
              operated by experienced medical professionals to ensure precise results and patient care.
            </motion.p>
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => {
                navigate('/ultrasound-pregnancy-scanning');
                window.scrollTo(0, 0);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Learn More
            </motion.button>
          </div>

          {/* Images Grid */}
          <div className="lg:w-1/2 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/ultrasound-checkup-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL3VsdHJhc291bmQtY2hlY2t1cC1pbWFnZS5qcGciLCJpYXQiOjE3NDAwMzM3ODIsImV4cCI6MTg5NzcxMzc4Mn0.-u0sHYGBoTnORoojoJxcTjlPJmIqqQUfwpuTkV43SY0"
                  alt="Ultrasound Machine"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl mt-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Pregnant-image-ultrsound-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL1ByZWduYW50LWltYWdlLXVsdHJzb3VuZC1pbWFnZS53ZWJwIiwiaWF0IjoxNzQwMDMzODExLCJleHAiOjE4OTc3MTM4MTF9.wwGBJVjgu5Kq1I4HBYWnqYeewqRXZ8USBRHkBdPa6Kc"
                  alt="Ultrasound Scan"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UltrasoundServices;