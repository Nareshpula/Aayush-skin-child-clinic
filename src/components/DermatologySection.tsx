import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const skinConcerns = [
  {
    title: "Dullness",
    description: "Brighten, refresh and moisturize",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/women-dullness-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvd29tZW4tZHVsbG5lc3MtaW1hZ2UuanBnIiwiaWF0IjoxNzQyODE2MjI3LCJleHAiOjE5MDA0OTYyMjd9.5o0sDWZYyee63Uh2RHezVWom7oUcPPUW0P8vaK4-fP0",
    path: "/dullness"
  },
  {
    title: "Acne&Acne Scars",
    description: "Treat, exfoliate, and hydrate",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Skin-pages-image/Laser-treatment-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2tpbi1wYWdlcy1pbWFnZS9MYXNlci10cmVhdG1lbnQtaW1hZ2UucG5nIiwiaWF0IjoxNzQzNTExNTI4LCJleHAiOjE5MDExOTE1Mjh9.p4P4R43HzkkKbZ22i24J_aDO6ZGuNWHqV-M_nxFxRyc",
    path: "/acne"
  },
  {
    title: "Pigmentation",
    description: "Lighten, exfoliate, and sun-protection",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/pigmantation-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvcGlnbWFudGF0aW9uLWltYWdlLmpwZyIsImlhdCI6MTc0MjgxNzcyMiwiZXhwIjoxOTAwNDk3NzIyfQ.s9t3YX4_QGTBpllZj8rbkulP5C-PLEzwCjWLGm4LuVo",
    path: "/pigmentation"
  },
  {
    title: "Anti Ageing",
    description: "Rejuvenate, hydrate & reverse-aging",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Anti-Ageing-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQW50aS1BZ2VpbmctaW1hZ2UuanBnIiwiaWF0IjoxNzQyODE4MTI2LCJleHAiOjE5MDA0OTgxMjZ9.kYcAgp9ELzyk2NCCGACgBTG2WfaGgQj4B6qZInVyuNE",
    path: "/anti-ageing"
  },
  {
    title: "Dryness",
    description: "Hydrate, protect from sun & intense moisturization",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/dry-skin-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvZHJ5LXNraW4taW1hZ2UuanBnIiwiaWF0IjoxNzQyODE5MDc0LCJleHAiOjE5MDA0OTkwNzR9.b0OCWaRaI1tKYh5Mci9fBCQd5gPoI6vbPOFnGOEL_98",
    path: "/dryness"
  }
];

const DermatologySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6">
            Leading Dermatology Clinic in Madanapalle
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-[#000000] mb-4">
            MAJOR SERVICES
          </h3>
        </motion.div>

        <div className="grid grid-cols-5 gap-8">
          {skinConcerns.map((concern, index) => (
            <motion.div
              onClick={() => {
                if (concern.path) {
                  navigate(concern.path);
                  window.scrollTo(0, 0);
                  window.scrollTo(0, 0);
                }
              }}
              key={concern.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                className={cn(
                  "relative w-40 h-40 rounded-full overflow-hidden mb-4",
                  "shadow-lg hover:shadow-xl transition-shadow duration-300",
                  "transform-gpu backface-hidden"
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <img
                  src={concern.image}
                  alt={concern.title}
                  className={cn(
                    "w-full h-full object-cover",
                    "transform-gpu will-change-transform",
                    "transition-transform duration-700",
                    "group-hover:scale-110",
                    "image-rendering-crisp"
                  )}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center group-hover:text-[#7a3a95] transition-colors duration-300">
                {concern.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {concern.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DermatologySection;