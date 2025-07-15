import React from 'react';

const About = () => {
  return (
    <div>
      <div className="relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <source 
            src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hospital-Vedio/aayush-hospital-1.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSG9zcGl0YWwtVmVkaW8vYWF5dXNoLWhvc3BpdGFsLTEubXA0IiwiaWF0IjoxNzQ4Njg2NjU2LCJleHAiOjE5MDYzNjY2NTZ9.BU1O-QyVPOii7IkMZRjtYB4kLuHiQY_gXqjWC2FEEkg" 
            type="video/mp4" 
          />
        </video>
      </div>
    </div>
  );
};

export default About;