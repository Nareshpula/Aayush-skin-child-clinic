import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaStar, FaRegStar } from "react-icons/fa";

const names = [
  "Arjun Kumar Reddy", "Hayagriv Shri Krishna", "Ravi Sharma", "Ayesha Khan", "Vikram Naidu",
  "Zara Sheikh", "Rajesh Verma", "Sana Ali", "Harish Gupta", "Nadia Hussain",
  "Manoj Nair", "Iqra Ahmed", "Deepak", "Hina Siddiqui", "Prakash",
  "Farhan Malik", "Narasimhulu", "Fathima Begum", "Gopal", "Meher Javed",
  "Ajay Naidu", "Safiya Noor", "Kiran", "Bilal Qureshi", "Suresh chimala",
  "Shabana Parveen", "Neeraj Yadav", "Rehana Sultana", "Ramesh Babu", "Fariha Khan",
  "Anirudh", "Lakshmi Narayana", "Venkatesh Prasad", "Divya", "Krishna Mohan",
  "Naresh Pula", "Chitra Reddy", "Raghavendra Rao", "Madhavi Pillai", "Girish Kumar",
  "Annapurna Devi", "Padma Priya", "Ganesh babu", "Shankar Rao", "Bhavani Shree",
  "Subbarao Vemula", "Jayalakshmi Menon", "Vishnu Vardhan", "Ravi Teja", "Uma Maheswari"
];

const scans = [
  "MRI Scan", "CT Scan", "X-Ray", "Ultrasound", "Blood Test", "ECG", "Kidney Scan",
  "Bone Density Test", "Mammography", "Liver Scan", "Spinal Cord Scan", "Lung Scan",
  "Thyroid Profile", "Brain MRI", "Chest X-Ray", "Abdominal CT Scan", "Spine MRI",
  "Heart Ultrasound", "Gallbladder Scan", "Pancreas Scan", "Pelvic Ultrasound", "Eye Scan"
];

const generateRandomDate = () => {
  const start = new Date(2024, 0, 1).getTime(); // Jan 2024
  const end = new Date(2025, 1, 28).getTime(); // Feb 2025
  const date = new Date(start + Math.random() * (end - start));
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const reviews = [
  "Exceptional service and professional care. Highly recommended!",
  "The staff was very courteous and the diagnostic process was smooth.",
  "Quick service and accurate reports. Would definitely return.",
  "Expert radiologist and excellent facilities with professional staff.",
  "Felt comfortable and well taken care of during my visit.",
  "Efficient service with timely report delivery.",
  "Highly skilled technicians and friendly reception.",
  "Clean environment and prompt service.",
  "Detailed explanation of the procedures helped me stay calm.",
  "They provided clear instructions and made the process stress-free.",
  "Wonderful experience with compassionate staff members.",
  "The MRI scan was conducted with utmost professionalism.",
  "Reports were delivered promptly and accurately.",
  "Appreciate the cleanliness and timely appointment handling.",
  "Top-notch service and advanced equipment usage."
];

const generateRandomRating = () => (Math.random() < 0.3 ? 4 : 5); // 30% 4-star, 70% 5-star

const generateReviews = () => {
  return names.map((name) => ({
    name,
    scan: scans[Math.floor(Math.random() * scans.length)],
    date: generateRandomDate(),
    review: reviews[Math.floor(Math.random() * reviews.length)],
    rating: generateRandomRating(),
  }));
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 text-yellow-500">
    {[...Array(5)].map((_, i) => (i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />))}
  </div>
);

const GoogleReviews = () => {
  const [reviewsData, setReviewsData] = useState<Array<{
    name: string;
    scan: string;
    date: string;
    review: string;
    rating: number;
  }>>([]);
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    setReviewsData(generateReviews());
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % Math.ceil(names.length / 3));
    }, 10000); // Every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const reviewSets = Array.from(
    { length: Math.ceil(reviewsData.length / 3) },
    (_, i) => reviewsData.slice(i * 3, i * 3 + 3)
  );

  return (
    <section className="py-24 relative overflow-hidden bg-[#f0fcec]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-[0.05]"
        style={{
          backgroundImage: 'url("https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Google-review-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0dvb2dsZS1yZXZpZXctaW1hZ2Uud2VicCIsImlhdCI6MTc0MDIzNDUyMCwiZXhwIjoxODk3OTE0NTIwfQ.zlK4_YmWm-qQ7IqNfkufYOyi7eQLwWXVF7Cczf004rg")'
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-white/20 via-[#f0fcec]/40 to-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="text-center mb-12">
          <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          >
            What Our Patients Say
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from our valued patients who have experienced our quality diagnostic services
          </p>
        </div>
      </div>

      <div className="relative flex justify-center items-center h-[280px] overflow-hidden">
        <AnimatePresence mode="wait">
          {reviewSets[currentSet]?.map((review, index) => (
            <motion.div
              key={`${review.name}-${index}`}
              className="absolute w-[320px] mx-3 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-md p-5 bg-white/70 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              initial={{ x: "100%", scale: 0.8, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              exit={{ x: "-100%", scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{
                left: `${index * 340}px`,
                transform: `translateX(calc(50% - ${(340 * 3) / 2}px + ${index * 340}px))`
              }}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <FcGoogle className="w-10 h-10" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-base">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date} | {review.scan}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-gray-700 italic leading-relaxed text-sm line-clamp-3">"{review.review}"</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center">
        <motion.button 
          className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          View All Patient Stories
        </motion.button>
      </div>
    </section>
  );
};

export default GoogleReviews;