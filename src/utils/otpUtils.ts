/**
 * Utility functions for OTP verification
 */
import { supabase } from '@/lib/supabase';

/**
 * Generates and stores an OTP in the database
 * @param phoneNumber - The phone number to generate the OTP for
 * @returns Promise with the generated OTP
 */
export const generateAndStoreOtp = async (phoneNumber: string): Promise<{ 
  success: boolean; 
  otpCode?: string; 
  error?: string 
}> => {
  try {
    // Generate a 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the OTP in the database
    const { data, error } = await supabase.rpc('generate_otp', {
      p_otp_code: otpCode,
      p_phone_number: phoneNumber
    });
    
    if (error) {
      console.error('Error storing OTP:', error);
      return { success: false, error: 'Failed to store OTP' };
    }
    
    if (!data.success) {
      console.error('Error in generate_otp response:', data);
      return { success: false, error: data.error || 'Failed to store OTP' };
    }
    
    return { success: true, otpCode };
  } catch (error) {
    console.error('Error generating and storing OTP:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Verifies an OTP
 * @param phoneNumber - The phone number to verify the OTP for
 * @param otpCode - The OTP code to verify
 * @returns Promise with the verification result
 */
export const verifyOtp = async (phoneNumber: string, otpCode: string): Promise<{ 
  success: boolean; 
  error?: string 
}> => {
  try {
    // Verify the OTP
    const { data, error } = await supabase.rpc('verify_otp', {
      p_phone_number: phoneNumber,
      p_otp_code: otpCode
    });
    
    if (error) {
      console.error('Error verifying OTP:', error);
      return { success: false, error: 'Failed to verify OTP' };
    }
    
    if (!data.success) {
      console.error('Error in verify_otp response:', data);
      return { success: false, error: data.error || 'Invalid or expired OTP' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};