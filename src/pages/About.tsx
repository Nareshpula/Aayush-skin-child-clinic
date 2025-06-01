import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, Heart, Lightbulb, Shield, Building2, History, Stethoscope, Baby, Calendar, Users, Building, Star, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const words = "JYOTHI Diagnostics Center".split(" ");
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video with Gradient Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <source 
            src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hospital-Vedio/aayush-hospital-1.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSG9zcGl0YWwtVmVkaW8vYWF5dXNoLWhvc3BpdGFsLTEubXA0IiwiaWF0IjoxNzQ4Njg2NjU2LCJleHAiOjE5MDYzNjY2NTZ9.BU1O-QyVPOii7IkMZRjtYB4kLuHiQY_gXqjWC2FEEkg" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-x-4 text-5xl md:text-7xl font-bold text-white">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block drop-shadow-lg"
            >
            </motion.span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (words.length + 1) * 0.1 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const ZoomBox = () => {
  return (
    <div className="flex justify-center items-center h-[60vh] bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="zoom-box w-[90%] max-w-4xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100/50 rounded-2xl shadow-xl backdrop-blur-sm p-8 text-center">
        <h1 className="text-3xl font-bold text-sky-600 mb-4 antialiased">
          No. 1 Child & Skin Hospital in Madanapalle!
        </h1>
        <p className="text-lg text-sky-500/90 antialiased font-medium">
          Specialized pediatric care and advanced dermatology treatments—all under one roof.
        </p>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="bg-gradient-to-b from-[#fff8f8] to-[#e3f2fd]">
      <div className="min-h-screen">
        <HeroSection />
      </div>
      <ZoomBox />

      {/* Vision & Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Our Vision & Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision for Child & Skin Hospital */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-50">
                  <Target className="w-8 h-8 text-[#e41d4c]" />
                </div>
                <h2 className="ml-4 text-2xl font-bold text-[#e41d4c]">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the leading specialized healthcare facility that sets new standards in 
                pediatric and dermatological care through comprehensive, compassionate, and 
                personalized treatment. We envision a future where quality healthcare for 
                children and skin conditions is accessible to all, delivered with expertise 
                and empathy.
              </p>
            </div>

            {/* Mission for Child & Skin Hospital */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-50">
                  <Rocket className="w-8 h-8 text-[#e41d4c]" />
                </div>
                <h2 className="ml-4 text-2xl font-bold text-[#e41d4c]">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional healthcare services for children and skin conditions 
                through a team of specialized doctors, advanced treatment methods, and a 
                patient-centered approach. We are committed to maintaining the highest 
                standards of medical excellence, continuous innovation, and compassionate 
                care while ensuring our services are accessible to all families in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Patient-Centric Care */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-50">
                  <Heart className="w-8 h-8 text-[#e41d4c]" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-[#e41d4c]">
                  Patient-Centric Care
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We prioritize patient comfort and trust, ensuring a supportive and
                caring environment throughout their healthcare journey, with special 
                attention to children's needs and skin sensitivities.
              </p>
            </div>

            {/* Innovation & Technology */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-50">
                  <Lightbulb className="w-8 h-8 text-[#e41d4c]" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-[#e41d4c]">
                  Innovation & Technology
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We stay at the forefront of pediatric and dermatological advancements, 
                continuously upgrading our capabilities to provide the most effective 
                treatments for children's health and skin conditions.
              </p>
            </div>

            {/* Integrity & Excellence */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-50">
                  <Shield className="w-8 h-8 text-[#e41d4c]" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-[#e41d4c]">
                  Integrity & Excellence
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of professional integrity and
                excellence in every aspect of our healthcare delivery, ensuring 
                ethical practices and optimal outcomes for all our patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-sky-50 via-white to-sky-50 py-16 px-6 md:px-20 rounded-2xl shadow-2xl overflow-hidden mx-4 my-16">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50 absolute -top-20 -left-20"></div>
          <div className="w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-40 absolute bottom-0 right-0"></div>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 relative z-10">
          <motion.h2
            className="text-4xl font-extrabold text-sky-700 mb-5 antialiased"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Partnering for Excellence
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 leading-relaxed antialiased"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Collaborating with Madanapalle's leading healthcare institutions to deliver
            comprehensive healthcare solutions and enhance patient care.
          </motion.p>
        </div>

        {/* Image Section with Effects */}
        <div className="md:w-1/2 flex justify-center relative z-10">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-sky-300 to-sky-500 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            <div className="absolute inset-0.5 bg-white rounded-[1.75rem] blur opacity-80"></div>
            <img
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/collaboration-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9jb2xsYWJvcmF0aW9uLWltYWdlLndlYnAiLCJpYXQiOjE3MzkyNTcyMTgsImV4cCI6MTg5NjkzNzIxOH0.b_cN2Y3eoijSIDnFfN3-9VzqR9zNjZgvH9ZxnjAJ9kk"
              alt="Healthcare collaboration visual"
              className="relative w-full max-w-lg h-[400px] rounded-[1.5rem] shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 object-cover object-center"
            />
            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 bg-[#dadada]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#000000] mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Since our establishment as Aayush Child & Skin Hospital, we have been committed
              to delivering excellence in specialized healthcare for children and skin conditions.
            </p>
          </div>

          <div className="relative">
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#e15294]"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />

            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                {
                  year: "2020",
                  title: "Foundation",
                  description: "Established Aayush Child & Skin Hospital with a vision to provide specialized healthcare services in Madanapalle.",
                  icon: <Building className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2021",
                  title: "Pediatric Department Expansion",
                  description: "Expanded our pediatric services to include specialized care for various childhood conditions.",
                  icon: <Baby className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2022",
                  title: "Dermatology Excellence",
                  description: "Introduced advanced dermatological treatments and technologies for comprehensive skin care.",
                  icon: <Star className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2022",
                  title: "NICU & PICU Launch",
                  description: "Launched state-of-the-art Neonatal and Pediatric Intensive Care Units for critical care.",
                  icon: <Heart className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2023",
                  title: "Advanced Treatment Methods",
                  description: "Introduced cutting-edge treatments for both pediatric conditions and dermatological issues.",
                  icon: <Stethoscope className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2024",
                  title: "Expanded Partnerships",
                  description: "Expanded partnerships with more healthcare institutions to enhance specialized care access.",
                  icon: <Building2 className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2025",
                  title: "Elevating Specialized Healthcare",
                  description: "Leveraging specialized expertise and advanced treatment methods, Aayush Child & Skin Hospital is emerging as Madanapalle's premier healthcare provider for children and skin conditions.",
                  icon: <History className="w-8 h-8 text-[#e15294]" />
                }
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ 
                    opacity: 0,
                    x: index % 2 === 0 ? -100 : 100
                  }}
                  whileInView={{ 
                    opacity: 1,
                    x: 0
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.1
                  }}
                >
                  <div className={`md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}>
                    <motion.div
                      className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                        index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        <span className="text-[#e15294]">{milestone.year}</span> - {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </motion.div>
                  </div>
                  <div className="md:w-2/12 flex justify-center items-center py-4 md:py-0">
                    <motion.div
                      className="bg-white p-4 rounded-full shadow-lg inline-block relative z-10"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360,
                        boxShadow: "0 0 20px rgba(236, 147, 188, 0.3)"
                      }}
                      transition={{ duration: 0.7 }}
                    >
                      {milestone.icon}
                    </motion.div>
                  </div>
                  <div className={`hidden md:block md:w-5/12 ${
                    index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                  }`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Specialized Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#000000] mb-4">Our Specialized Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Aayush Child & Skin Hospital, we offer comprehensive healthcare services focused on two key specialties.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Child Care Services */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#f0f7ff] rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Baby className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-blue-600">Child Care</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                Our comprehensive pediatric services are designed to support children's health from infancy through adolescence, 
                with specialized care for various conditions and developmental needs.
              </p>
              
              <ul className="space-y-3">
                {[
                  "General Pediatrics",
                  "Children's Nutrition",
                  "Pediatric Infectious Diseases",
                  "Developmental & Behavioral Pediatrics",
                  "Vaccinations & Immunizations",
                  "NICU & PICU Services",
                  "Growth & Development Monitoring",
                  "Newborn Care & Well-Baby Checkups",
                  "Advanced Lab Services"
                ].map((service, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Skin Care Services */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#fff5f8] rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-100">
                  <Shield className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-pink-600">Skin Care</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                Our dermatology department offers advanced treatments for all skin conditions, 
                helping patients achieve healthy, radiant skin through personalized care plans.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Dullness Treatment",
                  "Acne & Acne Scars Management",
                  "Pigmentation Solutions",
                  "Anti-Ageing Therapies",
                  "Dryness & Hydration Treatments"
                ].map((service, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-pink-500 mr-2">•</span>
                    <span className="text-gray-700">{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#000000] mb-4">Our Expert Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of specialists brings years of experience and expertise to provide the highest quality care.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pediatric Specialist */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img 
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Dinesh-Kumar-Chirla.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1EaW5lc2gtS3VtYXItQ2hpcmxhLmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE"
                  alt="Dr. G Sridhar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dr. G Sridhar</h3>
                  <p className="text-gray-600">Senior Consultant in Pediatrics</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Dermatology Specialist */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img 
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Himabindhu.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1IaW1hYmluZGh1LmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE"
                  alt="Dr. Himabindu Sridhar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dr. Himabindu Sridhar</h3>
                  <p className="text-gray-600">Senior Consultant in Dermatology</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;