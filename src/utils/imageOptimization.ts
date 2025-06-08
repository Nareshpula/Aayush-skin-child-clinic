/**
 * Utility functions for image optimization
 */

/**
 * Converts a Supabase storage URL to a render/image URL with optimization parameters
 * 
 * @param url - The original Supabase storage URL
 * @param width - Optional width to resize the image
 * @param quality - Image quality (1-100)
 * @param format - Output format (webp, jpeg, png, avif)
 * @param fit - Resize fit mode (cover, contain, fill, inside, outside)
 * @returns Optimized image URL
 */
export const optimizeSupabaseImage = (
  url: string,
  width?: number,
  quality: number = 80,
  format: 'webp' | 'jpeg' | 'png' | 'avif' = 'webp',
  fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' = 'cover'
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
  optimizedUrl += `${optimizedUrl.includes('?') ? '&' : '?'}format=${format}&quality=${quality}&fit=${fit}`;
  
  return optimizedUrl;
};

/**
 * Generates a srcSet string for responsive images
 * 
 * @param url - The original image URL
 * @param widths - Array of widths to generate
 * @param quality - Image quality (1-100)
 * @param format - Output format (webp, jpeg, png, avif)
 * @returns srcSet string for use in img tag
 */
export const generateSrcSet = (
  url: string,
  widths: number[] = [320, 640, 960, 1280, 1920],
  quality: number = 80,
  format: 'webp' | 'jpeg' | 'png' | 'avif' = 'webp'
): string => {
  return widths
    .map(width => `${optimizeSupabaseImage(url, width, quality, format)} ${width}w`)
    .join(', ');
};

/**
 * Generates a sizes attribute string for responsive images
 * 
 * @param defaultSize - Default size for large screens
 * @returns sizes string for use in img tag
 */
export const generateSizes = (defaultSize: string = '100vw'): string => {
  return `(max-width: 768px) 100vw, ${defaultSize}`;
};

/**
 * Checks if the browser supports WebP format
 * 
 * @returns Promise that resolves to true if WebP is supported
 */
export const supportsWebP = async (): Promise<boolean> => {
  if (!window.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
};

/**
 * Gets the best supported image format for the current browser
 * 
 * @returns Promise that resolves to the best supported format
 */
export const getBestImageFormat = async (): Promise<'webp' | 'jpeg' | 'png'> => {
  const webpSupported = await supportsWebP();
  return webpSupported ? 'webp' : 'jpeg';
};

/**
 * Preloads an image
 * 
 * @param src - Image URL to preload
 * @returns Promise that resolves when the image is loaded
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};