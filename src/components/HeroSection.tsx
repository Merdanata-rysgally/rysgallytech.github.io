'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BentoCard } from './BentoCard';
import { GlowTrail } from './GlowTrail';
import { INDUSTRIES } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  const t = useTranslations('hero');

  // Spotlight — snaps to hovered card
  const gridRef = useRef<HTMLDivElement>(null);
  const [anyHovered, setAnyHovered] = useState(false);

  const springOpts = { stiffness: 280, damping: 30 };
  const spT = useSpring(0, springOpts);
  const spL = useSpring(0, springOpts);
  const spW = useSpring(100, springOpts);
  const spH = useSpring(100, springOpts);

  const handleCardHover = (cardRect: DOMRect | null) => {
    if (!cardRect || !gridRef.current) {
      setAnyHovered(false);
      return;
    }
    setAnyHovered(true);
    const grid = gridRef.current.getBoundingClientRect();
    spT.set(cardRect.top - grid.top);
    spL.set(cardRect.left - grid.left);
    spW.set(cardRect.width);
    spH.set(cardRect.height);
  };

  return (
    <section className="h-screen bg-background overflow-hidden flex items-stretch">

      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── LEFT PANEL ── */}
      <div className="relative z-20 flex flex-col justify-center w-[44%] min-w-[340px] px-12 py-12 border-r border-black/[0.06] dark:border-white/[0.06] flex-shrink-0">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-14"
        >
          <div className="w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #3fbad2, #1a8fa6)' }} />
          <span className="text-foreground/60 text-sm font-medium tracking-widest uppercase">Rysgally Tech</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-black leading-[0.9] tracking-tighter mb-8"
          style={{ fontSize: 'clamp(3.2rem, 5.5vw, 6.5rem)' }}
        >
          <span className="block text-foreground">{t('title.integrated')}</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #3fbad2 0%, #7ee8f8 50%, #3fbad2 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 4s linear infinite',
            }}
          >
            {t('title.engineering')}
          </span>
          <span className="block text-foreground/25">{t('title.and')}</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #1a8fa6 0%, #7ee8f8 50%, #1a8fa6 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 4s linear infinite reverse',
            }}
          >
            {t('title.trading')}
          </span>
          <span className="block text-foreground">{t('title.solutions')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-foreground/50 text-base leading-relaxed max-w-xs mb-10"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <button
            className="px-7 py-3.5 rounded-full font-bold text-white text-sm tracking-wide
                       hover:shadow-lg hover:shadow-[#3fbad2]/30
                       hover:scale-[1.03] transition-all duration-200 group"
            style={{ background: 'linear-gradient(90deg, #3fbad2, #1a8fa6)' }}
          >
            {t('cta.primary')}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            className="px-7 py-3.5 rounded-full font-bold text-foreground/70 text-sm tracking-wide
                       border border-black/15 dark:border-white/15 backdrop-blur-sm
                       hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-foreground
                       transition-all duration-200"
          >
            {t('cta.secondary')}
          </button>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — bento grid ── */}
      <div ref={gridRef} className="relative flex-1 overflow-hidden p-5">

        <GlowTrail containerRef={gridRef} />

        <div
          className="h-full w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(6, 1fr)',
            gap: '10px',
          }}
        >
          <BentoCard industry={INDUSTRIES[0]} index={0} style={{ gridColumn: '1', gridRow: '1 / 4' }} onCardHover={handleCardHover} />
          <BentoCard industry={INDUSTRIES[1]} index={1} style={{ gridColumn: '2', gridRow: '1 / 3' }} onCardHover={handleCardHover} />
          <BentoCard industry={INDUSTRIES[2]} index={2} style={{ gridColumn: '3', gridRow: '1 / 3' }} onCardHover={handleCardHover} />
          <BentoCard industry={INDUSTRIES[3]} index={3} style={{ gridColumn: '2', gridRow: '3 / 5' }} onCardHover={handleCardHover} />
          <BentoCard industry={INDUSTRIES[4]} index={4} style={{ gridColumn: '3', gridRow: '3 / 5' }} onCardHover={handleCardHover} />
          <BentoCard industry={INDUSTRIES[5]} index={5} style={{ gridColumn: '1', gridRow: '4 / 7' }} onCardHover={handleCardHover} />
          <BentoCard industry={INDUSTRIES[6]} index={6} style={{ gridColumn: '2', gridRow: '5 / 7' }} onCardHover={handleCardHover} />
          <BentoCard industry={INDUSTRIES[7]} index={7} style={{ gridColumn: '3', gridRow: '5 / 7' }} onCardHover={handleCardHover} />
        </div>

        {/*
          Spotlight: a transparent box that springs to the hovered card.
          Its box-shadow uses a 2000px spread to darken everything outside.
          The overlay fades in when any card is hovered.
        */}
        <motion.div
          className="absolute pointer-events-none z-20 rounded-2xl"
          style={{
            top: spT,
            left: spL,
            width: spW,
            height: spH,
            boxShadow: '0 0 0 2000px rgba(0,0,0,0.78)',
          }}
          animate={{ opacity: anyHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </div>

    </section>
  );
};
