'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Industry } from '@/lib/constants';
import { useCursor } from './CursorContext';

interface BentoCardProps {
  industry: Industry;
  index: number;
  style?: React.CSSProperties;
  onCardHover?: (rect: DOMRect | null, index: number | null) => void;
  isFocused?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({ industry, index, style, onCardHover, isFocused = false }) => {
  const t = useTranslations('industries');
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { setCardHover, clearCardHover } = useCursor();


  return (
    <motion.div
      ref={ cardRef }
      className="relative overflow-hidden rounded-2xl group"
      style={ {
        ...style,
        filter: 'none',
      } }
      initial={ { opacity: 0, scale: 0.96 } }
      animate={ { opacity: 1, scale: isFocused ? 1.02 : 1 } }
      transition={ { delay: index * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }
      onMouseEnter={ () => {
        setIsHovered(true);
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          onCardHover?.(rect, index);
          setCardHover(
            industry.color,
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          );
        }
      } }
      onMouseLeave={ () => {
        setIsHovered(false);
        onCardHover?.(null, null);
        clearCardHover();
      } }
    >
      {/* Background image */ }
      <Image
        src={ industry.image }
        alt={ t(`${industry.id}.title`) }
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="33vw"
      />

      {/* Permanent dark-to-transparent gradient at bottom */ }
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


      {/* Label always visible at bottom */ }
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center gap-2">
          {/* <div
            className="p-1.5 rounded-lg shrink-0"
            style={ { backgroundColor: `${industry.color}33`, border: `1px solid ${industry.color}66` } }
          >
            <Image src={ industry.icon } alt="" width={ 14 } height={ 14 } />
          </div> */}
          <span className="text-white font-semibold text-sm leading-tight drop-shadow-md">
            { t(`${industry.id}.shortTitle`) }
          </span>
        </div>
      </div>

      {/* Outline / glow emphasis */ }
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={ {
          boxShadow: isFocused
            ? `inset 0 0 0 1px ${industry.color}99, 0 0 0 1.5px ${industry.color}80, 0 12px 32px -10px ${industry.color}55`
            : isHovered
              ? `inset 0 0 0 1px ${industry.color}80`
              : 'none',
        } }
        transition={ { duration: 0.2 } }
      />
    </motion.div>
  );
};
