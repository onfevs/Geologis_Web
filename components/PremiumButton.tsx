import React from 'react';
import { PixelCanvas } from './PixelCanvas';
import { GOLD_COLORS } from '../constants';

interface PremiumButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'solid' | 'outline' | 'dark';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
    children,
    href,
    onClick,
    variant = 'solid',
    className = '',
    type = 'button',
    disabled = false
}) => {
    const baseClasses = "group relative inline-flex items-center justify-center px-10 py-5 text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black";

    let variantClasses = "";
    let canvasColors = ["#000000", "#1a1a1a"];

    if (variant === 'solid') {
        variantClasses = "rounded-full bg-[#D4AF37] text-black hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)]";
        canvasColors = ["#000000", "#1a1a1a"];
    } else if (variant === 'outline') {
        variantClasses = "rounded-full border border-zinc-300 dark:border-[#D4AF37]/50 text-[#A67C00] dark:text-[#D4AF37] hover:text-zinc-900 dark:hover:text-white hover:border-zinc-500 dark:hover:border-[#D4AF37] bg-[#F5F0E8]/80 dark:bg-transparent";
        canvasColors = GOLD_COLORS;
    } else if (variant === 'dark') {
        variantClasses = "rounded-full bg-zinc-900 border border-zinc-800 text-white hover:border-[#D4AF37]";
        canvasColors = GOLD_COLORS;
    }

    const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

    if (href) {
        const isExternal = href.startsWith('http') || href.startsWith('mailto');
        return (
            <a
                href={href}
                className={combinedClasses}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                <PixelCanvas colors={canvasColors} gap={6} speed={40} />
                <span className="relative z-10 flex items-center justify-center w-full">
                    {children}
                </span>
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClasses}
        >
            <PixelCanvas colors={canvasColors} gap={6} speed={40} />
            <span className="relative z-10 flex items-center justify-center w-full">
                {children}
            </span>
        </button>
    );
};

export default PremiumButton;
