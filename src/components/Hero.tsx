import React from 'react';

const Hero = () => {
  // Preload the video for faster initial load
  React.useEffect(() => {
    const videoUrl = "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/playing-with-kids.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvcGxheWluZy13aXRoLWtpZHMubXA0IiwiaWF0IjoxNzQyNjU5MzM4LCJleHAiOjE5MDAzMzkzMzh9.a4f48hJOPjPHxMVHkwjKE9HCm6p0NbgvEgBJLoauuJU";
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = videoUrl;
    link.type = 'video/mp4';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          preload="metadata"
          loop
          muted
          playsInline
          className="w-full h-full object-cover gpu-accelerated"
          style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
        >
          <source
            src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/playing-with-kids.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvcGxheWluZy13aXRoLWtpZHMubXA0IiwiaWF0IjoxNzQyNjU5MzM4LCJleHAiOjE5MDAzMzkzMzh9.a4f48hJOPjPHxMVHkwjKE9HCm6p0NbgvEgBJLoauuJU"
            type="video/mp4"
          />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#cccdcc]/60 to-[#cccdcc]/80 animate-fadeIn"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end justify-center pb-24">
        <div className="text-center px-4 animate-slideUp mb-8">
          <h1 className="text-white">
            <span className="block font-['Montserrat'] text-xl md:text-[26px] font-medium leading-tight mb-1">No. 1 Hospital in</span>
            <span className="block font-['Montserrat'] text-2xl md:text-[34px] font-extrabold leading-tight">Child and Skin Care in Madanapalle *</span>
          </h1>
          <div className="mt-8 inline-block">
            <a 
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                // Navigate to the book appointment page instead of scrolling to contact form
                window.location.href = '/book-appointment';
              }}
              className="group bg-[#dfdad6]/60 backdrop-blur-[10px] px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-black/10 rounded-full group-hover:bg-black/20 transition-colors duration-300">
                <svg 
                  className="w-6 h-6" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              </div>
              <span className="font-['Montserrat'] text-lg font-semibold relative">
                Book an Appointment
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;