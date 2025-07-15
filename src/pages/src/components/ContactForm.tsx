import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init("ENmFvfByf_iHbB7Ko");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    emailjs.send(
      "service_qfvy7h9",
      "template_hb630kp",
      {
        to_name: "Aayush Child & Skin Hospital-Madanapalle",
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
      "ENmFvfByf_iHbB7Ko"
    )
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err) => {
        console.error("Email Error:", err);
        setError("Failed to send the message. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact-form" className="w-full py-12 md:py-16 px-4 md:px-20 bg-gradient-to-br from-[#f8f9ff] via-[#f0f4ff] to-[#f5f0ff] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff]/50 via-transparent to-[#f5f0ff]/50 pointer-events-none" />
      
      {/* Animated Illustration */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 bottom-0 w-[600px] h-full hidden lg:block pointer-events-none"
      >
        <div className="relative w-full h-full flex items-center">
          <img
            src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Enquiry-image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRW5xdWlyeS1pbWFnZS5zdmciLCJpYXQiOjE3NDMyNzE4MzQsImV4cCI6MTkwMDk1MTgzNH0.BLwyWfjifLrq2S_A081xHulZOJkZanc6f7xS1sP0JBo"
            alt="Customer Support"
            className="w-full h-auto max-h-[80%] object-contain transform scale-110"
            width="600"
            height="400"
            loading="lazy"
            style={{
              filter: 'contrast(1.05) brightness(1.02)',
              imageRendering: '-webkit-optimize-contrast'
            }}
          />
        </div>
      </motion.div>
      
      {/* Content Container */}
      <div className="container mx-auto relative">
        <div className="lg:w-1/2 lg:ml-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h2 
              className="text-4xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-[#7a3a95] to-[#3a4595]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Get in Touch with Us
            </motion.h2>
            <motion.p 
              className="text-lg mb-10 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Appointments, queries, or feedback – we're here to help with all your diagnostic needs.
            </motion.p>

            <Card className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
              <CardContent className="p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.input
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Your Name" 
                    required
                    aria-required="true"
                    className="w-full p-3 md:p-4 rounded-xl bg-white/80 border-2 border-gray-100 focus:border-[#7a3a95] focus:ring-2 focus:ring-[#7a3a95]/20 outline-none text-gray-800 placeholder-gray-400 transition-all duration-300" 
                    disabled={isSubmitting}
                  />
                  <motion.input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Your Email" 
                    type="email"
                    required
                    aria-required="true"
                    className="w-full p-3 md:p-4 rounded-xl bg-white/80 border-2 border-gray-100 focus:border-[#7a3a95] focus:ring-2 focus:ring-[#7a3a95]/20 outline-none text-gray-800 placeholder-gray-400 transition-all duration-300" 
                    disabled={isSubmitting}
                  />
                  <motion.input 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Your Phone Number" 
                    required
                    aria-required="true"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    className="w-full p-3 md:p-4 rounded-xl bg-white/80 border-2 border-gray-100 focus:border-[#7a3a95] focus:ring-2 focus:ring-[#7a3a95]/20 outline-none text-gray-800 placeholder-gray-400 transition-all duration-300" 
                    disabled={isSubmitting}
                  />
                  <motion.textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Your Message" 
                    rows={4}
                    required
                    aria-required="true"
                    className="w-full p-3 md:p-4 rounded-xl bg-white/80 border-2 border-gray-100 focus:border-[#7a3a95] focus:ring-2 focus:ring-[#7a3a95]/20 outline-none resize-none text-gray-800 placeholder-gray-400 transition-all duration-300" 
                    disabled={isSubmitting}
                  ></motion.textarea>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#7a3a95] to-[#3a4595] text-white text-lg font-semibold py-4 rounded-xl hover:from-[#6a2a85] hover:to-[#2a3585] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.message}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </motion.div>
                  {success && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-green-600 font-semibold mt-2 p-4 bg-green-50/80 backdrop-blur-sm rounded-xl shadow-sm"
                    >
                      ✅ Message sent successfully! We'll get back to you soon.
                    </motion.p>
                  )}
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-red-500 font-semibold mt-2 p-4 bg-red-50/80 backdrop-blur-sm rounded-xl shadow-sm"
                    >
                      ❌ {error}
                    </motion.p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}