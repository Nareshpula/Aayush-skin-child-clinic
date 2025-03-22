import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MriTesla = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100 rounded-[100px] rotate-45 transform -translate-x-32" />
      <div className="absolute right-40 top-20 w-24 h-24 grid grid-cols-4 gap-1">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-gray-300 rounded-full" />
        ))}
      </div>
      <div className="absolute right-10 bottom-20 w-24 h-24 grid grid-cols-4 gap-1">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-gray-300 rounded-full" />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Content */}
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0 z-10 relative">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-[#2c2c2c] mb-6 leading-tight"
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
            >
              State-of-the-art Digital MRI with 3 Tesla Platform
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg leading-relaxed mb-8"
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
            >
              Experience superior diagnostic imaging with our advanced 3 Tesla MRI technology, 
              providing exceptional detail and accuracy for better diagnosis and treatment planning.
            </motion.p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => {
                navigate('/tesla-mri-scan');
                window.scrollTo(0, 0);
              }}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
            >
              Learn More
            </motion.button>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative z-10">
            <motion.div
              className="relative"
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/mri-tesla-machine-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL21yaS10ZXNsYS1tYWNoaW5lLWltYWdlLmpwZyIsImlhdCI6MTczOTk4NjM4NSwiZXhwIjoxODk3NjY2Mzg1fQ.2J4J0Q3arotaY-a4635D8ryAG8c1oxxgHctKFs4zlkE"
                alt="3 Tesla MRI Machine"
                className="w-full h-auto rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MriTesla;