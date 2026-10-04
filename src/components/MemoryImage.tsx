import React, { useState, useEffect } from 'react';
import { ArtSilhouette } from './ArtSilhouette';

interface MemoryImageProps {
  src: string;
  alt: string;
  artType: string;
  title: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const MemoryImage: React.FC<MemoryImageProps> = ({
  src,
  alt,
  artType,
  title,
  className = '',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset the fallback if a different local asset is rendered.
  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div className={`w-full h-full ${className}`}>
        <ArtSilhouette type={artType} title={title} className="w-full h-full" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover ${className}`}
      loading={loading}
      referrerPolicy="no-referrer"
    />
  );
};
