/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import {
  INITIAL_PORTFOLIO_DATA,
  PortfolioData,
  ProjectItem,
} from './config/portfolioData';
import { IntroSequence } from './components/IntroSequence';
import { CustomCursor } from './components/CustomCursor';
import { SpatialStudioScene } from './components/SpatialStudioScene';
import { InteractiveReactiveBackground } from './components/InteractiveReactiveBackground';
import { Navbar } from './components/Navbar';
import { PersistentPortraitLayer } from './components/PersistentPortraitLayer';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhoIBuildForSection } from './components/WhoIBuildForSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyWorkWithMeSection } from './components/WhyWorkWithMeSection';
import { TechStackSection } from './components/TechStackSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContentEditorModal } from './components/ContentEditorModal';

const STORAGE_KEY = 'akas_prabhu_creative_developer_v13_minimal_hero';
const INTRO_SESSION_KEY = 'akas_prabhu_intro_played_v13';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          hero: {
            ...INITIAL_PORTFOLIO_DATA.hero,
            ...(parsed.hero || {}),
            label: INITIAL_PORTFOLIO_DATA.hero.label,
            heading: INITIAL_PORTFOLIO_DATA.hero.heading,
            subtitle: INITIAL_PORTFOLIO_DATA.hero.subtitle,
            description: INITIAL_PORTFOLIO_DATA.hero.description,
            primaryCta: INITIAL_PORTFOLIO_DATA.hero.primaryCta,
            secondaryCta: INITIAL_PORTFOLIO_DATA.hero.secondaryCta,
          },
          contact: {
            ...INITIAL_PORTFOLIO_DATA.contact,
            ...(parsed.contact || {}),
            instagram: INITIAL_PORTFOLIO_DATA.contact.instagram,
            phone: INITIAL_PORTFOLIO_DATA.contact.phone,
            whatsapp: INITIAL_PORTFOLIO_DATA.contact.whatsapp,
            whatsappDisplay: INITIAL_PORTFOLIO_DATA.contact.whatsappDisplay,
          },
          projects: INITIAL_PORTFOLIO_DATA.projects.map((initP) => {
            const savedP = (parsed.projects || []).find((p: any) => p.id === initP.id);
            return {
              ...initP,
              ...(savedP || {}),
              imageUrl: initP.imageUrl || savedP?.imageUrl,
            };
          }),
          whoIBuildFor: INITIAL_PORTFOLIO_DATA.whoIBuildFor,
          whyWorkWithMe: INITIAL_PORTFOLIO_DATA.whyWorkWithMe,
        };
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  // Play the intro sequence once per browsing session (unless reduced motion is enabled)
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      return sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch {
      // Ignore storage errors
    }
  }, [portfolioData]);

  const handleCompleteIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {
      // Ignore sessionStorage errors
    }
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowIntro(true);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleUpdatePortrait = useCallback((newUrl: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        portraitWebpUrl: newUrl,
        portraitVideoMp4Url: newUrl,
        portraitVideoWebmUrl: newUrl,
      },
    }));
  }, []);

  const handleUpdateProject = useCallback((updatedProject: ProjectItem) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === updatedProject.id ? updatedProject : p
      ),
    }));
  }, []);

  const handleResetPortfolio = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPortfolioData(INITIAL_PORTFOLIO_DATA);
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)] transition-colors duration-300">
        {/* Desktop Interactive Custom Cursor */}
        <CustomCursor />

        {/* Full-Screen 5-Phase Cinematic Intro Sequence (Once per session + Skip Intro) */}
        {showIntro && (
          <IntroSequence
            introData={portfolioData.intro}
            heroData={portfolioData.hero}
            onComplete={handleCompleteIntro}
          />
        )}

        {/* Persistent Fixed Background Portrait Layer Controlled by Global Document Scroll */}
        <PersistentPortraitLayer heroData={portfolioData.hero} />

        {/* Meaningful 3D Spatial Studio Perspective Layer (Three.js) */}
        <SpatialStudioScene />

        {/* Interactive Reactive Background: Floating Particles, Connecting Constellations & 3D Geometries */}
        <InteractiveReactiveBackground />

        {/* Floating Minimal Navigation Bar (HOME / ABOUT / SERVICES / WORK / CONTACT) */}
        <Navbar onNavigate={handleNavigate} />

        {/* Main Content */}
        <main className="relative z-10">
          {/* 00. Full-Screen Cinematic Hero Section */}
          <HeroSection
            data={portfolioData.hero}
            onNavigate={handleNavigate}
            onUpdatePortrait={handleUpdatePortrait}
          />

          {/* 01. About Me — Editorial Layout ("NOT JUST WEBSITES. EXPERIENCES.") */}
          <AboutSection data={portfolioData.about} />

          {/* 02. Services — Immersive 3D Service Showcase ("WHAT I DO.") */}
          <ServicesSection services={portfolioData.services} />

          {/* 03. Who I Build For — Targeted Business & Startup Categories */}
          <WhoIBuildForSection
            categories={portfolioData.whoIBuildFor}
            onNavigateToContact={() => handleNavigate('contact')}
          />

          {/* 04. Selected Work / Projects ("SELECTED DIGITAL EXPERIENCES.") */}
          <ProjectsSection
            projects={portfolioData.projects}
            onUpdateProject={handleUpdateProject}
          />

          {/* 05. Creative Process ("FROM IDEA TO INTERACTION.") */}
          <ProcessSection steps={portfolioData.process} />

          {/* 06. Why Work With Me — Core Capabilities & Advantages */}
          <WhyWorkWithMeSection pillars={portfolioData.whyWorkWithMe} />

          {/* 07. Tech Stack — Interactive Web Design & Development Toolkit */}
          <TechStackSection items={portfolioData.techStack} />

          {/* 08. Contact Section & Project Inquiry Form ("YOUR BUSINESS DESERVES A BETTER WEBSITE.") */}
          <ContactSection data={portfolioData.contact} />
        </main>

        {/* Minimal Footer */}
        <Footer
          footerData={portfolioData.footer}
          contactData={portfolioData.contact}
          onNavigate={handleNavigate}
          onReplayIntro={handleReplayIntro}
        />

        {/* Live Portfolio Content Customizer Modal */}
        <ContentEditorModal
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          data={portfolioData}
          onSave={setPortfolioData}
          onReset={handleResetPortfolio}
        />
      </div>
    </ThemeProvider>
  );
}
