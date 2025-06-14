/* DrHimabinduSridharProfile.tsx
   — fixed avatar (correct Supabase URL + srcSet)
   — drop-in replacement for Bolt.new
*/

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Languages,
  Calendar,
  Award,
  FileText,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

/* -----------------------------------------------------------
   Build a signed Supabase URL with width / quality parameters.
   If the base already contains "?", append params with "&".
------------------------------------------------------------ */
const withSize = (url: string, width: number, quality = 80) => {
  const join = url.includes("?") ? "&" : "?";
  return `${url}${join}width=${width}&quality=${quality}`;
};

/* -------- avatar that stays sharp & lightweight --------- */
const DoctorAvatar = ({
  src,            // original signed URL
  alt,
  baseSize = 256, // rendered size on desktop (px)
}: {
  src: string;
  alt: string;
  baseSize?: number;
}) => {
  const sizes = [baseSize / 2, baseSize, baseSize * 1.5]; // 128-256-384 px
  const srcSet = sizes
    .map((w) => `${withSize(src, w)} ${w}w`)
    .join(", ");

  return (
    <img
      src={withSize(src, baseSize)}      /* fallback */
      srcSet={srcSet}
      sizes={`(max-width: 768px) ${baseSize / 2}px, ${baseSize}px`}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-top rounded-lg"
    />
  );
};

/* ---------------- main profile component ---------------- */
const DrHimabinduSridharProfile = () => {
  const doctor = {
    name: "Dr. Himabindu Sridhar",
    designation: "Consultant Dermatologist, Cosmetologist, Laser & Hair Transplant Surgeon",
    specialization: "Cosmetology, Dermatology, Laser & Hair Transplant Surgery",
    experience: "15+ Years Experience",
    location: "Madanapalle",
    languages: "Telugu, English, Hindi",
    /* original signed Supabase URL (do NOT add width/quality here) */
    image:
      "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g",
    education: [
      "M.B.B.S – Kurnool Medical College",
      "M.D – AIIMS New Delhi",
    ],
    achievements:
      "Presented papers in state and national-level conferences. Invited as faculty in conferences.",
    publications: [
      "Advanced Laser Resurfacing Techniques – summary of facial-rejuvenation methods.",
      "Modern Hair Transplant Solutions – overview of techniques and success rates.",
    ],
    bio: `Dr. Himabindu Sridhar is a distinguished cosmetologist and dermatologist with
          15 years of experience in skin-care and aesthetic medicine. Her expertise
          in laser treatments and hair-transplant surgery has helped countless
          patients achieve their desired appearance and boost confidence.`,
    expertise: [
      "Cosmetic Dermatology",
      "Laser Treatments",
      "Hair Transplantation",
      "Skin Rejuvenation",
      "Acne & Scar Management",
      "Anti-Aging Procedures",
    ],
    availability: {
      days: "Monday – Saturday",
      hours: "09:00 AM – 09:00 PM",
      sunday: "10:30 AM – 01:00 PM",
    },
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-24 md:pt-36 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* -------- profile card -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
        >
          <div className="md:flex">
            {/* avatar */}
            <div className="md:w-1/3 p-6 flex justify-center items-center bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <DoctorAvatar src={doctor.image} alt={doctor.name} />
              </div>
            </div>

            {/* details */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#7a3a95] mb-2">
                {doctor.name}
              </h1>
              <p className="text-lg font-semibold text-gray-700 mb-6">
                {doctor.designation}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <InfoRow icon={FileText} label="Specialization" value={doctor.specialization} />
                <InfoRow icon={Calendar} label="Experience"     value={doctor.experience} />
                <InfoRow icon={MapPin}   label="Location"       value={doctor.location} />
                <InfoRow icon={Languages} label="Languages"     value={doctor.languages} />

                <Availability availability={doctor.availability} />
                <InfoRow icon={Phone} label="Contact" value="+91 96760 79516" />
                <InfoRow icon={Mail}  label="Email"   value="aayushchildskincare@gmail.com" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <PrimaryLink to="/book-appointment">Book Appointment</PrimaryLink>
                <SecondaryLink href="tel:+919676079516">
                  <Phone className="mr-2 w-5 h-5" /> Contact Now
                </SecondaryLink>
              </div>
            </div>
          </div>
        </motion.div>

        {/* -------- biography -------- */}
        <Section title={`About ${doctor.name}`} delay={0.2}>
          <p className="text-gray-700 leading-relaxed mb-6">{doctor.bio}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Areas of Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {doctor.expertise.map((item) => (
              <span
                key={item}
                className="bg-purple-50 text-[#7a3a95] px-4 py-2 rounded-lg text-center"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

        {/* -------- education & publications -------- */}
        <div className="grid md:grid-cols-2 gap-8">
          <Section title="Education & Training" icon={Award} delay={0.3}>
            <ul className="list-disc list-inside space-y-2 ml-2 text-gray-700">
              {doctor.education.map((e) => <li key={e}>{e}</li>)}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3 flex items-center">
              <Award className="w-6 h-6 text-[#7a3a95] mr-2" />
              Achievements & Awards
            </h3>
            <p className="text-gray-700 ml-2">{doctor.achievements}</p>
          </Section>

          <Section title="Research & Publications" icon={FileText} delay={0.4}>
            <ul className="list-disc list-inside space-y-2 ml-2 text-gray-700">
              {doctor.publications.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Section>
        </div>

        {/* -------- call-to-action -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">
            Ready to Schedule an Appointment?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Book your appointment with {doctor.name} today and take the first step towards better health.
          </p>
          <PrimaryLink to="/book-appointment">Book an Appointment</PrimaryLink>
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- small helpers ---------- */

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 text-gray-700">
    <Icon className="w-5 h-5 text-[#7a3a95]" />
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

const Availability = ({ availability }: { availability: any }) => (
  <div className="flex items-start gap-2 text-gray-700">
    <Clock className="w-5 h-5 text-[#7a3a95] mt-1" />
    <div>
      <span className="font-medium">Availability:</span>
      <div className="ml-2">
        <p>
          {availability.days}: {availability.hours}
        </p>
        <p>Sunday: {availability.sunday}</p>
      </div>
    </div>
  </div>
);

const PrimaryLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="px-6 py-3 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-all duration-200 flex items-center justify-center"
  >
    {children}
  </Link>
);

const SecondaryLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="px-6 py-3 border-2 border-[#7a3a95] text-[#7a3a95] rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
  >
    {children}
  </a>
);

const Section = ({
  title,
  icon: Icon,
  delay = 0,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  delay?: number;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl shadow-lg p-8"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      {Icon && <Icon className="w-6 h-6 text-[#7a3a95] mr-2" />}
      {title}
    </h2>
    {children}
  </motion.div>
);

export default DrHimabinduSridharProfile;