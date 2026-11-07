import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Store,
  UtensilsCrossed,
  Dumbbell,
  Rocket,
  Palette,
  UserCheck,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { ClientCategoryItem } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface WhoIBuildForSectionProps {
  categories: ClientCategoryItem[];
  onNavigateToContact: () => void;
}

const CategoryIcon: React.FC<{
  iconType: ClientCategoryItem['iconType'];
}> = ({ iconType }) => {
  const iconProps = { className: 'w-6 h-6 text-[#B8C9FF]' };

  switch (iconType) {
    case 'business':
      return <Store {...iconProps} />;
    case 'restaurant':
      return <UtensilsCrossed {...iconProps} />;
    case 'gym':
      return <Dumbbell {...iconProps} />;
    case 'startup':
      return <Rocket {...iconProps} />;
    case 'agency':
      return <Palette {...iconProps} />;
    case 'personal':
      return <UserCheck {...iconProps} />;
    default:
      return <Store {...iconProps} />;
  }
};

const Interactive3DClientCard: React.FC<{
  item: ClientCategoryItem;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
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
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition:
          transform.rotateX === 0 && transform.rotateY === 0
            ? 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.08s linear',
      }}
      className="client-card-reveal group relative p-7 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--card-shadow)] hover:border-[var(--accent-blue)]/60 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Card Header: Number & Category Icon */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-medium)] flex items-center justify-center group-hover:border-[var(--accent-blue)] group-hover:scale-105 transition-all">
              <CategoryIcon iconType={item.iconType} />
            </div>
            <div>
              <span className="text-[11px] font-mono-num tracking-[0.2em] text-[var(--accent-blue-text)] uppercase block">
                {item.number} · CATEGORY
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-mono-num">
                {item.subtitle}
              </span>
            </div>
          </div>

          <span className="w-8 h-8 rounded-full border border-[var(--border-medium)] flex items-center justify-center text-[var(--text-secondary)] group-hover:border-[var(--accent-blue)] group-hover:text-[var(--accent-blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3 group-hover:text-[var(--accent-blue)] transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      {/* Deliverables / Capabilities Pills */}
      <div className="pt-5 border-t border-[var(--border-subtle)] space-y-2">
        <span className="text-[10px] font-mono-num tracking-[0.16em] text-[var(--text-secondary)] uppercase block mb-2">
          TAILORED DELIVERABLES:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {item.deliverables.map((deliv, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-xs text-[var(--text-primary)]/80"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-blue)] shrink-0" />
              <span className="truncate">{deliv}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WhoIBuildForSection: React.FC<WhoIBuildForSectionProps> = ({
  categories,
  onNavigateToContact,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.client-card-reveal',
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
      id="who-i-build-for"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-xs font-mono-num tracking-[0.22em] text-[var(--accent-blue-text)] uppercase mb-4">
              03 · TAILORED CLIENT SOLUTIONS
            </p>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-[var(--text-primary)] leading-[1.04]"
              style={{ textWrap: 'balance' }}
            >
              WHO I BUILD FOR.
            </h2>
          </div>

          <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
            Every business model has distinct conversion drivers. I build purpose-crafted digital experiences engineered specifically for your market and customer journey.
          </p>
        </div>

        {/* 3x2 Grid with Interactive 3D Perspective Hover Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Interactive3DClientCard
              key={cat.id}
              item={cat}
              onSelect={onNavigateToContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

