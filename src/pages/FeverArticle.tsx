import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const FeverArticle = () => {
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
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <img
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Children-Fever-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQ2hpbGRyZW4tRmV2ZXItaW1hZ2UuanBnIiwiaWF0IjoxNzQzMTUyMjUyLCJleHAiOjE5MDA4MzIyNTJ9.ZC5fVVkGs7yB9s9b9ZELjID71avwmKeAC2oBtaQ57Z8"
              alt="Child with fever"
              className="w-full h-[400px] object-cover rounded-2xl image-rendering-crisp transform-gpu will-change-transform"
              loading="eager"
              decoding="async"
            />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-[#8a4895] mb-4">
            When is Fever a Cause for Concern in Children?
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>January 22, 2024</span>
            <span className="mx-2">•</span>
            <span>By Dr.G Sridhar</span>
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
            Fever is one of the most common reasons parents seek medical attention for their children. It is the body's natural response to infections, helping fight viruses and bacteria. While most fevers are harmless and resolve on their own, some situations require medical attention. Understanding when a fever is a cause for concern can help parents take appropriate action to ensure their child's well-being.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Is Considered a Fever?</h2>
          <p className="text-black mb-6">
            A fever is typically defined as a body temperature of 100.4°F (38°C) or higher. It can occur due to infections, vaccinations, or even overheating. The severity of a fever depends on several factors, including the child's age, overall health, and accompanying symptoms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Causes of Fever in Children</h2>
          <p className="text-black mb-4">Fever can result from various conditions, including:</p>
          <ul className="list-disc pl-6 mb-6 text-black">
            <li className="mb-2">Viral infections (such as the flu, common cold, or COVID-19)</li>
            <li className="mb-2">Bacterial infections (such as strep throat, ear infections, or pneumonia)</li>
            <li className="mb-2">Teething (causing mild temperature increases in infants)</li>
            <li className="mb-2">Vaccinations (as a normal immune response)</li>
            <li className="mb-2">Heat-related illnesses (such as heat exhaustion)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When Should You Be Concerned?</h2>
          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">High Fever Based on Age</h3>
            <ul className="list-disc pl-6 text-black">
              <li className="mb-2">
                <strong>Infants under 3 months:</strong> A fever of 100.4°F (38°C) or higher requires immediate medical attention.
              </li>
              <li className="mb-2">
                <strong>Children between 3–6 months:</strong> A fever of 102°F (38.9°C) or higher should be evaluated by a doctor.
              </li>
              <li className="mb-2">
                <strong>Children over 6 months:</strong> A fever of 103°F (39.4°C) or higher may indicate a serious infection.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Manage Fever at Home</h2>
          <p className="text-black mb-4">
            For mild fevers without alarming symptoms, you can help your child feel better by:
          </p>
          <ul className="list-disc pl-6 mb-6 text-black">
            <li className="mb-2">
              <strong>Keeping Them Hydrated:</strong> Give plenty of fluids like water, soup, or electrolyte solutions.
            </li>
            <li className="mb-2">
              <strong>Dressing Lightly:</strong> Avoid heavy blankets and dress your child in light clothing.
            </li>
            <li className="mb-2">
              <strong>Using Fever-Reducing Medication:</strong> Follow proper dosage instructions based on age and weight.
            </li>
            <li className="mb-2">
              <strong>Giving Lukewarm Baths:</strong> Avoid cold baths that may cause shivering.
            </li>
          </ul>

          <div className="bg-blue-50 p-6 rounded-xl mt-8 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">Expert Pediatric Care at Your Service</h2>
            <p className="text-black">
              Our 24/7 Consultant-Led Advanced Pediatric Emergency Services are always prepared to provide immediate and specialized care for any health concerns your child may face.
            </p>
          </div>

          {/* Doctor Details */}
          <div className="flex items-start space-x-4 mt-12">
            <img
                          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Sridhar-Image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9TcmlkaGFyLUltYWdlLmpwZyIsImlhdCI6MTc0OTM0OTI2OCwiZXhwIjoxOTA3MDI5MjY4fQ.eJ32umItgxbVzIBqKE7q6aFiCXpbuYVxVG5ExE7neCk&width=200&quality=80"
              alt="Dr. G Sridhar" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Dr. G Sridhar</h3>
              <p className="text-gray-600">Senior Consultant Pediatrician</p>
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
                  title: "Understanding Ear Infections in Children",
                  date: "February 13",
                  image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
                  link: "/blog/understanding-ear-infections"
                },
                {
                  title: "The Hidden Impact of Nutritional Deficiencies on Children's Growth",
                  date: "February 25",
                  image: "https://images.unsplash.com/photo-1623107274042-16962aa28ea8?q=80&w=1000&auto=format&fit=crop"
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
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{post.date}</span>
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

export default FeverArticle;