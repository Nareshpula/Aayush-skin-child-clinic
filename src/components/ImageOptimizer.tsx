import React from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * ImageOptimizer - A component that optimizes images from Supabase storage
 * 
 * This component automatically:
 * 1. Converts Supabase storage URLs to render/image URLs
 * 2. Adds width, quality, and format parameters
 * 3. Generates appropriate srcSet for responsive images
 * 4. Handles lazy loading appropriately
 */
const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  format = 'webp',
  objectFit = 'cover',
  objectPosition = 'center',
}) => {
  // Check if this is a Supabase URL
  const isSupabaseUrl = src.includes('supabase.co/storage/v1/object/sign');
  
  // Function to optimize Supabase URLs
  const optimizeUrl = (url: string, imgWidth?: number): string => {
    if (!isSupabaseUrl) return url;
    
    // Convert to render/image endpoint
    const baseUrl = url.replace('/object/', '/render/image/');
    const separator = baseUrl.includes('?') ? '&' : '?';
    
    // Add optimization parameters
    let optimizedUrl = baseUrl;
    if (imgWidth) optimizedUrl += `${separator}width=${imgWidth}`;
    optimizedUrl += `${optimizedUrl.includes('?') ? '&' : '?'}format=${format}&quality=${quality}`;
    
    return optimizedUrl;
  };
  
  // Generate srcSet for responsive images
  const generateSrcSet = (): string | undefined => {
    if (!isSupabaseUrl || !width) return undefined;
    
    // Generate multiple sizes for different screen densities
    const widths = [
      Math.round(width * 0.5), // Small screens
      width,                    // Normal screens
      Math.round(width * 1.5),  // Retina screens
      Math.round(width * 2)     // High-DPI screens
    ].filter(w => w >= 100);    // Filter out very small sizes
    
    return widths
      .map(w => `${optimizeUrl(src, w)} ${w}w`)
      .join(', ');
  };
  
  // Generate sizes attribute
  const generateSizes = (): string | undefined => {
    if (!width) return undefined;
    return `(max-width: 768px) 100vw, ${width}px`;
  };
  
  const srcSet = generateSrcSet();
  const sizes = generateSizes();
  const optimizedSrc = optimizeUrl(src, width);
  
  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={`${className} transform-gpu backface-hidden`}
      style={{
        objectFit,
        objectPosition,
        imageRendering: '-webkit-optimize-contrast',
      }}
    />
  );
};

export default ImageOptimizer;