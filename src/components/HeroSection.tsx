import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowDown } from 'lucide-react';
import { PortfolioData } from '../config/portfolioData';
import { MagneticButton } from './MagneticButton';

interface HeroSectionProps {
  data: PortfolioData['hero'];
  onNavigate: (sectionId: string) => void;
  onUpdatePortrait?: (newUrl: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  onNavigate,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] lg:min-h-screen w-full bg-transparent flex flex-col justify-between pt-14 pb-6 sm:pt-16 sm:pb-8 md:pt-28 md:pb-12 overflow-hidden z-10"
    >
      <div className="max-w-[1360px] w-full mx-auto px-5 sm:px-6 md:px-12 mt-0 mb-auto lg:my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center">
          {/* Left Column: Editorial Typographic Hierarchy (5 cols on desktop so persistent Portrait commands 7 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-10 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] sm:text-xs font-mono-num tracking-[0.22em] sm:tracking-[0.26em] text-[var(--accent-blue-text)] uppercase mb-2 sm:mb-3 lg:mb-4"
            >
              {data.label}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.75rem,10vw,4.5rem)] sm:text-7xl xl:text-[5.5rem] font-bold tracking-[-0.04em] text-[var(--text-primary)] leading-[0.96] mb-3 sm:mb-4 lg:mb-5 max-w-full uppercase"
            >
              {data.heading}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.1rem,4.2vw,1.5rem)] sm:text-2xl md:text-[1.65rem] font-medium text-[var(--text-primary)]/90 tracking-tight leading-snug mb-3 sm:mb-4 lg:mb-5 max-w-xl"
            >
              {data.subtitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14px] sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-[46ch]"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <MagneticButton
                variant="primary"
                onClick={() => onNavigate('work')}
                className="px-5 py-3 sm:px-7 sm:py-3.5 text-[11px] sm:text-xs"
              >
                <span>{data.primaryCta}</span>
                <ArrowDownRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 sm:px-7 sm:py-3.5 text-[11px] sm:text-xs"
              >
                <span>{data.secondaryCta}</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Transparent structural spacer matching the 38-42vh portrait height on mobile, and 68vh on desktop */}
          <div
            aria-hidden="true"
            className="lg:col-span-7 h-[37vh] min-h-[225px] max-h-[310px] sm:h-[41vh] sm:max-h-[370px] lg:h-auto lg:max-h-none lg:min-h-[68vh] order-1 lg:order-2 pointer-events-none"
          />
        </div>
      </div>

      {/* Bottom Bar: Creative Developer Discipline & Subtle Scroll Indicator */}
      <div className="max-w-[1360px] w-full mx-auto px-5 sm:px-6 md:px-12 pt-4 sm:pt-5 lg:pt-6 mt-4 lg:mt-0 flex items-center justify-between border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 text-[10px] sm:text-xs text-[var(--text-secondary)] tracking-[0.14em] uppercase">
          <span>WEBSITE DESIGN</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span className="hidden sm:inline">FRONTEND DEVELOPMENT</span>
          <span aria-hidden="true" className="hidden md:inline">
            ·
          </span>
          <span className="hidden md:inline">INTERACTIVE EXPERIENCES</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('about')}
          aria-label="Scroll to About section"
          className="group inline-flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-medium tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <span>SCROLL</span>
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[var(--border-medium)] flex items-center justify-center group-hover:border-[var(--accent-blue)] group-hover:text-[var(--accent-blue)] transition-colors">
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce" />
          </span>
        </button>
      </div>
    </section>
  );
};
