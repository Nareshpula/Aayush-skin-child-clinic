import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

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
    // Clear messages when user starts typing again
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    emailjs.send(
      "service_lf5iahp",
      "template_qsqmb1l",
      {
        to_name: "Jyothi Diagnostics",
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
        // Keep success message visible for 5 seconds
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
    <section className="w-full py-16 px-6 md:px-20 bg-[#f9fbff] relative overflow-hidden rounded-2xl shadow-2xl">
      {/* Decorative background elements */}
      
      <motion.div 
        id="contact-form"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-gray-800 text-center"
      >
        <motion.h2 
          className="text-4xl font-extrabold mb-5 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch with Us
        </motion.h2>
        <motion.p 
          className="text-lg mb-10 text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Appointments, queries, or feedback – we're here to help with all your diagnostic needs.
        </motion.p>
        <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.input
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your Name" 
                required 
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1c1c2b] focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-300" 
                disabled={isSubmitting}
              />
              <motion.input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Your Email" 
                type="email" 
                required 
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9fbff] focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-300" 
                disabled={isSubmitting}
              />
              <motion.input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Your Phone Number" 
                required 
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9fbff] focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all duration-300" 
                disabled={isSubmitting}
              />
              <motion.textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Your Message" 
                rows={4} 
                required 
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9fbff] focus:border-transparent outline-none resize-none text-gray-900 placeholder-gray-500 transition-all duration-300" 
                disabled={isSubmitting}
              ></motion.textarea>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#1c1c2b] to-[#38384f] text-white hover:from-[#f9fbff] hover:to-[#2b2b3d] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>
              {success && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-green-600 font-semibold mt-2 p-3 bg-green-50 rounded-lg shadow-sm"
                >
                  ✅ Message sent successfully! We'll get back to you soon.
                </motion.p>
              )}
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-red-500 font-semibold mt-2 p-3 bg-red-50 rounded-lg shadow-sm"
                >
                  ❌ {error}
                </motion.p>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}