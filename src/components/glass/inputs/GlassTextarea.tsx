'use client';
import { useState, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
  `w-full rounded-lg border bg-white/5 px-4 py-3
   backdrop-blur-md transition-all duration-300
   focus:outline-none focus:ring-2 focus:ring-opacity-50
   disabled:cursor-not-allowed disabled:opacity-50
   resize-none`,
  {
    variants: {
      variant: {
        default: 'border-white/10 text-white/90 placeholder:text-white/50',
        error: 'border-red-500/50 text-red-50 placeholder:text-red-200/50',
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

interface GlassTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
}

const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ className, label, error, variant, size, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            className={textareaVariants({ variant, size, className })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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

GlassTextarea.displayName = 'GlassTextarea';
export default GlassTextarea; 