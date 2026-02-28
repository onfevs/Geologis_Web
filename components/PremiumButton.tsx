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
    const baseClasses = "group relative inline-flex items-center justify-center px-10 py-5 text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all shadow-xl disabled:opacity-50 text-center";

    let variantClasses = "";
    let canvasColors = ["#000000", "#1a1a1a"];

    if (variant === 'solid') {
        variantClasses = "bg-[#D4AF37] text-black hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)]";
        canvasColors = ["#000000", "#1a1a1a"];
    } else if (variant === 'outline') {
        variantClasses = "border-2 border-[#D4AF37]/50 text-[#D4AF37] hover:text-white hover:border-[#D4AF37] bg-black/50 backdrop-blur-md";
        canvasColors = GOLD_COLORS;
    } else if (variant === 'dark') {
        variantClasses = "bg-zinc-900 border border-zinc-800 text-white hover:border-[#D4AF37]";
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
