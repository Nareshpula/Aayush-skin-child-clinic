/* FindDoctor.tsx
   – both doctor cards now show CRISP, HD thumbnails
   – uses Supabase *render/image* CDN + DPR-aware srcSet
   – drop-in replacement: copy to /pages/FindDoctor.tsx (or similar)
*/

import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  ArrowRight, 
  MapPin,
  Languages,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------
   Signed Supabase URL  ➜  CDN render/image URL with resize/crop
-------------------------------------------------------------- */
const renderURL = (
  signed: string,
  width: number,
  quality = 80,
  format = "webp",
  fit = "cover"
) => {
  const cdn = signed.replace("/object/", "/render/image/");
  const join = cdn.includes("?") ? "&" : "?";
  return `${cdn}${join}width=${width}&quality=${quality}&format=${format}&fit=${fit}`;
};

/* -------- thumbnail that stays razor-sharp on Retina screens -------- */
const AvatarSM = ({
  src,
  alt,
  size = 128,
}: {
  src: string;
  alt: string;
  size?: number;
}) => {
  const srcSet = [1, 2]
    .map((dpr) => `${renderURL(src, size * dpr)} ${dpr}x`)
    .join(", ");
  return (
    <img
      src={renderURL(src, size * 2)}
      srcSet={srcSet}
      alt={alt}
      width={size}
      height={size}
      className="w-full h-full object-cover object-center rounded-lg"
      loading="lazy"
      decoding="async"
    />
  );
};

/* ---------------- single card ---------------- */
const DoctorCard = ({
  doctor,
}: {
  doctor: {
    name: string;
    designation: string;
    image: string; // signed URL – NO size params
    experience: string;
    languages: string;
    location: string;
    profileLink: string;
  };
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="p-4">
      <div className="flex gap-4">
        {/* avatar */}
        <div className="w-32 h-32 flex-shrink-0">
          <AvatarSM src={doctor.image} alt={doctor.name} />
        </div>

        {/* text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {doctor.name}
          </h3>
          <p className="text-base text-gray-900 mb-3">{doctor.designation}</p>

          <div className="space-y-2 mb-4">
            <InfoRow icon={Stethoscope} text={doctor.experience} />
            <InfoRow
              icon={Languages}
              text={doctor.languages}
              extraClass="transform rotate-180"
            />
            <InfoRow icon={MapPin} text={doctor.location} />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          to={doctor.profileLink}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-full border-2 border-[#7a3a95] text-[#7a3a95] text-sm font-bold hover:bg-purple-50 transition-colors duration-300 group"
        >
          View Profile{" "}
          <ArrowRight className="w-4 h-4 ml-1 text-[#7a3a95] stroke-2.5" />
        </Link>
        <Link
          to="/book-appointment"
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-full bg-[#7a3a95] text-white text-sm font-semibold hover:bg-[#6a2a85] transition-colors duration-300"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  </motion.div>
);

/* -------------- find-doctor grid -------------- */
const FindDoctor = () => {
  // Preload doctor images
  React.useEffect(() => {
    const doctorImages = [
      "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Sridhar-Image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9TcmlkaGFyLUltYWdlLmpwZyIsImlhdCI6MTc0OTM0OTI2OCwiZXhwIjoxOTA3MDI5MjY4fQ.eJ32umItgxbVzIBqKE7q6aFiCXpbuYVxVG5ExE7neCk",
      "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g"
    ];
    
    doctorImages.forEach(url => {
      const img = new Image();
      img.src = renderURL(url, 256);
    });
  }, []);

  const doctors = [
    {
      name: "Dr. G Sridhar",
      designation: "Senior Consultant in Pediatrics",
      image:
        "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Sridhar-Image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9TcmlkaGFyLUltYWdlLmpwZyIsImlhdCI6MTc0OTM0OTI2OCwiZXhwIjoxOTA3MDI5MjY4fQ.eJ32umItgxbVzIBqKE7q6aFiCXpbuYVxVG5ExE7neCk",
      experience: "15+ Years Experience",
      languages: "Telugu, English, Hindi",
      location: "Madanapalle",
      profileLink: "/doctors/dr-g-sridhar",
    },
    {
      name: "Dr. Himabindu Sridhar",
      designation:
        "Consultant Dermatologist, Cosmetologist, Laser & Hair Transplant Surgeon",
      image:
        "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g",
      experience: "15+ Years Experience",
      languages: "Telugu, English, Hindi",
      location: "Madanapalle",
      profileLink: "/doctors/dr-himabindu-sridhar",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-[#e7e0f0] via-[#e5e0ec] to-[#e7e5eb]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-[24px] font-bold text-black mb-3 md:mb-4">
            Find a Doctor
          </h2>
          <p className="text-sm md:text-[16px] text-[#1b1a1b] max-w-2xl mx-auto">
            Connect with our experienced pediatricians and dermatologists who
            provide specialized care for children's health and comprehensive
            skin treatments for all ages.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {doctors.map((doc) => (
            <DoctorCard key={doc.name} doctor={doc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindDoctor;

/* -------- tiny helpers -------- */
const InfoRow = ({
  icon: Icon,
  text,
  extraClass = "",
}: {
  icon: React.ElementType;
  text: string;
  extraClass?: string;
}) => (
  <div className="flex items-center gap-2 text-gray-600 text-sm">
    <Icon className={`w-4 h-4 text-purple-600 ${extraClass}`} />
    <span>{text}</span>
  </div>
);