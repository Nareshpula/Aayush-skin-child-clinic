import React from 'react';
import { motion } from 'framer-motion';

const organs = [
  {
    name: 'Brain',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-brain-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4tYnJhaW4taW1hZ2Uud2VicCIsImlhdCI6MTczOTk2Mzc0MCwiZXhwIjoxODk3NjQzNzQwfQ.GuYq7YrZryFrmYJJpS4Bx3WcVc4Un_Dez67HkACXSWQ',
  },
  {
    name: 'Lungs',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-Lungs-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4tTHVuZ3MtaW1hZ2Uud2VicCIsImlhdCI6MTczOTk2NjUwMCwiZXhwIjoxODk3NjQ2NTAwfQ.DAHfD5b__0FJUzaoiRoh1vAApmfR6eXx6Ce2dSGzL-0',
  },
  {
    name: 'Liver',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-Liver-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4tTGl2ZXItaW1hZ2Uud2VicCIsImlhdCI6MTczOTk2NjQ0NiwiZXhwIjoxODk3NjQ2NDQ2fQ.1Yd2ITUOhVruKbdB8i8BJDzan_aYUJIqJCzCx6xaEyM',
  },
  {
    name: 'Kidney',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-kidneys-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4ta2lkbmV5cy1pbWFnZS53ZWJwIiwiaWF0IjoxNzM5OTY2MzQ4LCJleHAiOjE4OTc2NDYzNDh9._KmF1MTzGGMA0wtK-junRjB8mHT64sHgUBIBd5vitqY',
  },
  {
    name: 'Heart',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-heart-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4taGVhcnQtaW1hZ2Uud2VicCIsImlhdCI6MTczOTk2NjMwMiwiZXhwIjoxODk3NjQ2MzAyfQ.6mGXpnHlchqCfukAQCVePvWisa41DSBmSZpr2EBuFpg',
  },
  {
    name: 'Thyroid Gland',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-thyroid-gland-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4tdGh5cm9pZC1nbGFuZC1pbWFnZS53ZWJwIiwiaWF0IjoxNzM5OTY2ODAyLCJleHAiOjE4OTc2NDY4MDJ9.dKGuKkwrhhw-bxYrpjbRQkgEEDPEKS2NtYeI2hPQ0qc',
  },
  {
    name: 'Abdominal Scan',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/abdominal-scan-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvYWJkb21pbmFsLXNjYW4taW1hZ2Uud2VicCIsImlhdCI6MTc0MjI3NTk3MCwiZXhwIjoxODk5OTU1OTcwfQ.Aq6IDsEzTRwyQsHQpxul4T1v1mEsbZW5UyoO3xct-os',
  },
  {
    name: 'Spinal Cord',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-spinal-cord-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4tc3BpbmFsLWNvcmQtaW1hZ2Uud2VicCIsImlhdCI6MTczOTk2NjYwMywiZXhwIjoxODk3NjQ2NjAzfQ.XBpMK6R775u9TJHkNGhDe_iGb3W7SK9NiSTq7_8h32Y',
  },
  {
    name: 'Bone',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-leg-bone-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4tbGVnLWJvbmUtaW1hZ2Uud2VicCIsImlhdCI6MTczOTk2NjM5NCwiZXhwIjoxODk3NjQ2Mzk0fQ.7ZnDWjUNPe-OLQeM-CCV3tmxbZTZEe9RMeDSar72h00',
  },
  {
    name: 'Small Intestine',
    image: 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/organs-images/human-small-intestine-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL29yZ2Fucy1pbWFnZXMvaHVtYW4tc21hbGwtaW50ZXN0aW5lLWltYWdlLndlYnAiLCJpYXQiOjE3Mzk5NjY1NDQsImV4cCI6MTg5NzY0NjU0NH0.bokOVqCfdG_v84b7Gk30F0GaJr00W-7U3gNhuiiZYN0',
  },
];

const OrganTests = () => {
  return (
    <motion.section
      className="py-16 bg-[#e4deea]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-3xl md:text-4xl font-bold text-blue-900">Get to the right tests by </span>
          <span className="text-3xl md:text-4xl font-bold text-red-500">Organs</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {organs.map((organ, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#e3f3fb] transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 overflow-hidden">
                  <img
                    src={organ.image}
                    alt={organ.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 text-center">
                  {organ.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl font-medium px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
          >
            Comprehensive Scanning of All Human Organs with Precision and Care.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OrganTests;