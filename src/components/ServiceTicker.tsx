'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { INDUSTRIES } from '@/lib/constants';

export const ServiceTicker: React.FC = () => {
  const t = useTranslations('industries');
  const [paused, setPaused] = useState(false);

  const items = INDUSTRIES.map((ind) => ({
    id: ind.id,
    label: t(`${ind.id}.shortTitle`),
    color: ind.color,
  }));

  // Duplicate for seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full bg-white border-y border-gray-100 overflow-hidden py-2"
      onMouseEnter={ () => setPaused(true) }
      onMouseLeave={ () => setPaused(false) }
    >
      <div className="relative flex">
        {/* Left fade */ }
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={ { background: 'linear-gradient(to right, white, transparent)' } }
        />
        {/* Right fade */ }
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={ { background: 'linear-gradient(to left, white, transparent)' } }
        />

        <div
          className="flex gap-4 will-change-transform"
          style={ {
            animation: 'ticker 28s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
            whiteSpace: 'nowrap',
          } }
        >
          { doubled.map((item, i) => (
            <Pill key={ i } label={ item.label } color={ item.color } />
          )) }
        </div>
      </div>
    </div>
  );
};

const Pill = ({ label, color }: { label: string; color: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md border bg-white
                 font-medium text-sm tracking-wide flex-shrink-0 transition-all duration-200"
      style={ {
        borderColor: '#e5e7eb',
        color: '#1f2937',
        boxShadow: hovered ? `0 2px 12px ${color}22` : 'none',
      } }
      onMouseEnter={ () => setHovered(true) }
      onMouseLeave={ () => setHovered(false) }
    >
      { label }
    </button>
  );
};
