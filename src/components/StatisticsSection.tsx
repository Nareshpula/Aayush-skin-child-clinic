import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Stethoscope, Brain, HeartPulse, Radiation } from "lucide-react";
import { useInView } from "framer-motion";

const stats = [
  { icon: <Stethoscope className="w-10 h-10 text-indigo-600" />, label: "CT Scans", value: 20000, showPlus: true },
  { icon: <Brain className="w-10 h-10 text-rose-500" />, label: "MRI Scans", value: 30000, showPlus: true },
  { icon: <HeartPulse className="w-10 h-10 text-teal-500" />, label: "Ultrasound Scans", value: 50000, showPlus: true },
  { icon: <Radiation className="w-10 h-10 text-amber-500" />, label: "Digital X-rays", value: 40000, showPlus: true },
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
          backgroundImage: 'url("https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/statistics-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL3N0YXRpc3RpY3MtaW1hZ2Uud2VicCIsImlhdCI6MTc0MDI4NzA1OCwiZXhwIjoxODk3OTY3MDU4fQ.5baXc8cIHO-djXqK-izHtsCITX6boNSZ5hWRJb7Tm24")'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center backdrop-blur-sm bg-[#e7e7e7]/30 py-16 rounded-3xl mx-4 shadow-xl">
        <motion.h2
          className="text-5xl font-extrabold text-gray-800 mb-16 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ duration: 1 }}
        >
          Numbers That Speak: Our Diagnostic Achievements
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
              className="flex flex-col items-center justify-center bg-white/40 rounded-2xl shadow-xl w-44 h-44 md:w-48 md:h-48 backdrop-blur-md border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
            >
              <div className="mb-4">{stat.icon}</div>
              <span className="text-3xl font-bold text-gray-800 drop-shadow-sm">
                {counts[index].toLocaleString()}{stat.showPlus && '+'}
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