import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NutritionArticle = () => {
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
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Fruits-eating-child.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRnJ1aXRzLWVhdGluZy1jaGlsZC5qcGciLCJpYXQiOjE3NDMyNjQ3ODYsImV4cCI6MTkwMDk0NDc4Nn0.GSi7BQCZ-QigZoMQucCeuwe8jFx9Ej6tp9vSwMnhqeg"
              alt="Child nutrition and growth"
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
            The Hidden Impact of Nutritional Deficiencies on Children's Growth and Development
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>February 25, 2024</span>
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
            Proper nutrition is the foundation of a child's health, growth, and development. However, nutritional deficiencies often go unnoticed until they start affecting a child's physical and cognitive well-being. These deficiencies can lead to weakened immunity, slow growth, and developmental delays, making it crucial for parents to recognize and address them early.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Are Nutritional Deficiencies?</h2>
          <p className="text-black mb-6">
            Nutritional deficiencies occur when a child's diet lacks essential vitamins, minerals, or other nutrients necessary for proper growth and body functions. Common deficiencies include a lack of iron, vitamin D, protein, and zinc, each affecting different aspects of a child's health.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Signs and Symptoms of Nutritional Deficiencies</h2>
          <p className="text-black mb-4">Depending on the missing nutrient, children may exhibit different symptoms:</p>
          <ul className="list-disc pl-6 mb-6 text-black">
            <li className="mb-2"><strong>Iron Deficiency (Anemia):</strong> Fatigue, pale skin, dizziness, and difficulty concentrating.</li>
            <li className="mb-2"><strong>Vitamin D Deficiency:</strong> Weak bones, delayed growth, and a higher risk of fractures.</li>
            <li className="mb-2"><strong>Protein Deficiency:</strong> Muscle weakness, slow healing, and increased infections.</li>
            <li className="mb-2"><strong>Zinc Deficiency:</strong> Stunted growth, poor appetite, and frequent colds.</li>
            <li className="mb-2"><strong>Vitamin A Deficiency:</strong> Night blindness, dry skin, and weakened immunity.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When Should Parents Be Concerned?</h2>
          <p className="text-black mb-4">Parents should consult a doctor if they notice:</p>
          <ul className="list-disc pl-6 mb-6 text-black">
            <li className="mb-2">Persistent tiredness, irritability, or difficulty focusing in school.</li>
            <li className="mb-2">Frequent illnesses or slow recovery from infections.</li>
            <li className="mb-2">Unexplained weight loss or stunted growth compared to peers.</li>
            <li className="mb-2">Skin problems, hair thinning, or brittle nails.</li>
          </ul>

          <div className="bg-blue-50 p-6 rounded-xl mt-8 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">How to Prevent Nutritional Deficiencies?</h2>
            <p className="text-black mb-4">To ensure optimal growth and development:</p>
            <ul className="list-disc pl-6 text-black">
              <li className="mb-2"><strong>Provide a Balanced Diet:</strong> Include a variety of vegetables, fruits, whole grains, lean proteins, and dairy.</li>
              <li className="mb-2"><strong>Encourage Outdoor Activities:</strong> Sun exposure helps maintain healthy vitamin D levels.</li>
              <li className="mb-2"><strong>Regular Health Checkups:</strong> Early detection can prevent long-term health issues.</li>
              <li className="mb-2"><strong>Consider Supplements if Needed:</strong> Consult a doctor before giving vitamin or mineral supplements.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Final Thoughts</h2>
          <p className="text-black mb-6">
            Nutritional deficiencies can silently impact a child's health and future. By ensuring a nutrient-rich diet and staying alert to signs of deficiencies, parents can support their child's overall well-being and development. Early intervention can make a significant difference in a child's lifelong health and success.
          </p>

          {/* Doctor Details */}
          <div className="flex items-start space-x-4 mt-12">
            <img
              
src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Doctor-Sridhar.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eb2N0b3ItU3JpZGhhci5qcGciLCJpYXQiOjE3NDk4OTAzOTAsImV4cCI6MTkwNzU3MDM5MH0.FiLmzuS7X5SKlABFCgahdXlg7wf4XA71wSNlXAwta2A"
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
                  category: "Child Care",
                  image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Ear-Infection-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRWFyLUluZmVjdGlvbi1pbWFnZS5qcGciLCJpYXQiOjE3NDMxNjE0NzksImV4cCI6MTkwMDg0MTQ3OX0.qJXJL7_Bp4AKJni2wyNLQNmHKTkgyr27tC-mj1tspJk",
                  link: "/blog/understanding-ear-infections"
                },
                {
                  title: "When is Fever a cause for concern in Children?",
                  date: "January 22",
                  category: "Child Care",
                  image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Fever-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRmV2ZXItaW1hZ2UuanBnIiwiaWF0IjoxNzQzMTYwODg0LCJleHAiOjE5MDA4NDA4ODR9.UiazaoUO3JxSVafETruxSulo64X20Mevx7MGn9JM5E4",
                  link: "/blog/when-is-fever-a-concern"
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

export default NutritionArticle;