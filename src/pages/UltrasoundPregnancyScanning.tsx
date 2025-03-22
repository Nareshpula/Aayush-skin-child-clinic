import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Baby, Heart, Brain, Activity, Scan, Waves } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          preload="auto"
          loop
          muted
          playsInline
          loading="eager"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          className="w-full h-full object-cover"
        >
          <source
            src="https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/ultrasound-scanning-vedio.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL3VsdHJhc291bmQtc2Nhbm5pbmctdmVkaW8ubXA0IiwiaWF0IjoxNzQwODE1MDQ3LCJleHAiOjE4OTg0OTUwNDd9.vUZI3MJDtN0pyJtyLBiv0m-oyI1LT8ekS_4whM6B5TM"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f2f1f1]/80 via-[#f2f1f1]/50 to-transparent"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-end text-center px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide drop-shadow-lg"
          >
            Advanced Pregnancy Ultrasound Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light tracking-wide drop-shadow-lg"
          >
            State-of-the-art Technology for Precise Fetal Assessment
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white/80"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const PregnancyScansOverview = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pregnancy Scans Overview
            </h2>
            <div className="relative">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent top-0" />
              <p className="text-lg text-gray-700 leading-relaxed py-8">
                Jyothi Advanced Ultrasound Scan Centre starts right from the onset of pregnancy. 
                Our Fetal Medicine experts are concerned with the health of the fetus at every stage – 
                monitoring growth & development; predicting, detecting & managing any complications; 
                and treating congenital disorders & anomalies in the womb itself.
              </p>
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent bottom-0" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const scanTypes = [
  {
    title: "EARLY PREGNANCY SCAN",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/6-to-10-weeks-baby-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzLzYtdG8tMTAtd2Vla3MtYmFieS1pbWFnZS53ZWJwIiwiaWF0IjoxNzQwODMyODE4LCJleHAiOjE4OTg1MTI4MTh9.eAwJkUKou6ek3XJOf3aCOiOpNtwyOHU0a7zlXq60xeA",
    icon: <Baby className="w-8 h-8" />,
    points: [
      "This scan is performed in the 6-10 weeks of pregnancy",
      "It is performed to confirm the pregnancy and presence of fetal heart beat",
      "Also, to check the number of fetuses (twins, triplets)",
      "In case of vaginal bleeding or abdomen pain, this scan is performed to identify the underlying cause"
    ],
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "NUCHAL TRANSLUCENCY – NASAL BONE SCAN (NT/NB SCAN)",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Nuchal-Translucency-Image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL051Y2hhbC1UcmFuc2x1Y2VuY3ktSW1hZ2Uud2VicCIsImlhdCI6MTc0MDgzODQ1NSwiZXhwIjoxODk4NTE4NDU1fQ.iz9gpnUqInofWbxn6mwz00gYnO2hgYGPRQsiiTXH_Hg",
    icon: <Heart className="w-8 h-8" />,
    points: [
      "This scan is carried out from 11 weeks - 13 weeks & 6 days",
      "It is performed to screen your baby's risk of having Down syndrome and some other chromosomal abnormalities",
      "To examine the structural development of the fetus"
    ],
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "TIFFA SCAN (Targeted Imaging For Fetal Anomalies)",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Tiffa-Scan-Image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL1RpZmZhLVNjYW4tSW1hZ2Uud2VicCIsImlhdCI6MTc0MDgzODc3MywiZXhwIjoxODk4NTE4NzczfQ.kIZX3V9Ftx1OnvLWovnNC3nP7jtfRkehwzvogjh1neA",
    icon: <Brain className="w-8 h-8" />,
    points: [
      "This is a detailed scan performed between 18 to 22 weeks of pregnancy",
      "It is the most important pregnancy scan because it detects any congenital abnormalities in the growing fetus",
      "It is performed to examine each part of the fetal body with specific attention to fetal brain, face, spine, heart, stomach, kidneys and limbs"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "FETAL WELLBEING SCAN – growth scan",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Fetal-Wellbeing-Scan-Image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0ZldGFsLVdlbGxiZWluZy1TY2FuLUltYWdlLndlYnAiLCJpYXQiOjE3NDA4MzkwNTQsImV4cCI6MTg5ODUxOTA1NH0.Lc_tPeAXrxDi-L8fRL0qRwgqnyxExaahP_BQBXGjAto",
    icon: <Activity className="w-8 h-8" />,
    points: [
      "This scan is usually performed after 28 weeks of pregnancy",
      "It is performed to obtain the estimate of fetal weight",
      "This scan helps to assess the fetal wellbeing, to check the position of placenta, to assess the amniotic fluid volume",
      "Also, to look for umbilical cord around the baby's neck",
      "Usually this scan is combined with doppler study"
    ],
    color: "from-emerald-500 to-green-500"
  },
  {
    title: "Fetal Echo Cardiography",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/echocardiography-scan-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL2VjaG9jYXJkaW9ncmFwaHktc2Nhbi1pbWFnZS53ZWJwIiwiaWF0IjoxNzQwODM5MjIyLCJleHAiOjE4OTg1MTkyMjJ9.sbrRDn373HNlVeavhRCQX8GP-X5atLlrdVojlg5F42A",
    icon: <Heart className="w-8 h-8" />,
    points: [
      "This study is done to check the heart of your developing baby",
      "Fetal echo can help find heart defects before birth"
    ],
    color: "from-red-500 to-orange-500"
  },
  {
    title: "4D AND 5D Scans",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/4D-and-5D-baby-scan-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzLzRELWFuZC01RC1iYWJ5LXNjYW4taW1hZ2Uud2VicCIsImlhdCI6MTc0MDgzOTQwNCwiZXhwIjoxODk4NTE5NDA0fQ.06MuBa8TR7Dw2hG6fpKDZsRcALCHGjOeQHxQbI-qT7g",
    icon: <Scan className="w-8 h-8" />,
    points: [
      "4D/5D scan provides high definition images of baby's facial features and shape in both still images and moving images",
      "It is always fascinating to see your baby by 4D / 5D state-of-the-art technology",
      "Some fetal conditions like cleft lip, spinal defects may require 3D/4D scan for better assessment"
    ],
    color: "from-amber-500 to-yellow-500"
  },
  {
    title: "Doppler Ultrasound",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Doppler-Ultrasound-Image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0RvcHBsZXItVWx0cmFzb3VuZC1JbWFnZS53ZWJwIiwiaWF0IjoxNzQxNzExMTY2LCJleHAiOjE4OTkzOTExNjZ9.QMrQ7wmzj4lTl4VkakDsroOwYzvSICxQxBIXBDHAWxM",
    icon: <Activity className="w-8 h-8" />,
    points: [
      "Performed after 28 weeks of pregnancy for optimal assessment",
      "Comprehensive evaluation of fetal blood circulation and placental function",
      "Advanced detection of blockages, abnormalities, or risks like IUGR or preeclampsia",
      "Specialized monitoring of umbilical cord blood flow patterns",
      "Integrated with biophysical profile for complete fetal assessment"
    ],
    color: "from-violet-500 to-purple-500"
  },
  {
    title: "Biophysical Profile (BPP)",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Biophysical-Profile-image.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0Jpb3BoeXNpY2FsLVByb2ZpbGUtaW1hZ2Uud2VicCIsImlhdCI6MTc0MTcxMTUzNiwiZXhwIjoxODk5MzkxNTM2fQ.n2Jerbd9jKY61MyFF26BpEzmVwlSivGer4OOJEm3Xw4",
    icon: <Brain className="w-8 h-8" />,
    points: [
      "Comprehensive assessment performed after 28 weeks to evaluate fetal well-being",
      "Detailed examination of fetal movements, breathing, muscle tone, and amniotic fluid levels",
      "Advanced screening to identify potential fetal distress or risks requiring medical intervention",
      "Typically performed in conjunction with Doppler ultrasound for complete fetal assessment"
    ],
    color: "from-teal-500 to-cyan-500"
  }
];

const ScanTypes = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
        >
          Our Comprehensive Pregnancy Scan Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16"
        >
          Advanced diagnostic imaging services with state-of-the-art technology for comprehensive prenatal care
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {scanTypes.map((scan, index) => (
            <motion.div
              key={scan.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <img
                  src={scan.image}
                  alt={scan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r ${scan.color} text-white mb-4`}>
                    {scan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{scan.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {scan.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-start"
                    >
                      <Waves className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UltrasoundPregnancyScanning = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              From Bump to Baby: A Journey of Love & Care
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience top-notch diagnostics with our expert doctors and state-of-the-art equipment.
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

  return (
    <div className="bg-gradient-to-b from-[#fff8f8] to-[#e3f2fd]">
      <HeroSection />
      <PregnancyScansOverview />
      <ScanTypes />
      <CTABanner />
    </div>
  );
};

export default UltrasoundPregnancyScanning;