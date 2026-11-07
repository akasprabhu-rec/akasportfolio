import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'HOME', id: 'home' },
  { label: 'ABOUT', id: 'about' },
  { label: 'SERVICES', id: 'services' },
  { label: 'WORK', id: 'work' },
  { label: 'CONTACT', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);

      const sections = [
        'home',
        'about',
        'services',
        'who-i-build-for',
        'work',
        'process',
        'why-work-with-me',
        'stack',
        'contact',
      ];
      const scrollPos = window.scrollY + 260;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (sectionId === 'who-i-build-for') {
              setActiveSection('services');
            } else if (
              sectionId === 'process' ||
              sectionId === 'why-work-with-me' ||
              sectionId === 'stack'
            ) {
              setActiveSection('work');
            } else {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-nav)] backdrop-blur-xl border-b border-[var(--border-subtle)] py-3 md:py-4 shadow-sm'
          : 'bg-transparent border-b border-transparent py-3.5 md:py-6'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-12 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Title */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-lg font-bold tracking-[0.14em] text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors whitespace-nowrap shrink-0"
        >
          AKAS®
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`group relative py-1 text-xs font-medium tracking-[0.18em] transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[1.5px] bg-[var(--accent-blue)] transition-transform duration-300 origin-left w-full ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action / Mobile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Theme Toggle immediately to the LEFT of START A PROJECT */}
          <ThemeToggle />

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--text-primary)] border border-[var(--border-medium)] rounded-full hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] hover:bg-[var(--accent-blue-subtle)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            START A PROJECT
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[var(--bg-nav-mobile)] backdrop-blur-2xl border-b border-[var(--border-medium)] px-6 pt-4 pb-8 shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`py-2 text-sm font-display font-medium tracking-[0.18em] border-b border-[var(--border-subtle)] transition-colors ${
                    activeSection === item.id
                      ? 'text-[var(--accent-blue)]'
                      : 'text-[var(--text-primary)] hover:text-[var(--accent-blue)]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
