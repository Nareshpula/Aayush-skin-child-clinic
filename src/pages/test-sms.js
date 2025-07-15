// Test script for SMS functionality
const testSMS = async () => {
  try {
    console.log('Testing OTP SMS...');
    
    // Test OTP SMS
    const otpResponse = await fetch('https://gatgyhxtgqmzwjatbmzk.supabase.co/functions/v1/send-sms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhdGd5aHh0Z3Ftendq'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: '9876543210', // Replace with your test phone number
        otpCode: '123456',
        messageType: 'otp'
      })
    });
    
    const otpResult = await otpResponse.json();
    console.log('OTP SMS result:', otpResult);
    
    // Test confirmation SMS
    console.log('Testing confirmation SMS...');
    const confirmationResponse = await fetch('https://gatgyhxtgqmzwjatbmzk.supabase.co/functions/v1/send-sms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhdGd5aHh0Z3Ftendq'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: '9876543210', // Replace with your test phone number
        messageType: 'confirmation',
        appointmentDetails: {
          patientName: 'Test Patient',
          appointmentDate: '2025-07-15',
          appointmentTime: '14:30:00'
        }
      })
    });
    
    const confirmationResult = await confirmationResponse.json();
    console.log('Confirmation SMS result:', confirmationResult);
    
  } catch (error) {
    console.error('Error testing SMS:', error);
  }
};

// Run the test
testSMS();