import React from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DoctorPage = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. G Sridhar",
      designation: "Senior Consultant in Pediatrics",
      specialization: "Pediatrics, NICU, PICU",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Sridhar-Image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9TcmlkaGFyLUltYWdlLmpwZyIsImlhdCI6MTc0OTM0OTI2OCwiZXhwIjoxOTA3MDI5MjY4fQ.eJ32umItgxbVzIBqKE7q6aFiCXpbuYVxVG5ExE7neCk&width=400&quality=80",
      slug: "dr-g-sridhar"
    },
    {
      id: 2,
      name: "Dr. Himabindu Sridhar",
      designation: "Consultant Dermatologist, Cosmetologist, Laser & Hair Transplant Surgeon",
      specialization: "Dermatology, Cosmetology, Dermatology, Laser & Hair Transplant Surgery",
      image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g",
      slug: "dr-himabindu-sridhar"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-24 md:pt-36">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Doctors</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced doctors who provide exceptional care with expertise and compassion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h2>
                    <p className="text-[#7a3a95] font-medium mb-2">{doctor.designation}</p>
                    <p className="text-gray-600 text-sm mb-4">{doctor.specialization}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/doctors/${doctor.slug}`}
                        className="px-5 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-all duration-200 flex items-center justify-center"
                      >
                        View Profile <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                      
                      <Link
                        to="/book-appointment"
                        className="px-5 py-2 border border-[#7a3a95] text-[#7a3a95] rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;