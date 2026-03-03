import React from 'react';

interface SectionHeaderProps {
    subtitle: string;
    titleLight: string;
    titleGold: string;
    description: string;
    className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    subtitle,
    titleLight,
    titleGold,
    description,
    className = ''
}) => {
    return (
        <div className={`max-w-3xl mb-16 ${className}`}>
            <span className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] mb-4 block font-black">
                {subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-title text-zinc-900 dark:text-white mb-6 transition-colors duration-500">
                {titleLight} <span className="text-[#D4AF37]">{titleGold}</span>.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-lg transition-colors duration-500">
                {description}
            </p>
        </div>
    );
};

export default SectionHeader;
