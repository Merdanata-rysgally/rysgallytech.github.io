'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import * as LucideIcons from 'lucide-react';
import type { Industry } from '@/lib/constants';
import { useCursor } from './CursorContext';

interface BentoCardProps {
  industry: Industry;
  index: number;
  style?: React.CSSProperties;
  onCardHover?: (rect: DOMRect | null) => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({ industry, index, style, onCardHover }) => {
  const t = useTranslations('industries');
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { setCardHover, clearCardHover } = useCursor();

  const IconComponent = LucideIcons[industry.iconName as keyof typeof LucideIcons] as any;

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl group"
      style={style}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          onCardHover?.(rect);
          setCardHover(
            industry.color,
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          );
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onCardHover?.(null);
        clearCardHover();
      }}
    >
      {/* Background image */}
      <Image
        src={industry.image}
        alt={t(`${industry.id}.title`)}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="33vw"
      />

      {/* Permanent dark-to-transparent gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Hover color tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-400"
        style={{ background: industry.color }}
      />

      {/* Label always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center gap-2">
          {IconComponent && (
            <div
              className="p-1.5 rounded-lg shrink-0"
              style={{ backgroundColor: `${industry.color}33`, border: `1px solid ${industry.color}66` }}
            >
              <IconComponent size={14} color="white" />
            </div>
          )}
          <span className="text-white font-semibold text-sm leading-tight drop-shadow-md">
            {t(`${industry.id}.shortTitle`)}
          </span>
        </div>
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: isHovered ? `inset 0 0 0 1px ${industry.color}80` : 'none' }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};
