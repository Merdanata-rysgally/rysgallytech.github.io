'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import * as LucideIcons from 'lucide-react';
import type { Industry } from '@/lib/constants';

interface IndustryCardProps {
  industry: Industry;
  index: number;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, index }) => {
  const t = useTranslations('industries');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Get the icon component dynamically
  const IconComponent = LucideIcons[industry.iconName as keyof typeof LucideIcons] as any;

  return (
    <motion.div
      ref={ cardRef }
      onMouseMove={ handleMouseMove }
      onMouseEnter={ () => setIsHovered(true) }
      onMouseLeave={ handleMouseLeave }
      initial={ { opacity: 0, scale: 0.8 } }
      animate={ { opacity: 1, scale: 1 } }
      transition={ {
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      } }
      whileHover={ {
        scale: 1.05,
        zIndex: 10,
        transition: { duration: 0.3 },
      } }
      style={ {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      } }
      className="relative group cursor-pointer h-full"
    >
      {/* Card Container */ }
      <div className="relative overflow-hidden rounded-2xl" style={ { height: 'clamp(160px, 22vh, 220px)' } }>
        {/* Image */ }
        <Image
          src={ industry.image }
          alt={ t(`${industry.id}.title`) }
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay on Hover */ }
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={ {
            background: `linear-gradient(135deg, ${industry.color}40 0%, transparent 100%)`,
          } }
        />

        {/* Glow Effect */ }
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl -z-10"
          style={ {
            background: industry.color,
          } }
          initial={ { opacity: 0 } }
          animate={ { opacity: isHovered ? 0.3 : 0 } }
          transition={ { duration: 0.5 } }
        />

        {/* Content Overlay */ }
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Icon */ }
          {/* <motion.div
            className="p-4 rounded-full mb-4 backdrop-blur-md"
            style={ {
              backgroundColor: `${industry.color}40`,
              border: `2px solid ${industry.color}`,
            } }
            animate={ {
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered ? `0 0 20px ${industry.color}80` : 'none',
            } }
            transition={ { duration: 0.3 } }
          >
            { IconComponent && <IconComponent size={ 48 } color="white" /> }
          </motion.div> */}

          {/* Title
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg"
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {t(`${industry.id}.shortTitle`)}
          </motion.h3> */}

          {/* Description - Only show on hover */ }
          <motion.p
            className="text-sm text-gray-200 opacity-0 group-hover:opacity-90 transition-opacity duration-300"
            initial={ { y: 10 } }
            animate={ { y: isHovered ? 0 : 10 } }
          >
            { t(`${industry.id}.description`) }
          </motion.p>
        </div>

        {/* Bottom Gradient */ }
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Shine Effect */ }
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={ {
            background:
              'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          } }
          animate={ {
            x: isHovered ? ['-100%', '100%'] : '-100%',
          } }
          transition={ {
            duration: 0.8,
            ease: 'easeInOut',
          } }
        />
      </div>

      {/* Border Glow */ }
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md"
        style={ {
          background: `linear-gradient(135deg, ${industry.color}, transparent)`,
        } }
      />
    </motion.div>
  );
};
