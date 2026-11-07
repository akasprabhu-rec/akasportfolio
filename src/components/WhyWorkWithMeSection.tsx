import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor,
  Code2,
  Smartphone,
  Sparkles,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { ValuePillarItem } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface WhyWorkWithMeSectionProps {
  pillars: ValuePillarItem[];
}

const PillarIcon: React.FC<{ index: number }> = ({ index }) => {
  const iconProps = { className: 'w-6 h-6 text-[var(--accent-blue-text)]' };

  switch (index) {
    case 0:
      return <Monitor {...iconProps} />;
    case 1:
      return <Code2 {...iconProps} />;
    case 2:
      return <Smartphone {...iconProps} />;
    case 3:
      return <Sparkles {...iconProps} />;
    case 4:
      return <MessageSquare {...iconProps} />;
    case 5:
      return <Zap {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

const Interactive3DPillarCard: React.FC<{
  pillar: ValuePillarItem;
  index: number;
}> = ({ pillar, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({
      rotateX: -y * 8,
      rotateY: x * 8,
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
      className="why-card-reveal group relative p-7 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--card-shadow)] hover:border-[var(--accent-blue)]/60 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-medium)] flex items-center justify-center group-hover:border-[var(--accent-blue)] group-hover:scale-105 transition-all">
            <PillarIcon index={index} />
          </div>
          <span className="text-[10px] font-mono-num tracking-[0.2em] text-[var(--accent-blue-text)] px-2.5 py-1 rounded-full bg-[var(--accent-blue-subtle)] border border-[var(--border-subtle)] uppercase">
            {pillar.badge}
          </span>
        </div>

        <div className="text-[11px] font-mono-num tracking-[0.18em] text-[var(--text-secondary)] mb-2 uppercase">
          {pillar.number} — PILLAR
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3 group-hover:text-[var(--accent-blue)] transition-colors">
          {pillar.title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {pillar.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono-num text-[var(--text-secondary)]">
        <span>CAPABILITY VERIFIED</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] transition-colors" />
      </div>
    </div>
  );
};

export const WhyWorkWithMeSection: React.FC<WhyWorkWithMeSectionProps> = ({
  pillars,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-card-reveal',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
      id="why-work-with-me"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-xs font-mono-num tracking-[0.22em] text-[var(--accent-blue-text)] uppercase mb-4">
              06 · ADVANTAGES &amp; CAPABILITIES
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-[var(--text-primary)] leading-[1.04]"
              style={{ textWrap: 'balance' }}
            >
              WHY WORK WITH ME.
            </h2>
          </div>

          <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
            I eliminate agency bloat and deliver custom-crafted web engineering focused directly on what grows your business.
          </p>
        </div>

        {/* 3x2 Grid with Interactive 3D Perspective Hover Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <Interactive3DPillarCard
              key={pillar.id}
              pillar={pillar}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
