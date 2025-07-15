import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string; 
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholderColor?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * LazyImage component that only loads when scrolled into view
 * 
 * Features:
 * - Uses Intersection Observer for efficient lazy loading
 * - Shows placeholder until image is loaded
 * - Smooth fade-in transition
 * - Supports width, height, and other standard image attributes
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderColor = '#f3f4f6', // Light gray default
  threshold = 0.1,
  rootMargin = '200px',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Function to optimize Supabase URLs
  const optimizeSupabaseUrl = (url: string): string => {
    if (url.includes('supabase.co/storage/v1/object/sign')) {
      // Convert to render/image endpoint
      const baseUrl = url.replace('/object/', '/render/image/');
      const separator = baseUrl.includes('?') ? '&' : '?';
      
      // Add optimization parameters
      return `${baseUrl}${separator}format=webp&quality=80`;
    }
    return url;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className="relative overflow-hidden"
      style={{ 
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
        backgroundColor: placeholderColor,
      }}
    >
      {isInView && (
        <img
          src={optimizeSupabaseUrl(src)}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          onLoad={handleLoad}
          className={`
            ${className}
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-300
            w-full h-full object-cover
            transform-gpu backface-hidden
          `}
          loading="lazy"
          decoding="async"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;