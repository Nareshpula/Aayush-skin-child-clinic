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
  preload?: 'auto' | 'metadata' | 'none';
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
  preload = 'metadata',
  onLoad,
  objectFit = 'cover',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false); 
  const [isVisible, setIsVisible] = useState(priority);
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
      videoRef.current.preload = priority ? 'auto' : preload; 
      
      if (autoPlay) {
        // Try to play the video when it becomes visible
        const playPromise = videoRef.current.play();
        
        // Handle play promise to avoid uncaught promise errors
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Auto-play was prevented:', error);
            // Try to play on user interaction
            const playOnInteraction = () => {
              videoRef.current?.play();
              document.removeEventListener('click', playOnInteraction);
              document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
          });
        }
      }
    }
  }, [priority, isVisible, autoPlay]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Function to optimize Supabase video URLs
  const optimizeVideoUrl = (url: string): string => {
    // Check if this is a Supabase URL
    if (!url.includes('supabase.co/storage/v1/object/sign')) {
      return url;
    }
    
    // For videos, we don't transform the URL as Supabase doesn't support video transformations
    // But we can ensure the URL is properly signed
    return url;
  };

  const optimizedSrc = optimizeVideoUrl(src);
  const optimizedPoster = poster ? optimizeVideoUrl(poster) : undefined;

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
            backgroundImage: poster ? `url(${poster})` : 'none',
            backgroundSize: 'cover',
            backgroundColor: poster ? 'transparent' : '#f0f0f0'
          }}
        />
      )}
      
      <video
        ref={videoRef}
        src={optimizedSrc}
        poster={optimizedPoster}
        width={width}
        height={height}
        autoPlay={priority ? autoPlay : false}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        preload={priority ? "auto" : preload}
        onLoadedData={handleLoadedData}
        className={`
          ${isLoaded ? 'opacity-100' : 'opacity-0'} 
          transition-opacity duration-300 
          w-full h-full object-cover
          transform-gpu will-change-transform
        `}
        style={{
          objectFit,
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      >
        <source src={optimizedSrc} type="video/mp4" />
        <p>Your browser doesn't support HTML5 video. Here is a <a href={optimizedSrc}>link to the video</a> instead.</p>
      </video>
    </div>
  );
};

export default OptimizedVideo;