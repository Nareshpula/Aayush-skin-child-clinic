import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-4xl font-bold text-[#0a0000]">
    {children}
  </h2>
);

const blogPosts = [
  {
    id: 1,
    title: "The Hidden Impact of Nutritional Deficiencies on Children's Growth and Development",
    date: "February 25",
    link: "/blog/nutritional-deficiencies-impact",
    category: "Child Care",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Eating-Fruits-children.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRWF0aW5nLUZydWl0cy1jaGlsZHJlbi5qcGciLCJpYXQiOjE3NDMyNjQxMDgsImV4cCI6MTkwMDk0NDEwOH0.LkNVOGckF9f_kf153vkY3rMtPF0vwK-UOm1ztfyxLEs",
    excerpt: "Recognizing and addressing postpartum depression for better maternal mental health."
  },
  {
    id: 2,
    title: "Understanding Ear Infections in Children",
    date: "February 13",
    link: "/blog/understanding-ear-infections",
    category: "Child Care",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Ear-Infection-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRWFyLUluZmVjdGlvbi1pbWFnZS5qcGciLCJpYXQiOjE3NDMxNjE0NzksImV4cCI6MTkwMDg0MTQ3OX0.qJXJL7_Bp4AKJni2wyNLQNmHKTkgyr27tC-mj1tspJk",
    excerpt: "Understanding Ear Infections and addressing common concerns."
  },
  {
    id: 3,
    title: "When is Fever a cause for concern in Children?",
    link: "/blog/when-is-fever-a-concern",
    date: "January 22",
    category: "Child Care",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Fever-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRmV2ZXItaW1hZ2UuanBnIiwiaWF0IjoxNzQzMTYwODg0LCJleHAiOjE5MDA4NDA4ODR9.UiazaoUO3JxSVafETruxSulo64X20Mevx7MGn9JM5E4",
    excerpt: "Guidelines for parents to monitor and respond to childhood fevers."
  },
  {
    id: 4,
    title: "Causes of Acne Scars on the Face in Women and Men",
    date: "February 20",
    link: "/blog/causes-of-acne-scars",
    category: "Skin Care",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Acne-Scars-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvQWNuZS1TY2Fycy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjU1NjAsImV4cCI6MTkwMDk0NTU2MH0.2qCJzxJIKWpvDx9dX_IIweiSyFtzqX9lsaMnDEFItE0",
    excerpt: "Modern solutions for treating and minimizing acne scarring."
  },
  {
    id: 5,
    title: "Understanding Uneven Skin Tone and Pigmentation Issues",
    date: "February 10",
    category: "Skin Care",
    link: "/blog/understanding-pigmentation",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Pigmentation-Issues-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvUGlnbWVudGF0aW9uLUlzc3Vlcy1pbWFnZS5qcGciLCJpYXQiOjE3NDMyNjY4NzMsImV4cCI6MTkwMDk0Njg3M30.p7JUH-IXI6kdk95wqXuWsGeUT9PEqA2A3rzVU1Al9wY",
    excerpt: "Discover advanced treatments to restore your skin's natural glow."
  },
  {
    id: 6,
    title: "Understanding Aging Face: Causes and Ways to Maintain Youthful Skin",
    date: "January 15",
    category: "Skin Care",
    link: "/blog/understanding-aging-face",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/women-anti-ageing-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvd29tZW4tYW50aS1hZ2VpbmctaW1hZ2UuanBnIiwiaWF0IjoxNzQzMjY3NTA5LCJleHAiOjE5MDA5NDc1MDl9.rnd6d9uPQQr722F6PcYZR1SSXOP7SFKc3xQgPRjBE-g",
    excerpt: "Exploring modern approaches to maintaining youthful skin."
  }
];

const BlogSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Preload blog images
  useEffect(() => {
    blogPosts.forEach(post => {
      if (post.image) {
        const img = new Image();
        img.src = post.image;
      }
    });
  }, []);

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-20 bg-[#ffffff]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <SectionTitle>Latest Blogs</SectionTitle>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-3 md:mt-4 mb-6 md:mb-8">
            Explore our latest health articles, crafted by our trusted medical experts
          </p>

          <div className="w-full max-w-6xl mx-auto relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8 md:mb-10 space-x-4 md:space-x-8 overflow-x-auto pb-2 -mx-4 px-4">
          {['All', 'Child Care', 'Skin Care'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category.toLowerCase())}
              className={`relative px-3 md:px-4 py-2 text-base md:text-lg transition-colors duration-300 whitespace-nowrap ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="w-full max-w-[380px] mx-auto h-[350px] sm:h-[380px] bg-white rounded-[14px] overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
              onClick={() => post.link && navigate(post.link)}
            >
              <div className="h-[180px] sm:h-[200px] overflow-hidden">
                <img
                  src={post.image}
                  alt={`${post.title} thumbnail`}
                  className="w-full h-full object-cover transform-gpu will-change-transform backface-hidden image-rendering-crisp transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                 width="380"
                 height="200"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    transform: 'translateZ(0)',
                    perspective: '1000px'
                  }}
                />
              </div>
              <div className="p-3 md:p-4">
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <span className="text-[12px] md:text-[14px] text-[#a0a0a0]">{post.date}</span>
                  <button 
                    className="p-1 md:p-2"
                    aria-label="Share article"
                  >
                    <Share2 className="w-3 h-3 md:w-4 md:h-4 text-[#a0a0a0]" />
                  </button>
                </div>
                <span className="inline-block text-[12px] md:text-[14px] text-[#7a3a95] mb-1 md:mb-2">
                  {post.category}
                </span>
                <h3 className="text-[16px] md:text-[18px] font-bold text-[#000000] mb-2 line-clamp-2 group relative">
                  <span className="bg-gradient-to-r from-[#000000] to-[#000000] bg-[length:0%_2px] bg-no-repeat bg-left-bottom hover:bg-[length:100%_2px] transition-all duration-500">
                  {post.title}
                  </span>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-[#7a3a95] text-sm font-medium mt-auto">
                  Read More <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;