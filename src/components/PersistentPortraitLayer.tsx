import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioData } from '../config/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface PersistentPortraitLayerProps {
  heroData: PortfolioData['hero'];
}

export const PersistentPortraitLayer: React.FC<PersistentPortraitLayerProps> = ({
  heroData,
}) => {
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [inHeroZone, setInHeroZone] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mp4Url =
    heroData.portraitVideoMp4Url || '/assets/aistudio/portrait_scrub.mp4';
  const webmUrl =
    heroData.portraitVideoWebmUrl || '/assets/aistudio/portrait_scrub.webm';
  const posterUrl =
    heroData.portraitPosterUrl || '/assets/aistudio/portrait_poster.webp';

  // Ensure initial paused state and frame 0 when video metadata is available
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause();
      if (video.currentTime !== 0) {
        video.currentTime = 0;
      }
      setMetadataLoaded(true);
    };

    if (
      video.readyState >= 1 &&
      Number.isFinite(video.duration) &&
      video.duration > 0
    ) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [mp4Url, webmUrl]);

  // Synchronize portrait video currentTime with global document scroll via GSAP ScrollTrigger + rAF
  useEffect(() => {
    const video = videoRef.current;
    if (!metadataLoaded || !video) return;

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;

    video.pause();

    let rafId: number | null = null;
    let targetTime = 0;
    let lastAppliedTime = -1;

    const applySeek = () => {
      rafId = null;
      if (!video) return;
      if (!video.paused) {
        video.pause();
      }
      if (Math.abs(targetTime - lastAppliedTime) > 0.004) {
        try {
          video.currentTime = targetTime;
          lastAppliedTime = targetTime;
        } catch {
          // Ignore transient DOM seek errors
        }
      }
    };

    const syncFromScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const scrollProgress = Math.max(
        0,
        Math.min(1, window.scrollY / maxScroll)
      );

      const isHero = window.scrollY < window.innerHeight * 0.45;
      setInHeroZone((prev) => (prev !== isHero ? isHero : prev));

      const safeMaxTime = Math.max(0, duration - 0.02);
      targetTime = scrollProgress * safeMaxTime;

      if (Math.abs(targetTime - lastAppliedTime) > 0.004 && rafId === null) {
        rafId = requestAnimationFrame(applySeek);
      }
    };

    // Register GSAP ScrollTrigger over full document body without pinning
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: () => {
        syncFromScroll();
      },
    });

    syncFromScroll();

    window.addEventListener('scroll', syncFromScroll, { passive: true });
    window.addEventListener('resize', syncFromScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      syncFromScroll();
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      trigger.kill();
      window.removeEventListener('scroll', syncFromScroll);
      window.removeEventListener('resize', syncFromScroll);
      resizeObserver.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [metadataLoaded]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--bg-primary)] flex items-start pt-14 sm:pt-16 lg:pt-0 lg:items-center transition-colors duration-300"
    >
      {/* Subtle ambient studio backlight */}
      <div className="absolute top-1/3 lg:top-1/2 right-[8%] -translate-y-1/2 w-[320px] h-[320px] lg:w-[540px] lg:h-[540px] rounded-full bg-[var(--accent-blue)]/[0.04] blur-[140px]" />

      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center">
          {/* Left 5 cols reserved for Hero text alignment */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* Right 7 cols: Persistent Portrait Layer */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.15,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[780px] flex items-center justify-center transition-opacity duration-700 ease-out ${inHeroZone
                  ? 'opacity-100'
                  : 'opacity-20 md:opacity-35 lg:opacity-45'
                }`}
            >
              <div className="relative w-full flex items-center justify-center bg-black rounded-2xl lg:rounded-3xl overflow-hidden border border-black/10 dark:border-transparent dark:rounded-none shadow-2xl dark:shadow-none">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="auto"
                  poster={posterUrl}
                  disablePictureInPicture
                  disableRemotePlayback
                  onLoadedData={() => {
                    if (videoRef.current) {
                      videoRef.current.pause();
                    }
                  }}
                  className="w-full h-[38vh] min-h-[230px] max-h-[320px] sm:h-[42vh] sm:max-h-[380px] lg:h-auto lg:min-h-0 lg:max-h-[76vh] object-contain select-none pointer-events-none portrait-radial-mask bg-black"
                >
                  <source src={mp4Url} type="video/mp4" />
                  <source src={webmUrl} type="video/webm" />
                </video>

                {/* Seamless black edge vignette overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25 lg:to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 lg:from-black/50 lg:to-black/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
