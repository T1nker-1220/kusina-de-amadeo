'use client';
import { useState, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  `w-full rounded-lg border bg-white/5 px-4 py-2.5
   backdrop-blur-md transition-all duration-300
   focus:outline-none focus:ring-2 focus:ring-opacity-50
   disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: 'border-white/10 text-white/90 placeholder:text-white/50',
        error: 'border-red-500/50 text-red-50 placeholder:text-red-200/50',
        success: 'border-green-500/50 text-green-50 placeholder:text-green-200/50',
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface GlassInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, icon, variant, size, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-white/80">
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
            className={inputVariants({ variant, size, className })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              paddingLeft: icon ? '2.5rem' : undefined,
            }}
            {...props}
          />
          <div
            className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none
              ${isFocused ? 'opacity-100' : 'opacity-0'}
              bg-gradient-to-r from-white/5 to-transparent`}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';
export default GlassInput; 