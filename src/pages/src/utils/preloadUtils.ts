/**
 * Utility functions for preloading assets
 */

/**
 * Preloads critical assets for the website
 */
export const preloadCriticalAssets = (): void => {
  // Critical images to preload
  const criticalImages = [
    "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/playing-with-kids.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvcGxheWluZy13aXRoLWtpZHMubXA0IiwiaWF0IjoxNzQyNjU5MzM4LCJleHAiOjE5MDAzMzkzMzh9.a4f48hJOPjPHxMVHkwjKE9HCm6p0NbgvEgBJLoauuJU",
    "https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Skin-pages-image/Aayush-logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvU2tpbi1wYWdlcy1pbWFnZS9BYXl1c2gtbG9nby5wbmciLCJpYXQiOjE3NDM2OTk3MzAsImV4cCI6MTkwMTM3OTczMH0.pg25T9SRSiXE0jn46_vxVzTK_vlJGURYwbeRpbjnIF0"
  ];
  
  // Preload critical images
  criticalImages.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = url.endsWith('.mp4') ? 'video' : 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
  
  // Preload critical fonts
  const criticalFonts = [
    "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpUK4Zv-QXB0.woff2",
    "https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0C4n.woff2"
  ];
  
  criticalFonts.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = url;
    document.head.appendChild(link);
  });
  
  // Preload critical CSS
  const criticalCSS = [
    '/src/index.css'
  ];
  
  criticalCSS.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    document.head.appendChild(link);
  });
  
  // Preload critical JavaScript
  const criticalJS = [
    '/src/components/Navbar.tsx',
    '/src/components/Hero.tsx',
    '/src/components/FindDoctor.tsx'
  ];
  
  criticalJS.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Preloads images for a specific page
 * 
 * @param images - Array of image URLs to preload
 */
export const preloadPageImages = (images: string[]): void => {
  images.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * Preloads a video
 * 
 * @param src - Video URL to preload
 * @param type - Video MIME type
 */
export const preloadVideo = (src: string, type: string = 'video/mp4'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = src;
  link.type = type;
  document.head.appendChild(link);
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
 * Determines whether to preload assets based on connection speed
 * 
 * @returns Boolean indicating whether to preload assets
 */
export const shouldPreloadAssets = (): boolean => {
  // Don't preload on slow connections
  if (isSlowConnection()) {
    return false;
  }
  
  // Don't preload if the user has requested reduced data usage
  if (navigator.connection && (navigator as any).connection.saveData) {
    return false;
  }
  
  return true;
};