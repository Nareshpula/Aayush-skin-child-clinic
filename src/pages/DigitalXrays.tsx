import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Scan, Brain, Heart, Settings as Lungs, Bone, Microscope, ArrowRight, Activity, Waves } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Digital-Xray-image-1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0RpZ2l0YWwtWHJheS1pbWFnZS0xLmpwZyIsImlhdCI6MTc0MDg0NDIxNCwiZXhwIjoxODk4NTI0MjE0fQ.aVsJGp-TyIqx0KXPyO6SFs5tctk8UhKo5u2DsxTGBYg"
          alt="Digital X-ray Equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f2f1f1]/80 via-[#f2f1f1]/50 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-end text-center px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced Digital X-ray Services
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            State-of-the-art imaging technology for precise diagnostics
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8"
        >
          <ChevronDown className="w-8 h-8 text-white/80" />
        </motion.div>
      </div>
    </div>
  );
};

const routineXrays = [
  {
    title: "Skull X-ray",
    icon: <Brain className="w-6 h-6" />,
    description: "Detailed imaging of skull structure and facial bones",
    applications: ["Head injuries", "Sinusitis", "Dental evaluations"]
  },
  {
    title: "Chest X-ray",
    icon: <Lungs className="w-6 h-6" />,
    description: "Visualization of heart, lungs, and chest wall",
    applications: ["Pneumonia", "Heart conditions", "Lung diseases"]
  },
  {
    title: "Spine X-ray",
    icon: <Activity className="w-6 h-6" />,
    description: "Examination of vertebral alignment and disc spaces",
    applications: ["Back pain", "Scoliosis", "Degenerative changes"]
  },
  {
    title: "Extremity X-ray",
    icon: <Bone className="w-6 h-6" />,
    description: "Imaging of arms, legs, hands, and feet",
    applications: ["Fractures", "Joint problems", "Arthritis"]
  }
];

const specialProcedures = [
  {
    title: "HSG (Hysterosalpingography)",
    description: "Advanced diagnostic imaging of the uterus and fallopian tubes",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/HSG-Image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0hTRy1JbWFnZS5wbmciLCJpYXQiOjE3NDA4NDYwNDgsImV4cCI6MTg5ODUyNjA0OH0.2jWhJAc-3-rxN7fUckbwtGkwy0-IGsKKlol4Fmoh-z8",
    points: [
      "Evaluates fallopian tube patency",
      "Identifies uterine abnormalities",
      "Helps diagnose infertility causes",
      "Uses real-time contrast imaging"
    ]
  },
  {
    title: "Fistulogram",
    description: "Detailed examination of abnormal connections between organs",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Fistulogram-Image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0Zpc3R1bG9ncmFtLUltYWdlLnBuZyIsImlhdCI6MTc0MDg0NjQ1NCwiZXhwIjoxODk4NTI2NDU0fQ.WpMRFNaoqbl18EyNA9XZszViWkIOuRlT5Yspj97pRNM",
    points: [
      "Maps fistula tracts in 3D",
      "Guides surgical planning",
      "Monitors healing progress",
      "Uses specialized contrast agents"
    ]
  },
  {
    title: "Barium Studies",
    description: "Comprehensive visualization of the gastrointestinal tract",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Barium-Studies-Radiology-procedure-Image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0Jhcml1bS1TdHVkaWVzLVJhZGlvbG9neS1wcm9jZWR1cmUtSW1hZ2Uud2VicCIsImlhdCI6MTc0MDg0Njc0NSwiZXhwIjoxODk4NTI2NzQ1fQ.3HWnTklyGhsOtR3T4pdNtG4g8NpsbahvwrNuSGdT8yc",
    points: [
      "Barium Swallow for esophagus",
      "Barium Meal for stomach",
      "Barium Follow-through for small intestine",
      "Barium Enema for large intestine"
    ]
  }
];

const RoutineXrays = () => {
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
            Routine X-ray Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive head-to-toe imaging with advanced digital technology for superior image quality and reduced radiation exposure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {routineXrays.map((xray, index) => (
            <motion.div
              key={xray.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#7484b2] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:scale-105 hover:bg-[#8494c2] group"
            >
              <div className="bg-white/90 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-[#7484b2] group-hover:text-[#8494c2] transition-colors duration-300">
                {xray.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{xray.title}</h3>
              <p className="text-white/90 mb-4">{xray.description}</p>
              <ul className="space-y-2">
                {xray.applications.map((app, i) => (
                  <li key={i} className="flex items-center text-white/80">
                    <ArrowRight className="w-4 h-4 mr-2 text-white/90" />
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

const SpecialProcedures = () => {
  return (
    <section className="py-20 bg-[#e3f3fb]">
      <div className="container mx-auto px-4 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-200/30 to-indigo-200/30 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Special Procedures
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced diagnostic procedures using state-of-the-art imaging technology and contrast media for detailed visualization.
          </p>
        </motion.div>

        <div className="space-y-12">
          {specialProcedures.map((procedure, index) => (
            <motion.div
              key={procedure.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:translate-y-[-8px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img
                    src={procedure.image}
                    alt={procedure.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:bg-gradient-to-l transition-opacity duration-300 group-hover:opacity-75" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <motion.h3 
                      className="text-2xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-x-2"
                    >
                      {procedure.title}
                    </motion.h3>
                    <p className="text-white/90 transform transition-transform duration-300 group-hover:translate-x-2">
                      {procedure.description}
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-10">
                  <ul className="space-y-4">
                    {procedure.points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-start transform transition-transform duration-300 group-hover:translate-x-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mr-4">
                          <Waves className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IVPSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/IVP-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0lWUC1pbWFnZS53ZWJwIiwiaWF0IjoxNzQxNzE0MTIxLCJleHAiOjE4OTkzOTQxMjF9.4-L-JtjCTpKsj1CCTUqZURsTIUWuM_NIh296dOmKYJw"
                  alt="IVP Procedure"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Intravenous Pyelogram (IVP)
                </h2>
                <p className="text-gray-600 mb-6">
                  A specialized X-ray examination that uses contrast material to evaluate your urinary system, 
                  including your kidneys, bladder, and ureters.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Indications</h3>
                    <ul className="space-y-2">
                      {[
                        "Kidney stones or blockages",
                        "Blood in urine (Hematuria)",
                        "Recurrent urinary tract infections",
                        "Structural abnormalities",
                        "Tumors or cysts in the urinary system"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center text-gray-600"
                        >
                          <ArrowRight className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Procedure Steps</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <ol className="space-y-4">
                        {[
                          "Initial X-ray before contrast administration",
                          "Intravenous injection of contrast material",
                          "Series of X-rays at timed intervals",
                          "Monitoring contrast material flow",
                          "Final images after bladder emptying"
                        ].map((step, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-3 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MCUGSection = () => {
  return (
    <section className="py-20 bg-[#e3f3fb]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Micturating Cystourethrogram (MCUG)
                </h2>
                <p className="text-gray-600 mb-6">
                  A specialized X-ray procedure that provides detailed imaging of the bladder and urethra during urination,
                  essential for diagnosing various urinary tract conditions.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {[
                        "Real-time fluoroscopic imaging during urination",
                        "Detection of vesicoureteral reflux (VUR)",
                        "Assessment of bladder function and anatomy",
                        "Identification of urethral abnormalities",
                        "Evaluation of urinary tract infections"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center text-gray-600"
                        >
                          <ArrowRight className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Procedure Overview</h3>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <ol className="space-y-4">
                        {[
                          "Catheter insertion and contrast medium administration",
                          "Bladder filling with contrast dye",
                          "Real-time imaging during urination",
                          "Assessment of urinary tract function",
                          "Comprehensive evaluation of findings"
                        ].map((step, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-3 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Micturating-Cystourethrogram-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL01pY3R1cmF0aW5nLUN5c3RvdXJldGhyb2dyYW0taW1hZ2Uud2VicCIsImlhdCI6MTc0MTcxNTQwMSwiZXhwIjoxODk5Mzk1NDAxfQ.UbCvbEx4tZVZcAD9PCX8K-1moWqXz56_lz_bD-a5k9M"
                  alt="MCUG Procedure"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-pink-200/30 to-indigo-200/30 rounded-full blur-xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const RGUSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Retrograde Urethrogram (RGU)
                </h2>
                <p className="text-gray-600 mb-6">
                  A specialized radiological procedure that provides detailed imaging of the urethra
                  using contrast media, essential for diagnosing various urethral conditions and abnormalities.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Primary Applications</h3>
                    <ul className="space-y-2">
                      {[
                        "Diagnosis of urethral strictures (narrowing of the urethra)",
                        "Detection of urethral injuries or trauma",
                        "Evaluation of urethral fistulas or diverticula",
                        "Assessment of post-surgical complications related to the urethra"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center text-gray-600"
                        >
                          <ArrowRight className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Procedure Overview</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <ol className="space-y-4">
                        {[
                          "Patient preparation and positioning",
                          "Sterile technique and local anesthetic application",
                          "Careful insertion of contrast medium",
                          "Real-time fluoroscopic imaging",
                          "Multiple view capture for comprehensive assessment"
                        ].map((step, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mr-3 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/RGU-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL1JHVS1pbWFnZS53ZWJwIiwiaWF0IjoxNzQxNzE1OTQ0LCJleHAiOjE4OTkzOTU5NDR9.PFcobBkd_oysdtOu0_jQ8XmQK00PBQFbYHTC8N_YIog"
                  alt="RGU Procedure"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-pink-200/30 to-indigo-200/30 rounded-full blur-xl" />
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
            Advanced Digital X-ray Technology for Precise Diagnostics
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience superior diagnostic imaging with our state-of-the-art digital X-ray technology.
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

const DigitalXrays = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <RoutineXrays />
      <SpecialProcedures />
      <IVPSection />
      <MCUGSection />
      <RGUSection />
      <CTABanner />
    </div>
  );
};

export default DigitalXrays;