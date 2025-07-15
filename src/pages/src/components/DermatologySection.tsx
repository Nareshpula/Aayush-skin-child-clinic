import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

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
    title: "Laser Hair Removal",
    description: "Permanent hair reduction solution",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/laser-epilation-hair-removal-therapy.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvbGFzZXItZXBpbGF0aW9uLWhhaXItcmVtb3ZhbC10aGVyYXB5LmpwZyIsImlhdCI6MTc0ODE0NTIzOCwiZXhwIjoxODQyNzUzMjM4fQ.zPAC9deNuzJWSrdFKRpxqFnWVB5z9Ov-PcIjEnar0CE",
    path: "/laser-hair-removal"
  },
  {
    title: "Hair Loss Treatment",
    description: "Restore hair growth and thickness",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Hair-loss-showing-image.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvSGFpci1sb3NzLXNob3dpbmctaW1hZ2UuanBlZyIsImlhdCI6MTc0ODE3Mjc5NSwiZXhwIjoxODQyNzgwNzk1fQ.coKWrjeDLcHr5De2vF3rn00V2Ar4bFuCnXSIGi7ADCA",
    path: "/hair-loss-treatment"
  },
  {
    title: "PRP Hair Therapy",
    description: "Natural hair restoration solution",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/PRP-Theropy-home-image.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvUFJQLVRoZXJvcHktaG9tZS1pbWFnZS5qcGVnIiwiaWF0IjoxNzQ4MTczMDAyLCJleHAiOjE4NDI3ODEwMDJ9.bi_smLsWPzvzekqzjs0RoGV_62GIiKtm5V77PB5bFNY",
    path: "/prp-hair-therapy"
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
  },
  {
    title: "Mesotherapy Treatment",
    description: "skin rejuvenate and tighten it solutions",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Mesotheropy-home-image.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvTWVzb3RoZXJvcHktaG9tZS1pbWFnZS5qcGVnIiwiaWF0IjoxNzQ4MTczNzk1LCJleHAiOjE4NDI3ODE3OTV9.UbwJtBy9tGBILYbimHIYLNkpzKa31Ygj8ErPdKqgKD4",
    path: "/mesotherapy-treatment"
  },
  {
    title: "Tattoo Removal",
    description: "Advanced laser tattoo removal",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Skin-pages-image/Tattoo-Removal-Image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2tpbi1wYWdlcy1pbWFnZS9UYXR0b28tUmVtb3ZhbC1JbWFnZS5wbmciLCJpYXQiOjE3NDk4ODkwNjYsImV4cCI6MTg0NDQ5NzA2Nn0.DUMvKtPZnuYMZ_JW6Wx1iyZs0_6im3DHNBdwTe9bkXU",
    path: "/tattoo-removal"
  },
  {
    title: "Mole Removal",
    description: "Safe removal of skin moles",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Mole-showing-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvTW9sZS1zaG93aW5nLWltYWdlLmpwZyIsImlhdCI6MTc0ODE1NzE4NSwiZXhwIjoxODQyNzY1MTg1fQ.-IePmjNiJsaJLkAiM-O5BDGuvsofwUxyKCv1JPSmnuM",
    path: "/mole-removal"
  },
  {
    title: "Wart Removal",
    description: "Effective wart treatment solutions",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Wart-main-images.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvV2FydC1tYWluLWltYWdlcy5qcGVnIiwiaWF0IjoxNzQ4MTcwMTY3LCJleHAiOjE4NDI3NzgxNjd9.AAeDfGv9NxJ5hyDEWnX2MNfv1vE0t_ySJw2c6OURODE",
    path: "/wart-removal"
  },
  {
    title: "Stretch Mark Removal",
    description: "Reduce appearance of stretch marks",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Hair%20-care-images/Stretch-problems-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzA2ZGNhMjEzLTk5ZjQtNDI2ZC05Y2M0LTJmMDBiMmE3NDQxZiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvSGFpciAtY2FyZS1pbWFnZXMvU3RyZXRjaC1wcm9ibGVtcy1pbWFnZS5qcGciLCJpYXQiOjE3NDgxNDQ1NjQsImV4cCI6MTg0Mjc1MjU2NH0.XZwJOovk8-ZU6b6I9m4wo7uLd1gZhMYQfOMfZMxwYnY",
    path: "/stretch-mark-removal"
  }
];

const DermatologySection = () => {
  const navigate = useNavigate();

  // Preload images
  useEffect(() => {
    skinConcerns.forEach(concern => {
      if (concern.image) {
        const img = new Image();
        img.src = concern.image;
      }
    });
  }, []);

  return (
    <section className="py-12 md:py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-[#000000] mb-4 md:mb-6">
            Leading Dermatology Clinic in Madanapalle
          </h2>
          <h3 className="text-lg md:text-2xl font-semibold text-[#000000] mb-3 md:mb-4">
            MAJOR SERVICES
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {skinConcerns.map((concern, index) => (
            <motion.div
              onClick={() => {
                if (concern.path) {
                  // Use React Router navigation for smooth transitions
                  navigate(concern.path);
                }
              }}
              key={concern.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer mx-auto"
            >
              <motion.div
                className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 md:mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 transform-gpu backface-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <img
                  src={concern.image}
                  alt={concern.title}
                  className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-110 image-rendering-crisp"
                  loading="eager"
                  decoding="async"
                  width="128"
                  height="128"
                  fetchPriority={index < 5 ? "high" : "low"}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
              </motion.div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2 text-center group-hover:text-[#7a3a95] transition-colors duration-300">
                {concern.title}
              </h3>
              <p className="text-xs text-gray-600 text-center px-1 line-clamp-2">
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