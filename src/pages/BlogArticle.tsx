import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const BlogArticle = () => {
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
            src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/children-ear-problem-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvY2hpbGRyZW4tZWFyLXByb2JsZW0taW1hZ2UuanBnIiwiaWF0IjoxNzQzMTY0NjI2LCJleHAiOjE5MDA4NDQ2MjZ9.JhCxis3thlksnX9HDvOJp4diL9u2_ZPVS23QVTwbvHI"
            alt="Child with ear infection"
            className="w-full h-[400px] object-cover rounded-2xl image-rendering-crisp transform-gpu will-change-transform"
            loading="eager"
            decoding="async"
          />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-[#8a4895] mb-4">
            Understanding Ear Infections in Children
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>February 13, 2024</span>
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
            Acute Otitis Media (AOM) may sound complex, but it simply refers to a middle ear infection—a common condition among children. The human ear comprises three main sections: the external ear, the middle ear, and the inner ear. The middle ear, a small enclosed space, is susceptible to infections when bacteria from the throat travel through the Eustachian tube, which connects the throat to the middle ear. This tube plays a vital role in equalizing ear pressure, especially during air travel or altitude changes. However, during viral infections, its function may be compromised, making children particularly vulnerable to ear infections.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Recognizing Symptoms</h2>
          <p className="text-black mb-4">
            Children suffering from an ear infection often exhibit distressing symptoms, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-black">
            <li className="mb-2">
              <strong>High-Grade Fever:</strong> Body temperature may rise above 102°F.
            </li>
            <li className="mb-2">
              <strong>Ear Pain:</strong> Young children, especially those under two years old, may cry inconsolably due to discomfort. A common sign is tugging or pulling at their ears.
            </li>
          </ul>
          <p className="text-black mb-6">
            If these symptoms are observed, it is essential to consult a pediatrician promptly. A thorough examination of the ear will help confirm the diagnosis, and if necessary, antibiotics may be prescribed to treat the infection effectively.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Potential Complications</h2>
          <p className="text-black mb-6">
            Repeated episodes of acute otitis media can lead to severe complications, including potential hearing loss. Timely intervention and preventive measures play a crucial role in minimizing risks and ensuring overall ear health.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Preventive Measures</h2>
          <p className="text-black mb-4">
            To reduce the likelihood of ear infections in children, consider the following preventive strategies:
          </p>
          <ul className="list-disc pl-6 mb-6 text-black">
            <li className="mb-2">
              <strong>Breastfeeding:</strong> Exclusive breastfeeding for at least six months has been shown to significantly lower the risk of ear infections.
            </li>
            <li className="mb-2">
              <strong>Proper Feeding Position:</strong> Always feed infants in an upright position to prevent milk from entering the Eustachian tube. Avoid feeding them while lying down. Even with formula feeding, it is advisable to hold the baby at a 45–60° angle.
            </li>
            <li className="mb-2">
              <strong>Vaccinations:</strong> Ensuring that children receive vaccinations such as Haemophilus influenzae type B (Hib), pneumococcal vaccines, and flu shots can help strengthen their immune system against infections.
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
                  title: "The Hidden Impact of Nutritional Deficiencies on Children's Growth",
                  date: "February 25",
                  category: "Child Care",
                  image: "https://images.unsplash.com/photo-1623107274042-16962aa28ea8?q=80&w=1000&auto=format&fit=crop"
                },
                {
                  title: "When is Fever a cause for concern in Children?",
                  date: "January 22",
                  category: "Child Care",
                  image: "https://images.unsplash.com/photo-1612531385446-88ce2ef29731?q=80&w=1000&auto=format&fit=crop"
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
                      className="w-full h-full object-cover image-rendering-crisp transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
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

export default BlogArticle;