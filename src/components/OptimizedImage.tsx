import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * OptimizedImage component for better image loading performance
 * 
 * Features:
 * - Lazy loading for non-priority images
 * - Proper width and height attributes to prevent layout shifts
 * - Responsive image loading with srcSet
 * - Blur-up loading effect
 * - WebP format support
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Function to generate optimized Supabase URL with parameters
  const getOptimizedUrl = (url: string, width?: number, format: string = 'webp', quality: number = 80) => {
    // Check if this is a Supabase URL that can be optimized
    if (url.includes('supabase.co/storage/v1/object/sign')) {
      // Convert to render/image endpoint
      const baseUrl = url.replace('/object/', '/render/image/');
      const separator = baseUrl.includes('?') ? '&' : '?';
      
      // Add optimization parameters
      let optimizedUrl = baseUrl;
      if (width) optimizedUrl += `${separator}width=${width}`;
      optimizedUrl += `${optimizedUrl.includes('?') ? '&' : '?'}format=${format}&quality=${quality}`;
      
      return optimizedUrl;
    }
    
    // Return original URL if not a Supabase URL
    return url;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined;
    
    const widths = [width / 2, width, width * 1.5, width * 2].filter(w => w >= 100);
    return widths
      .map(w => `${getOptimizedUrl(src, Math.round(w))} ${Math.round(w)}w`)
      .join(', ');
  };

  // Generate sizes attribute
  const generateSizes = () => {
    if (!width) return undefined;
    return `(max-width: 768px) 100vw, ${width}px`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  const srcSet = generateSrcSet();
  const sizes = generateSizes();
  const optimizedSrc = getOptimizedUrl(src, width);

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {/* Placeholder or blur-up effect */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ 
            backgroundSize: 'cover',
            backgroundPosition: objectPosition,
          }}
        />
      )}
      
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
        onLoad={handleLoad}
        onError={handleError}
        className={`
          ${isLoaded ? 'opacity-100' : 'opacity-0'} 
          transition-opacity duration-300 
          w-full h-full
          transform-gpu will-change-transform backface-hidden
        `}
        style={{
          objectFit,
          objectPosition,
          imageRendering: '-webkit-optimize-contrast',
        }}
      />
      
      {/* Fallback for error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;