import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Brain, Heart, Settings as Lungs, Activity, Shield, Microscope, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/CT-Scan-Machine-Image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0NULVNjYW4tTWFjaGluZS1JbWFnZS53ZWJwIiwiaWF0IjoxNzQwOTg4MDY1LCJleHAiOjE4OTg2NjgwNjV9.D8ka_ulAwlzUCsM_tV2wqX2QXwzhWKi47J_OEQjjezk"
          alt="CT Scan Machine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f2f1f1]/80 via-[#f2f1f1]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-end text-center px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced CT Scan Technology
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            State-of-the-art diagnostic imaging for precise medical insights
          </motion.p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8"
        >
          <ChevronDown className="w-8 h-8 text-gray-800" />
        </motion.div>
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Understanding CT Scan Technology
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Computed Tomography (CT) scanning combines advanced X-ray technology with sophisticated computers
            to create detailed cross-sectional images of your body. This non-invasive imaging technique
            provides exceptional detail of internal organs, bones, soft tissue, and blood vessels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">How CT Scan Works</h3>
            <p className="text-gray-600">
              During a CT scan, an X-ray beam rotates around your body while you lie still on a table
              that moves through the scanner. The computer processes the information to create
              cross-sectional images (slices) of your body, which can be studied from different angles.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ArrowRight className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                <span className="text-gray-600">Advanced 128-slice CT scanner for superior image quality</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                <span className="text-gray-600">Rapid scanning with minimal radiation exposure</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                <span className="text-gray-600">3D reconstruction capabilities for detailed visualization</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/mri-tesla-machine-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL21yaS10ZXNsYS1tYWNoaW5lLWltYWdlLmpwZyIsImlhdCI6MTczOTk4NjM4NSwiZXhwIjoxODk3NjY2Mzg1fQ.2J4J0Q3arotaY-a4635D8ryAG8c1oxxgHctKFs4zlkE"
              alt="CT Scan Machine"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const scanTypes = [
  {
    title: "Non-Contrast CT Scan",
    icon: <Brain className="w-8 h-8" />,
    description: "Basic CT scanning without contrast media, ideal for initial evaluations and specific conditions.",
    applications: [
      "Brain hemorrhage detection",
      "Bone fractures",
      "Lung nodules",
      "Kidney stones"
    ]
  },
  {
    title: "Contrast-Enhanced CT",
    icon: <Activity className="w-8 h-8" />,
    description: "Advanced imaging using contrast media for enhanced visualization of blood vessels and organs.",
    applications: [
      "Cancer detection",
      "Vascular conditions",
      "Organ perfusion studies",
      "Tumor evaluation"
    ]
  },
  {
    title: "CT Angiography",
    icon: <Heart className="w-8 h-8" />,
    description: "Specialized vascular imaging for detailed blood vessel examination.",
    applications: [
      "Coronary artery disease",
      "Aneurysms",
      "Blood vessel blockages",
      "Vascular malformations"
    ]
  },
  {
    title: "CT Colonography",
    icon: <Microscope className="w-8 h-8" />,
    description: "Virtual colonoscopy for colon examination without invasive procedures.",
    applications: [
      "Colorectal cancer screening",
      "Polyp detection",
      "Diverticular disease",
      "Bowel obstruction"
    ]
  }
];

const ScanTypes = () => {
  return (
    <section className="py-20 bg-[#e3f3fb]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Types of CT Scans
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of CT scanning services tailored to specific diagnostic needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {scanTypes.map((scan, index) => (
            <motion.div
              key={scan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  {scan.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">{scan.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{scan.description}</p>
              <ul className="space-y-3">
                {scan.applications.map((app, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                    {app}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PreparationSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preparation & Safety
            </h2>
            <p className="text-lg text-gray-600">
              Ensuring a safe and comfortable CT scan experience through proper preparation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Before Your Scan</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span className="text-gray-600">Fast for 4-6 hours before contrast CT scans</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span className="text-gray-600">Wear comfortable, metal-free clothing</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span className="text-gray-600">Inform staff about medications and allergies</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span className="text-gray-600">Remove jewelry and metal objects</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Safety Measures</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                  <span className="text-gray-600">Low-dose radiation protocols</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                  <span className="text-gray-600">Continuous monitoring during scan</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                  <span className="text-gray-600">Emergency response team available</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                  <span className="text-gray-600">Regular equipment maintenance</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTABanner = () => {
  const handleBookNowClick = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact-form';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#e0f2fe] to-[#dbeafe] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/abstract-pattern.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL2Fic3RyYWN0LXBhdHRlcm4uc3ZnIiwiaWF0IjoxNzQxMjAwMDAwLCJleHAiOjE4OTg4ODAwMDB9.XYZ789')] opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <motion.div 
        className="container mx-auto px-4 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Advanced CT Scan Technology for Precise Diagnostics
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience superior diagnostic imaging with our state-of-the-art CT scan technology.
          </motion.p>
          <motion.button
            className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookNowClick}
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

const CTScan = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <Overview />
      <ScanTypes />
      <PreparationSection />
      <CTABanner />
    </div>
  );
};

export default CTScan;