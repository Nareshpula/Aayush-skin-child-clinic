import React from 'react';
import { optimizeSupabaseImage, generateSrcSet, generateSizes } from '@/utils/imageOptimization';

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
  
  // Generate srcSet and sizes
  const srcSet = isSupabaseUrl && width ? 
    generateSrcSet(src, [
      Math.round(width * 0.5), // Small screens
      width,                    // Normal screens
      Math.round(width * 1.5),  // Retina screens
      Math.round(width * 2)     // High-DPI screens
    ].filter(w => w >= 100), quality, format) : 
    undefined;
  
  const sizes = width ? generateSizes(`${width}px`) : undefined;
  const optimizedSrc = isSupabaseUrl ? 
    optimizeSupabaseImage(src, width, quality, format) : 
    src;
  
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
        transform: 'translateZ(0)', 
        perspective: '1000px',
        WebkitFontSmoothing: 'subpixel-antialiased'
      }}
    />
  );
};

export default ImageOptimizer;