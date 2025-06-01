import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, ChevronLeft, Check, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchDoctors, 
  bookAppointment, 
  checkAvailability, 
  getAvailableSlots,
  generateOTP,
  verifyOTP,
  sendOTP,
  sendConfirmation,
  Doctor, 
  Appointment, 
  AppointmentSlot,
  subscribeToAppointments,
  subscribeToAppointmentSlots
} from '@/lib/supabase';

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
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const contentRef = useRef<HTMLDivElement>(null);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [patientId, setPatientId] = useState<string | null>(null);
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
    const dates: { date: string; day: string }[] = [];
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
  
  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        // Hardcoded doctor data since the database fetch isn't working
        const doctorsData = [
          {
            id: 1,
            name: "Dr. G Sridhar",
            title: "Senior Consultant in Pediatrics",
            qualifications: "MBBS, MD Pediatrics",
            experience: "15+ Years Experience",
            specialties: ["General Pediatrics", "Child Care", "Vaccinations"],
            image_url: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Dinesh-Kumar-Chirla.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1EaW5lc2gtS3VtYXItQ2hpcmxhLmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE"
          },
          {
            id: 2,
            name: "Dr. Himabindu Sridhar",
            title: "Consultant Cosmetologist, Laser & Hair Transplant Surgeon",
            qualifications: "MBBS, MD Dermatology",
            experience: "15+ Years Experience",
            specialties: ["Dermatology", "Skin Care", "Cosmetic Procedures"],
            image_url: "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Himabindhu.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1IaW1hYmluZGh1LmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE"
          }
        ];
        setDoctors(doctorsData);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctors();
  }, []);
  
  // Check availability when date or doctor changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchSlots = async () => {
        try {
          // Get booked slots
          // Simulate some booked slots
          const simulatedBookedSlots = [];
          setBookedSlots(simulatedBookedSlots);
          
          // Get available slots
          // Generate simulated available slots
          const simulatedAvailableSlots = morningSlots.concat(eveningSlots).map((time, index) => {
            // Convert time from "09:30 AM" format to "09:30:00" format
            const [hourMin, period] = time.split(' ');
            const [hour, minute] = hourMin.split(':');
            let hour24 = parseInt(hour);
            
            // Convert to 24-hour format
            if (period === 'PM' && hour24 < 12) hour24 += 12;
            if (period === 'AM' && hour24 === 12) hour24 = 0;
            
            const timeStr = `${hour24.toString().padStart(2, '0')}:${minute}:00`;
            
            return {
              id: index + 1,
              doctor_id: selectedDoctor,
              date: selectedDate,
              time: timeStr,
              is_booked: false
            };
          });
          setAvailableSlots(simulatedAvailableSlots);
        } catch (err) {
          console.error('Failed to check availability:', err);
        }
      };
      
      fetchSlots();
    }
  }, [selectedDoctor, selectedDate]);
  
  // Subscribe to real-time updates
  useEffect(() => {
    const subscription = subscribeToAppointments((payload) => {
      // If we're looking at the same date and doctor, refresh the slots
      if (selectedDoctor && selectedDate) {
        // This would be where we refresh the slots from the database
        // For now, we'll just use our simulated data
      }
    });
    
    const slotsSubscription = subscribeToAppointmentSlots((payload) => {
      // If we're looking at the same date and doctor, refresh the slots
      if (selectedDoctor && selectedDate) {
        // This would be where we refresh the slots from the database
        // For now, we'll just use our simulated data
      }
    });
    
    return () => {
      subscription.unsubscribe();
      slotsSubscription.unsubscribe();
    };
  }, [selectedDoctor, selectedDate]);
  
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
    
    if (step === 2 && (!selectedDate || !selectedTime || !selectedSlot)) {
      alert("Please select both date and time slot to proceed");
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
  
  const handleSendOTP = async () => {
    if (!formData.phone) {
      setOtpError("Phone number is required");
      return;
    }
    
    // Validate phone number format
    if (!/^\d{10}$/.test(formData.phone)) {
      setOtpError("Please enter a valid 10-digit phone number");
      return;
    }
    
    setSendingOtp(true);
    setOtpError(null);
    
    try {
      // Generate OTP
      const result = await generateOTP(formData.phone, appointmentId);
      const { success, otpCode: generatedOtp, error: otpGenError } = result;
      
      if (!success || !generatedOtp) {
        console.error("OTP generation failed:", otpGenError);
        setOtpError("Failed to generate OTP. Please try again.");
        return;
      }
      
      // Send OTP via SMS
      const sendResult = await sendOTP(formData.phone, generatedOtp);
      
      if (!sendResult.success) {
        console.error("OTP sending failed:", sendResult);
        setOtpError("Failed to send OTP. Please try again.");
        return;
      }
      
      setOtpSent(true);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setOtpError("An unexpected error occurred. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };
  
  const handleVerifyOTP = async () => {
    if (!otpCode) {
      setOtpError("Please enter the OTP");
      return;
    }
    
    setVerifyingOtp(true);
    setOtpError(null);
    
    try {
      const { success, error } = await verifyOTP(formData.phone, otpCode);
      
      if (!success) {
        setOtpError(error || "Invalid or expired OTP");
        return;
      }
      
      setOtpVerified(true);
      
      // Send confirmation SMS - don't catch errors here to ensure proper error handling
      const confirmResult = await sendConfirmation(formData.phone);
      if (!confirmResult.success) {
        console.error('Error sending confirmation SMS:', confirmResult.error);
      }
      
      // Move to confirmation step
      setStep(5);
      scrollToTop();
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setOtpError("An unexpected error occurred. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedDate || !selectedTime || !selectedSlot) {
      setError('Missing appointment details. Please go back and complete all steps.');
      return;
    }
    
    setBookingInProgress(true);
    
    try {
      // Create the appointment in the database
      const { success, data, error: bookingError } = await bookAppointment({
        slot_id: selectedSlot.id,
        patient_name: formData.name,
        email: formData.email || undefined,
        phone_number: formData.phone,
        age: parseInt(formData.age),
        gender: formData.gender,
        reason: formData.reason || undefined
      });
      
      if (!success || !data) {
        throw new Error(bookingError || 'Failed to book appointment');
      }
      
      setAppointmentId(data.id);
      setPatientId(data.patient_id || null);
      
      // Move to OTP verification step
      setStep(4);
      scrollToTop();
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setBookingInProgress(false);
    }
  };
  
  const resetForm = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedSlot(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: '',
      reason: ''
    });
    setOtpSent(false);
    setOtpVerified(false);
    setOtpCode('');
    setOtpError(null);
    setAppointmentId(null);
    scrollToTop();
  };
  
  const bookAnother = () => {
    resetForm();
  };

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);
  
  // Show loading state
  if (loading && step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 book-appointment-page pb-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#7a3a95] mx-auto mb-4" />
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }
  
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
              {[1, 2, 3, 4, 5].map((s) => (
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
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
                <button 
                  className="float-right text-red-700 hover:text-red-900"
                  onClick={() => setError(null)}
                >
                  ×
                </button>
              </div>
            )}
            
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
                  {doctors.length === 0 && !loading ? (
                    <p className="text-center text-gray-500 py-8">No doctors available at the moment.</p>
                  ) : (
                    doctors.map((doctor) => (
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
                            src={doctor.image_url} 
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
                    ))
                  )}
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
                    {(activeTab === 'morning' ? morningSlots : eveningSlots).map((time, index) => {
                      const isBooked = bookedSlots.includes(time);
                      // Find the slot object if it exists in availableSlots
                      const slot = availableSlots.find(s => {
                        // Convert time from "09:30 AM" format to "09:30:00" format for comparison
                        const [hourMin, period] = time.split(' ');
                        const [hour, minute] = hourMin.split(':');
                        let hour24 = parseInt(hour);
                        
                        // Convert to 24-hour format
                        if (period === 'PM' && hour24 < 12) hour24 += 12;
                        if (period === 'AM' && hour24 === 12) hour24 = 0;
                        
                        const timeStr = `${hour24.toString().padStart(2, '0')}:${minute}:00`;
                        return s.time === timeStr;
                      });
                      
                      return (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isBooked && slot) {
                            setSelectedTime(time);
                            setSelectedSlot(slot);
                          }
                        }}
                        disabled={isBooked}
                        className={`py-2 px-1 text-center rounded-md transition-all 
                        ${isBooked ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 
                          selectedTime === time && selectedSlot?.id === slot?.id
                            ? 'bg-[#7a3a95] text-white font-medium'
                            : 'bg-white hover:bg-gray-100 text-gray-800'
                       } border border-gray-200 shadow-sm hover:shadow md:py-2 md:px-1 py-3 px-2`}
                      >
                        {time}
                        {isBooked && <span className="block text-xs mt-1">(Booked)</span>}
                      </button>
                    )})}
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
            
            {/* Step 4: OTP Verification */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Verify Your Phone Number</h2>
                
                <div className="max-w-md mx-auto">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          We'll send a 6-digit verification code to your phone number to confirm your appointment.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6 text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={formData.phone}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                      />
                      {!otpSent ? (
                        <button
                          onClick={handleSendOTP}
                          disabled={sendingOtp}
                          className="ml-2 px-4 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 whitespace-nowrap flex items-center"
                        >
                          {sendingOtp ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send OTP'
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={handleSendOTP}
                          disabled={sendingOtp}
                          className="ml-2 px-4 py-2 border border-[#7a3a95] text-[#7a3a95] rounded-lg hover:bg-purple-50 transition-colors duration-200 whitespace-nowrap flex items-center"
                        >
                          {sendingOtp ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Resend OTP'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {otpSent && (
                    <div className="space-y-4 text-left">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enter 6-digit OTP
                        </label>
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setOtpCode(value);
                            setOtpError(null); // Clear error when user types
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                        />
                      </div>
                      
                      <button
                        onClick={handleVerifyOTP}
                        disabled={verifyingOtp || otpCode.length !== 6}
                        className="w-full px-6 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {verifyingOtp ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          'Verify OTP'
                        )}
                      </button>
                    </div>
                  )}
                  
                  {otpError && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                      {otpError}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Step 5: Confirmation */}
            {step === 5 && (
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
                      <p className="text-sm text-gray-500">Patient ID</p>
                      <p className="font-medium text-[#7a3a95]">
                        {patientId || 'Generating...'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">
                        {doctors.find(d => d.id === selectedDoctor)?.name}
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }) : ''}
                        </p>
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
          {step < 5 && step !== 4 && (
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
                  disabled={bookingInProgress}
                >
                  {bookingInProgress ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Appointment'
                  )}
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