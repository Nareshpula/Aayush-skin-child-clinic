/**
 * Utility functions for SMS operations
 */

/**
 * Sends an OTP via SMS
 * @param phoneNumber - The phone number to send the OTP to
 * @param otpCode - The OTP code to send
 * @returns Promise with the result
 */
export const sendOtpSms = async (phoneNumber: string, otpCode: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log(`Sending OTP ${otpCode} to ${phoneNumber}...`);
    console.log('Environment variables:', {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'defined' : 'undefined',
      supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'defined' : 'undefined'
    });
    
    // Get the Supabase URL and API key from environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Validate environment variables
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables:', { 
        supabaseUrl: supabaseUrl ? 'defined' : 'undefined', 
        supabaseKey: supabaseKey ? 'defined' : 'undefined' 
      });
      return { 
        success: false, 
        error: 'Missing Supabase configuration. Please check your environment variables.' 
      };
    }
    
    // Construct the Edge Function URL
    const url = `${supabaseUrl}/functions/v1/send-sms`;
    console.log(`Edge Function URL: ${url}`);
    
    // Call the Edge Function
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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
    console.log('OTP SMS result:', result);
    
    // Check if the Fast2SMS API returned an authentication error
    if (result.data && result.data.status_code === 412) {
      console.error('Fast2SMS authentication error:', result.data.message); 
      return { success: false, error: `SMS service authentication error: ${result.data.message}` };
    }
    
    if (!result.success) {
      console.error('SMS sending error:', result);
      return { success: false, error: result.error || 'Failed to send OTP' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP SMS:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred while sending OTP'
    };
  }
};

/**
 * Sends a confirmation SMS
 * @param phoneNumber - The phone number to send the confirmation to
 * @param appointmentDetails - The appointment details
 * @returns Promise with the result
 */
export const sendConfirmationSms = async (
  phoneNumber: string,
  appointmentDetails: {
    patientName: string,
    appointmentDate: string,
    appointmentTime: string
  }
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log(`Sending confirmation to ${phoneNumber}...`);
    console.log('Appointment details:', appointmentDetails);
    
    // Get the Supabase URL and API key from environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Validate environment variables
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return { 
        success: false, 
        error: 'Missing Supabase configuration. Please check your environment variables.' 
      };
    }
    
    // Validate appointment details
    if (!appointmentDetails || !appointmentDetails.patientName || !appointmentDetails.appointmentDate || !appointmentDetails.appointmentTime) {
      console.error('Invalid appointment details:', appointmentDetails);
      return { 
        success: false, 
        error: 'Invalid appointment details. Please provide patientName, appointmentDate, and appointmentTime.' 
      };
    }
    
    // Ensure the time is properly formatted
    let appointmentTime = appointmentDetails.appointmentTime;
    if (!appointmentTime.includes(':')) {
      appointmentTime = `${appointmentTime}:00`;
    }
    
    // Construct the Edge Function URL
    const url = `${supabaseUrl}/functions/v1/send-sms`;
    console.log(`Edge Function URL: ${url}`);
    
    // Call the Edge Function
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber,
        messageType: 'confirmation',
        appointmentDetails: {
          ...appointmentDetails,
          appointmentTime
        }
      })
    });
    
    if (!response.ok) {
      let errorMessage = `HTTP error: ${response.status}`;
      try {
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
    console.log('Confirmation SMS result:', result);
    
    // Check if the Fast2SMS API returned an authentication error
    if (result.data && result.data.status_code === 412) {
      console.error('Fast2SMS authentication error:', result.data.message);
      return { success: false, error: `SMS service authentication error: ${result.data.message}` };
    }
    
    if (!result.success) {
      console.error('SMS sending error:', result);
      return { success: false, error: result.error || 'Failed to send confirmation' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation SMS:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred while sending confirmation'
    };
  }
};