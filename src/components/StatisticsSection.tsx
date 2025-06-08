import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Clock, Users, UserCheck, Stethoscope } from "lucide-react";
import { useInView } from "framer-motion";

const stats = [
  { icon: <Clock className="w-10 h-10 text-indigo-600" />, label: "Years of Experience", value: 15, showPlus: true },
  { icon: <Users className="w-10 h-10 text-rose-500" />, label: "Doctors", value: 2, showPlus: false },
  { icon: <UserCheck className="w-10 h-10 text-teal-500" />, label: "Patients Served", value: 1, showPlus: true, suffix: "M" },
  { icon: <Stethoscope className="w-10 h-10 text-amber-500" />, label: "Specialties", value: 20, showPlus: true },
];

const StatisticsSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, scale: 1 });
      const interval = setInterval(() => {
        setCounts((prevCounts) =>
          prevCounts.map((count, i) =>
            count < stats[i].value ? count + Math.ceil(stats[i].value / 100) : stats[i].value
          )
        );
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isInView, controls]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: 'url("https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/childrens-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvY2hpbGRyZW5zLWltYWdlLmpwZyIsImlhdCI6MTc0Mjg0MzA1OCwiZXhwIjoxOTAwNTIzMDU4fQ.pls1SZZrmICnohKUya153nK-NJRHnXfE7dR0qtNx11k")',
          filter: 'brightness(1.1) contrast(1.05)'
        }}
       aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center backdrop-blur-[2px] bg-white/10 py-16 rounded-3xl mx-4 shadow-lg">
        <motion.h2
          className="text-5xl font-extrabold text-gray-800 mb-16 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ duration: 1 }}
        >
          Clinical Excellence
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 rounded-2xl shadow-lg hover:shadow-xl w-44 h-44 md:w-48 md:h-48 backdrop-blur-[4px] border border-white/30 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
            >
              <div className="mb-4">{stat.icon}</div>
              <span className="text-3xl font-bold text-gray-800 drop-shadow-sm">
                {counts[index].toLocaleString()}{stat.suffix || ''}{stat.showPlus && '+'}
              </span>
              <p className="text-sm font-medium text-gray-700 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;