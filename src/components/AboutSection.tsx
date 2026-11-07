import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioData } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  data: PortfolioData['about'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 36, rotateX: -8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.12,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 8, rotateY: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] transition-colors duration-300"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Kicker & Oversized Heading */}
        <div className="mb-16 md:mb-24 about-reveal">
          <p className="text-xs font-mono-num tracking-[0.22em] text-[var(--accent-blue-text)] uppercase mb-4">
            01 · CREATIVE DIRECTION &amp; PHILOSOPHY
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-[var(--text-primary)] leading-[1.02] max-w-3xl"
            style={{ textWrap: 'balance' }}
          >
            {data.heading}
          </h2>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Lead & Creative Pillars */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6 about-reveal">
              <p className="font-display text-xl sm:text-2xl md:text-[1.75rem] font-medium text-[var(--text-primary)] leading-[1.38] tracking-tight">
                {data.paragraphs[0]}
              </p>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-[1.75]">
                {data.paragraphs[1]}
              </p>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-[1.75]">
                {data.paragraphs[2]}
              </p>
            </div>

            {/* Creative Pillars — Clean Hairline Rows */}
            <div className="pt-8 border-t border-[var(--border-subtle)] about-reveal">
              <h3 className="text-xs font-mono-num tracking-[0.2em] text-[var(--accent-blue-text)] uppercase mb-6">
                DESIGN &amp; ENGINEERING PRINCIPLES
              </h3>
              <div className="divide-y divide-[var(--border-subtle)]">
                {data.creativePillars.map((item, idx) => (
                  <div key={idx} className="py-5 first:pt-0 last:pb-0">
                    <h4 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-1.5">
                      0{idx + 1}. {item.label}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Perspective Composition & Core Focus Areas */}
          <div className="lg:col-span-5 space-y-8">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition:
                  tilt.rotateX === 0 && tilt.rotateY === 0
                    ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 0.08s linear',
              }}
              className="p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--card-shadow)] hover:border-[var(--accent-blue)]/50 transition-colors about-reveal"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-mono-num tracking-[0.2em] text-[var(--accent-blue-text)] uppercase">
                  CREATIVE FOCUS
                </span>
                <span className="text-xs font-mono-num text-[var(--text-secondary)]">
                  DISCIPLINES
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
                {data.philosophy.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 pb-6 border-b border-[var(--border-subtle)]">
                {data.philosophy.statement}
              </p>

              <ul className="divide-y divide-[var(--border-subtle)]">
                {data.focusAreas.map((area, index) => (
                  <li
                    key={area}
                    className="py-3 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4 group"
                  >
                    <span className="font-display text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                      {area}
                    </span>
                    <span className="text-xs font-mono-num text-[var(--text-secondary)]">
                      0{index + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
