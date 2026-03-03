
import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({ id, children, bgColor = "bg-black", className = "", style }) => {
  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 relative ${bgColor} ${className}`} style={style}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      {/* Subtle border between themes */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-zinc-900 to-transparent"></div>
    </section>
  );
};

export default Section;
