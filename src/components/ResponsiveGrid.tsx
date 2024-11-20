import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
}

export default function ResponsiveGrid({ children }: ResponsiveGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
      {children}
    </div>
  );
}