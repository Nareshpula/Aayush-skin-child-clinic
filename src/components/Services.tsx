import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Scan, 
  Waves, 
  Brain, 
  Activity,
  ArrowRight,
  Baby
} from 'lucide-react';

const services = [
  {
    icon: <Scan className="w-12 h-12" />,
    title: "Digital X-rays",
    description: "High-quality digital X-ray imaging for accurate diagnostics.",
    route: "/digital-xrays",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/X-Ray.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL1gtUmF5LmpwZyIsImlhdCI6MTc0MDgxMTc1NiwiZXhwIjoxODk4NDkxNzU2fQ.jr7g8P3U4I6QJWFIaX2IzuVT-Nt-eB0RuekpGASSDSM",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-600",
    hoverColor: "group-hover:text-blue-700"
  },
  {
    icon: <Baby className="w-12 h-12" />,
    title: "Pregnancy Scans",
    description: "Expert pregnancy ultrasound services with 3D/4D imaging technology for detailed fetal assessment.",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Pregnancy-result-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL1ByZWduYW5jeS1yZXN1bHQtaW1hZ2UuanBnIiwiaWF0IjoxNzQwODE4MDI0LCJleHAiOjE4OTg0OTgwMjR9.Y178-InbrA_2CMc5xksMM4wqr2PYIjuatOaphGlEX4g",
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-600",
    hoverColor: "group-hover:text-pink-700",
    route: "/ultrasound-pregnancy-scanning"
  },
  {
    icon: <Waves className="w-12 h-12" />,
    title: "Ultrasound Scanning & Color Doppler",
    description: "Advanced ultrasound and Doppler imaging for precise health assessments.",
    route: "/ultrasound-scanning",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/Ultrasound-of-an-Unborn-Child.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL1VsdHJhc291bmQtb2YtYW4tVW5ib3JuLUNoaWxkLmpwZyIsImlhdCI6MTc0MDgxMjMzMCwiZXhwIjoxODk4NDkyMzMwfQ.O5y1ZU8vwjzA7vLFc7eXFmLyYbgNWsRZpLBaTV-dVfc",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-600",
    hoverColor: "group-hover:text-purple-700"
  },
  {
    icon: <Activity className="w-12 h-12" />,
    title: "C.T Scan",
    description: "Detailed cross-sectional imaging with state-of-the-art CT scans.",
    route: "/ct-scan",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/CT-Scan-Image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL0NULVNjYW4tSW1hZ2UuanBnIiwiaWF0IjoxNzQwODEyNjE5LCJleHAiOjE4OTg0OTI2MTl9.e3UbuHBrs9aKizWHGekY_W7SKo0vcuOg-pritZoOQh0",
    color: "from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-600",
    hoverColor: "group-hover:text-emerald-700"
  },
  {
    icon: <Brain className="w-12 h-12" />,
    title: "3.0 Tesla Open Flare MRI",
    description: "Advanced 3.0 Tesla MRI technology for superior imaging and patient comfort.",
    route: "/tesla-mri-scan",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/sahasra-hospital-images/Jyothi-Diagnosis/mri-tesla-machine-image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzYWhhc3JhLWhvc3BpdGFsLWltYWdlcy9KeW90aGktRGlhZ25vc2lzL21yaS10ZXNsYS1tYWNoaW5lLWltYWdlLmpwZyIsImlhdCI6MTczOTk4NjM4NSwiZXhwIjoxODk3NjY2Mzg1fQ.2J4J0Q3arotaY-a4635D8ryAG8c1oxxgHctKFs4zlkE",
    color: "from-amber-500/20 to-amber-600/20",
    iconColor: "text-amber-600",
    hoverColor: "group-hover:text-amber-700"
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {/* Blob-like background shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
      <div className="absolute -left-64 -top-64 w-[500px] h-[500px] rounded-full bg-gray-100/50 blur-3xl" />
      <div className="absolute -right-64 -bottom-64 w-[500px] h-[500px] rounded-full bg-gray-100/50 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-50/30 blur-3xl" />
      
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-100/50 via-transparent to-transparent mix-blend-overlay" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
            Our Diagnostic Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With 20 years of experience, we provide cutting-edge diagnostic imaging services 
            with precision and care, setting new standards in healthcare excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative backdrop-blur-[2px]"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} transform transition-all duration-300 group-hover:scale-105 opacity-80`} />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className={`${service.iconColor} mb-4 transform transition-all duration-300 ${service.hoverColor}`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {service.description}
                </p>

                <motion.button
                  whileHover={{ x: 5 }}
                  className={`flex items-center text-sm font-semibold ${service.iconColor} ${service.hoverColor} transition-colors duration-300`}
                  onClick={() => {
                    if (service.route) {
                      navigate(service.route);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>

                {/* Enhanced decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-white opacity-40 blur-2xl" />
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-tl from-gray-50 to-white opacity-30 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;