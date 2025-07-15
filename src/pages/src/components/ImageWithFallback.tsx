import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string; 
  fallbackSrc: string; 
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * ImageWithFallback component that displays a fallback image if the primary image fails to load
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  onLoad,
  onError,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => { 
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      if (onError) onError();
    }
  };

  const handleLoad = () => {
    if (onLoad) onLoad();
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading} 
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={handleError}
      onLoad={handleLoad}
      style={{
        objectFit: 'cover',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    />
  );
};

export default ImageWithFallback;