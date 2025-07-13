import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

// Create Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const fast2smsApiKey = Deno.env.get("FAST2SMS_API_KEY") || ""; // ✅ Secure API key from environment variable

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// SMS configuration
const SENDER_ID = "ACSHPL";
const OTP_TEMPLATE_ID = "188110";
const CONFIRMATION_TEMPLATE_ID = "188111";

// Function to format date for SMS (DD-MM-YYYY)
function formatDateForSMS(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Function to format time for SMS (HH:MM AM/PM IST)
function formatTimeForSMS(timeStr: string): string {
  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period} IST`;
}

// ✅ New Fast2SMS handler with proper DLT JSON format
async function sendSMS(phoneNumber: string, variablesValues: string, templateId: string) {
  try {
    const url = "https://www.fast2sms.com/dev/bulkV2";
    const payload = {
      route: "dlt",
      sender_id: SENDER_ID,
      message: templateId,
      variables_values: variablesValues,
      schedule_time: "",
      flash: 0,
      numbers: phoneNumber
    };

    console.log(`Sending SMS to ${phoneNumber} with template ${templateId}`);
    console.log(`Payload: ${JSON.stringify(payload)}`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "authorization": fast2smsApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(`Fast2SMS response: ${JSON.stringify(data)}`);

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
  if (req.method.toUpperCase() === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    console.log(`Received ${req.method} request to send-sms function`);

    const { phoneNumber, otpCode, messageType, appointmentDetails } = await req.json();

    if (!phoneNumber) {
      return new Response(JSON.stringify({
        success: false,
        error: "Phone number is required"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid phone number format"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    let result;

    if (messageType === "otp") {
      if (!otpCode) {
        return new Response(JSON.stringify({
          success: false,
          error: "OTP code is required"
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      console.log(`Sending OTP SMS to ${phoneNumber} with code ${otpCode}`);
      const variablesValues = otpCode;
      result = await sendSMS(phoneNumber, variablesValues, OTP_TEMPLATE_ID);

    } else if (messageType === "confirmation") {
      if (!appointmentDetails) {
        return new Response(JSON.stringify({
          success: false,
          error: "Appointment details are required"
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const { patientName, appointmentDate, appointmentTime } = appointmentDetails;

      if (!patientName || !appointmentDate || !appointmentTime) {
        return new Response(JSON.stringify({
          success: false,
          error: "Patient name, appointment date, and time are required"
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const formattedDate = formatDateForSMS(new Date(appointmentDate));
      const formattedTime = formatTimeForSMS(appointmentTime);
      const variablesValues = `${patientName}|${formattedDate}|${formattedTime}`;

      console.log(`Sending confirmation SMS to ${phoneNumber} with: ${variablesValues}`);
      result = await sendSMS(phoneNumber, variablesValues, CONFIRMATION_TEMPLATE_ID);

    } else {
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid message type"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: result
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Unhandled error:", error);

    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Unknown error"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
