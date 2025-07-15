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
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Skin-pages-image/Pigmentation-Animation-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2tpbi1wYWdlcy1pbWFnZS9QaWdtZW50YXRpb24tQW5pbWF0aW9uLWltYWdlLnBuZyIsImlhdCI6MTc0MzUwNTgwNywiZXhwIjoxOTAxMTg1ODA3fQ.Kh3BAbYRcTdSYN-6ZIDXzHguHJrHJJP16ty9bY3QPog"
          alt="Pigmentation Treatment"
          className="w-full h-full object-contain transform-gpu will-change-transform backface-hidden image-rendering-crisp"
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
            Flawless Skin, Expert Care – Say Goodbye to Pigmentation!
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
    description: "State-of-the-art pigmentation treatment equipment",
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

const PigmentationTreatmentSection = () => {
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
            <h2 className="text-3xl font-bold text-black">Advanced Pigmentation Treatment</h2>
            <div className="space-y-4 text-black">
              <p className="leading-relaxed">
                At Aayush Child & Skin Hospital, we offer internationally recognized pigmentation treatments tailored to restore your skin's natural glow. Our evidence-based dermatological solutions address pigmentation concerns with cutting-edge technology, expert dermatologists, and personalized care. Whether you are dealing with melasma, hyperpigmentation, sunspots, or uneven skin tone, we ensure safe, effective, and long-lasting results.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Understanding Pigmentation Disorders</h3>
              <p className="leading-relaxed">
                Pigmentation disorders occur due to excess melanin production, leading to dark patches, uneven skin tone, or discoloration. Some common pigmentation issues include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Melasma – Brown or gray patches, often caused by hormonal changes and sun exposure</li>
                <li>Post-Inflammatory Hyperpigmentation (PIH) – Dark spots resulting from acne, eczema, or injury</li>
                <li>Sunspots & Age Spots – Caused by prolonged sun exposure and aging</li>
                <li>Freckles – Clusters of small, concentrated melanin spots, often genetic</li>
                <li>Vitiligo – Loss of skin pigmentation in patches due to immune system dysfunction</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Our Standard Pigmentation Treatments</h3>
              <p className="leading-relaxed">
                At Aayush Child & Skin Hospital, we integrate global best practices and the latest dermatological advancements to provide safe and effective pigmentation treatments:
              </p>
              
              <h4 className="text-lg font-medium mt-4 mb-2">1. Laser Therapy (FDA-Approved)</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Q-Switched Laser & Pico Laser – Breaks down excess melanin and fades stubborn pigmentation</li>
                <li>Fractional CO2 Laser – Promotes skin regeneration and evens out skin tone</li>
                <li>Intense Pulsed Light (IPL) Therapy – Targets pigmentation and rejuvenates skin</li>
              </ul>
              
              <h4 className="text-lg font-medium mt-4 mb-2">2. Chemical Peels</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Superficial Peels (Glycolic, Salicylic, Lactic Acid Peels) – Exfoliates and lightens pigmentation</li>
                <li>Medium Peels (TCA Peels) – Penetrates deeper to remove persistent pigmentation</li>
                <li>Deep Peels (Phenol Peels) – Used for advanced cases of hyperpigmentation</li>
              </ul>
              
              <h4 className="text-lg font-medium mt-4 mb-2">3. Medical-Grade Skin Lightening Treatments</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Prescription-Strength Topical Creams – Hydroquinone, Retinoids, Azelaic Acid, Kojic Acid</li>
                <li>Oral Medications & Supplements – Tranexamic Acid, Glutathione, Vitamin C for skin brightening</li>
              </ul>
              
              <h4 className="text-lg font-medium mt-4 mb-2">4. Microneedling & PRP Therapy</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Stimulates collagen production and reduces pigmentation</li>
                <li>PRP (Platelet-Rich Plasma) therapy enhances skin rejuvenation naturally</li>
              </ul>
              
              <h4 className="text-lg font-medium mt-4 mb-2">5. Carbon Laser Peel (Hollywood Peel)</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Gentle yet powerful treatment for oily skin and pigmentation control</li>
                <li>Deep exfoliation helps in achieving a brighter, more even complexion</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Why Choose Us?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Internationally Approved Treatments – We follow global dermatology standards for pigmentation management</li>
                <li>Expert Dermatologists – Our specialists use evidence-based techniques for safe & effective results</li>
                <li>Advanced Technology – We offer FDA-approved laser and skincare treatments</li>
                <li>Personalized Care – Every treatment plan is customized based on skin type, severity, and lifestyle</li>
                <li>Minimal Downtime – Most of our treatments have quick recovery periods with visible results</li>
                <li>Holistic Approach – We combine dietary guidance, skincare routines, and medical treatments for the best results</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Prevention & Aftercare for Long-Lasting Results</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Daily Sunscreen Application (SPF 50+) to prevent further pigmentation</li>
                <li>Proper Skincare Routine – Gentle cleansers, hydrating serums, and non-comedogenic products</li>
                <li>Avoid Harsh Chemicals – Say no to over-the-counter bleaching creams that damage the skin</li>
                <li>Regular Follow-Ups – Periodic dermatologist visits to track progress and make necessary adjustments</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Transform Your Skin with Us!</h3>
              <p className="leading-relaxed">
                Say goodbye to uneven skin tone and dark patches! At Aayush Child & Skin Hospital, we are committed to helping you achieve flawless, radiant, and healthy skin through scientifically backed pigmentation treatments.
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
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Pigmentation-Issues-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvUGlnbWVudGF0aW9uLUlzc3Vlcy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjY4NzMsImV4cCI6MTkwMDk0Njg3M30.p7JUH-IXI6kdk95wqXuWsGeUT9PEqA2A3rzVU1Al9wY"
                alt="Pigmentation Treatment"
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
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Skin-pages-image/Pigmentation-Animation-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2tpbi1wYWdlcy1pbWFnZS9QaWdtZW50YXRpb24tQW5pbWF0aW9uLWltYWdlLnBuZyIsImlhdCI6MTc0MzUwNTgwNywiZXhwIjoxOTAxMTg1ODA3fQ.Kh3BAbYRcTdSYN-6ZIDXzHguHJrHJJP16ty9bY3QPog"
                alt="Pigmentation Before and After"
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
              Meet our expert dermatologist who brings years of experience in treating pigmentation disorders.
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
                    alt="Dr. G Himabindhu"
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
      title: "Understanding Uneven Skin Tone and Pigmentation Issues",
      date: "February 10",
      link: "/blog/understanding-pigmentation",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Pigmentation-Issues-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvUGlnbWVudGF0aW9uLUlzc3Vlcy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjY4NzMsImV4cCI6MTkwMDk0Njg3M30.p7JUH-IXI6kdk95wqXuWsGeUT9PEqA2A3rzVU1Al9wY",
      excerpt: "Discover advanced treatments to restore your skin's natural glow."
    },
    {
      id: 2,
      title: "Causes of Acne Scars on the Face in Women and Men",
      date: "February 20",
      link: "/blog/causes-of-acne-scars",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Acne-Scars-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQWNuZS1TY2Fycy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjU1NjAsImV4cCI6MTkwMDk0NTU2MH0.2qCJzxJIKWpvDx9dX_IIweiSyFtzqX9lsaMnDEFItE0",
      excerpt: "Modern solutions for treating and minimizing acne scarring."
    },
    {
      id: 3,
      title: "Understanding Aging Face: Causes and Ways to Maintain Youthful Skin",
      link: "/blog/understanding-aging-face",
      date: "January 15",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/women-anti-ageing-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvd29tZW4tYW50aS1hZ2VpbmctaW1hZ2UuanBnIiwiaWF0IjoxNzQzMjY3NTA5LCJleHAiOjE5MDA5NDc1MDl9.rnd6d9uPQQr722F6PcYZR1SSXOP7SFKc3xQgPRjBE-g",
      excerpt: "Exploring modern approaches to maintaining youthful skin."
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
            Reveal Your Natural Glow
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Schedule a consultation with our pigmentation specialists today
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

const Pigmentation = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <Features />
      <PigmentationTreatmentSection />
      <FindDoctorSection />
      <SkinCareBlogsSection />
      <CTASection />
    </div>
  );
};

export default Pigmentation;