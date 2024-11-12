interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Glass effect background */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl ${!hover && 'group-hover:opacity-0'}`} />
      
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-orange-400/30 via-white/20 to-white/5" />
      
      {/* Content */}
      <div className="relative p-6 rounded-2xl">
        {children}
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-400/10 to-transparent" />
    </div>
  );
} 