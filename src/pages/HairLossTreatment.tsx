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
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Hair-loss-showing-image.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvSGFpci1sb3NzLXNob3dpbmctaW1hZ2UuanBlZyIsImlhdCI6MTc0ODE3Mjc5NSwiZXhwIjoxODQyNzgwNzk1fQ.coKWrjeDLcHr5De2vF3rn00V2Ar4bFuCnXSIGi7ADCA"
          alt="Hair Loss Treatment"
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
            Advanced Hair Loss Treatment Solutions
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
    description: "State-of-the-art hair loss treatment equipment and facilities",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Service%2024_7-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2VydmljZSAyNF83LWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTA1NSwiZXhwIjoxOTAxMDExMDU1fQ.OLOPsCy8uwjMyL-uR5xJXsxvNkvPahH3iLKwEmHJ0G0",
    title: "Expert Trichologists",
    description: "Specialized care from experienced hair specialists",
    color: "bg-gradient-to-br from-red-50 to-pink-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Diagnosis-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRGlhZ25vc2lzLWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTEyNCwiZXhwIjoxOTAxMDExMTI0fQ._ogfOsHXAn5-LsN1kRUtS3ERcbiImP_ngZ4IGTtORN8",
    title: "Personalized Treatment Plans",
    description: "Customized solutions for your unique hair loss concerns",
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

const HairLossTreatmentSection = () => {
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
            <h2 className="text-3xl font-bold text-black">Comprehensive Hair Loss Solutions</h2>
            <div className="space-y-4 text-black">
              <p className="leading-relaxed">
                At Aayush Child & Skin Hospital, we understand that hair loss can significantly impact your confidence and self-image. Our comprehensive hair loss treatment program combines cutting-edge technology, expert medical care, and personalized approaches to address various types of hair loss conditions. Whether you're experiencing male or female pattern baldness, alopecia, or thinning hair due to stress or medical conditions, our specialized team is dedicated to helping you achieve healthier, fuller hair.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Understanding Hair Loss</h3>
              <p className="leading-relaxed">
                Hair loss can occur due to various factors, including genetics, hormonal changes, medical conditions, medications, and lifestyle factors. Proper diagnosis is essential for effective treatment. Our experts conduct thorough evaluations, including scalp analysis, medical history review, and when necessary, specialized tests to determine the underlying cause of your hair loss.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Androgenetic Alopecia (Male/Female Pattern Baldness)</li>
                <li>Alopecia Areata (Autoimmune-related hair loss)</li>
                <li>Telogen Effluvium (Stress-induced hair shedding)</li>
                <li>Traction Alopecia (Hair loss from tight hairstyles)</li>
                <li>Scarring Alopecia (Hair loss with scarring)</li>
                <li>Nutritional Deficiency-related hair loss</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Our Hair Loss Treatment Options</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><span className="font-semibold">Platelet-Rich Plasma (PRP) Therapy</span> – Using your body's own growth factors to stimulate hair follicles and promote regrowth</li>
                <li><span className="font-semibold">Mesotherapy</span> – Microinjections of vitamins, minerals, and nutrients directly into the scalp to nourish hair follicles</li>
                <li><span className="font-semibold">Low-Level Laser Therapy (LLLT)</span> – Non-invasive treatment using red light to stimulate cellular activity and hair growth</li>
                <li><span className="font-semibold">Prescription Medications</span> – FDA-approved treatments like Minoxidil and Finasteride to slow hair loss and promote regrowth</li>
                <li><span className="font-semibold">Hair Transplantation</span> – Advanced FUE (Follicular Unit Extraction) and FUT (Follicular Unit Transplantation) techniques for permanent hair restoration</li>
                <li><span className="font-semibold">Scalp Micropigmentation</span> – A non-surgical technique that creates the appearance of a fuller head of hair</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Our Hair Loss Treatments</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comprehensive approach addressing both symptoms and underlying causes</li>
                <li>Customized treatment plans based on your specific type of hair loss</li>
                <li>Combination therapies for enhanced results</li>
                <li>Minimal downtime with most non-surgical treatments</li>
                <li>Long-term management strategies to maintain results</li>
                <li>Expert guidance on hair care practices and nutritional support</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">What to Expect</h3>
              <p className="leading-relaxed">
                Your hair restoration journey begins with a comprehensive consultation with our hair specialists. After a thorough evaluation, we'll develop a personalized treatment plan tailored to your specific needs and goals. Most treatments require a series of sessions over several months, with visible improvements typically appearing within 3-6 months. We'll monitor your progress closely and adjust your treatment plan as needed to ensure optimal results.
              </p>
              
              <p className="leading-relaxed mt-4">
                Regain your confidence with our advanced hair loss treatments at Aayush Child & Skin Hospital.
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
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Hair-loss-treatment-image.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvSGFpci1sb3NzLXRyZWF0bWVudC1pbWFnZS5qcGVnIiwiaWF0IjoxNzQ4MTcyNTEyLCJleHAiOjE4NDI3ODA1MTJ9.4n7OmVFZw04ASxd39nM6eJL28VRHGJpi1lveYlG_1fI"
                alt="Hair Loss Treatment"
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
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Hair-loss-laser-treatment.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvSGFpci1sb3NzLWxhc2VyLXRyZWF0bWVudC5qcGVnIiwiaWF0IjoxNzQ4MTcyNzE4LCJleHAiOjE4NDI3ODA3MTh9.KQ71hz9z5O6L-U2nwLeqAXQBdKSwTvw_yJSRYRy80zk"
                alt="Hair Loss Consultation"
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
              Meet our expert trichologist who brings years of experience in treating hair loss conditions.
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
                    src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g"
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

const HairCareBlogsSection = () => {
  const navigate = useNavigate();
  
  const blogs = [
    {
      id: 1,
      title: "Understanding Hair Loss: Causes and Modern Treatment Options",
      link: "/blog/understanding-hair-loss",
      date: "March 15",
      image: "https://images.unsplash.com/photo-1626954079979-ec4f7b05e032?q=80&w=1000&auto=format&fit=crop",
      excerpt: "Exploring the science behind hair loss and effective treatment approaches."
    },
    {
      id: 2,
      title: "The Role of Nutrition in Healthy Hair Growth",
      date: "March 5",
      link: "/blog/nutrition-for-hair-growth",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
      excerpt: "How your diet affects your hair health and growth cycles."
    },
    {
      id: 3,
      title: "Stress and Hair Loss: Understanding the Connection",
      link: "/blog/stress-and-hair-loss",
      date: "February 25",
      image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1000&auto=format&fit=crop",
      excerpt: "The physiological relationship between stress and hair thinning."
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
            Latest Hair Care Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with our expert insights on hair health and treatments
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
            Restore Your Hair, Regain Your Confidence
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Schedule a consultation with our hair restoration specialists today
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

const HairLossTreatment = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <Features />
      <HairLossTreatmentSection />
      <FindDoctorSection />
      <HairCareBlogsSection />
      <CTASection />
    </div>
  );
};

export default HairLossTreatment;