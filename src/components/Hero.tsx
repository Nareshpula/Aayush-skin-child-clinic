import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          preload="auto"
          loop
          muted
          playsInline
          loading="eager"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          className="w-full h-full object-cover"
        >
          <source
            src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/High-size-ultrasound-video.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0hpZ2gtc2l6ZS11bHRyYXNvdW5kLXZpZGVvLm1wNCIsImlhdCI6MTczOTk1NzcyNywiZXhwIjoxODk3NjM3NzI3fQ.uIZNkCSWqUWvgeN90qPDoNor0T5OhPKDEoFyI3_2SfE"
            type="video/mp4"
          />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfcfc]/60 to-[#f4f4f4]/80 animate-fadeIn"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end justify-center pb-24">
        <div className="text-center px-4 animate-slideUp mb-8">
          <h1 className="font-bold text-white">
            <span className="block text-3xl md:text-5xl mb-2 drop-shadow-sm">No.1 Diagnostic Center</span>
            <span className="block text-2xl md:text-4xl text-white/90">in Madanapalle*</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;