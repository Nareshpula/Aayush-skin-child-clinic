import React from 'react';
import { motion } from 'framer-motion';

const letterImages = {
  M1: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/baby-m-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvYmFieS1tLWltYWdlLmpwZyIsImlhdCI6MTc0MjgzOTg0MiwiZXhwIjoxOTAwNTE5ODQyfQ.z6aO_2FDadvZntbLasnCxmNE3X1c26hFoiezC9Drkxo",
  I1: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/baby-smail-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvYmFieS1zbWFpbC1pbWFnZS5qcGciLCJpYXQiOjE3NDI4NDA4ODcsImV4cCI6MTkwMDUyMDg4N30.l_WdWhvDB7p0RBQl90vKtNsAjqOPQwKzmKUWNOTlFxs",
  L1: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/shiny-skin-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvc2hpbnktc2tpbi1pbWFnZS5qcGciLCJpYXQiOjE3NDI4NDE3NDIsImV4cCI6MTkwMDUyMTc0Mn0.9PdjCbmpeWYDXj-wiCtW3kj5BZzcA9Y0SsDtgFOfZ4g",
  L2: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/bady-sleeping-smail-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvYmFkeS1zbGVlcGluZy1zbWFpbC1pbWFnZS5qcGciLCJpYXQiOjE3NDI4NDIyOTUsImV4cCI6MTkwMDUyMjI5NX0.iROiWeJdPORTfwW5EnLgOzgRl-P0TvtYI61VpDm2sIw",
  I2: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/childrens-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvY2hpbGRyZW5zLWltYWdlLmpwZyIsImlhdCI6MTc0Mjg0MzA1OCwiZXhwIjoxOTAwNTIzMDU4fQ.pls1SZZrmICnohKUya153nK-NJRHnXfE7dR0qtNx11k",
  O1: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/reception-doctors-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvcmVjZXB0aW9uLWRvY3RvcnMtaW1hZ2UuanBnIiwiaWF0IjoxNzQyODQyMDE2LCJleHAiOjE5MDA1MjIwMTZ9.NbqXIplE-PIcUXaUTty7VSNHGQzkWJj5o7KJaFycx9g",
  N1: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/M-letter-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvTS1sZXR0ZXItaW1hZ2UuanBnIiwiaWF0IjoxNzQyODQyNTkzLCJleHAiOjE5MDA1MjI1OTN9.BYRW3rhM5EB4DYMknHaU7iS1itZa8qPTUSMwisheHTg",
  S1: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/doctor-checkup-baby.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvZG9jdG9yLWNoZWNrdXAtYmFieS5qcGciLCJpYXQiOjE3NDI4NDI4NDQsImV4cCI6MTkwMDUyMjg0NH0.1yec9UUPYWOgV0S32Bb5PNGs4rLVHp6ZO9ar8yMHiQA"
};

const MaskedLetter = ({ letter, image }: { letter: string; image: string }) => (
  <span
    className="inline-block relative gpu-accelerated"
    style={{
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      backgroundImage: `url(${image})`,
      backgroundPosition: '50% 50%',
      backgroundSize: '150% 150%',
      imageRendering: '-webkit-optimize-contrast',
      filter: 'contrast(1.2) brightness(1.1)',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      willChange: 'transform, background-position',
      backfaceVisibility: 'hidden',
      perspective: '1000px'
    }}
  >
    {letter}
    <span
      className="absolute inset-0 pointer-events-none"
      style={{
        WebkitTextStroke: '1px rgba(0,0,0,0.15)',
        color: 'transparent'
      }}
    >
      {letter}
    </span>
  </span>
);

const MillionsSection = () => {
  return (
    <section className="py-20 relative overflow-visible" style={{ background: 'linear-gradient(135deg, #f9f2f5 0%, #fdf7f9 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 overflow-visible px-4"
          >
            <motion.h2
              className="text-[70px] sm:text-[90px] md:text-[120px] lg:text-[140px] font-bold leading-none relative gpu-accelerated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="whitespace-nowrap overflow-visible w-full">
                {'MILLIONS'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="gpu-accelerated"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <MaskedLetter
                    letter={letter}
                    image={letterImages[`${letter}${letter === 'I' ? (index === 1 ? '1' : '2') : 
                                                    letter === 'L' ? (index === 2 ? '1' : '2') : '1'}`]}
                  />
                </motion.span>
                ))}
              </div>
            </motion.h2>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 whitespace-nowrap px-4"
          >
            of lives changed and counting
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-[16px] text-[#1b1a1b] max-w-2xl mx-auto"
          >
            Our team of experts is making a difference through the world-renowned care 
            they provide and the countless lives that have been changed as a result.
          </motion.p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl" />
    </section>
  );
};

export default MillionsSection;