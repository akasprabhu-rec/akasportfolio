import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '../config/portfolioData';

interface IntroSequenceProps {
  introData: PortfolioData['intro'];
  heroData: PortfolioData['hero'];
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  introData,
  heroData,
  onComplete,
}) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);

  const posterUrl =
    heroData.portraitPosterUrl || '/assets/aistudio/portrait_poster.webp';

  useEffect(() => {
    // Respect reduced-motion accessibility settings
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const t1 = window.setTimeout(() => setPhase(2), 950);
    const t2 = window.setTimeout(() => setPhase(3), 2050);
    const t3 = window.setTimeout(() => setPhase(4), 3150);
    const t4 = window.setTimeout(() => setPhase(5), 4150);
    const t5 = window.setTimeout(() => {
      onComplete();
    }, 4650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const nameChars = introData.phase2Name.split('');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={
        phase === 5
          ? { opacity: 0, scale: 1.06 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Top Bar inside Intro: Subtle Brand & Skip Intro Option */}
      <div className="relative z-20 flex items-center justify-between max-w-[1360px] w-full mx-auto">
        <span className="font-display text-sm font-bold tracking-[0.18em] text-white/70">
          AKAS®
        </span>

        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 text-[11px] font-mono-num tracking-[0.2em] uppercase text-[#A1A1AA] hover:text-white border border-white/15 hover:border-[#B8C9FF] rounded-full transition-colors cursor-pointer pointer-events-auto"
        >
          SKIP INTRO
        </button>
      </div>

      {/* Center Stage: Directed 4-Phase Cinematic Sequence */}
      <div className="relative z-10 my-auto max-w-[1360px] w-full mx-auto flex flex-col items-center justify-center text-center min-h-[60vh]">
        {/* PHASE 3+: Portrait Reveal Entering with Depth, Scale, and Opacity */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              key="intro-portrait"
              initial={{ opacity: 0, scale: 0.86, y: 24 }}
              animate={{
                opacity: phase === 4 ? 0.5 : 0.85,
                scale: phase >= 4 ? 1.03 : 1,
                y: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full max-w-[540px] flex items-center justify-center">
                <img
                  src={posterUrl}
                  alt="Akas Prabhu Portrait Reveal"
                  className="w-full h-auto max-h-[56vh] object-contain portrait-radial-mask"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 1: "CREATIVE MINDS. DIGITAL EXPERIENCES." */}
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.p
              key="phase-1"
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 text-xs sm:text-sm font-mono-num tracking-[0.32em] text-[#B8C9FF] uppercase"
            >
              {introData.phase1Text}
            </motion.p>
          )}

          {/* PHASE 2 & 3: "AKAS PRABHU" Character-by-Character Reveal */}
          {(phase === 2 || phase === 3) && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 flex flex-col items-center"
            >
              <span className="text-[11px] font-mono-num tracking-[0.28em] text-[#B8C9FF] uppercase mb-4">
                {introData.phase1Text}
              </span>
              <h1
                aria-label={introData.phase2Name}
                className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-white flex flex-wrap justify-center overflow-hidden py-2"
              >
                {nameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 48, rotateX: -45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          )}

          {/* PHASE 4: "DESIGNING THE DIGITAL WORLD." */}
          {phase >= 4 && (
            <motion.div
              key="phase-4"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 flex flex-col items-center"
            >
              <span className="text-xs font-mono-num tracking-[0.28em] text-[#B8C9FF] uppercase mb-3">
                AKAS PRABHU
              </span>
              <h2
                className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-white max-w-3xl leading-[1.05]"
                style={{ textWrap: 'balance' }}
              >
                {introData.phase4Text}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Progress Line */}
      <div className="relative z-20 max-w-[1360px] w-full mx-auto flex items-center justify-between gap-6">
        <span className="text-[11px] font-mono-num tracking-[0.2em] text-[#A1A1AA] uppercase">
          0{Math.min(phase, 4)} / 04
        </span>
        <div className="flex-1 max-w-xs h-[1px] bg-white/12 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(Math.min(phase, 4) / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-[#B8C9FF]"
          />
        </div>
      </div>
    </motion.div>
  );
};
