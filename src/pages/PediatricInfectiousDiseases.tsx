import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Languages, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomFooter from '../components/CustomFooter';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Infections-checkp-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSW5mZWN0aW9ucy1jaGVja3AtaW1hZ2UuanBnIiwiaWF0IjoxNzQzMzUxMzk2LCJleHAiOjE5MDEwMzEzOTZ9.IbW_j6wzcPBU2dekB6g69s0YO4ShDmrhe3UbOsBpZn0"
          alt="Pediatric Infectious Diseases"
          className="w-full h-full object-cover object-[center_30%] transform-gpu will-change-transform backface-hidden image-rendering-crisp"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f2f1ef]/80 via-[#f2f1ef]/60 to-[#f2f1ef]/40" style={{ backdropFilter: 'brightness(1.1)' }} />
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
            Expert Care for Pediatric Infectious Diseases
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
    description: "State-of-the-art diagnostic and treatment facilities",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Service%2024_7-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2VydmljZSAyNF83LWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTA1NSwiZXhwIjoxOTAxMDExMDU1fQ.OLOPsCy8uwjMyL-uR5xJXsxvNkvPahH3iLKwEmHJ0G0",
    title: "24/7 Emergency Care",
    description: "Round-the-clock infectious disease management",
    color: "bg-gradient-to-br from-red-50 to-pink-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Diagnosis-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRGlhZ25vc2lzLWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTEyNCwiZXhwIjoxOTAxMDExMTI0fQ._ogfOsHXAn5-LsN1kRUtS3ERcbiImP_ngZ4IGTtORN8",
    title: "Complete Care Journey",
    description: "Comprehensive treatment from diagnosis to recovery",
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

const InfectiousDiseasesSection = () => {
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
            <h2 className="text-3xl font-bold text-black">Pediatric Infectious Disease</h2>
            <div className="space-y-4 text-black">
              <p className="leading-relaxed">
                Children are naturally curious and full of energy, but their developing immune systems can sometimes 
                make them vulnerable to infections. At Aayush Child & Skin Hospital, our Pediatric Infectious Diseases 
                Department specializes in diagnosing, preventing, and treating a wide range of infections that can affect 
                children. From common conditions like pneumonia and skin infections to more complex issues such as bone 
                infections, tuberculosis, and immunocompromised-related infections, our expert team is here to provide 
                compassionate, cutting-edge care.
              </p>

              <p className="leading-relaxed">
                Thanks to medical advancements, improved immunization strategies, and enhanced hygiene practices, 
                preventing and managing infections has become more effective than ever. Our hospital is committed to 
                ensuring that every child receives the best possible care with a focus on prevention, early detection, 
                and precise treatment.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Our Specialized Services</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Fever Clinic – Addressing concerns like prolonged fever (PUO), recurrent fever, and frequent infections</li>
                <li>Infection Clinic – Treating ear, throat, skin (including MRSA), and respiratory infections, as well as recurrent cough, vomiting, and diarrhea that could signal immune disorders</li>
                <li>Immunocompromised Host Infection Clinic – Providing specialized care for children with weakened immune systems due to cancer, immune disorders, or transplant treatments</li>
                <li>Neonatal Infections – Managing conditions like meningitis, congenital infections (CMV, HSV), and other neonatal concerns</li>
                <li>Advanced Infection Management – Expertise in treating tuberculosis, HIV, dengue, malaria, chikungunya, and multi-drug resistant infections</li>
                <li>Post-Exposure Care – Immediate medical attention for cases involving animal bites, HIV exposure, and Hepatitis B risks</li>
              </ul>

              <p className="leading-relaxed">
                At Aayush Child & Skin Hospital, we understand that infections can be distressing for both children and 
                parents. That's why our dedicated team of pediatric specialists provides expert, family-centered care to 
                ensure that your child receives the best possible treatment in a safe, supportive, and healing environment.
              </p>

              <p className="leading-relaxed">
                Your child's health is our priority. With the right care, infections can be prevented, managed, and 
                treated effectively – ensuring a bright, healthy future.
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
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/child-infection-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvY2hpbGQtaW5mZWN0aW9uLWltYWdlLmpwZyIsImlhdCI6MTc0MzM1MjQ1MywiZXhwIjoxOTAxMDMyNDUzfQ.7xBm_9IsOFhI51bPDHtAVC4zVqEwemTZnM-t-mNYJYE"
                alt="Pediatric Infectious Disease Care"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
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
              Meet our expert infectious disease specialist who brings years of experience in treating pediatric infections.
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
                    src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Doctor-Sridhar.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eb2N0b3ItU3JpZGhhci5qcGciLCJpYXQiOjE3NDk4OTAzOTAsImV4cCI6MTkwNzU3MDM5MH0.FiLmzuS7X5SKlABFCgahdXlg7wf4XA71wSNlXAwta2A"
                    alt="Dr. G Sridhar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Dr. G Sridhar</h3>
                <p className="text-base text-gray-700 mb-4">Senior Consultant in Pediatric Infectious Diseases</p>
                
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
                    onClick={() => navigate('/doctors/dr-sridhar')}
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

const ChildCareBlogsSection = () => {
  const navigate = useNavigate();
  
  const blogs = [
    {
      id: 1,
      title: "The Hidden Impact of Nutritional Deficiencies on Children's Growth and Development",
      date: "February 25",
      link: "/blog/nutritional-deficiencies-impact",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Eating-Fruits-children.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRWF0aW5nLUZydWl0cy1jaGlsZHJlbi5qcGciLCJpYXQiOjE3NDMyNjQxMDgsImV4cCI6MTkwMDk0NDEwOH0.LkNVOGckF9f_kf153vkY3rMtPF0vwK-UOm1ztfyxLEs",
      excerpt: "Recognizing and addressing postpartum depression for better maternal mental health."
    },
    {
      id: 2,
      title: "Understanding Ear Infections in Children",
      date: "February 13",
      link: "/blog/understanding-ear-infections",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Ear-Infection-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRWFyLUluZmVjdGlvbi1pbWFnZS5qcGciLCJpYXQiOjE3NDMxNjE0NzksImV4cCI6MTkwMDg0MTQ3OX0.qJXJL7_Bp4AKJni2wyNLQNmHKTkgyr27tC-mj1tspJk",
      excerpt: "Understanding Ear Infections and addressing common concerns."
    },
    {
      id: 3,
      title: "When is Fever a cause for concern in Children?",
      link: "/blog/when-is-fever-a-concern",
      date: "January 22",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Fever-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRmV2ZXItaW1hZ2UuanBnIiwiaWF0IjoxNzQzMTYwODg0LCJleHAiOjE5MDA4NDA4ODR9.UiazaoUO3JxSVafETruxSulo64X20Mevx7MGn9JM5E4",
      excerpt: "Guidelines for parents to monitor and respond to childhood fevers."
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
            Latest Child Care Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with our expert insights on children's health and well-being
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
            Expert Care for Your Child's Health
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Schedule a consultation with our infectious disease specialists today
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

const PediatricInfectiousDiseases = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <Features />
      <InfectiousDiseasesSection />
      <FindDoctorSection />
      <ChildCareBlogsSection />
      <CTASection />
    </div>
  );
};

export default PediatricInfectiousDiseases;