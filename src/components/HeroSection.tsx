'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BentoCard } from './BentoCard';
import { IndustryModal } from './IndustryModal';
import { INDUSTRIES, type Industry } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  const t = useTranslations('hero');

  const overlayColor = 'rgba(0, 0, 0, 0.75)';

  // Spotlight — snaps to hovered card
  const gridRef = useRef<HTMLDivElement>(null);
  const [anyHovered, setAnyHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [gridActive, setGridActive] = useState(false);

  // Modal
  const [activeIndustry, setActiveIndustry] = useState<Industry | null>(null);

  const springOpts = { stiffness: 280, damping: 30 };
  const spT = useSpring(0, springOpts);
  const spL = useSpring(0, springOpts);
  const spW = useSpring(100, springOpts);
  const spH = useSpring(100, springOpts);

  const handleCardHover = (cardRect: DOMRect | null, idx: number | null) => {
    if (!cardRect || !gridRef.current) {
      setAnyHovered(false);
      setHoveredIndex(null);
      return;
    }
    setAnyHovered(true);
    setHoveredIndex(idx);
    const grid = gridRef.current.getBoundingClientRect();
    spT.set(cardRect.top - grid.top);
    spL.set(cardRect.left - grid.left);
    spW.set(cardRect.width);
    spH.set(cardRect.height);
  };


  return (
    <>
    <section className="h-auto md:h-[92vh] bg-background overflow-hidden flex flex-col md:flex-row items-stretch cursor-default">

      {/* Subtle noise grain */ }
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={ {
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        } }
      />

      {/* ── LEFT PANEL ── */ }
      <div className="relative z-20 flex flex-col justify-center items-center md:items-start w-full md:w-[44%] md:min-w-[340px] px-6 md:px-12 pt-32 pb-12 md:pb-12 md:border-r border-b md:border-b-0 border-white/[0.06] md:flex-shrink-0">

        {/* Headline */ }
        <motion.h1
          initial={ { opacity: 0, y: 40 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
          className="font-black leading-[0.9] tracking-tighter text-center md:text-left"
          style={ { fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' } }
        >
          <span className="block text-foreground">{ t('title.integrated') }</span>
          <span
            className="block"
            style={ {
              background: 'linear-gradient(90deg, #3fbad2 0%, #7ee8f8 50%, #3fbad2 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 4s linear infinite',
            } }
          >
            { t('title.engineering') }
          </span>
          <span className="text-foreground/25 mr-1">{ t('title.and') }</span>
          <span
            style={ {
              background: 'linear-gradient(90deg, #1a8fa6 0%, #7ee8f8 50%, #1a8fa6 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 4s linear infinite reverse',
            } }
          >
            { t('title.trading') }
          </span>
          <span className="block text-foreground">{ t('title.solutions') }</span>
        </motion.h1>
      </div>

      {/* ── RIGHT PANEL — bento grid ── */ }
      <div
        ref={ gridRef }
        className="relative flex-1 overflow-hidden p-3 md:p-5 pt-4 pb-12 md:pt-16 md:h-full cursor-pointer"
        onMouseEnter={ () => setGridActive(true) }
        onMouseLeave={ () => {
          setGridActive(false);
          setAnyHovered(false);
          setHoveredIndex(null);
        } }
      >

        <div className="bento-grid w-full">
          { INDUSTRIES.map((ind, i) => {
            const positions = [
              { gridColumn: '1', gridRow: '1 / 4' },
              { gridColumn: '2', gridRow: '1 / 3' },
              { gridColumn: '3', gridRow: '1 / 3' },
              { gridColumn: '2', gridRow: '3 / 5' },
              { gridColumn: '3', gridRow: '3 / 5' },
              { gridColumn: '1', gridRow: '4 / 7' },
              { gridColumn: '2', gridRow: '5 / 7' },
              { gridColumn: '3', gridRow: '5 / 7' },
            ];
            return (
              <BentoCard
                key={ ind.id }
                industry={ ind }
                index={ i }
                style={ positions[i] }
                onCardHover={ (rect) => handleCardHover(rect, i) }
                isFocused={ hoveredIndex === i }
                onClick={ () => setActiveIndustry(ind) }
              />
            );
          }) }
        </div>

        {/* Dim-all layer when inside grid and not on a card */ }
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={ {
            opacity: gridActive && !anyHovered ? 1 : 0,
            background: overlayColor,
            transition: 'opacity 300ms ease-out',
          } }
        />

        {/*
          Spotlight: a transparent box that springs to the hovered card.
          Its box-shadow uses a 2000px spread to darken everything outside (no blur).
          The overlay fades in when any card is hovered.
        */}
        <motion.div
          className="absolute pointer-events-none z-20 rounded-2xl"
          style={ {
            top: spT,
            left: spL,
            width: spW,
            height: spH,
            boxShadow: `0 0 0 2000px ${overlayColor}`,
          } }
          animate={ { opacity: gridActive && anyHovered ? 1 : 0 } }
          transition={ { duration: 0.3, ease: 'easeOut' } }
        />
      </div>

    </section>

    <IndustryModal industry={ activeIndustry } onClose={ () => setActiveIndustry(null) } />
    </>
  );
};
