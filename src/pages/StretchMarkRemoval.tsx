import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Languages, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Stretch-marks-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvU3RyZXRjaC1tYXJrcy1pbWFnZS5wbmciLCJpYXQiOjE3NDgxNDIyMzgsImV4cCI6MTg0Mjc1MDIzOH0.3sntPkWh1ecHyt16ezi9IoIgAF3XYlTWjO5ONbmUPII"
          alt="Stretch Mark Removal"
          className="w-full h-full object-cover transform-gpu will-change-transform backface-hidden image-rendering-crisp"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f2f1ef]/90 via-[#f2f1ef]/70 to-[#f2f1ef]/50" style={{ backdropFilter: 'brightness(1.05)' }} />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-black tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced Stretch Mark Reduction Treatments
          </motion.h1>
        </motion.div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Technology-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvVGVjaG5vbG9neS1pbWFnZS5zdmciLCJpYXQiOjE3NDMzMzA5OTAsImV4cCI6MTkwMTAxMDk5MH0.rwixTtZlvw-YHCZsr3j00RfZrON_8ak2QVW2c0ysgf0",
    title: "Advanced Technology & Infrastructure",
    description: "State-of-the-art stretch mark treatment equipment",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Service%2024_7-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2VydmljZSAyNF83LWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTA1NSwiZXhwIjoxOTAxMDExMDU1fQ.OLOPsCy8uwjMyL-uR5xJXsxvNkvPahH3iLKwEmHJ0G0",
    title: "Expert Dermatologists",
    description: "Specialized care from experienced skin specialists",
    color: "bg-gradient-to-br from-red-50 to-pink-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Diagnosis-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRGlhZ25vc2lzLWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTEyNCwiZXhwIjoxOTAxMDExMTI0fQ._ogfOsHXAn5-LsN1kRUtS3ERcbiImP_ngZ4IGTtORN8",
    title: "Personalized Treatment Plans",
    description: "Customized solutions for your unique skin needs",
    color: "bg-gradient-to-br from-green-50 to-emerald-50"
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative group ${feature.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 mb-6 transform-gpu will-change-transform transition-all duration-300 hover:scale-110">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-contain filter contrast-125"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StretchMarkRemovalSection = () => {
  return (
    <section className="py-16 bg-[#eaf7f8]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-black">Advanced Stretch Mark Reduction</h2>
            <div className="space-y-4 text-black">
              <p className="leading-relaxed">
                At Aayush Child & Skin Hospital, we understand that stretch marks can affect your confidence and self-image. Our comprehensive stretch mark reduction treatments use cutting-edge technology and proven techniques to minimize the appearance of stretch marks, helping you achieve smoother, more even-toned skin. Whether your stretch marks are from pregnancy, weight fluctuations, or growth spurts, our expert dermatologists will create a personalized treatment plan to address your specific concerns.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Understanding Stretch Marks</h3>
              <p className="leading-relaxed">
                Stretch marks (striae) are a form of scarring that occurs when the skin rapidly stretches or shrinks, causing the collagen and elastin fibers to rupture. As the skin heals, stretch marks may appear as red, purple, pink, or white lines on the surface. They commonly occur on the abdomen, breasts, hips, buttocks, and thighs.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Striae Rubrae – New, red or purple stretch marks</li>
                <li>Striae Albae – Mature, white or silver stretch marks</li>
                <li>Common causes include pregnancy, puberty, rapid weight gain or loss, and certain medical conditions</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Our Stretch Mark Reduction Treatments</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><span className="font-semibold">Fractional Laser Therapy</span> – Stimulates collagen production and promotes skin regeneration</li>
                <li><span className="font-semibold">Microneedling with PRP</span> – Uses your body's natural healing factors to improve skin texture</li>
                <li><span className="font-semibold">Chemical Peels</span> – Removes outer layers of skin to reveal smoother, more evenly toned skin beneath</li>
                <li><span className="font-semibold">Radiofrequency Treatments</span> – Tightens skin and improves elasticity</li>
                <li><span className="font-semibold">Topical Treatments</span> – Medical-grade creams and serums to improve skin texture and tone</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Our Stretch Mark Treatments</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reduced visibility of stretch marks</li>
                <li>Improved skin texture and tone</li>
                <li>Enhanced collagen production</li>
                <li>Minimal downtime and discomfort</li>
                <li>Personalized treatment plans based on your specific needs</li>
                <li>Comprehensive approach combining multiple effective techniques</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">What to Expect</h3>
              <p className="leading-relaxed">
                During your initial consultation, our dermatologists will evaluate your stretch marks and discuss your treatment goals. Most patients require a series of treatments spaced several weeks apart for optimal results. While stretch marks cannot be completely removed, our advanced treatments can significantly reduce their appearance, helping you feel more confident in your skin.
              </p>
              
              <p className="leading-relaxed mt-4">
                Rediscover smoother, more even-toned skin with our advanced stretch mark reduction treatments at Aayush Child & Skin Hospital.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Stretch-issue-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvU3RyZXRjaC1pc3N1ZS1pbWFnZS5qcGciLCJpYXQiOjE3NDgxNDQzMTUsImV4cCI6MTg0Mjc1MjMxNX0.mnK1r5wtv21igWvyLiB0aaZ1OxH68Zt2a2U8ovMBxOY"
                alt="Stretch Mark Treatment"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Stretch-problems-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvU3RyZXRjaC1wcm9ibGVtcy1pbWFnZS5qcGciLCJpYXQiOjE3NDgxNDQ1NjQsImV4cCI6MTg0Mjc1MjU2NH0.XZwJOovk8-ZU6b6I9m4wo7uLd1gZhMYQfOMfZMxwYnY"
                alt="Skin Treatment Results"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FindDoctorSection = () => {
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact-form');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#e7e0f0] via-[#e5e0ec] to-[#e7e5eb]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-[24px] font-bold text-black mb-4">
              Find Our Doctor
            </h2>
            <p className="text-base md:text-[16px] text-[#1b1a1b]">
              Meet our expert dermatologist who brings years of experience in treating stretch marks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4">
                  <img
                    src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmF"
                    alt="Dr. Himabindu Sridhar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Dr. Himabindu Sridhar</h3>
                <p className="text-base text-gray-700 mb-4">Consultant Dermatologist, Cosmetologist, Laser & Hair Transplant Surgeon</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>15+ Years Experience</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <Languages className="w-4 h-4 text-purple-600 transform rotate-180" />
                    <span>Telugu, English, Hindi</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>Madanapalle</span>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => navigate('/doctors/dr-himabindu-sridhar')}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-[#7a3a95] text-[#7a3a95] text-sm font-bold hover:bg-purple-50 transition-colors duration-300"
                  >
                    View Profile <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <button
                    onClick={handleContactClick}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#7a3a95] text-white text-sm font-semibold hover:bg-[#7a3a95]/90 transition-colors duration-300"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SkinCareBlogsSection = () => {
  const navigate = useNavigate();
  
  const blogs = [
    {
      id: 1,
      title: "Understanding Aging Face: Causes and Ways to Maintain Youthful Skin",
      link: "/blog/understanding-aging-face",
      date: "January 15",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/women-anti-ageing-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvd29tZW4tYW50aS1hZ2VpbmctaW1hZ2UuanBnIiwiaWF0IjoxNzQzMjY3NTA5LCJleHAiOjE5MDA5NDc1MDl9.rnd6d9uPQQr722F6PcYZR1SSXOP7SFKc3xQgPRjBE-g",
      excerpt: "Exploring modern approaches to maintaining youthful skin."
    },
    {
      id: 2,
      title: "Understanding Uneven Skin Tone and Pigmentation Issues",
      date: "February 10",
      link: "/blog/understanding-pigmentation",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Pigmentation-Issues-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvUGlnbWVudGF0aW9uLUlzc3Vlcy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjY4NzMsImV4cCI6MTkwMDk0Njg3M30.p7JUH-IXI6kdk95wqXuWsGeUT9PEqA2A3rzVU1Al9wY",
      excerpt: "Discover advanced treatments to restore your skin's natural glow."
    },
    {
      id: 3,
      title: "Causes of Acne Scars on the Face in Women and Men",
      date: "February 20",
      link: "/blog/causes-of-acne-scars",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Acne-Scars-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQWNuZS1TY2Fycy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjU1NjAsImV4cCI6MTkwMDk0NTU2MH0.2qCJzxJIKWpvDx9dX_IIweiSyFtzqX9lsaMnDEFItE0",
      excerpt: "Modern solutions for treating and minimizing acne scarring."
    }
  ];

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Skin Care Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with our expert insights on skin health and treatments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => blog.link && navigate(blog.link)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-3">{blog.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">{blog.excerpt}</p>
                <div className="flex items-center text-purple-600 font-medium">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate = useNavigate();
  
  const handleBookAppointment = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact-form');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('pattern.svg')] opacity-10" />
      
      <motion.div 
        className="container mx-auto px-4 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Rediscover Smoother, Even-Toned Skin
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Schedule a consultation with our stretch mark removal specialists today
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={handleBookAppointment}
          >
            Book an Appointment
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

const StretchMarkRemoval = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <Features />
      <StretchMarkRemovalSection />
      <FindDoctorSection />
      <SkinCareBlogsSection />
      <CTASection />
    </div>
  );
};

export default StretchMarkRemoval;