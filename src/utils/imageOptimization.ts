import React, { useState, useEffect, useRef } from 'react';
import { optimizeSupabaseImage } from '@/utils/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholderColor?: string;
  threshold?: number;
  rootMargin?: string;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
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
  quality = 80,
  format = 'webp',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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

  // Optimize the image URL if it's a Supabase URL
  const optimizedSrc = isInView ? 
    (src.includes('supabase.co/storage/v1/object/sign') ? 
      optimizeSupabaseImage(src, typeof width === 'number' ? width : undefined, quality, format) : 
      src) : 
    '';

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
          src={optimizedSrc}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          onLoad={handleLoad}
          className={`
            ${className}
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-500
            w-full h-full object-cover
            transform-gpu backface-hidden
          `}
          loading="lazy"
          decoding="async"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            transform: 'translateZ(0)',
        />
      )}
    </div>
  );
};

export default LazyImage;