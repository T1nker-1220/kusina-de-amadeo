import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
}

export default function ResponsiveGrid({ children }: ResponsiveGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6">
      {children}
    </div>
  );
} 