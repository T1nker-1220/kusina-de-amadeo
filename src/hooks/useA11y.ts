'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useA11y() {
  const handleEscapeKey = useCallback((callback: () => void) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const useTrapFocus = (elementRef: React.RefObject<HTMLElement>) => {
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      };

      element.addEventListener('keydown', handleTabKey);
      firstFocusable?.focus();

      return () => element.removeEventListener('keydown', handleTabKey);
    }, [elementRef]);
  };

  const useAriaLive = () => {
    const announceRef = useRef<HTMLDivElement>(null);

    const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (announceRef.current) {
        announceRef.current.setAttribute('aria-live', priority);
        announceRef.current.textContent = message;
      }
    }, []);

    return { announceRef, announce };
  };

  return {
    handleEscapeKey,
    useTrapFocus,
    useAriaLive,
  };
}
