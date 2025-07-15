import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AcneArticle = () => {
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
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Acne-Scars-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQWNuZS1TY2Fycy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjU1NjAsImV4cCI6MTkwMDk0NTU2MH0.2qCJzxJIKWpvDx9dX_IIweiSyFtzqX9lsaMnDEFItE0"
              alt="Acne scars treatment"
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
            Causes of Acne Scars on the Face in Women and Men
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>February 20, 2024</span>
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
            Acne is a common skin condition that affects millions of people worldwide. While breakouts can be temporary, 
            the scars they leave behind can be long-lasting and impact self-confidence. Both men and women experience 
            acne scars, but the causes and severity can vary due to factors such as skin type, hormones, and lifestyle.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Causes Acne Scars?</h2>
          <p className="text-black mb-6">
            Acne scars develop when inflamed pimples damage the skin's deeper layers. The body tries to heal itself 
            by producing collagen, but if too much or too little is produced, scars form. Several factors contribute 
            to this process:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Inflammatory Acne</h3>
              <p className="text-gray-700">
                Severe or deep acne, such as cysts and nodules, causes more skin damage and increases the risk of 
                scarring. The longer the inflammation lasts, the higher the chances of permanent marks.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Picking or Popping Pimples</h3>
              <p className="text-gray-700">
                One of the biggest culprits behind acne scars is squeezing or picking at pimples. This can push 
                bacteria deeper into the skin, causing infections and disrupting the healing process.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Genetics and Skin Type</h3>
              <p className="text-gray-700">
                Some people are genetically more prone to scarring. Additionally, darker skin tones may be more 
                susceptible to post-inflammatory hyperpigmentation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">4. Hormonal Changes</h3>
              <p className="text-gray-700">
                Fluctuations in hormones can lead to more severe acne and increase scarring chances. Men often 
                develop more severe acne due to higher testosterone levels.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mt-8 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">How to Prevent Acne Scars?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Early Acne Treatment: Seek professional advice before acne worsens
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Avoid Picking: Let acne heal naturally to minimize scarring
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Use Gentle Products: Choose non-comedogenic and hydrating products
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Apply Sunscreen: Protect skin from UV rays to prevent scar darkening
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Final Thoughts</h2>
          <p className="text-black mb-6">
            Acne scars can be frustrating, but understanding their causes helps prevent them. Whether due to 
            inflammation, genetics, or lifestyle habits, taking the right precautions can minimize scarring. 
            If scars persist, treatments like chemical peels, laser therapy, or microneedling may help restore 
            smoother skin.
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
                  title: "Say goodbye to uneven skin tone with effective pigmentation care",
                  date: "February 10",
                  category: "Skin Care",
                  image: "https://images.unsplash.com/photo-1632053002434-b574c79f5d89?q=80&w=1000&auto=format&fit=crop"
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

export default AcneArticle;