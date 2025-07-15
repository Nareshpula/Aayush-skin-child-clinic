import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase, Doctor, fetchDoctors, bookAppointmentDirect } from '@/lib/supabase';
import { sendOtpSms, sendConfirmationSms } from '@/utils/smsUtils';
import { generateAndStoreOtp, verifyOtp } from '@/utils/otpUtils';
import { Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import DoctorAvailabilityCalendar from '@/components/DoctorAvailabilityCalendar';
import { isSunday, formatTime, formatDateForDisplay, isDateTodayOrPast, isDateFuture, parseDateInIST } from '@/utils/timeZoneUtils';

/**
 * BookAppointmentV2 Component
 * Handles the appointment booking process with improved date selection and validation
 */
const BookAppointmentV2 = () => {
  // State for form data
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    age: '',
    gender: '',
    reason: ''
  });

  // State for doctors and selected doctor
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // State for appointment date and time
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // State for form submission
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);

  // State for OTP verification
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  // Ref for scrolling to the form
  const formRef = useRef<HTMLDivElement>(null);

  // Load doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorsData = await fetchDoctors();
        setDoctors(doctorsData);
        
        // Set the first doctor as selected by default
        if (doctorsData.length > 0) {
          setSelectedDoctor(doctorsData[0]);
        }
      } catch (error) {
        console.error('Error loading doctors:', error);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoadingDoctors(false);
      }
    };
    
    loadDoctors();
  }, []);

  // Handle doctor selection
  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate('');
    setSelectedTime('');
  };

  // Handle date and time selection
  const handleSlotSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setError('Please select a doctor, date, and time slot');
      return;
    }
    
    if (!formData.patientName || !formData.phoneNumber) {
      setError('Please enter your name and phone number');
      return;
    }
    
    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Reset error
    setError(null);
    setSubmitting(true);
    
    try {
      // Send OTP for verification
      // Generate and store OTP in the database
      const { success: otpStoreSuccess, otpCode, error: otpStoreError } = await generateAndStoreOtp(formData.phoneNumber);
      
      if (!otpStoreSuccess) {
        setError(otpStoreError || 'Failed to generate OTP. Please try again.');
        return;
      }
      
      // Send the OTP via SMS
      const { success: otpSendSuccess, error: otpSendError } = await sendOtpSms(formData.phoneNumber, otpCode!);
      
      if (!otpSendSuccess) {
        setError(otpSendError || 'Failed to send OTP. Please try again.');
        return;
      }
      
      // Show OTP verification form
      setShowOtpVerification(true);
      setOtpSent(true);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Verify OTP and book appointment
  const verifyOtpAndBookAppointment = async () => {
    if (!otpCode) {
      setOtpError('Please enter the OTP');
      return;
    }
    
    setVerifyingOtp(true);
    setOtpError(null);
    
    try {
      // Verify the OTP using our utility function
      const { success: otpVerifySuccess, error: otpVerifyError } = await verifyOtp(formData.phoneNumber, otpCode);
      
      if (!otpVerifySuccess) {
        setOtpError(otpVerifyError || 'Invalid or expired OTP. Please try again.');
        return;
      }
      
      // Book the appointment
      const { success, data: appointmentData, error: bookingError } = await bookAppointmentDirect(
        selectedDoctor!.id,
        formData.patientName,
        formData.phoneNumber,
        selectedDate,
        selectedTime,
        formData.email || undefined,
        formData.age ? parseInt(formData.age) : undefined,
        formData.gender || undefined,
        formData.reason || undefined
      );
      
      if (!success) {
        setOtpError(bookingError || 'Failed to book appointment. Please try again.');
        return;
      }
      
      // Send confirmation SMS
      const confirmationResult = await sendConfirmationSms(formData.phoneNumber, {
          patientName: formData.patientName,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime
      });
      
      if (!confirmationResult.success) {
        console.warn('Failed to send confirmation SMS:', confirmationResult.error);
      }
      
      // Show success message
      setSuccess(true);
      setAppointmentDetails(appointmentData);
      
      // Reset form
      setFormData({
        patientName: '',
        phoneNumber: '',
        email: '',
        age: '',
        gender: '',
        reason: ''
      });
      setSelectedDate('');
      setSelectedTime('');
      setShowOtpVerification(false);
      setOtpCode('');
    } catch (err) {
      console.error('Error verifying OTP or booking appointment:', err);
      setOtpError('An unexpected error occurred. Please try again.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSendingOtp(true);
    
    try {
      // Generate and store a new OTP
      const { success: otpStoreSuccess, otpCode: newOtpCode, error: otpStoreError } = await generateAndStoreOtp(formData.phoneNumber);
      
      if (!otpStoreSuccess) {
        setOtpError(otpStoreError || 'Failed to generate OTP. Please try again.');
        return;
      }
      
      // Send the new OTP via SMS
      const { success, error } = await sendOtpSms(formData.phoneNumber, newOtpCode!);
    
      if (!success) {
        setOtpError(error || 'Failed to resend OTP. Please try again.');
      } else {
        setOtpSent(true);
        setOtpError(null);
      }
    } catch (err) {
      console.error('Error resending OTP:', err);
      setOtpError('An unexpected error occurred. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  // Book another appointment (reset form)
  const bookAnother = () => {
    setSuccess(false);
    setAppointmentDetails(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-36 pb-16 book-appointment-page">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
            <p className="text-gray-600">Schedule your visit with our expert doctors</p>
          </div>
          
          {success ? (
            // Success Message
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
              
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked. We've sent a confirmation to your phone.
              </p>
              
              {appointmentDetails && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Patient ID</p>
                      <p className="font-medium text-gray-900">{appointmentDetails.patient_id}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Patient Name</p>
                      <p className="font-medium text-gray-900">{appointmentDetails.patient_name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium text-gray-900">{appointmentDetails.doctor_name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium text-gray-900">
                        {formatDateForDisplay(parseDateInIST(appointmentDetails.appointment_date))}, 
                        {formatTime(appointmentDetails.appointment_time.substring(0, 5))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={bookAnother}
                className="px-6 py-3 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200"
              >
                Book Another Appointment
              </button>
            </motion.div>
          ) : (
            // Appointment Booking Form
            <div className="grid md:grid-cols-5 gap-8">
              {/* Left Column - Doctor Selection */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Doctor</h2>
                  
                  {loadingDoctors ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-4 border-[#7a3a95] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : doctors.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No doctors available</p>
                  ) : (
                    <div className="space-y-4">
                      {doctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          onClick={() => handleDoctorSelect(doctor)}
                          className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedDoctor?.id === doctor.id
                              ? 'bg-purple-50 border-2 border-[#7a3a95]'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                              <img
                                src={doctor.profile_image}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                              <p className="text-sm text-[#7a3a95]">{doctor.specialization}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Date & Time Selection */}
                {selectedDoctor && (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <DoctorAvailabilityCalendar
                      doctor={selectedDoctor}
                      onSelectSlot={handleSlotSelect}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                    />
                  </div>
                )}
              </div>
              
              {/* Right Column - Patient Information Form */}
              <div className="md:col-span-3" ref={formRef}>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
                  
                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                      {error}
                    </div>
                  )}
                  
                  {showOtpVerification ? (
                    // OTP Verification Form
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="text-blue-700">
                          We've sent a verification code to {formData.phoneNumber}. Please enter it below to confirm your appointment.
                        </p>
                      </div>
                      
                      {otpError && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                          {otpError}
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Verification Code
                        </label>
                        <input
                          type="text"
                          id="otpCode"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Enter 6-digit code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                          maxLength={6}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={verifyOtpAndBookAppointment}
                          disabled={verifyingOtp}
                          className="flex-1 px-6 py-3 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {verifyingOtp ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            'Verify & Book Appointment'
                          )}
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={sendingOtp}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {sendingOtp ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Resend Code'
                          )}
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setShowOtpVerification(false)}
                          className="text-[#7a3a95] hover:text-[#6a2a85] transition-colors duration-200"
                        >
                          Back to Form
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Patient Information Form
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="10-digit mobile number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit phone number"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                            Age (Optional)
                          </label>
                          <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Enter your age"
                            min="0"
                            max="120"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender (Optional)
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                          Reason for Visit (Optional)
                        </label>
                        <textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your symptoms or reason for visit"
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                        ></textarea>
                      </div>
                      
                      {/* Appointment Summary */}
                      {selectedDoctor && selectedDate && selectedTime && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-medium text-[#7a3a95] mb-2 break-words">Appointment Summary</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Doctor:</span>{' '}
                              <span className="font-medium text-gray-900">{selectedDoctor.name}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Specialization:</span>{' '}
                              <span className="font-medium text-gray-900">{selectedDoctor.specialization}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Date:</span>{' '}
                              <span className="font-medium text-gray-900">
                                {formatDateForDisplay(parseDateInIST(selectedDate))}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Time:</span>{' '}
                              <span className="font-medium text-gray-900">
                                {formatTime(selectedTime)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Today's date warning */}
                      {selectedDate && isDateTodayOrPast(parseDateInIST(selectedDate)) && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                          <div className="flex items-start">
                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-red-700 text-sm font-medium">
                                Same-day appointments may have limited availability
                              </p>
                              <p className="text-red-600 text-sm mt-1">
                                Please call our clinic directly for urgent appointments or consider selecting a future date.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={submitting || !selectedDoctor || !selectedDate || !selectedTime}
                          className="w-full px-6 py-3 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Book Appointment'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentV2;