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

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const t = useTranslations('stats');

  const stats = [
    { value: 5, suffix: '+', label: t('years') },
    { value: 8, suffix: '', label: t('industries') },
    { value: 98, suffix: '%', label: t('retention') },
  ];

  return (
    <section className="py-24 bg-background border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, currentColor 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div
                className="text-6xl md:text-7xl font-black tracking-tighter mb-3"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.45) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#3fbad2]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
