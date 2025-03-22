import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, Heart, Lightbulb, Shield, Building2, History, Stethoscope, Microscope, Guitar as Hospital, Calendar, Stethoscope as UltrasoundIcon, Building, Cpu, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const words = "JYOTHI Diagnostics Center".split(" ");
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Hospital-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0hvc3BpdGFsLWltYWdlLmpwZyIsImlhdCI6MTc0MTg3Nzk1OCwiZXhwIjoxODk5NTU3OTU4fQ.KArRjKowowCAc7KMLOqrXwwuOZHsHM7hbFWyqAhww5s"
          alt="Hospital Building"
          className="w-full h-full object-cover"
        />
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
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="inline-block drop-shadow-lg"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: words.length * 0.1 }}
            className="mt-8 text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            Pioneering Excellence in Advanced Diagnostic Healthcare with Cutting-Edge Technology and Expert Care
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
          No. 1 Diagnostic Center in Madanapalle!
        </h1>
        <p className="text-lg text-sky-500/90 antialiased font-medium">
          Advanced MRI, CT, Ultrasound, and Digital X-Ray scans—all under one roof.
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
            {/* Vision */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-50">
                  <Target className="w-8 h-8 text-[#e41d4c]" />
                </div>
                <h2 className="ml-4 text-2xl font-bold text-[#e41d4c]">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the leading diagnostic center that sets new standards in healthcare
                through accurate, affordable, and compassionate diagnostic services. We
                envision a future where quality healthcare is accessible to all, powered
                by cutting-edge technology and delivered with utmost care.
              </p>
            </div>

            {/* Mission */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-pink-50">
                  <Rocket className="w-8 h-8 text-[#e41d4c]" />
                </div>
                <h2 className="ml-4 text-2xl font-bold text-[#e41d4c]">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To leverage advanced technology and expertise in providing comprehensive
                diagnostic solutions that enable better healthcare decisions. We are
                committed to maintaining the highest standards of accuracy, reliability,
                and patient care while making our services accessible and affordable.
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
                caring environment throughout their diagnostic journey.
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
                We stay at the forefront of diagnostic technology, continuously
                upgrading our capabilities to provide the most accurate results.
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
                excellence in every aspect of our service delivery.
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
            comprehensive diagnostic solutions and enhance patient care.
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
              Since our establishment in 2015 by Dr. JYOTHI R.G, we have been committed
              to delivering excellence in diagnostic healthcare.
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
                  year: "2015",
                  title: "Foundation",
                  description: "Founded by Dr. JYOTHI R.G with a vision to provide advanced diagnostic services in Madanapalle.",
                  icon: <Calendar className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2017",
                  title: "Advanced Ultrasound",
                  description: "Installation of Advanced Ultrasound machines improving diagnostic accuracy.",
                  icon: <UltrasoundIcon className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2019",
                  title: "Hospital Collaborations",
                  description: "Collaboration with leading hospitals in Madanapalle to extend diagnostic services.",
                  icon: <Building className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2021",
                  title: "Digital MRI Installation",
                  description: "Acquired Digital MRI with 3 Tesla Platform offering high-resolution imaging.",
                  icon: <Cpu className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2023",
                  title: "Equipment Upgrade",
                  description: "Upgraded with High-performance CT Scanners and Modern Digital X-rays.",
                  icon: <Microscope className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2024",
                  title: "Expanded Partnerships",
                  description: "Expanded partnerships with more hospitals to enhance patient care access.",
                  icon: <Building2 className="w-8 h-8 text-[#e15294]" />
                },
                {
                  year: "2025",
                  title: "Elevating Healthcare Standards",
                  description: "Leveraging advanced technology and the expertise of top-tier doctors, Jyothi Diagnostic Center is emerging as Madanapalle's No.1 diagnostics provider.",
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
    </div>
  );
};

export default About;