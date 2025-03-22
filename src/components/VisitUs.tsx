import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const VisitUs = () => {
  return (
    <motion.section
      id="visit-us"
      className="py-16 bg-[#f1edfd] text-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Visit Us
          </motion.h2>
          <motion.p
            className="text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Located in the heart of Madanapalle, our diagnostic center is easily accessible and equipped with modern facilities
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:col-span-1"
        >
          <div className="space-y-4">
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-colors duration-300"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
                transformStyle: "preserve-3d"
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <MapPin className="w-6 h-6 text-gray-800" />
                </motion.div>
                <div className="transform-gpu">
                  <h3 className="font-bold text-base text-gray-900">Our Address</h3>
                  <p className="text-sm text-gray-700">
                    Jyothi Diagnostic Center,<br />
                    Balaji Commercial Complex,<br />
                    Opp. RTC Bus Stand, Near Desai Hospital,<br />
                    Madanapalle - 517325
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-colors duration-300"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
                transformStyle: "preserve-3d"
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Phone className="w-6 h-6 text-gray-800" />
                </motion.div>
                <div className="transform-gpu">
                  <h3 className="font-bold text-base text-gray-900">Contact Us</h3>
                  <p className="text-sm text-gray-700">
                    Reception: 08571-224789<br />
                    Mobile: 9100752753<br />
                    Email: jyothidiagnosticsmpl@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-colors duration-300"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
                transformStyle: "preserve-3d"
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Clock className="w-6 h-6 text-gray-800" />
                </motion.div>
                <div className="transform-gpu">
                  <h3 className="font-bold text-base text-gray-900">Working Hours</h3>
                  <p className="text-sm text-gray-700">
                    CT & MRI Scans Emergency: 24/7 Hours<br />
                    OPD Mon-Sat: 09:00 AM IST – 09:00 PM IST<br />
                    Sun: 10:30 AM IST – 01:00 PM IST
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.button 
              className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 mx-auto md:mx-0"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=13.558638427265453,78.50818108762539', '_blank')}
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-8 md:mt-0 md:col-span-2"
        >
          <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-white p-2 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.8876058917387!2d78.50818108762539!3d13.558638427265453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2b6df3e1ce8b1%3A0x9f1b1f9e6b44f8b2!2sJyothi%20Diagnostic%20Center!5e0!3m2!1sen!2sin!4v1709669547736!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full rounded-xl"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VisitUs;