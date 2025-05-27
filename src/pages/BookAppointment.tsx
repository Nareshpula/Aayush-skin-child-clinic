import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const doctors = [
  {
    id: 1,
    name: "Dr. G. Sridhar",
    title: "Senior Consultant in Pediatrics",
    qualifications: "MBBS, MD (Pediatrics)",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Dinesh-Kumar-Chirla.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1EaW5lc2gtS3VtYXItQ2hpcmxhLmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE",
    specialties: ["General Pediatrics", "Newborn Care", "Childhood Vaccinations"],
    experience: "15+ Years Experience"
  },
  {
    id: 2,
    name: "Dr. Himabindu Sridhar",
    title: "Consultant Cosmetologist, Laser & Hair Transplant Surgeon",
    qualifications: "MBBS, MD (Dermatology), Fellowship in Cosmetic Dermatology",
    image: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Himabindhu.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1IaW1hYmluZGh1LmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE",
    specialties: ["Cosmetic Dermatology", "Laser Treatments", "Hair Transplantation"],
    experience: "15+ Years Experience"
  },
  {
    id: 3,
    name: "Dr. G. Rami Reddy",
    title: "Senior Consultant Orthopedic Surgeon",
    qualifications: "M.B.B.S, DNB(Ortho), M.ch(Ortho)",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    specialties: ["Joint Replacement", "Sports Injuries", "Spine Surgery"],
    experience: "20+ Years Experience"
  }
];

// Generate time slots function
const generateTimeSlots = (startHour: number, startMinute: number, endHour: number, endMinute: number) => {
  const slots = [];
  let currentHour = startHour;
  let currentMinute = startMinute;
  
  while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
    // Format hour for 12-hour clock
    const hour12 = currentHour > 12 ? currentHour - 12 : currentHour === 0 ? 12 : currentHour;
    const ampm = currentHour >= 12 ? 'PM' : 'AM';
    
    // Format time string (e.g., "09:30 AM")
    const timeString = `${hour12.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')} ${ampm}`;
    slots.push(timeString);
    
    // Increment by 15 minutes
    currentMinute += 15;
    if (currentMinute >= 60) {
      currentHour += 1;
      currentMinute = 0;
    }
  }
  
  return slots;
};

// Morning time slots (9:30 AM to 4:00 PM)
const morningSlots = generateTimeSlots(9, 30, 16, 0);

// Evening time slots (6:00 PM to 9:00 PM)
const eveningSlots = generateTimeSlots(18, 0, 21, 0);

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    reason: ''
  });
  
  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (0 is Sunday in getDay())
      if (date.getDay() !== 0) {
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        dates.push({
          date: formattedDate,
          day: dayName
        });
      }
    }
    
    return dates;
  };
  
  const availableDates = generateDates();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNext = () => {
    if (step === 1 && selectedDoctor === null) {
      alert("Please select a doctor to proceed");
      return;
    }
    
    if (step === 2 && (!selectedDate || !selectedTime)) {
      alert("Please select both date and time to proceed");
      return;
    }
    
    if (step === 3) {
      // Validate form
      if (!formData.name || !formData.phone || !formData.age || !formData.gender) {
        alert("Please fill all required fields");
        return;
      }
      
      // Phone validation
      if (!/^\d{10}$/.test(formData.phone)) {
        alert("Please enter a valid 10-digit phone number");
        return;
      }
      
      // Email validation if provided
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert("Please enter a valid email address");
        return;
      }
    }
    
    setStep(prev => prev + 1);
    scrollToTop();
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
    scrollToTop();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would submit the form data to your backend here
    console.log({
      doctor: doctors.find(d => d.id === selectedDoctor),
      date: selectedDate,
      time: selectedTime,
      patient: formData
    });
    
    // Move to confirmation step
    setStep(4);
    scrollToTop();
  };
  
  const resetForm = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: '',
      reason: ''
    });
    scrollToTop();
  };
  
  const bookAnother = () => {
    resetForm();
  };

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 book-appointment-page pb-12 z-0">
      <div className="container mx-auto px-4">
        <div 
          ref={contentRef} 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6"
        >
          {/* Progress Steps */}
          <div className="bg-[#7a3a95] p-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step === s ? 'bg-white text-[#7a3a95]' : 
                    step > s ? 'bg-white text-[#7a3a95]' : 
                    'bg-white/30 text-white'
                  } mb-2`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className={`text-xs font-medium text-center ${step >= s ? 'text-white' : 'text-white/70'}`}>
                    {s === 1 ? 'Select Doctor' : 
                     s === 2 ? 'Date & Time' : 
                     s === 3 ? 'Your Details' : 'Confirmation'}
                  </span>
                </div>
              ))}
            </div>
          </div>          
          <div className="p-6">
            {/* Step 1: Select Doctor */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Doctor</h2>
                
                <div className="space-y-4">
                  {doctors.filter(doctor => doctor.id !== 3).map((doctor) => (
                    <div 
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedDoctor === doctor.id 
                          ? 'border-[#7a3a95] bg-purple-50 shadow-md' 
                          : 'border-gray-200 hover:border-[#7a3a95] hover:bg-purple-50/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={doctor.image} 
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                              <p className="text-[#7a3a95] font-medium">{doctor.title}</p>
                              <p className="text-gray-600 text-sm mt-1">{doctor.qualifications}</p>
                            </div>
                            
                            {selectedDoctor === doctor.id && (
                              <div className="w-6 h-6 bg-[#7a3a95] rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {doctor.specialties.map((specialty, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-purple-100 text-[#7a3a95] text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-gray-500 text-sm mt-2">{doctor.experience}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Select Date and Time */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Date & Time</h2>
                
                <div className="mb-8">
                  <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-[#7a3a95]" />
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95] pl-4 pr-10"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#7a3a95]" />
                    Select Time
                  </h3>
                  
                  {/* Tabs */}
                  <div className="flex mb-4">
                    <button
                      onClick={() => setActiveTab('morning')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        activeTab === 'morning' 
                          ? 'bg-[#7a3a95] text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Morning
                    </button>
                    <button
                      onClick={() => setActiveTab('evening')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        activeTab === 'evening' 
                          ? 'bg-[#7a3a95] text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Evening
                    </button>
                  </div>
                  
                  {/* Time slots grid */}
                  <div className="grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-2">
                    {(activeTab === 'morning' ? morningSlots : eveningSlots).map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-1 text-center rounded-md transition-all ${
                          selectedTime === time
                            ? 'bg-[#7a3a95] text-white font-medium'
                            : 'bg-white hover:bg-gray-100 text-gray-800'
                       } border border-gray-200 shadow-sm hover:shadow md:py-2 md:px-1 py-3 px-2`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Patient Details Form */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                        placeholder="Enter your 10-digit phone number"
                        maxLength={10}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="120"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                        placeholder="Enter your age"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Visit
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                      placeholder="Briefly describe your symptoms or reason for appointment"
                    ></textarea>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-8">Your appointment has been successfully scheduled.</p>
                
                <div className="bg-purple-50 rounded-lg p-6 max-w-md mx-auto mb-8">
                  <div className="text-left space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">{doctors.find(d => d.id === selectedDoctor)?.name}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }) : ''}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{selectedTime}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={bookAnother}
                    className="px-6 py-2 border border-[#7a3a95] text-[#7a3a95] rounded-lg hover:bg-purple-50 transition-colors duration-200"
                  >
                    Book Another Appointment
                  </button>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200"
                  >
                    Return to Home
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 flex items-center"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200"
                >
                  Confirm Appointment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;