// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_server

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Fast2SMS API key
const fast2smsApiKey = Deno.env.get("FAST2SMS_API_KEY") || "";

// SMS configuration
const SENDER_ID = "ACSHPL"; // Updated from SHSRA to ACSHPL
const OTP_TEMPLATE_ID = "188110"; // Updated from 179393 to 188110
const CONFIRMATION_TEMPLATE_ID = "188111"; // Updated from 179394 to 188111

// Function to format date for SMS (DD-MM-YYYY)
function formatDateForSMS(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Function to format time for SMS (HH:MM AM/PM IST)
function formatTimeForSMS(timeStr: string): string {
  // Parse the time string (expected format: "HH:MM:SS")
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  // Convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  
  // Format as HH:MM AM/PM IST
  return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period} IST`;
}

// Function to send SMS via Fast2SMS
async function sendSMS(phoneNumber: string, message: string, templateId: string) {
  try {
    const url = "https://www.fast2sms.com/dev/bulkV2";
    
    const params = new URLSearchParams({
      authorization: fast2smsApiKey,
      sender_id: SENDER_ID,
      message,
      route: "v3", // Use template route
      numbers: phoneNumber,
      flash: "0",
      template_id: templateId
    });
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: params.toString(),
    });
    
    const data = await response.json();
    
    // Log the SMS attempt
    await supabase.rpc("log_sms_attempt", {
      p_phone_number: phoneNumber,
      p_message_type: templateId === OTP_TEMPLATE_ID ? "otp" : "confirmation",
      p_status: data.return ? "success" : "failed",
      p_response_data: data,
      p_error_message: data.return ? null : data.message
    });
    
    return data;
  } catch (error) {
    console.error("Error sending SMS:", error);
    
    // Log the error
    await supabase.rpc("log_sms_attempt", {
      p_phone_number: phoneNumber,
      p_message_type: templateId === OTP_TEMPLATE_ID ? "otp" : "confirmation",
      p_status: "error",
      p_response_data: null,
      p_error_message: error.message
    });
    
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Parse the request body
    const { phoneNumber, otpCode, messageType, appointmentDetails } = await req.json();
    
    // Validate required parameters
    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone number is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid phone number format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    let result;
    
    // Send OTP or confirmation message based on messageType
    if (messageType === "otp") {
      // Validate OTP code
      if (!otpCode) {
        return new Response(
          JSON.stringify({ success: false, error: "OTP code is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // Send OTP message
      const message = otpCode; // The OTP code is the variable in the template
      result = await sendSMS(phoneNumber, message, OTP_TEMPLATE_ID);
    } else if (messageType === "confirmation") {
      // Validate appointment details for confirmation message
      if (!appointmentDetails) {
        return new Response(
          JSON.stringify({ success: false, error: "Appointment details are required for confirmation message" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const { patientName, appointmentDate, appointmentTime } = appointmentDetails;
      
      if (!patientName || !appointmentDate || !appointmentTime) {
        return new Response(
          JSON.stringify({ success: false, error: "Patient name, appointment date, and time are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // Format date and time for SMS
      const formattedDate = formatDateForSMS(new Date(appointmentDate));
      const formattedTime = formatTimeForSMS(appointmentTime);
      
      // Create variables array for template
      const variables = [patientName, formattedDate, formattedTime];
      
      // Join variables with # delimiter for Fast2SMS template
      const message = variables.join("#");
      
      // Send confirmation message
      result = await sendSMS(phoneNumber, message, CONFIRMATION_TEMPLATE_ID);
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid message type" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    // Return the result
    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});