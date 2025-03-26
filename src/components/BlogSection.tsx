import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "The Hidden Impact of Nutritional Deficiencies on Children's Growth and Development",
    date: "February 25",
    category: "Child Care",
    image: "https://images.unsplash.com/photo-1623107274042-16962aa28ea8?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Recognizing and addressing postpartum depression for better maternal mental health."
  },
  {
    id: 2,
    title: "Understanding Ear Infections in Children",
    date: "February 13",
    link: "/blog/understanding-ear-infections",
    category: "Child Care",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Understanding Ear Infections and addressing common concerns."
  },
  {
    id: 3,
    title: "When is Fever a cause for concern in Children?",
    date: "January 22",
    category: "Child Care",
    image: "https://images.unsplash.com/photo-1612531385446-88ce2ef29731?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Guidelines for parents to monitor and respond to childhood fevers."
  },
  {
    id: 4,
    title: "Advanced Treatments for Acne Scars",
    date: "February 20",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Modern solutions for treating and minimizing acne scarring."
  },
  {
    id: 5,
    title: "Say goodbye to uneven skin tone with effective pigmentation care",
    date: "February 10",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1632053002434-b574c79f5d89?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Discover advanced treatments to restore your skin's natural glow."
  },
  {
    id: 6,
    title: "Latest Advances in Anti-Aging Treatments",
    date: "January 15",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Exploring modern approaches to maintaining youthful skin."
  }
];

const BlogSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="py-20 bg-[#ffffff]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0000] mb-4">
            Blogs
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest health articles, crafted by our trusted medical experts
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 space-x-8">
          {['All', 'Child Care', 'Skin Care'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category.toLowerCase())}
              className={`relative px-4 py-2 text-lg transition-colors duration-300 ${
                activeCategory === category.toLowerCase()
                  ? 'text-[#7a3a95] font-bold'
                  : 'text-gray-600 hover:text-[#7a3a95]'
              }`}
            >
              {category}
              {activeCategory === category.toLowerCase() && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7a3a95]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="w-[380px] h-[400px] bg-white rounded-[14px] overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => post.link && navigate(post.link)}
            >
              <div className="h-[200px] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[14px] text-[#a0a0a0]">{post.date}</span>
                  <button 
                    className="p-2"
                    aria-label="Share article"
                  >
                    <Share2 className="w-4 h-4 text-[#a0a0a0]" />
                  </button>
                </div>
                <span className="inline-block text-[14px] text-[#7a3a95] mb-2">
                  {post.category}
                </span>
                <h3 className="text-[18px] font-bold text-[#000000] mb-2 line-clamp-2 group relative">
                  <span className="bg-gradient-to-r from-[#000000] to-[#000000] bg-[length:0%_2px] bg-no-repeat bg-left-bottom hover:bg-[length:100%_2px] transition-all duration-500">
                  {post.title}
                  </span>
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;