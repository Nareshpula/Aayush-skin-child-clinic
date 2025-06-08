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
  const getOptimizedUrl = (url: string, width?: number): string => {
    if (!isSupabaseUrl) return url;
    
    // Convert to render/image endpoint
    const baseUrl = url.replace('/object/', '/render/image/');
    const separator = baseUrl.includes('?') ? '&' : '?';
    
    // Add optimization parameters
    let optimizedUrl = baseUrl;
    if (width) optimizedUrl += `${separator}width=${width}`;
    optimizedUrl += `${optimizedUrl.includes('?') ? '&' : '?'}format=webp&quality=80`;
    
    return optimizedUrl;
  };
  
  // Generate srcSet with multiple resolutions
  const generateSrcSet = (): string => {
    if (!isSupabaseUrl) return src;
    
    const widths = [320, 640, 960, 1280, 1920];
    return widths
      .map(w => `${getOptimizedUrl(src, w)} ${w}w`)
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
      className={`${className} transform-gpu backface-hidden`}
    />
  );
};

export default ResponsiveImage;