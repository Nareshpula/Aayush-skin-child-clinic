// Follow Deno's recommended practices for Edge Functions
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Parse request body
    const requestData = await req.json();
    const { phoneNumber, otpCode, messageType } = requestData;
    
    if (!phoneNumber) {
      throw new Error("Phone number is required");
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://gatgyhxtgqmzwjatbmzk.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseKey) {
      throw new Error("Supabase key is missing");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Prepare request to Fast2SMS API
    // Use environment variable if available, otherwise use hardcoded key
    const apiKey = Deno.env.get("FAST2SMS_API_KEY") || "OCAs6aBlJY4er89QZDjpIvXTkqbxKugWNdGwSHfMnmctoLE0y1XalLBSPQeqvG1rnshto84uFDjOyiVb";
    
    // Determine message template based on type
    // Using the correct template IDs as specified
    const messageId = messageType === "confirmation" ? "179394" : "179393"; // Correct template IDs
    const variablesValues = messageType === "confirmation" ? "|" : `${otpCode}|`; // Variables format is correct
    
    // Prepare request body
    const requestBody = {
      route: "dlt",
      sender_id: "SHSRA", // Correct sender ID
      message: messageId,
      variables_values: variablesValues,
      flash: 0,
      numbers: phoneNumber
    };
    
    // Make request to Fast2SMS API
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    
    // Parse response
    const result = await response.json();
    
    // Log the SMS attempt to the database
    try {
      await supabase.rpc('log_sms_attempt', {
        p_phone_number: phoneNumber,
        p_message_type: messageType,
        p_status: result.return ? "success" : "failed",
        p_response_data: result,
        p_error_message: result.return ? null : (result.message || "Unknown error")
      });
    } catch (logError) {
      console.error("Error logging SMS attempt:", logError);
    }
    
    if (!result.return) {
      throw new Error(result.message || "Failed to send SMS");
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `${messageType === "confirmation" ? "Confirmation" : "OTP"} sent successfully`
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to process request" 
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  }
});