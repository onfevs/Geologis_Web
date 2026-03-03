import React from 'react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="relative w-11 h-11 flex items-center justify-center rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-all duration-300 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black cursor-pointer"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun Icon (Light Mode) */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>

                {/* Moon Icon (Dark Mode) */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </div>
        </button>
    );
};
