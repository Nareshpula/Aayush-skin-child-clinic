import { supabase } from './supabase';

/**
 * Type definition for doctor exception records
 */
export interface DoctorException {
  id: number;
  doctor_id: number;
  doctor_name: string;
  date: string;
  start_time: string;
  end_time: string;
  reason: string | null;
  created_at: string;
}

/**
 * Utility functions for handling timezone conversions between UTC and IST
 */

/**
 * Converts a UTC date to IST date
 * 
 * @param utcDate - Date in UTC timezone
 * @returns Date in IST timezone
 */
export const convertUTCtoIST = (utcDate: Date): Date => {
  return new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
};

/**
 * Converts an IST date to UTC date
 * 
 * @param istDate - Date in IST timezone
 * @returns Date in UTC timezone
 */
export const convertISTtoUTC = (istDate: Date): Date => {
  const utcDate = new Date(istDate.getTime());
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  return new Date(utcDate.getTime() - istOffset);
};

/**
 * Checks if a date is a Sunday in IST timezone
 * 
 * @param date - Date to check (in any timezone)
 * @returns Boolean indicating if the date is a Sunday in IST
 */
export const isSundayInIST = (date: Date): boolean => {
  const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  return istDate.getDay() === 0;
};

/**
 * Formats a time string (HH:MM:SS) to 12-hour format (HH:MM AM/PM)
 * 
 * @param timeString - Time string in 24-hour format (HH:MM:SS)
 * @returns Formatted time string in 12-hour format (HH:MM AM/PM)
 */
export const formatTime = (timeString: string): string => {
  // Check if time is already in 12-hour format
  if (timeString.includes('AM') || timeString.includes('PM')) {
    return timeString;
  }
  
  // Parse the time string
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  
  return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Formats a date object to a human-readable string (DD MMM YYYY)
 * 
 * @param date - Date object
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Gets the day name for a date in IST timezone
 * 
 * @param date - Date object (in any timezone)
 * @returns Day name in IST timezone
 */
export const getDayNameInIST = (date: Date): string => {
  return date.toLocaleString('en-US', { 
    timeZone: 'Asia/Kolkata',
    weekday: 'long' 
  });
};

/**
 * Determines if a given time is in the morning or evening slot
 * 
 * @param timeString - Time string in 24-hour format (HH:MM:SS)
 * @returns 'morning' or 'evening'
 */
export const getTimeSlotType = (timeString: string): 'morning' | 'evening' => {
  const hour = parseInt(timeString.split(':')[0]);
  return hour < 16 ? 'morning' : 'evening';
};

/**
 * Fetches all doctor exceptions from the database
 * 
 * @returns Promise with success status, data, and error message
 */
export const getDoctorExceptions = async (): Promise<{
  success: boolean;
  data?: DoctorException[];
  error?: string; 
}> => {
  try {
    // Use the RPC function to get doctor exceptions
    const { data, error } = await supabase.rpc('get_doctor_exceptions');

    if (error) {
      console.error('Error fetching doctor exceptions:', error);
      return {
        success: false,
        error: 'Failed to fetch doctor exceptions'
      };
    }

    // Check if the response has the expected structure
    if (!data.success) {
      console.error('Error in get_doctor_exceptions response:', data);
      return {
        success: false,
        error: 'Failed to fetch doctor exceptions'
      };
    }

    // Extract the exceptions from the response
    const exceptions = data.exceptions || [];

    return {
      success: true,
      data: exceptions
    };
  } catch (error) {
    console.error('Error in getDoctorExceptions:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while fetching doctor exceptions'
    };
  }
};

/**
 * Adds a new doctor exception to the database
 * 
 * @param doctorId - ID of the doctor
 * @param date - Date of the exception (YYYY-MM-DD)
 * @param startTime - Start time of the exception (HH:MM)
 * @param endTime - End time of the exception (HH:MM)
 * @param reason - Optional reason for the exception
 * @returns Promise with success status, data, and error message
 */
export const addDoctorException = async (
  doctorId: number,
  date: string,
  startTime: string,
  endTime: string,
  reason?: string
): Promise<{
  success: boolean;
  data?: DoctorException; 
  error?: string;
}> => {
  try {
    // Validate input
    if (!doctorId || !date || !startTime || !endTime) {
      return {
        success: false,
        error: 'All required fields must be provided'
      };
    }

    // Use the RPC function to add a doctor exception
    const { data, error } = await supabase.rpc('add_doctor_exception', {
      p_doctor_id: doctorId,
      p_date: date,
      p_start_time: startTime,
      p_end_time: endTime,
      p_reason: reason || null
    });

    if (error) {
      console.error('Error adding doctor exception:', error);
      return {
        success: false,
        error: 'Failed to add doctor exception'
      };
    }

    // Check if the response has the expected structure
    if (!data.success) {
      console.error('Error in add_doctor_exception response:', data);
      return {
        success: false,
        error: data.error || 'Failed to add doctor exception'
      };
    }

    return {
      success: true,
      data: data.exception
    };
  } catch (error) {
    console.error('Error in addDoctorException:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while adding the doctor exception'
    };
  }
};

/**
 * Removes a doctor exception from the database
 * 
 * @param exceptionId - ID of the exception to remove
 * @returns Promise with success status and error message
 */
export const removeDoctorException = async (exceptionId: number): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    if (!exceptionId) {
      return {
        success: false,
        error: 'Exception ID is required'
      };
    }

    // Use the RPC function to remove a doctor exception
    const { data, error } = await supabase.rpc('remove_doctor_exception', {
      p_exception_id: exceptionId
    });

    if (error) {
      console.error('Error removing doctor exception:', error);
      return {
        success: false,
        error: 'Failed to remove doctor exception'
      };
    }

    // Check if the response has the expected structure
    if (!data.success) {
      console.error('Error in remove_doctor_exception response:', data);
      return {
        success: false,
        error: data.error || 'Failed to remove doctor exception'
      };
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Error in removeDoctorException:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while removing the doctor exception'
    };
  }
};