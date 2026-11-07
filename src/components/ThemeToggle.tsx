import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="group relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--border-medium)] bg-[var(--bg-card)] hover:border-[var(--accent-blue)] hover:bg-[var(--accent-blue-subtle)] hover:shadow-[0_0_16px_var(--accent-blue-subtle)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer select-none shrink-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center text-[#B8C9FF]"
            >
              <Moon className="w-4 h-4 stroke-[1.75]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center text-[#2563EB]"
            >
              <Sun className="w-4 h-4 stroke-[1.75]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating tooltip */}
        <span
          role="tooltip"
          className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-[10px] font-mono-num tracking-wider uppercase rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-medium)] shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 z-50 hidden sm:block"
        >
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </span>
      </button>
    </div>
  );
};

