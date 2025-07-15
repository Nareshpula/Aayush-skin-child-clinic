/**
 * Utility functions for handling CORS issues
 */

/**
 * Creates CORS headers for fetch requests
 * @returns Object with CORS headers
 */
export const createCorsHeaders = () => {
  return {
    'Origin': window.location.origin,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

/**
 * Adds CORS headers to a fetch request
 * @param options - The fetch options
 * @returns Updated fetch options with CORS headers
 */
export const addCorsHeaders = (options: RequestInit = {}): RequestInit => {
  const headers = {
    ...createCorsHeaders(),
    ...options.headers
  };
  
  return {
    ...options,
    headers
  };
};

/**
 * Creates a preflight request to check CORS
 * @param url - The URL to check
 * @returns Promise with the result
 */
export const checkCorsAccess = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, {
      method: 'OPTIONS',
      headers: createCorsHeaders()
    });
    
    return response.ok;
  } catch (error) {
    console.error('CORS preflight check failed:', error);
    return false;
  }
};