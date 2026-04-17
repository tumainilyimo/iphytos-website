import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, className, ...props }) => {
  // Check if this is an external URL or if it has a file extension
  const isExternalUrl = src.startsWith('http') || src.startsWith('https');
  const hasExtension = /\.[^/.]+$/.test(src);

  // If it's an external URL or has a file extension, render directly
  if (isExternalUrl || hasExtension) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('w-full h-full object-cover', className)}
        loading="lazy"
        {...props}
      />
    );
  }

  // For responsive images without extension
  const baseName = src;

  return (
    <picture>
      {/* AVIF sources */}
      <source
        type="image/avif"
        srcSet={`${baseName}-320.avif 320w,
                ${baseName}-640.avif 640w,
                ${baseName}-960.avif 960w,
                ${baseName}-1280.avif 1280w,
                ${baseName}.avif`}
        sizes="(max-width: 320px) 320px,
               (max-width: 640px) 640px,
               (max-width: 960px) 960px,
               (max-width: 1280px) 1280px,
               100vw"
      />
      
      {/* WebP sources */}
      <source
        type="image/webp"
        srcSet={`${baseName}-320.webp 320w,
                ${baseName}-640.webp 640w,
                ${baseName}-960.webp 960w,
                ${baseName}-1280.webp 1280w,
                ${baseName}.webp`}
        sizes="(max-width: 320px) 320px,
               (max-width: 640px) 640px,
               (max-width: 960px) 960px,
               (max-width: 1280px) 1280px,
               100vw"
      />
      
      {/* Fallback image */}
      <img
        src={`${baseName}.png`}
        alt={alt}
        className={cn('w-full h-full object-cover', className)}
        loading="lazy"
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
