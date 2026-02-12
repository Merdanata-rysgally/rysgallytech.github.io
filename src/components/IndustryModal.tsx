'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Industry } from '@/lib/constants';

interface IndustryModalProps {
  industry: Industry | null;
  onClose: () => void;
}

export const IndustryModal: React.FC<IndustryModalProps> = ({ industry, onClose }) => {
  const t = useTranslations('industries');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open, restore on close
  useEffect(() => {
    if (industry) {
      document.body.style.overflow = 'hidden';
      // Reset scroll position on each open
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [industry]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const bodyText: string = industry ? (t.raw(`${industry.id}.body`) as string) : '';
  const paragraphs = bodyText.split('\n\n').filter(Boolean);

  return (
    <AnimatePresence>
      {industry && (
        <>
          {/* Backdrop — thin strip at top lets user see there's a page behind */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Sheet — full width, leaves ~56px gap at top for close affordance */}
          <motion.div
            key="modal"
            ref={scrollRef}
            className="fixed left-0 right-0 bottom-0 z-[101] bg-white overflow-y-auto shadow-2xl"
            style={{ top: '56px', borderRadius: '20px 20px 0 0' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Centered content column — matches Dribbble layout */}
            <div className="max-w-3xl mx-auto px-6 md:px-10 pb-16 pt-10">

              {/* Hero image — padded, rounded, inside the column */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={industry.image}
                  alt={t(`${industry.id}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: industry.color }}
                />
              </div>

              {/* Industry colour tag */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-5"
                style={{
                  background: `${industry.color}18`,
                  color: industry.color,
                  border: `1px solid ${industry.color}30`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: industry.color }} />
                {t(`${industry.id}.shortTitle`)}
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-tight mb-3">
                {t(`${industry.id}.title`)}
              </h2>

              {/* Short description */}
              <p className="text-base font-medium mb-10" style={{ color: industry.color }}>
                {t(`${industry.id}.description`)}
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-200 mb-10" />

              {/* Body paragraphs */}
              <div className="space-y-6">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-[15px] md:text-base text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Close button — top-right corner */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="fixed top-4 right-4 z-[102] w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
