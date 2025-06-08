/**
 * Utility functions for video optimization
 */

/**
 * Checks if the browser supports a specific video format
 * 
 * @param format - Video format to check (mp4, webm, ogg)
 * @returns Boolean indicating if the format is supported
 */
export const supportsVideoFormat = (format: 'mp4' | 'webm' | 'ogg'): boolean => {
  const video = document.createElement('video');
  
  switch (format) {
    case 'mp4':
      return video.canPlayType('video/mp4') !== '';
    case 'webm':
      return video.canPlayType('video/webm') !== '';
    case 'ogg':
      return video.canPlayType('video/ogg') !== '';
    default:
      return false;
  }
};

/**
 * Gets the best supported video format for the current browser
 * 
 * @returns The best supported video format
 */
export const getBestVideoFormat = (): 'mp4' | 'webm' | 'ogg' => {
  if (supportsVideoFormat('webm')) return 'webm';
  if (supportsVideoFormat('mp4')) return 'mp4';
  if (supportsVideoFormat('ogg')) return 'ogg';
  return 'mp4'; // Default to mp4 as fallback
};

/**
 * Preloads a video's metadata
 * 
 * @param src - Video URL to preload
 * @returns Promise that resolves when the video metadata is loaded
 */
export const preloadVideoMetadata = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => resolve();
    video.onerror = reject;
    video.src = src;
  });
};

/**
 * Checks if the connection is slow
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
 * Gets the appropriate video quality based on connection speed
 * 
 * @returns Quality string (low, medium, high)
 */
export const getAppropriateVideoQuality = (): 'low' | 'medium' | 'high' => {
  const connection = (navigator as any).connection;
  
  if (!connection) return 'medium';
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return 'low';
  }
  
  if (connection.effectiveType === '3g') {
    return 'medium';
  }
  
  return 'high';
};

/**
 * Generates a poster image URL from a video URL (for Supabase videos)
 * 
 * @param videoUrl - The Supabase video URL
 * @returns URL for a poster image
 */
export const generatePosterFromVideo = (videoUrl: string): string => {
  // If it's a Supabase URL, try to generate a poster
  if (videoUrl.includes('supabase.co/storage/v1/object/sign')) {
    // Get the path part of the URL
    const pathMatch = videoUrl.match(/sign\/([^?]+)/);
    if (pathMatch && pathMatch[1]) {
      const videoPath = pathMatch[1];
      const videoPathWithoutExt = videoPath.substring(0, videoPath.lastIndexOf('.'));
      
      // Construct a poster URL with the same base path but .jpg extension
      const posterPath = `${videoPathWithoutExt}.jpg`;
      return videoUrl.replace(videoPath, posterPath);
    }
  }
  
  // Return empty string if we can't generate a poster
  return '';
};