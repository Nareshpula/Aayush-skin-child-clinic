import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, ChevronLeft, Check, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import DoctorAvailabilityCalendar from '@/components/DoctorAvailabilityCalendar';
import {
  supabase,
  fetchDoctors, 
  bookAppointment, 
  generateOTP,
  verifyOTP,
  sendOTP,
  sendConfirmation,
  Doctor
} from '@/lib/supabase';

const BookAppointmentV2 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
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
  
  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true); 
      console.log('Loading doctors from Supabase...');
      try {
        // Call the RPC function directly to ensure we get data from aayush schema
        const { data: doctorsData, error } = await supabase.rpc('get_doctors_from_aayush');
        
        if (error) {
          console.error('Error fetching doctors from aayush schema:', error);
          throw error;
        }
        
        if (doctorsData) {
          console.log('Successfully fetched doctors from aayush schema:', doctorsData.length);
          
          // Transform the data to match the expected Doctor type
          const transformedData = doctorsData.map(doctor => ({
            id: doctor.id,
            name: doctor.name,
            title: doctor.specialization,
            specialization: doctor.specialization,
            profile_image: doctor.profile_image,
            available_days: doctor.available_days,
            // Add any other required fields with defaults
            qualifications: "",
            experience: "15+ Years Experience",
            specialties: [doctor.specialization],
            image_url: doctor.profile_image
          }));
          
          setDoctors(transformedData);
        } else {
          console.error('No doctors returned from aayush schema');
          throw new Error('No doctors found');
        }
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctors();
  }, []);
  
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
      setError("Please select a doctor to proceed");
      return;
    }
    
    if (step === 2 && (!selectedDate || !selectedTime)) {
      setError("Please select both date and time slot to proceed");
      return;
    }
    
    if (step === 3) {
      // Validate form
      if (!formData.name || !formData.phone || !formData.age || !formData.gender) {
        setError("Please fill all required fields");
        return;
      }
      
      // Phone validation
      if (!/^\d{10}$/.test(formData.phone)) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }
      
      // Email validation if provided
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }
    }
    
    setError(null);
    setStep(prev => (prev + 1) as any);
    scrollToTop();
  };
  
  const handleBack = () => {
    setStep(prev => (prev - 1) as any);
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
      
      // Send confirmation SMS
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
    
    if (!selectedDoctor || !selectedDate || !selectedTime || !doctors.length) {
      setError('Please complete all previous steps before booking an appointment.');
      return;
    }
    
    setError(null);
    setBookingInProgress(true);
    
    try {
      // First, check if a slot exists for this doctor, date, and time
      const doctor = doctors.find(d => d.id === selectedDoctor);
      if (!doctor) {
        throw new Error('Selected doctor not found');
      }

      // Format the time to match the expected format (HH:MM:SS)
      const formattedTime = selectedTime.includes(':') ? selectedTime : `${selectedTime}:00`;

      // Call the bookAppointment function with parameters in the correct order
      const { success, data: bookingData, error: bookingError } = await bookAppointment(
        selectedDoctor,
        formData.name,
        formData.phone,
        selectedDate,
        formattedTime,
        formData.email || undefined,
        parseInt(formData.age) || 0,
        formData.gender || 'Not specified',
        formData.reason || undefined
      );
      
      console.log('Booking result:', { success, bookingData, bookingError });
      
      if (!success || !bookingData) {
        setError(bookingError || 'Failed to book appointment. Please try again.');
        return;
      }
      
      setAppointmentId(bookingData.id);
      setPatientId(bookingData.patient_id || null);
      
      // Move to OTP verification step
      setStep(4);
      scrollToTop();
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      setError(err.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setBookingInProgress(false);
    }
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
        <motion.div 
          ref={contentRef} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 sm:mt-8"
        >
          {/* Progress Steps */}
          <div className="bg-[#7a3a95] p-4 sm:p-6">
            {/* Mobile Stepper (Visible on small screens) */}
            <div className="flex sm:hidden items-center justify-center mb-2">
              <span className="text-white font-medium">
                Step {step} of 5: {
                  step === 1 ? 'Select Doctor' : 
                  step === 2 ? 'Date & Time' : 
                  step === 3 ? 'Your Details' : 
                  step === 4 ? 'Verification' : 'Confirmation'
                }
              </span>
            </div>
            
            {/* Progress bar for mobile */}
            <div className="w-full h-2 bg-white/30 rounded-full mb-2 sm:hidden">
              <div 
                className="h-2 bg-white rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
            
            {/* Desktop Stepper (Hidden on small screens) */}
            <div className="hidden sm:flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex flex-col items-center relative z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2",
                    step === s ? "bg-white text-[#7a3a95]" : 
                    step > s ? "bg-white text-[#7a3a95]" : 
                    "bg-white/30 text-white"
                  )}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className={`text-xs font-medium text-center ${step >= s ? 'text-white' : 'text-white/70'}`}>
                    {s === 1 ? 'Select Doctor' : 
                     s === 2 ? 'Date & Time' : 
                     s === 3 ? 'Your Details' : 
                     s === 4 ? 'Verification' : 'Confirmation'}
                  </span>
                </div>
              ))}
            </div>
          </div>          
          
          <div className="p-4 sm:p-6">
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Select Doctor</h2>
                
                <div className="space-y-4">
                  {doctors.length === 0 && !loading ? (
                    <p className="text-center text-gray-500 py-8">No doctors available at the moment.</p>
                  ) : (
                    doctors.map((doctor) => (
                    <div 
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all duration-200",
                        selectedDoctor === doctor.id 
                          ? "border-[#7a3a95] bg-purple-50 shadow-md" 
                          : "border-gray-200 hover:border-[#7a3a95] hover:bg-purple-50/50"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                          <img 
                            src={doctor.profile_image || doctor.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=7a3a95&color=fff`}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                              <p className="text-[#7a3a95] font-medium">{doctor.specialization || doctor.title || "Specialist"}</p>
                              <p className="text-gray-600 text-sm mt-1">{doctor.qualifications || ""}</p>
                            </div>
                            
                            {selectedDoctor === doctor.id && (
                              <div className="w-6 h-6 bg-[#7a3a95] rounded-full flex items-center justify-center mx-auto sm:mx-0 mt-2 sm:mt-0">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                            {doctor.specialties ? doctor.specialties.map((specialty, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-purple-100 text-[#7a3a95] text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            )) : null}
                          </div>
                          
                          <p className="text-gray-500 text-sm mt-2">{doctor.experience || ""}</p>
                        </div>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Select Date and Time */}
            {step === 2 && selectedDoctor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Select Date & Time</h2>
                
                <DoctorAvailabilityCalendar 
                  doctor={doctors.find(d => d.id === selectedDoctor)!}
                  onSelectSlot={(date, time) => {
                    setSelectedDate(date);
                    setSelectedTime(time);
                  }}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Your Details</h2>
                
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
                {/* OTP Timer */}
                {otpSent && !otpVerified && !verifyingOtp && (
                  <OTPTimer 
                    initialSeconds={600} 
                    onExpire={() => setOtpError("OTP expired. Please request a new one.")} 
                  />
                )}
                
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Verify Your Phone Number</h2>
                
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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
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
                          className="w-full sm:w-auto px-4 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 whitespace-nowrap flex items-center justify-center"
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
                          className="w-full sm:w-auto px-4 py-2 border border-[#7a3a95] text-[#7a3a95] rounded-lg hover:bg-purple-50 transition-colors duration-200 whitespace-nowrap flex items-center justify-center"
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-6 sm:mb-8">Your appointment has been successfully scheduled.</p>
                
                <div className="bg-purple-50 rounded-lg p-4 sm:p-6 max-w-md mx-auto mb-6 sm:mb-8">
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
                    Return Home
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="mt-8 flex justify-between">
                {step > 1 && step !== 3 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center px-4 py-2 text-[#7a3a95] hover:text-[#6a2a85] transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                  </button>
                )}
                
                {step < 3 && (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 ml-auto"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                )}
              </div>
            )}
            
            {/* Step 3 specific navigation */}
            {step === 3 && (
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center px-4 py-2 text-[#7a3a95] hover:text-[#6a2a85] transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                  </button>
                )}
                
                <button
                  onClick={handleSubmit}
                  disabled={bookingInProgress}
                  className="flex items-center px-6 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed ml-auto"
                >
                  {bookingInProgress ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// OTP Timer Component
interface OTPTimerProps {
  initialSeconds: number; // Initial time in seconds
  onExpire: () => void;   // Callback when timer expires
}

const OTPTimer: React.FC<OTPTimerProps> = ({ initialSeconds, onExpire }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    
    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [onExpire]); // Only depend on onExpire to avoid recreating the interval
  
  // Format the time as MM:SS
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  
  return (
    <div className="mb-4 text-center">
      <div className={`inline-block px-4 py-2 rounded-lg ${
        seconds < 60 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
      }`}>
        <span className="font-medium">Time remaining: </span>
        <span className="font-bold">{formattedTime}</span>
      </div>
    </div>
  );
};

export default BookAppointmentV2;