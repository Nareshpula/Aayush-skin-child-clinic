/**
 * Utility functions for working with Supabase Edge Functions
 */

/**
 * Gets the correct URL for a Supabase Edge Function
 * @param functionName - The name of the Edge Function
 * @returns The full URL to the Edge Function
 */
export const getEdgeFunctionUrl = (functionName: string): string => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  
  if (!supabaseUrl) {
    console.error('VITE_SUPABASE_URL environment variable is not defined');
    return '';
  }
  
  return `${supabaseUrl}/functions/v1/${functionName}`;
};

/**
 * Calls a Supabase Edge Function
 * @param functionName - The name of the Edge Function
 * @param payload - The payload to send to the Edge Function
 * @returns Promise with the response
 */
export const callEdgeFunction = async (functionName: string, payload: any): Promise<any> => {
  try {
    const url = getEdgeFunctionUrl(functionName);
    
    if (!url) {
      throw new Error('Failed to construct Edge Function URL');
    }
    
    console.log(`Calling Edge Function: ${functionName}`);
    console.log(`URL: ${url}`);
    console.log(`Payload:`, payload);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response from Edge Function ${functionName}:`, errorText);
      throw new Error(`Edge Function ${functionName} returned status ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error calling Edge Function ${functionName}:`, error);
    throw error;
  }
};