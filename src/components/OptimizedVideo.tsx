import React, { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  priority?: boolean;
  onLoad?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * OptimizedVideo component for better video loading performance
 * 
 * Features:
 * - Lazy loading for non-priority videos
 * - Proper width and height attributes to prevent layout shifts
 * - Preload optimization
 * - Poster image support
 * - Hardware acceleration
 */
const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  width,
  height,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  playsInline = true,
  priority = false,
  onLoad,
  objectFit = 'cover',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when video is in viewport
  useEffect(() => {
    if (!videoRef.current || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '200px', // Load video when it's 200px from viewport
        threshold: 0,
      }
    );

    observer.observe(containerRef.current!);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [priority]);

  // Load video when it becomes visible
  useEffect(() => {
    if (!videoRef.current) return;

    if (priority || isVisible) {
      videoRef.current.preload = priority ? 'auto' : 'metadata';
      
      if (autoPlay) {
        // Try to play the video when it becomes visible
        const playPromise = videoRef.current.play();
        
        // Handle play promise to avoid uncaught promise errors
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Auto-play was prevented:', error);
          });
        }
      }
    }
  }, [priority, isVisible, autoPlay]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {/* Placeholder before video loads */}
      {!isLoaded && poster && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${poster})`,
            backgroundSize: 'cover',
          }}
        />
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        autoPlay={priority ? autoPlay : false}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        preload={priority ? "auto" : "none"}
        onLoadedData={handleLoadedData}
        className={`
          ${isLoaded ? 'opacity-100' : 'opacity-0'} 
          transition-opacity duration-300 
          w-full h-full
          transform-gpu will-change-transform backface-hidden
        `}
        style={{
          objectFit,
          transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
        }}
      />
    </div>
  );
};

export default OptimizedVideo;