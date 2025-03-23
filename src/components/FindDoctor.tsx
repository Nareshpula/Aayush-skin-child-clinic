import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowRight, MapPin, Languages, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }: { doctor: {
  name: string;
  designation: string;
  image: string;
  experience: string;
  languages: string;
  location: string;
  profileLink: string;
}}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="p-4">
      <div className="flex gap-4">
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
          <p className="text-sm text-gray-900 mb-3">{doctor.designation}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Stethoscope className="w-4 h-4 text-purple-600" />
              <span>{doctor.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Languages className="w-4 h-4 text-purple-600 transform rotate-180" />
              <span>{doctor.languages}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>{doctor.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Link
          to={doctor.profileLink}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-full border-2 border-[#7a3a95] text-[#cab1d5] text-sm font-bold hover:bg-purple-50 transition-colors duration-300 group"
        >
          View Profile <ArrowRight className="w-4 h-4 ml-1 text-[#cab1d5] stroke-[2.5]" />
        </Link>
        <Link
          to="#contact-form"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-full bg-[#7a3a95] text-white text-sm font-semibold hover:bg-[#7a3a95]/90 transition-colors duration-300"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  </motion.div>
);

const FindDoctor = () => {
  const doctors = [
    {
      name: "Dr. G Sridhar",
      designation: "Senior Consultant in Pediatrics",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Dinesh-Kumar-Chirla.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1EaW5lc2gtS3VtYXItQ2hpcmxhLmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE",
      experience: "15+ Years Experience",
      languages: "Telugu, English, Hindi",
      location: "Madanapalle",
      profileLink: "/doctors/dr-sridhar"
    },
    {
      name: "Dr. G Himabindhu",
      designation: "Senior Consultant in Dermatology",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Himabindhu.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1IaW1hYmluZGh1LmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE",
      experience: "15+ Years Experience",
      languages: "Telugu, English, Hindi",
      location: "Madanapalle",
      profileLink: "/doctors/dr-himabindhu"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#e7e0f0] via-[#e5e0ec] to-[#e7e5eb]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[24px] font-bold text-black mb-4">
            Find a Doctor
          </h2>
          <p className="text-base md:text-[16px] text-[#1b1a1b] max-w-2xl mx-auto">
            Connect with our experienced pediatricians and dermatologists who provide specialized care for children's health and comprehensive skin treatments for all ages. Whether it's pediatric care or advanced dermatology solutions, our expert doctors are dedicated to delivering exceptional healthcare with compassion and expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindDoctor