import React from 'react';
import { ArrowUp, ArrowUpRight, Play } from 'lucide-react';
import { PortfolioData } from '../config/portfolioData';

interface FooterProps {
  footerData: PortfolioData['footer'];
  contactData: PortfolioData['contact'];
  onNavigate: (sectionId: string) => void;
  onOpenStudioEditor?: () => void;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  footerData,
  contactData,
  onNavigate,
  onOpenStudioEditor,
  onReplayIntro,
}) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'WORK', id: 'work' },
    { label: 'PROCESS', id: 'process' },
    { label: 'CONTACT', id: 'contact' },
  ];

  // Brand-Specific Interactive Social Links
  const socialLinks = [
    {
      id: 'email',
      label: 'EMAIL',
      href: `mailto:${contactData.email}`,
      isExternal: false,
      hoverTextColor:
        'group-hover:text-black dark:group-hover:text-white group-focus-visible:text-black dark:group-focus-visible:text-white',
      glowShadow: '0 0 10px rgba(255, 255, 255, 0.45)',
      underlineClass: 'bg-black dark:bg-white',
      arrowClass: 'text-black dark:text-white',
      isGradient: false,
    },
    {
      id: 'whatsapp',
      label: 'WHATSAPP',
      href: `https://wa.me/${(contactData.whatsapp || '919360484615').replace(/[^0-9]/g, '')}`,
      isExternal: true,
      hoverTextColor:
        'group-hover:text-[#25D366] group-focus-visible:text-[#25D366]',
      glowShadow: '0 0 12px rgba(37, 211, 102, 0.55)',
      underlineClass: 'bg-[#25D366]',
      arrowClass: 'text-[#25D366]',
      isGradient: false,
    },
    {
      id: 'instagram',
      label: 'INSTAGRAM',
      href: contactData.instagram,
      isExternal: true,
      hoverTextColor: '',
      glowShadow: '0 0 12px rgba(221, 42, 123, 0.55)',
      underlineClass:
        'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      arrowClass: 'text-[#DD2A7B]',
      isGradient: true,
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      href: contactData.linkedin,
      isExternal: true,
      hoverTextColor:
        'group-hover:text-[#0A66C2] group-focus-visible:text-[#0A66C2]',
      glowShadow: '0 0 12px rgba(10, 102, 194, 0.55)',
      underlineClass: 'bg-[#0A66C2]',
      arrowClass: 'text-[#0A66C2]',
      isGradient: false,
    },
  ];

  return (
    <footer className="relative z-10 bg-[var(--bg-nav)] backdrop-blur-md border-t border-[var(--border-subtle)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand & Tagline */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="font-display text-2xl font-bold tracking-[0.12em] text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors inline-block mb-2"
            >
              {footerData.brand}
            </a>
            <p className="text-xs font-mono-num tracking-[0.18em] text-[var(--text-secondary)] uppercase">
              {footerData.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6"
          >
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="text-xs font-medium tracking-[0.16em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-blue)] rounded px-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Upgraded Interactive Social Media Links */}
          <div
            aria-label="Social Media Links"
            className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8"
          >
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target={social.isExternal ? '_blank' : undefined}
                rel={social.isExternal ? 'noopener noreferrer' : undefined}
                aria-label={`Visit my ${social.label}`}
                className="group relative inline-flex items-center gap-1.5 py-2.5 px-1.5 text-xs font-mono-num tracking-[0.18em] text-[var(--text-secondary)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-blue)] rounded select-none cursor-pointer"
                style={
                  {
                    '--glow-filter': social.glowShadow,
                  } as React.CSSProperties
                }
              >
                <span className="relative inline-block transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-focus-visible:-translate-y-0.5 group-focus-visible:scale-[1.03] group-hover:[filter:drop-shadow(var(--glow-filter))] group-focus-visible:[filter:drop-shadow(var(--glow-filter))]">
                  {social.isGradient ? (
                    <>
                      <span className="transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
                        {social.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none select-none"
                      >
                        {social.label}
                      </span>
                    </>
                  ) : (
                    <span
                      className={`transition-colors duration-300 ${social.hoverTextColor}`}
                    >
                      {social.label}
                    </span>
                  )}
                </span>

                {/* Animated Diagonal Arrow Indicator */}
                <ArrowUpRight
                  className={`w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 ${social.arrowClass}`}
                  aria-hidden="true"
                />

                {/* Animated Brand Underline Accent */}
                <span
                  className={`absolute bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full ${social.underlineClass}`}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Controls */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p className="font-mono-num">
            © {currentYear} {footerData.brand}. ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 text-xs font-mono-num tracking-[0.14em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>REPLAY INTRO</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-2 text-xs font-mono-num tracking-[0.14em] uppercase text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
