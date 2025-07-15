import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AgingArticle = () => {
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
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-6 relative overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/women-anti-ageing-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvd29tZW4tYW50aS1hZ2VpbmctaW1hZ2UuanBnIiwiaWF0IjoxNzQzMjY3NTA5LCJleHAiOjE5MDA5NDc1MDl9.rnd6d9uPQQr722F6PcYZR1SSXOP7SFKc3xQgPRjBE-g"
              alt="Anti-aging skincare"
              className="w-full h-[400px] object-cover transform-gpu will-change-transform backface-hidden image-rendering-crisp transition-all duration-300"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
                perspective: '1000px',
                WebkitFontSmoothing: 'subpixel-antialiased',
                filter: 'contrast(1.05) brightness(1.02)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none backdrop-filter backdrop-brightness-105" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-[#8a4895] mb-4">
            Understanding Aging Face: Causes and Ways to Maintain Youthful Skin
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>January 15, 2024</span>
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
            Aging is a natural process that everyone experiences, but its effects on the face can vary from person 
            to person. Over time, the skin loses its elasticity, fine lines appear, and the youthful glow starts 
            to fade. While aging is inevitable, understanding the factors that contribute to facial aging can help 
            in taking proactive steps to maintain healthy and youthful skin.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Causes Facial Aging?</h2>
          <p className="text-black mb-6">
            Facial aging occurs due to a combination of internal and external factors that affect skin structure, 
            elasticity, and hydration. Some of the major contributors include:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Natural Aging Process</h3>
              <p className="text-gray-700">
                As we age, collagen and elastin production slows down, leading to sagging skin, fine lines, and 
                wrinkles. Additionally, cell regeneration decreases, making the skin appear thinner and less firm.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Sun Exposure (Photoaging)</h3>
              <p className="text-gray-700">
                Excessive sun exposure is one of the leading causes of premature aging. UV rays break down collagen, 
                cause pigmentation, and lead to the formation of wrinkles and sunspots.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Loss of Moisture and Hydration</h3>
              <p className="text-gray-700">
                With age, the skin's ability to retain moisture decreases, leading to dryness, flakiness, and a 
                rough texture. Dehydrated skin appears dull and enhances the appearance of wrinkles.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">4. Lifestyle Factors</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Smoking: Reduces blood circulation to the skin, causing it to look dull and wrinkled</li>
                <li>Alcohol consumption: Dehydrates the skin, making fine lines more visible</li>
                <li>Poor diet: Lack of essential nutrients accelerates aging</li>
                <li>Lack of sleep: Leads to puffy eyes and dark circles</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mt-8 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">How to Maintain a Youthful Face?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Use Sunscreen Daily: Apply SPF 30+ sunscreen every day
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Follow a Skincare Routine: Use anti-aging ingredients like Retinol and Vitamin C
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Stay Hydrated: Drink plenty of water and use moisturizers
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Eat a Balanced Diet: Include antioxidant-rich foods
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Exercise Regularly: Improve blood circulation for glowing skin
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Final Thoughts</h2>
          <p className="text-black mb-6">
            Aging is a beautiful journey, but taking care of your skin can help you maintain a youthful and radiant 
            face for years to come. By making simple lifestyle changes and following a dedicated skincare routine, 
            you can age gracefully and confidently. If you're concerned about premature aging, consulting a 
            dermatologist can help you find personalized solutions to keep your skin looking its best.
          </p>

          {/* Doctor Details */}
          <div className="flex items-start space-x-4 mt-12">
            <img            
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g"
              alt="Dr. Himabindu Sridhar" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Dr. Himabindu Sridhar</h3>
              <p className="text-gray-600">Senior Consultant Dermatologist</p>
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
                  title: "Understanding Uneven Skin Tone and Pigmentation Issues",
                  date: "February 10",
                  category: "Skin Care",
                  image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Pigmentation-Issues-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvUGlnbWVudGF0aW9uLUlzc3Vlcy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjY4NzMsImV4cCI6MTkwMDk0Njg3M30.p7JUH-IXI6kdk95wqXuWsGeUT9PEqA2A3rzVU1Al9wY",
                  link: "/blog/understanding-pigmentation"
                },
                {
                  title: "Causes of Acne Scars on the Face in Women and Men",
                  date: "February 20",
                  category: "Skin Care",
                  image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Acne-Scars-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQWNuZS1TY2Fycy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjU1NjAsImV4cCI6MTkwMDk0NTU2MH0.2qCJzxJIKWpvDx9dX_IIweiSyFtzqX9lsaMnDEFItE0",
                  link: "/blog/causes-of-acne-scars"
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

export default AgingArticle;