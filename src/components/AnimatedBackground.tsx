'use client';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50" />
      
      {/* Animated circles */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-orange-200/30 blur-3xl"
        style={{
          left: `${mousePosition.x - 250}px`,
          top: `${mousePosition.y - 250}px`,
          transition: 'all 0.5s ease-in-out',
        }}
      />
    </div>
  );
} 