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
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Vaccenation-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvVmFjY2VuYXRpb24taW1hZ2UuanBnIiwiaWF0IjoxNzQzNDA2MjY4LCJleHAiOjE5MDEwODYyNjh9.tZTFOl5_rBKsTgP8kU0QDNIYfM-zHgKsSv1VYBQIgmE"
          alt="Vaccinations & Immunizations"
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
            Protecting Health, Preventing Disease
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
    description: "State-of-the-art vaccination facilities and storage",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Service%2024_7-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2VydmljZSAyNF83LWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTA1NSwiZXhwIjoxOTAxMDExMDU1fQ.OLOPsCy8uwjMyL-uR5xJXsxvNkvPahH3iLKwEmHJ0G0",
    title: "24/7 Support",
    description: "Round-the-clock vaccination services and care",
    color: "bg-gradient-to-br from-red-50 to-pink-50"
  },
  {
    icon: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Diagnosis-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRGlhZ25vc2lzLWltYWdlLnN2ZyIsImlhdCI6MTc0MzMzMTEyNCwiZXhwIjoxOTAxMDExMTI0fQ._ogfOsHXAn5-LsN1kRUtS3ERcbiImP_ngZ4IGTtORN8",
    title: "Complete Care Journey",
    description: "Comprehensive immunization planning and follow-up",
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

const VaccinationsSection = () => {
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
            <h2 className="text-3xl font-bold text-black">Protecting Health, Preventing Disease</h2>
            <div className="space-y-4 text-black">
              <p className="leading-relaxed">
                At Aayush Child & Skin Hospital, we believe that prevention is the first step toward a healthy future. 
                Our Vaccinations & Immunizations program is designed to protect children from life-threatening diseases, 
                ensuring they grow up strong and resilient. With a scientific, safe, and personalized approach, we provide 
                age-appropriate immunizations and expert guidance for parents, ensuring that every child gets the protection 
                they deserve.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Comprehensive Immunization Services</h3>
              <p className="leading-relaxed">
                Our team of experienced pediatricians and immunization specialists provide:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Routine Childhood Vaccinations – Protecting against diseases like measles, mumps, rubella, polio, and whooping cough</li>
                <li>Newborn & Infant Immunization Plans – Ensuring protection from the earliest stages of life</li>
                <li>Catch-up Vaccinations – Helping children who have missed scheduled doses stay up to date</li>
                <li>Specialized Vaccination for High-Risk Children – For children with chronic illnesses, premature birth, or immunodeficiencies</li>
                <li>Travel Vaccinations – Offering protection against diseases prevalent in specific regions</li>
                <li>Seasonal Flu & COVID-19 Vaccines – Boosting immunity against common and emerging viruses</li>
                <li>HPV & Adolescent Vaccinations – Ensuring long-term protection against preventable diseases in teens</li>
                <li>Adult & Maternal Immunization Counseling – Guiding parents on vaccines needed during pregnancy and beyond</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Why Vaccination is Essential</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prevents Serious Illnesses – Protecting children from dangerous infections like polio, tuberculosis, hepatitis, and meningitis</li>
                <li>Strengthens Community Immunity – Reducing disease spread and safeguarding vulnerable individuals</li>
                <li>Ensures Long-Term Health – Providing lifelong protection against many infectious diseases</li>
                <li>Safe & Scientifically Proven – Our vaccines follow global health standards and are administered by trained professionals</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Personalized Immunization Plans for Every Child</h3>
              <p className="leading-relaxed">
                We understand that every child is unique, which is why we offer customized immunization schedules based on 
                age, medical history, and risk factors. Our experts ensure that parents are well-informed, providing clear 
                guidance on vaccine benefits, side effects, and aftercare.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Your Child's Health is Our Priority</h3>
              <p className="leading-relaxed">
                At Aayush Child & Skin Hospital, we are committed to keeping children safe from preventable diseases through 
                timely, effective, and compassionate immunization services.
              </p>
              <p className="leading-relaxed mt-4">
                Give your child the best start in life—protect them with the power of vaccination.
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
                src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Vaccenation-child-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvVmFjY2VuYXRpb24tY2hpbGQtaW1hZ2UuanBnIiwiaWF0IjoxNzQzNDA2OTYxLCJleHAiOjE5MDEwODY5NjF9.oT_C4RV0kIuXH0wzNxJqTS2Dje2yLq8jZ4Z_3MFS1hs"
                alt="Vaccinations & Immunizations"
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
              Meet our expert immunization specialist who brings years of experience in pediatric vaccinations.
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
                <p className="text-base text-gray-700 mb-4">Senior Consultant in Pediatric Immunology</p>
                
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
            Protect Your Child's Future
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Schedule a vaccination consultation with our experts today
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

const VaccinationsImmunizations = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <Features />
      <VaccinationsSection />
      <FindDoctorSection />
      <ChildCareBlogsSection />
      <CTASection />
    </div>
  );
};

export default VaccinationsImmunizations;