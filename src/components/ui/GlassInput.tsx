'use client';
import { forwardRef, useState } from 'react';
import { BaseInputProps, InputSize, InputVariant } from '@/types/input';

interface GlassInputProps 
  extends BaseInputProps, 
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  variant?: InputVariant;
  icon?: React.ReactNode;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(({
  label,
  error,
  helperText,
  className = '',
  size = 'md',
  variant = 'default',
  icon,
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = `
    w-full rounded-lg 
    bg-white/5 backdrop-blur-md
    border border-white/10
    transition-all duration-300
    focus:outline-none focus:ring-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  const variantClasses = {
    default: 'text-white/90 placeholder:text-white/40 focus:ring-white/20',
    error: 'border-red-500/50 text-red-50 focus:ring-red-500/20',
    success: 'border-green-500/50 text-green-50 focus:ring-green-500/20'
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <div
          className={`
            absolute inset-0 rounded-lg
            bg-gradient-to-r from-white/5 to-transparent
            pointer-events-none transition-opacity duration-300
            ${isFocused ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
      {(error || helperText) && (
        <p className={`text-sm ${error ? 'text-red-400' : 'text-white/60'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

GlassInput.displayName = 'GlassInput';
export default GlassInput; 