
import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, bgColor = "bg-black", className = "" }) => {
  return (
    <section className={`py-32 md:py-48 px-6 md:px-12 relative ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      {/* Subtle border between themes */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-zinc-900 to-transparent"></div>
    </section>
  );
};

export default Section;
