'use client';
import { useEffect, useState, useCallback } from 'react';

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);
  // Handle scroll position
  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-orange-100/20 to-white/10 animate-glass-gradient bg-[length:400%_400%]"
        style={{
          transform: `translateY(${scrollPosition * 0.1}px)`,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0">
        {/* Top left orb */}
        <div 
          className="absolute w-96 h-96 rounded-full 
            bg-gradient-to-r from-orange-300/20 to-orange-200/10 
            blur-3xl animate-glass-float"
          style={{
            top: '10%',
            left: '15%',
            animationDelay: '0s',
          }}
        />

        {/* Center orb */}
        <div 
          className="absolute w-[32rem] h-[32rem] rounded-full 
            bg-gradient-to-r from-orange-200/15 to-orange-100/10 
            blur-3xl animate-glass-float"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: '-2s',
          }}
        />

        {/* Bottom right orb */}
        <div 
          className="absolute w-80 h-80 rounded-full 
            bg-gradient-to-r from-orange-300/15 to-orange-100/10 
            blur-3xl animate-glass-float"
          style={{
            bottom: '10%',
            right: '15%',
            animationDelay: '-4s',
          }}
        />
      </div>

      {/* Interactive mouse follower */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full 
          bg-gradient-to-r from-orange-300/10 to-transparent 
          blur-3xl pointer-events-none"
        style={{
          left: `${mousePosition.x - 400}px`,
          top: `${mousePosition.y - 400}px`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: `scale(${1 + scrollPosition * 0.0005})`,
        }}
      />
    </div>
  );
}