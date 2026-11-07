import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!isFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });

      const targetEl = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        targetEl?.closest('a, button, input, textarea, [role="button"]')
      );
      setHovered(isInteractive);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailing({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden lg:block overflow-hidden"
    >
      {/* Precision inner dot */}
      <div
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
        className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]"
      />
      {/* Smooth trailing interactive ring */}
      <div
        style={{
          transform: `translate3d(${trailing.x - (hovered ? 24 : 16)}px, ${trailing.y - (hovered ? 24 : 16)
            }px, 0)`,
        }}
        className={`rounded-full border transition-all duration-200 ${hovered
            ? 'w-12 h-12 border-[var(--accent-blue)]/80 bg-[var(--accent-blue-subtle)]'
            : 'w-8 h-8 border-[var(--border-strong)] bg-transparent'
          }`}
      />
    </div>
  );
};
