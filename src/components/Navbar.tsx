'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const Navbar: React.FC = () => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add subtle bg on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Extract locale prefix from pathname (e.g. /en, /ru, /tk)
  const localePrefix = pathname.split('/')[1] ?? 'en';
  const base = `/${localePrefix}`;

  const links = [
    { label: t('main'), href: base },
    { label: t('business'), href: `${base}/business` },
    { label: t('contact'), href: `${base}/contact` },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(0,0,0,0.65)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href={base} className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-md flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3fbad2, #1a8fa6)' }}
          />
          <span className="text-white font-bold text-sm tracking-widest uppercase">
            Rysgally Tech
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== base && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
                style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-px"
                    style={{ background: '#3fbad2' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

      </div>
    </motion.header>
  );
};
