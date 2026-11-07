import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceItem } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServiceVisualGraphic: React.FC<{
  visualType: ServiceItem['visualType'];
}> = ({ visualType }) => {
  return (
    <div className="w-14 h-14 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-medium)] flex items-center justify-center mb-6 group-hover:border-[var(--accent-blue)] group-hover:scale-105 transition-all">
      {(visualType === 'business-websites' || visualType === 'web-design') && (
        <svg
          viewBox="0 0 40 40"
          className="w-7 h-7 stroke-[var(--accent-blue-text)] fill-none"
          strokeWidth="1.5"
        >
          <rect x="5" y="7" width="30" height="26" rx="3" />
          <line x1="5" y1="14" x2="35" y2="14" />
          <line x1="16" y1="14" x2="16" y2="33" />
          <line x1="21" y1="20" x2="30" y2="20" />
          <line x1="21" y1="26" x2="27" y2="26" />
        </svg>
      )}
      {(visualType === 'startup-landing' || visualType === 'frontend') && (
        <svg
          viewBox="0 0 40 40"
          className="w-7 h-7 stroke-[var(--accent-blue-text)] fill-none"
          strokeWidth="1.5"
        >
          <path d="M20 6 L28 14 L23 19 L17 13 Z" />
          <path d="M17 13 L8 22 C6 28 6 34 6 34 C6 34 12 34 18 32 L27 23" />
          <circle cx="20" cy="18" r="2.5" />
          <line x1="8" y1="32" x2="12" y2="28" />
        </svg>
      )}
      {(visualType === 'ecommerce' || visualType === 'ui-ux') && (
        <svg
          viewBox="0 0 40 40"
          className="w-7 h-7 stroke-[var(--accent-blue-text)] fill-none"
          strokeWidth="1.5"
        >
          <path d="M8 11 L32 11 L29 27 L11 27 Z" />
          <path d="M15 11 C15 7.5 17.5 5 20 5 C22.5 5 25 7.5 25 11" />
          <circle cx="15" cy="33" r="2.5" />
          <circle cx="25" cy="33" r="2.5" />
        </svg>
      )}
      {(visualType === 'portfolio' || visualType === 'interactive') && (
        <svg
          viewBox="0 0 40 40"
          className="w-7 h-7 stroke-[var(--accent-blue-text)] fill-none"
          strokeWidth="1.5"
        >
          <polygon points="20 5 34 13 34 27 20 35 6 27 6 13" />
          <polyline points="6 13 20 21 34 13" />
          <line x1="20" y1="21" x2="20" y2="35" />
        </svg>
      )}
    </div>
  );
};

const Interactive3DServiceCard: React.FC<{ service: ServiceItem }> = ({
  service,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({
      rotateX: -y * 10,
      rotateY: x * 10,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition:
          transform.rotateX === 0 && transform.rotateY === 0
            ? 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.08s linear',
      }}
      className="service-card-reveal group relative p-8 sm:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--card-shadow)] hover:border-[var(--accent-blue)]/60 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="text-xs font-mono-num tracking-[0.22em] text-[var(--accent-blue-text)]">
            {service.number} — SERVICE
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--accent-blue)] transition-colors" />
        </div>

        <ServiceVisualGraphic visualType={service.visualType} />

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-3 group-hover:text-[var(--accent-blue)] transition-colors">
          {service.number} — {service.title}
        </h3>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-4">
          {service.description}
        </p>

        {service.valueProposition && (
          <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] mb-6">
            <span className="text-[10px] font-mono-num tracking-[0.16em] text-[var(--accent-blue-text)] uppercase block mb-1">
              ACTUAL VALUE &amp; IMPACT:
            </span>
            <p className="text-xs text-[var(--text-primary)]/90 leading-relaxed">
              {service.valueProposition}
            </p>
          </div>
        )}
      </div>

      {/* Deliverables list */}
      <div className="pt-6 border-t border-[var(--border-subtle)] space-y-2.5">
        <span className="text-[10px] font-mono-num tracking-[0.16em] text-[var(--text-secondary)] uppercase block mb-2">
          CORE DELIVERABLES:
        </span>
        {service.deliverables.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-xs font-mono-num text-[var(--text-primary)]/85"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
              {item}
            </span>
            <span className="text-[var(--text-secondary)]">0{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card-reveal',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-xs font-mono-num tracking-[0.22em] text-[var(--accent-blue-text)] uppercase mb-4">
              02 · CAPABILITIES &amp; EXPERTISE
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-[var(--text-primary)] leading-[1.04]"
              style={{ textWrap: 'balance' }}
            >
              WHAT I DO.
            </h2>
          </div>

          <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
            Combining visual design, modern frontend architecture, and interactive motion to build websites that stand apart.
          </p>
        </div>

        {/* 2x2 Immersive 3D Service Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <Interactive3DServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
