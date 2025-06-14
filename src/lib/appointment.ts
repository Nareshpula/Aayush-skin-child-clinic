import { supabase } from './supabase';

export interface DoctorException {
  id: number;
  doctor_id: number;
  doctor_name?: string;
  date: string;
  start_time: string;
  end_time: string;
  reason?: string;
}

export interface AvailableSlot {
  time_slot: string;
  is_available: boolean;
}

export interface AppointmentDetails {
  id: number;
  doctor_id: number;
  patient_name: string;
  patient_phone: string;
  date: string;
  time: string;
  email?: string;
  age?: number;
  gender?: string;
  reason?: string;
  patient_id?: string;
}

/**
 * Book an appointment with a doctor
 * 
 * @param doctorId - The ID of the doctor
 * @param patientName - The name of the patient
 * @param patientPhone - The phone number of the patient
 * @param date - The date of the appointment (YYYY-MM-DD)
 * @param time - The time of the appointment (HH:MM:SS)
 * @param email - The email of the patient (optional)
 * @param age - The age of the patient (optional)
 * @param gender - The gender of the patient (optional)
 * @param reason - The reason for the appointment (optional)
 * @returns A promise that resolves to the appointment details
 */
export const bookAppointment = async (
  doctorId: number,
  patientName: string,
  patientPhone: string,
  date: string,
  time: string,
  email?: string,
  age?: number,
  gender?: string,
  reason?: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('book_appointment', {
      p_doctor_id: doctorId,
      p_patient_name: patientName,
      p_patient_phone: patientPhone,
      p_date: date,
      p_time: time,
      p_email: email || null,
      p_age: age || null,
      p_gender: gender || null,
      p_reason: reason || null
    });

    if (error) {
      console.error('Error booking appointment:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error booking appointment:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Get available slots for a doctor on a specific date
 * 
 * @param doctorId - The ID of the doctor
 * @param date - The date to check (YYYY-MM-DD)
 * @returns A promise that resolves to an array of available slots
 */
export const getAvailableSlots = async (
  doctorId: number,
  date: string
): Promise<{ success: boolean; data?: AvailableSlot[]; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('get_available_slots', {
      p_doctor_id: doctorId,
      p_date: date
    });

    if (error) {
      console.error('Error fetching available slots:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error fetching available slots:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Get doctor exceptions (unavailable time ranges)
 * 
 * @param doctorId - The ID of the doctor (optional)
 * @param startDate - The start date (optional, defaults to today)
 * @param endDate - The end date (optional, defaults to 30 days from today)
 * @returns A promise that resolves to an array of doctor exceptions
 */
export const getDoctorExceptions = async (
  doctorId?: number,
  startDate?: string,
  endDate?: string
): Promise<{ success: boolean; data?: DoctorException[]; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('get_doctor_exceptions', {
      p_doctor_id: doctorId || null,
      p_start_date: startDate || null,
      p_end_date: endDate || null
    });

    if (error) {
      console.error('Error fetching doctor exceptions:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error fetching doctor exceptions:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Add a doctor exception (unavailable time range)
 * 
 * @param doctorId - The ID of the doctor
 * @param date - The date of the exception (YYYY-MM-DD)
 * @param startTime - The start time of the exception (HH:MM:SS)
 * @param endTime - The end time of the exception (HH:MM:SS)
 * @param reason - The reason for the exception (optional)
 * @returns A promise that resolves to the exception details
 */
export const addDoctorException = async (
  doctorId: number,
  date: string,
  startTime: string,
  endTime: string,
  reason?: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('add_doctor_exception', {
      p_doctor_id: doctorId,
      p_date: date,
      p_start_time: startTime,
      p_end_time: endTime,
      p_reason: reason || null
    });

    if (error) {
      console.error('Error adding doctor exception:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error adding doctor exception:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Remove a doctor exception
 * 
 * @param exceptionId - The ID of the exception to remove
 * @returns A promise that resolves to a success message
 */
export const removeDoctorException = async (
  exceptionId: number
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('remove_doctor_exception', {
      p_exception_id: exceptionId
    });

    if (error) {
      console.error('Error removing doctor exception:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error removing doctor exception:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Get appointments for a specific doctor or all doctors
 * 
 * @param doctorId - The ID of the doctor (optional)
 * @param startDate - The start date (optional, defaults to today)
 * @param endDate - The end date (optional, defaults to 30 days from today)
 * @returns A promise that resolves to an array of appointments
 */
export const getAppointments = async (
  doctorId?: number,
  startDate?: string,
  endDate?: string
): Promise<{ success: boolean; data?: AppointmentDetails[]; error?: string }> => {
  try {
    // Use the existing get_appointments_with_details function and filter the results
    const { data, error } = await supabase.rpc('get_appointments_with_details');

    if (error) {
      console.error('Error fetching appointments:', error);
      return { success: false, error: error.message };
    }

    // Filter the results based on the parameters
    let filteredData = data;
    
    if (doctorId) {
      filteredData = filteredData.filter(appointment => appointment.doctor_id === doctorId);
    }
    
    if (startDate) {
      filteredData = filteredData.filter(appointment => appointment.slot_date >= startDate);
    }
    
    if (endDate) {
      filteredData = filteredData.filter(appointment => appointment.slot_date <= endDate);
    }

    // Transform the data to match the AppointmentDetails interface
    const transformedData = filteredData.map(appointment => ({
      id: appointment.id,
      doctor_id: appointment.doctor_id,
      patient_name: appointment.patient_name,
      patient_phone: appointment.phone_number,
      date: appointment.slot_date,
      time: appointment.slot_time,
      email: appointment.email,
      age: appointment.age,
      gender: appointment.gender,
      reason: appointment.reason,
      patient_id: appointment.patient_id
    }));

    return { success: true, data: transformedData };
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};