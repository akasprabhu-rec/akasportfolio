import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectItem } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onUpdateProject?: (updatedProject: ProjectItem) => void;
}

/**
 * Architectural Browser Viewport Preview Frame matching reference design
 */
const ProjectPreviewFrame: React.FC<{
  project: ProjectItem;
}> = ({ project }) => {
  return (
    <div className="relative w-full aspect-[16/10] bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-medium)] group-hover:border-[var(--accent-blue)]/60 transition-all duration-500 shadow-[var(--card-shadow)] group-hover:shadow-[var(--card-shadow-hover)] flex items-center justify-center">
      {project.imageUrl ? (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] bg-[var(--bg-card-subtle)] flex flex-col justify-between p-6 sm:p-9 select-none">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative z-10 flex items-center justify-between text-xs font-mono-num text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--border-medium)]" />
              <span className="w-2 h-2 rounded-full bg-[var(--border-subtle)]" />
              <span className="ml-2 text-[var(--text-primary)]/80 uppercase font-medium">
                EXP {project.number} — {project.title}
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-[var(--accent-blue-text)]">
              PREVIEW
            </span>
          </div>

          <div className="relative my-auto py-6 flex items-center justify-center w-full">
            <div className="w-16 h-16 rounded-full border border-[var(--accent-blue)]/30 flex items-center justify-center text-[var(--accent-blue-text)] text-xs font-mono-num">
              {project.number}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-3.5 mt-2">
            <span className="font-display font-medium text-[var(--text-primary)] tracking-wide uppercase">
              {project.title}
            </span>
            <span className="font-mono-num text-[11px] text-[var(--accent-blue-text)] uppercase">
              INSPECT CASE STUDY
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const Project3DPreviewWrapper: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}> = ({ children, onClick, ariaLabel }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 7, rotateY: x * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={ariaLabel}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition:
          tilt.rotateX === 0 && tilt.rotateY === 0
            ? 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.08s linear',
      }}
      className="relative rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-medium)] group-hover:border-[var(--accent-blue)]/60 shadow-[var(--card-shadow)] group-hover:shadow-[var(--card-shadow-hover)] transition-all duration-500 cursor-pointer"
    >
      {children}
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth Reveal Animations on Scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-row-reveal');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // CRITICAL SCROLL-LOCK: Prevent background scrolling when popup is open
  useEffect(() => {
    if (!selectedProject) return;

    // 1. Record current scroll position and previous styles
    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // 2. Lock document body completely (stationary background across all devices)
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Escape key listener to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 4. Cleanup when popup closes: restore styles & exact scroll position
    return () => {
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
          <div>
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.02]"
              style={{ textWrap: 'balance' }}
            >
              SELECTED DIGITAL<br className="hidden sm:inline" /> EXPERIENCES.
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed md:text-right">
            Immersive websites, landing pages, and interactive web applications crafted with design precision and motion choreography.
          </p>
        </div>

        {/* Alternating Project Layout */}
        <div className="space-y-28 md:space-y-36">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;
            const hasValidLiveUrl =
              project.liveUrl && project.liveUrl.trim().length > 0;

            return (
              <article
                key={project.id}
                className="project-row-reveal group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Large Preview Slot (order-1 on mobile, alternates on desktop) */}
                <div
                  className={`col-span-1 lg:col-span-7 order-1 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Project3DPreviewWrapper
                    onClick={() => openProjectModal(project)}
                    ariaLabel={`View case study for ${project.title}`}
                  >
                    <ProjectPreviewFrame project={project} />
                  </Project3DPreviewWrapper>
                </div>

                {/* Project Details (order-2 on mobile, alternates on desktop) */}
                <div
                  className={`col-span-1 lg:col-span-5 order-2 flex flex-col items-start ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Clean Metadata Line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-num text-[var(--accent-blue-text)] tracking-[0.2em] uppercase mb-3">
                    <span className="font-bold">{project.number}</span>
                    <span aria-hidden="true" className="text-[var(--border-strong)]">
                      ·
                    </span>
                    <span className="text-[var(--text-primary)]/80">{project.category}</span>
                    <span aria-hidden="true" className="text-[var(--border-strong)]">
                      ·
                    </span>
                    <span className="text-[var(--text-secondary)]">{project.year}</span>
                  </div>

                  <h3 className="font-display text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-[var(--text-primary)] tracking-tight leading-[1.04] mb-4 uppercase">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xl">
                    {project.description}
                  </p>

                  {/* Technology Stack */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono-num text-[var(--text-secondary)] mb-8 pt-4 border-t border-[var(--border-subtle)] w-full">
                    {project.tags.map((tag, i) => (
                      <React.Fragment key={tag}>
                        <span className="text-[var(--text-primary)]/90">{tag}</span>
                        {i < project.tags.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="text-[var(--accent-blue-text)]/60 font-bold"
                          >
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Project Interactions */}
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] rounded-full hover:bg-[var(--accent-blue)] hover:text-white dark:hover:text-black transition-all duration-200 cursor-pointer whitespace-nowrap shadow-lg shrink-0"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {hasValidLiveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium tracking-[0.16em] uppercase bg-[var(--bg-button-secondary)] text-[var(--text-button-secondary)] border border-[var(--border-medium)] rounded-full hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-all duration-200 whitespace-nowrap shrink-0"
                      >
                        <Globe className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                        <span>VISIT LIVE SITE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Public Project Detail Modal rendered at body root via Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={closeProjectModal}
                onTouchMove={(e) => {
                  if (e.target === e.currentTarget) e.preventDefault();
                }}
                style={{ overscrollBehavior: 'contain' }}
                className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ overscrollBehavior: 'contain' }}
                  className="relative w-full max-w-3xl rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-medium)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto my-auto shadow-2xl transition-colors duration-300"
                >
                  {/* Modal Top Bar */}
                  <div className="flex items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
                    <div className="flex items-center gap-2 text-xs font-mono-num text-[var(--accent-blue-text)] tracking-[0.16em] uppercase">
                      <span>EXPERIENCE {selectedProject.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{selectedProject.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--text-secondary)]">{selectedProject.year}</span>
                    </div>

                    <button
                      type="button"
                      onClick={closeProjectModal}
                      aria-label="Close project modal"
                      className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg border border-[var(--border-medium)] hover:border-[var(--accent-blue)] hover:bg-[var(--accent-blue-subtle)] transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    {/* Visual Preview */}
                    <div className="relative rounded-xl overflow-hidden border border-[var(--border-medium)] bg-black aspect-[16/10] max-h-[460px] flex items-center justify-center">
                      {selectedProject.imageUrl && (
                        <img
                          src={selectedProject.imageUrl}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover object-top"
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-3 uppercase">
                        {selectedProject.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[var(--text-primary)]/95 leading-relaxed font-medium mb-3">
                        {selectedProject.description}
                      </p>
                      {selectedProject.extendedDetails && (
                        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                          {selectedProject.extendedDetails}
                        </p>
                      )}
                    </div>

                    {/* Key Design & Interaction Highlights */}
                    {selectedProject.architectureHighlights &&
                      selectedProject.architectureHighlights.length > 0 && (
                        <div className="pt-6 border-t border-[var(--border-subtle)]">
                          <h4 className="text-xs font-mono-num tracking-[0.18em] text-[var(--text-primary)] uppercase mb-4">
                            DESIGN &amp; INTERACTION HIGHLIGHTS
                          </h4>
                          <ul className="space-y-2.5">
                            {selectedProject.architectureHighlights.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-[var(--text-secondary)] flex items-baseline gap-3"
                              >
                                <span className="font-mono-num text-xs text-[var(--accent-blue-text)] font-bold">
                                  0{i + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Technology Stack & Live URL */}
                    <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-mono-num tracking-[0.18em] text-[var(--text-primary)] uppercase mb-2">
                          TECHNOLOGY STACK
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono-num text-[var(--accent-blue-text)]">
                          {selectedProject.tags.map((tag, idx) => (
                            <React.Fragment key={tag}>
                              <span>{tag}</span>
                              {idx < selectedProject.tags.length - 1 && (
                                <span aria-hidden="true" className="text-[var(--border-strong)]">
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {selectedProject.liveUrl &&
                        selectedProject.liveUrl.trim().length > 0 && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium tracking-[0.14em] uppercase bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] rounded-full hover:bg-[var(--accent-blue)] hover:text-white dark:hover:text-black transition-colors shrink-0"
                          >
                            <Globe className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                            <span>VISIT LIVE SITE</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
