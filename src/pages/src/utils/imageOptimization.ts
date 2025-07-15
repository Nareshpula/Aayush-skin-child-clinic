/**
 * Utility functions for image optimization
 */

/**
 * Optimizes a Supabase image URL by adding width, quality, and format parameters
 * 
 * @param url - The original Supabase URL
 * @param width - Optional width to resize the image to
 * @param quality - Image quality (1-100)
 * @param format - Image format (webp, jpeg, png, avif)
 * @returns Optimized URL
 */
export const optimizeSupabaseImage = (
  url: string,
  width?: number,
  quality: number = 80,
  format: string = 'webp'
): string => {
  // Check if this is a Supabase URL
  if (!url.includes('supabase.co/storage/v1/object/sign')) {
    return url;
  }
  
  // Convert to render/image endpoint
  const baseUrl = url.replace('/object/', '/render/image/');
  const separator = baseUrl.includes('?') ? '&' : '?';
  
  // Add optimization parameters
  let optimizedUrl = baseUrl;
  if (width) optimizedUrl += `${separator}width=${width}`;
  optimizedUrl += `${optimizedUrl.includes('?') ? '&' : '?'}format=${format}&quality=${quality}`;
  
  return optimizedUrl;
};

/**
 * Generates a srcSet string for responsive images
 * 
 * @param url - The original Supabase URL
 * @param widths - Array of widths to include in the srcSet
 * @param quality - Image quality (1-100)
 * @param format - Image format (webp, jpeg, png, avif)
 * @returns srcSet string
 */
export const generateSrcSet = (
  url: string,
  widths: number[],
  quality: number = 80,
  format: string = 'webp'
): string => {
  return widths
    .map(w => `${optimizeSupabaseImage(url, w, quality, format)} ${w}w`)
    .join(', ');
};

/**
 * Generates a sizes attribute for responsive images
 * 
 * @param defaultSize - Default size for larger screens
 * @returns sizes string
 */
export const generateSizes = (defaultSize: string): string => {
  return `(max-width: 768px) 100vw, ${defaultSize}`;
};

/**
 * Determines if the connection is slow
 * 
 * @returns Boolean indicating if the connection is slow
 */
export const isSlowConnection = (): boolean => {
  const connection = (navigator as any).connection;
  
  if (!connection) return false;
  
  // Check if the connection is slow based on effectiveType
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return true;
  }
  
  // Check if the connection is slow based on downlink
  if (connection.downlink < 1.5) {
    return true;
  }
  
  return false;
};

/**
 * Gets the appropriate image quality based on connection speed
 * 
 * @returns Quality value (1-100)
 */
export const getAppropriateImageQuality = (): number => {
  const connection = (navigator as any).connection;
  
  if (!connection) return 80;
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return 60;
  }
  
  if (connection.effectiveType === '3g') {
    return 70;
  }
  
  return 80;
};

/**
 * Gets the appropriate image format based on browser support
 * 
 * @returns Format string (webp, avif, jpeg)
 */
export const getAppropriateImageFormat = (): string => {
  // Check for AVIF support
  const canUseAvif = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  };
  
  // Check for WebP support
  const canUseWebP = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };
  
  if (canUseAvif()) return 'avif';
  if (canUseWebP()) return 'webp';
  return 'jpeg';
};