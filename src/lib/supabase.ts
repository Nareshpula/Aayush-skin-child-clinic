import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gatgyhxtgqmzwjatbmzk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhdGd5aHh0Z3FtendqYXRibXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2MzkwMzEsImV4cCI6MjA1MTIxNTAzMX0.NFTc_RRh8cADLNNb_N856RxoaA5PWxRjEayk_eBN6CI';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please check your environment variables.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Types for our database tables
export type Doctor = {
  id: number;
  name: string; 
  specialization: string;
  profile_image: string;
  available_days: string[];
  created_at?: string;
  // Additional fields for UI display
  title?: string;
  qualifications?: string;
  experience?: string;
  specialties?: string[];
  image_url?: string;
};

export type AppointmentSlot = {
  id: number;
  doctor_id: number;
  date: string;
  time: string;
  is_booked: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Appointment = {
  id: number;
  slot_id: number;
  patient_name: string;
  email?: string;
  phone_number: string;
  age: number;
  gender: string;
  reason?: string;
  patient_id?: string;
  created_at?: string;
  updated_at?: string;
  // Join with slot
  slot?: AppointmentSlot;
  // Join with doctor through slot
  doctor?: Doctor;
};

export type OTPConfirmation = {
  id: string;
  phone_number: string;
  otp_code: string;
  appointment_id?: number;
  is_verified: boolean;
  created_at?: string;
  expires_at: string;
};

// Fetch doctors from Supabase
export const fetchDoctors = async (): Promise<Doctor[]> => {
  const { data, error } = await supabase.from('doctors').select('*');
  
  if (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
  
  return data || [];
};

// Create appointment slot
export const createAppointmentSlot = async (slotData: Omit<AppointmentSlot, 'id' | 'created_at' | 'updated_at' | 'is_booked'>): Promise<{ success: boolean; data?: AppointmentSlot; error?: string }> => {
  const { data, error } = await supabase.rpc('update_appointment_slot', {
    p_id: null,
    p_doctor_id: slotData.doctor_id,
    p_date: slotData.date,
    p_time: slotData.time,
    p_is_booked: false
  });
  
  if (error) {
    console.error('Error creating appointment slot:', error);
    return { success: false, error: error.message };
  }
  
  return { success: true, data };
};

// Book an appointment
export const bookAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; data?: Appointment; error?: string }> => {
  const { data, error } = await supabase.rpc('insert_appointment', {
    slot_id: appointmentData.slot_id,
    patient_name: appointmentData.patient_name,
    email: appointmentData.email || null,
    phone_number: appointmentData.phone_number,
    age: appointmentData.age,
    gender: appointmentData.gender,
    reason: appointmentData.reason || null
  });
  
  if (error) {
    console.error('Error booking appointment:', error);
    return { success: false, error: error.message };
  }
  
  return { success: true, data };
};

// Generate and store OTP for appointment confirmation
export const generateOTP = async (phoneNumber: string, appointmentId?: number): Promise<{ success: boolean; otpCode?: string; error?: string }> => {
  try {
    console.log('Generating OTP for phone number:', phoneNumber);
    
    // Generate a random 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration time (10 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    console.log('Storing OTP in database with expiration:', expiresAt.toISOString());
    
    // Store OTP in database
    const { data, error } = await supabase.from('otp_confirmations').insert([{
        phone_number: phoneNumber,
        otp_code: otpCode,
        appointment_id: appointmentId,
        expires_at: expiresAt.toISOString()
      }]).select();
    
    if (error) {
      console.error('Error storing OTP:', error);
      return { success: false, error: error.message };
    }
    
    console.log('OTP generated successfully:', otpCode);
    return { success: true, otpCode };
  } catch (err) {
    console.error('Error generating OTP:', err);
    return { success: false, error: 'Failed to generate OTP' };
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber: string, otpCode: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Verifying OTP for phone number:', phoneNumber);
    
    // Get the most recent OTP for this phone number
    const { data, error } = await supabase.from('otp_confirmations').select()
      .eq('phone_number', phoneNumber)
      .eq('otp_code', otpCode)
      .eq('is_verified', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error || !data) {
      console.error('Error verifying OTP:', error);
      return { success: false, error: 'Invalid or expired OTP' };
    }
    
    console.log('OTP found in database, marking as verified');
    
    // Mark OTP as verified
    const { error: updateError } = await supabase.from('otp_confirmations').update([{ is_verified: true }])
      .eq('id', data.id);
    
    if (updateError) {
      console.error('Error updating OTP status:', updateError);
      return { success: false, error: updateError.message };
    }
    
    console.log('OTP verification successful');
    return { success: true };
  } catch (err) {
    console.error('Error verifying OTP:', err);
    return { success: false, error: 'Failed to verify OTP' };
  }
};

// Send OTP via SMS
export const sendOTP = async (phoneNumber: string, otpCode: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Sending OTP via Edge Function to:', phoneNumber);
    
    // Call Supabase Edge Function instead of direct API call
    const response = await fetch(`${supabaseUrl}/functions/v1/send-sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber,
        otpCode,
        messageType: 'otp'
      })
    });
    
    if (!response.ok) {
      let errorMessage = `HTTP error: ${response.status}`;
      try {
        // Try to parse error as JSON
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If not JSON, try to get text
        try {
          const errorText = await response.text();
          if (errorText) errorMessage = errorText;
        } catch (e2) {
          // If all else fails, use the status code
        }
      }
      console.error('Edge Function error:', errorMessage);
      return { success: false, error: `Failed to send OTP: ${errorMessage}` };
    }
    
    const result = await response.json();
    console.log('Edge Function response:', result);
    
    if (!result.success) {
      console.error('SMS sending error:', result);
      return { success: false, error: result.error || 'Failed to send OTP' };
    }
    
    return { success: true };
  } catch (err) {
    console.error('Error sending OTP:', err);
    return { success: false, error: 'Failed to send OTP' };
  }
};

// Send appointment confirmation via SMS
export const sendConfirmation = async (phoneNumber: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Sending confirmation via Edge Function to:', phoneNumber);
    
    // Call Supabase Edge Function instead of direct API call
    const response = await fetch(`${supabaseUrl}/functions/v1/send-sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber,
        messageType: 'confirmation'
      })
    });
    
    if (!response.ok) {
      let errorMessage = `HTTP error: ${response.status}`;
      try {
        // Try to parse error as JSON
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If not JSON, try to get text
        try {
          const errorText = await response.text();
          if (errorText) errorMessage = errorText;
        } catch (e2) {
          // If all else fails, use the status code
        }
      }
      console.error('Edge Function error:', errorMessage);
      return { success: false, error: `Failed to send confirmation: ${errorMessage}` };
    }
    
    const result = await response.json();
    console.log('Edge Function response:', result);
    
    if (!result.success) {
      console.error('SMS sending error:', result);
      return { success: false, error: result.error || 'Failed to send confirmation' };
    }
    
    return { success: true };
  } catch (err) {
    console.error('Error sending confirmation:', err);
    return { success: false, error: 'Failed to send confirmation' };
  }
};

// Get available slots for a specific doctor and date
export const getAvailableSlots = async (doctorId: number, date: string): Promise<AppointmentSlot[]> => {
  const { data, error } = await supabase.from('appointment_slots').select('*')
    .eq('doctor_id', doctorId)
    .eq('date', date)
    .eq('is_booked', false)
    .order('time');
  
  if (error) {
    console.error('Error fetching available slots:', error);
    return [];
  }
  
  return data || [];
};

// Get booked slots for a specific doctor and date
export const getBookedSlots = async (doctorId: number, date: string): Promise<string[]> => {
  const { data, error } = await supabase.from('appointment_slots').select('time')
    .eq('doctor_id', doctorId)
    .eq('date', date)
    .eq('is_booked', true);
  
  if (error) {
    console.error('Error fetching booked slots:', error);
    return [];
  }
  
  // Return the booked time slots
  return data?.map(item => item.time) || [];
};

// Check availability for a specific date and doctor
export const checkAvailability = async (doctorId: number, date: string): Promise<string[]> => {
  return getBookedSlots(doctorId, date);
};

// Get all appointments
export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const { data, error } = await supabase.rpc('get_appointments_with_details');
  
    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  
    // Transform the data to match the expected Appointment type
    const appointments = data?.map(item => ({
      id: item.id,
      slot_id: item.slot_id,
      patient_name: item.patient_name,
      email: item.email,
      phone_number: item.phone_number,
      age: item.age,
      gender: item.gender,
      reason: item.reason,
      patient_id: item.patient_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      slot: {
        id: item.slot_id,
        doctor_id: item.doctor_id,
        date: item.slot_date,
        time: item.slot_time,
        is_booked: true
      },
      doctor: {
        id: item.doctor_id,
        name: item.doctor_name,
        specialization: item.doctor_specialization
      }
    })) || [];
  
    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};

// Subscribe to real-time updates for appointments
export const subscribeToAppointments = (callback: (payload: any) => void) => {
  return supabase
    .channel('appointments-channel')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'aayush',
      table: 'appointments'
    }, callback)
    .subscribe();
};

// Subscribe to real-time updates for appointment slots
export const subscribeToAppointmentSlots = (callback: (payload: any) => void) => {
  return supabase
    .channel('appointment-slots-channel')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'aayush',
      table: 'appointment_slots'
    }, callback)
    .subscribe();
};