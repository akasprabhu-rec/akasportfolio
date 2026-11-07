import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProcessStepItem } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  steps: ProcessStepItem[];
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ steps }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-step-reveal',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-xs font-mono-num tracking-[0.22em] text-[var(--accent-blue-text)] uppercase mb-4">
              04 · CREATIVE WORKFLOW
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-[var(--text-primary)] leading-[1.04]"
              style={{ textWrap: 'balance' }}
            >
              FROM IDEA TO INTERACTION.
            </h2>
          </div>

          <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
            A structured four-phase methodology that turns brand ambition into high-performing digital craft.
          </p>
        </div>

        {/* Animated Horizontal Timeline Progression */}
        <div className="relative">
          {/* Horizontal Progress Track (Desktop) */}
          <div className="hidden lg:block relative h-[1px] w-full bg-[var(--border-medium)] mb-12">
            <div
              style={{
                width: `${((activeIndex + 1) / steps.length) * 100}%`,
              }}
              className="h-full bg-[var(--accent-blue)] transition-all duration-500 ease-out"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  style={{
                    transform: isActive
                      ? 'perspective(900px) translateZ(14px)'
                      : 'perspective(900px) translateZ(0px)',
                  }}
                  className={`process-step-reveal group p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${isActive
                      ? 'bg-[var(--bg-card)] border-[var(--accent-blue)] shadow-[var(--card-shadow-hover)]'
                      : 'bg-[var(--bg-card)] border-[var(--border-medium)] shadow-[var(--card-shadow)] hover:border-[var(--accent-blue)]/50'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <span
                        className={`text-xs font-mono-num tracking-[0.2em] ${isActive ? 'text-[var(--accent-blue-text)]' : 'text-[var(--text-secondary)]'
                          }`}
                      >
                        STEP {step.number}
                      </span>
                      <span
                        className={`text-xs font-mono-num ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]/50'
                          }`}
                      >
                        0{index + 1} / 0{steps.length}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-3 group-hover:text-[var(--accent-blue)] transition-colors">
                      {step.number} — {step.title}
                    </h3>

                    <p className="font-display text-base font-medium text-[var(--text-primary)]/90 mb-4 leading-snug">
                      {step.description}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-6 border-t border-[var(--border-subtle)]">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
