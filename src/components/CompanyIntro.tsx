'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export const CompanyIntro: React.FC = () => {
  const t = useTranslations('intro');
  const tStats = useTranslations('stats');

  const stats = [
    { value: 32, suffix: '+', label: tStats('years') },
    { value: 8, suffix: '', label: tStats('industries') },
    { value: 98, suffix: '%', label: tStats('retention') },
  ];

  // The intro sentence with highlighted keywords
  const sentence = t('body');
  const keywords = t.raw('keywords') as string[];

  // Split sentence into parts, wrapping keywords in cyan spans
  const renderHighlighted = (text: string, words: string[]) => {
    let result: React.ReactNode[] = [text];
    words.forEach((word) => {
      result = result.flatMap((part) => {
        if (typeof part !== 'string') return [part];
        const segments = part.split(word);
        return segments.flatMap((seg, i) =>
          i < segments.length - 1
            ? [seg, <span key={`${word}-${i}`} className="text-cyan-500 font-semibold">{word}</span>]
            : [seg]
        );
      });
    });
    return result;
  };

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-gray-700 leading-relaxed"
        >
          {renderHighlighted(sentence, keywords)}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 mb-16 h-px bg-gray-200 origin-center"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-cyan-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
