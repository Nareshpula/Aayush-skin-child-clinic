import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PigmentationArticle = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-24">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blogs
        </motion.button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 relative overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Pigmentation-Issues-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvUGlnbWVudGF0aW9uLUlzc3Vlcy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjY4NzMsImV4cCI6MTkwMDk0Njg3M30.p7JUH-IXI6kdk95wqXuWsGeUT9PEqA2A3rzVU1Al9wY"
              alt="Skin pigmentation treatment"
              className="w-full h-[400px] object-cover transform-gpu will-change-transform backface-hidden image-rendering-crisp"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
                perspective: '1000px',
                WebkitFontSmoothing: 'subpixel-antialiased'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-[#8a4895] mb-4">
            Understanding Uneven Skin Tone and Pigmentation Issues
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>February 10, 2024</span>
            <span className="mx-2">•</span>
            <span>By Dr. Himabindu Sridhar</span>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-black mb-6 leading-relaxed">
            Having clear, radiant skin is a common beauty goal, but many people struggle with uneven skin tone 
            and pigmentation issues. These conditions can affect both men and women, making the skin appear 
            patchy, dull, or darker in certain areas. While uneven skin tone is often harmless, it can impact 
            confidence and self-esteem.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Causes Uneven Skin Tone and Pigmentation?</h2>
          <p className="text-black mb-6">
            Uneven skin tone and pigmentation issues occur when melanin, the pigment responsible for skin color, 
            is produced irregularly. Several factors contribute to this condition:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Sun Exposure</h3>
              <p className="text-gray-700">
                One of the primary reasons for uneven skin tone is excessive exposure to the sun. UV rays trigger 
                melanin production as a defense mechanism, leading to sunspots, freckles, and darker patches over time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Hyperpigmentation</h3>
              <p className="text-gray-700">
                Hyperpigmentation occurs when certain areas of the skin produce excess melanin, resulting in dark 
                spots or patches. It can be triggered by:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Post-inflammatory hyperpigmentation (PIH): Dark marks left behind after acne or injuries</li>
                <li>Melasma: Brown patches often seen during pregnancy</li>
                <li>Age spots: Dark spots from aging and sun exposure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Hormonal Imbalances</h3>
              <p className="text-gray-700">
                Hormonal changes, particularly during pregnancy, menopause, or due to conditions like PCOS, can 
                cause pigmentation disorders such as melasma. Birth control pills and hormonal medications can 
                also contribute to skin discoloration.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mt-8 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">How to Improve Uneven Skin Tone?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Use Sunscreen Daily: Choose a broad-spectrum SPF 30+ sunscreen
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Follow a Gentle Skincare Routine: Use mild cleansers and hydrating products
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Exfoliate Wisely: Gentle exfoliation helps remove dead skin cells
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Stay Hydrated: Maintain good water intake and healthy diet
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Final Thoughts</h2>
          <p className="text-black mb-6">
            Uneven skin tone and pigmentation issues can be frustrating, but with the right care, they can be 
            managed effectively. Identifying the root cause and making necessary lifestyle and skincare adjustments 
            can significantly improve skin texture and brightness. If pigmentation problems persist, consulting a 
            dermatologist for personalized treatment can be the best approach.
          </p>

          {/* Doctor Details */}
          <div className="flex items-start space-x-4 mt-12">
            <img            
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmF"
              alt="Dr. Himabindu Sridhar" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Dr. Himabindu Sridhar</h3>
              <p className="text-gray-600">Consultant Dermatologist, Cosmetologist, Laser & Hair Transplant Surgeon</p>
              <p className="text-gray-600">Aayush Child & Skin Hospital</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-12"></div>

          {/* Related Blogs Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#8a4895] mb-8">Related Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Causes of Acne Scars on the Face in Women and Men",
                  date: "February 20",
                  category: "Skin Care",
                  image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Acne-Scars-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQWNuZS1TY2Fycy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjU1NjAsImV4cCI6MTkwMDk0NTU2MH0.2qCJzxJIKWpvDx9dX_IIweiSyFtzqX9lsaMnDEFItE0",
                  link: "/blog/causes-of-acne-scars"
                },
                {
                  title: "Latest Advances in Anti-Aging Treatments",
                  date: "January 15",
                  category: "Skin Care",
                  image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=1000&auto=format&fit=crop"
                }
              ].map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => post.link && navigate(post.link)}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform-gpu will-change-transform backface-hidden image-rendering-crisp transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        transform: 'translateZ(0)',
                        perspective: '1000px',
                        WebkitFontSmoothing: 'subpixel-antialiased'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <span className="text-sm text-[#8a4895]">{post.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default PigmentationArticle;