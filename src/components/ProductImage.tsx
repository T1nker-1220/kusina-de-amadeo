'use client';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
} 