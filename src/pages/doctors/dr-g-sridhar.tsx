import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Languages, Calendar, Award, FileText, Phone, Mail, Clock } from 'lucide-react';

const DrGSridharProfile = () => {
  const navigate = useNavigate();
  
  const doctor = {
    id: 1,
    name: "Dr. G Sridhar",
    designation: "Senior Consultant in Pediatrics",
    specialization: "Pediatrics, NICU, PICU",
    experience: "15 years",
    location: "Madanapalle",
    languages: "Telugu, English, Hindi",
    slug: "dr-g-sridhar",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Sridhar-Image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9TcmlkaGFyLUltYWdlLmpwZyIsImlhdCI6MTc0OTM0OTI2OCwiZXhwIjoxOTA3MDI5MjY4fQ.eJ32umItgxbVzIBqKE7q6aFiCXpbuYVxVG5ExE7neCk&width=600&quality=80",
    education: [
      "M.B.B.S – Kurnool Medical College",
      "M.D – SJH New Delhi",
      "Senior Residency – AIIMS New Delhi (3 years)"
    ],
    achievements: "Presented papers in state and national-level conferences. Invited as a faculty in conferences.",
    publications: [
      "Pediatric Intensive Care Advances – Summary about modern NICU and PICU care improvements.",
      "Childhood Immunization Trends in India – Summary of vaccination strategies and impacts."
    ],
    bio: "Dr. G Sridhar is a highly experienced pediatrician with over 15 years of dedicated service in child healthcare. Specializing in pediatrics with a focus on NICU and PICU care, he has helped thousands of children overcome various health challenges. His approach combines medical expertise with a gentle, child-friendly manner that puts both young patients and their parents at ease.",
    expertise: [
      "General Pediatrics",
      "Neonatal Intensive Care",
      "Pediatric Intensive Care",
      "Childhood Immunizations",
      "Growth & Development Monitoring",
      "Pediatric Infectious Diseases"
    ],
    availability: {
      days: "Monday to Saturday",
      hours: "09:00 AM - 09:00 PM",
      sunday: "10:30 AM - 01:00 PM"
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-24 md:pt-36 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Doctor Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
        >
          <div className="md:flex">
            {/* Image Container (Left Side) */}
            <div className="md:w-1/3 p-6 flex justify-center items-center bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Doctor Details (Right Side) */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#7a3a95] mb-2">{doctor.name}</h1>
              <p className="text-lg font-semibold text-gray-700 mb-6">{doctor.designation}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#7a3a95]" />
                    <span className="font-medium">Specialization:</span>
                    <span>{doctor.specialization}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#7a3a95]" />
                    <span className="font-medium">Experience:</span>
                    <span>{doctor.experience}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#7a3a95]" />
                    <span className="font-medium">Location:</span>
                    <span>{doctor.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-[#7a3a95]" />
                    <span className="font-medium">Languages:</span>
                    <span>{doctor.languages}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-[#7a3a95] mt-1" />
                    <div>
                      <span className="font-medium">Availability:</span>
                      <div className="ml-2">
                        <p>{doctor.availability.days}: {doctor.availability.hours}</p>
                        <p>Sunday: {doctor.availability.sunday}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#7a3a95]" />
                    <span className="font-medium">Contact:</span>
                    <span>+91 9676079516</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#7a3a95]" />
                    <span className="font-medium">Email:</span>
                    <span>aayushchildskincare@gmail.com</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  to="/book-appointment"
                  className="px-6 py-3 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-all duration-200 flex items-center justify-center"
                >
                  Book Appointment
                </Link>
                
                <a
                  href="tel:+919676079516"
                  className="px-6 py-3 border-2 border-[#7a3a95] text-[#7a3a95] rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
                >
                  <Phone className="mr-2 w-5 h-5" /> Contact Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Doctor Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About {doctor.name}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{doctor.bio}</p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Areas of Expertise</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {doctor.expertise.map((item, index) => (
              <div 
                key={index}
                className="bg-purple-50 text-[#7a3a95] px-4 py-2 rounded-lg text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Education and Publications */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="w-6 h-6 text-[#7a3a95] mr-2" />
              Education & Training
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              {doctor.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3 flex items-center">
              <Award className="w-6 h-6 text-[#7a3a95] mr-2" />
              Achievements & Awards
            </h3>
            <p className="text-gray-700 ml-2">{doctor.achievements}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-[#7a3a95] mr-2" />
              Research & Publications
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              {doctor.publications.map((pub, index) => (
                <li key={index}>{pub}</li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Book Appointment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Schedule an Appointment?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Book your appointment with {doctor.name} today and take the first step towards better health.
          </p>
          <Link
            to="/book-appointment"
            className="inline-block px-8 py-4 bg-white text-[#7a3a95] rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Book an Appointment
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DrGSridharProfile;