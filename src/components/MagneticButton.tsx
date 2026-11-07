import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  ariaLabel,
  target,
  rel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.22, y: middleY * 0.22 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-medium tracking-[0.16em] uppercase transition-all duration-200 whitespace-nowrap shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer select-none';

  const variantStyles = {
    primary:
      'bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] hover:bg-[var(--accent-blue)] hover:text-white dark:hover:text-black shadow-[0_4px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(184,201,255,0.18)]',
    secondary:
      'bg-[var(--bg-button-secondary)] text-[var(--text-button-secondary)] border border-[var(--border-medium)] hover:border-[var(--accent-blue)] hover:bg-[var(--accent-blue-subtle)]',
    ghost:
      'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-subtle)]',
  };

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition:
          position.x === 0 && position.y === 0
            ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.1s linear',
      }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {children}
        </button>
      )}
    </div>
  );

  return content;
};
