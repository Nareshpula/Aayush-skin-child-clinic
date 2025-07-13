/**
 * Utility functions for debugging SMS issues
 */

/**
 * Tests the OTP SMS functionality
 * @param phoneNumber - The phone number to send the OTP to
 * @returns Promise with the result
 */
export const testOtpSms = async (phoneNumber: string): Promise<any> => {
  try {
    console.log(`Testing OTP SMS to ${phoneNumber}...`);
    
    // Generate a test OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Call the Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber,
        otpCode,
        messageType: 'otp'
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Edge Function:', errorText);
      return {
        success: false,
        status: response.status,
        statusText: response.statusText,
        error: errorText
      };
    }
    
    const result = await response.json();
    console.log('OTP SMS result:', result);
    
    return {
      success: true,
      otpCode,
      result
    };
  } catch (error) {
    console.error('Error testing OTP SMS:', error);
    return {
      success: false,
      error: error.message || 'Unknown error'
    };
  }
};

/**
 * Tests the confirmation SMS functionality
 * @param phoneNumber - The phone number to send the confirmation to
 * @returns Promise with the result
 */
export const testConfirmationSms = async (phoneNumber: string): Promise<any> => {
  try {
    console.log(`Testing confirmation SMS to ${phoneNumber}...`);
    
    // Call the Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber,
        messageType: 'confirmation',
        appointmentDetails: {
          patientName: 'Test Patient',
          appointmentDate: new Date().toISOString().split('T')[0],
          appointmentTime: '14:30:00'
        }
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Edge Function:', errorText);
      return {
        success: false,
        status: response.status,
        statusText: response.statusText,
        error: errorText
      };
    }
    
    const result = await response.json();
    console.log('Confirmation SMS result:', result);
    
    return {
      success: true,
      result
    };
  } catch (error) {
    console.error('Error testing confirmation SMS:', error);
    return {
      success: false,
      error: error.message || 'Unknown error'
    };
  }
};

/**
 * Logs SMS-related information to help with debugging
 * @param info - The information to log
 */
export const logSmsDebugInfo = (info: any): void => {
  console.log('[SMS Debug]', info);
};