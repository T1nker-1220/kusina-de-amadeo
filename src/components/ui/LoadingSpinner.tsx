'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-2'
};

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <div 
      className={`
        animate-spin 
        rounded-full 
        border-t-orange-500 
        border-r-transparent 
        border-b-orange-500 
        border-l-transparent 
        ${sizeClasses[size]}
        ${className}
      `}
    />
  );
}
