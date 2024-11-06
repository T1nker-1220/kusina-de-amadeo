interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl
        backdrop-blur-glass bg-glass-card
        border border-white/10
        shadow-glass ${hover ? 'hover:shadow-glass-hover hover:bg-glass-card-hover' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-glass-shine bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      
      {children}
    </div>
  );
} 