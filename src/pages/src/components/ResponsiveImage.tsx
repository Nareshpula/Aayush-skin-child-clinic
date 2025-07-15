import React from 'react';

interface ResponsiveImageProps {
  src: string; 
  alt: string;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * ResponsiveImage component that generates srcSet for different screen sizes
 * 
 * This component automatically:
 * 1. Generates srcSet with multiple resolutions
 * 2. Adds sizes attribute for responsive behavior
 * 3. Optimizes Supabase URLs when possible
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  className = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
}) => {
  // Check if this is a Supabase URL
  const isSupabaseUrl = src.includes('supabase.co/storage/v1/object/sign');
  
  // Function to generate optimized URL
  const getOptimizedUrl = (url: string, width?: number, format: string = 'webp', quality: number = 80): string => {
    if (!isSupabaseUrl) return url;
    
    // Convert to render/image endpoint
    const baseUrl = url.replace('/object/', '/render/image/');
    const separator = baseUrl.includes('?') ? '&' : '?';
    
    // Add optimization parameters
    let optimizedUrl = baseUrl;
    if (width) optimizedUrl += `${separator}width=${width}`;
    optimizedUrl += `${optimizedUrl.includes('?') ? '&' : '?'}format=${format}&quality=${quality}`;
    
    return optimizedUrl;
  };
  
  // Generate srcSet with multiple resolutions
  const generateSrcSet = (): string => {
    if (!isSupabaseUrl) return src;

    // Generate appropriate widths based on the provided width or default sizes
    const baseWidth = width || 800;
    const widths = [
      Math.round(baseWidth * 0.5),  // Small screens
      baseWidth,                     // Medium screens
      Math.round(baseWidth * 1.5),   // Large screens
      Math.round(baseWidth * 2)      // High-DPI screens
    ].filter(w => w >= 100);         // Filter out any widths that are too small

    return widths
      .map(w => `${getOptimizedUrl(src, w, 'webp', 80)} ${w}w`)
      .join(', ');
  };
  
  return (
    <img
      src={getOptimizedUrl(src, width)}
      srcSet={generateSrcSet()}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height} 
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      className={`${className} transform-gpu backface-hidden will-change-transform`}
      style={{
        objectFit: 'cover',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden'
      }}
    />
  );
};

export default ResponsiveImage;