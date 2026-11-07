import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechStackItem } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface TechStackSectionProps {
  items: TechStackItem[];
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  items,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-item-reveal',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = ['ALL', 'Core', 'Framework & Motion', 'Design & Workflow'];
  const filteredItems =
    activeFilter === 'ALL'
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Header + Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs font-mono-num tracking-[0.22em] text-[var(--accent-blue-text)] uppercase mb-4">
              05 · MODERN WEB TOOLKIT
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-[var(--text-primary)] leading-[1.04]"
              style={{ textWrap: 'balance' }}
            >
              TECH STACK.
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter tech stack by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-xl self-start lg:self-auto shadow-sm"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-2 text-xs font-medium tracking-[0.12em] uppercase rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[var(--bg-button-primary)] text-[var(--text-button-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive 3D Depth Typography Grid — Zero Fake Skill Percentages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredItems.map((tech, idx) => {
            const isHovered = hoveredItem === tech.name;
            return (
              <div
                key={tech.name}
                onMouseEnter={() => setHoveredItem(tech.name)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  transform: isHovered
                    ? 'perspective(800px) translateZ(16px) translateY(-4px)'
                    : 'perspective(800px) translateZ(0px) translateY(0px)',
                }}
                className="tech-item-reveal p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--card-shadow)] hover:border-[var(--accent-blue)]/70 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col justify-between min-h-[180px]"
              >
                <div className="flex items-center justify-between text-xs font-mono-num text-[var(--text-secondary)]">
                  <span>0{idx + 1}</span>
                  <span className="text-[var(--accent-blue-text)]">{tech.category.split(' ')[0].toUpperCase()}</span>
                </div>

                <div className="my-4">
                  <h3
                    className={`font-display text-2xl font-bold tracking-tight transition-colors ${
                      isHovered ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {tech.name}
                  </h3>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
