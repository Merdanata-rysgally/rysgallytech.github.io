'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const Navbar: React.FC = () => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll to add subtle bg on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
        background: scrolled || menuOpen
          ? 'rgba(0,0,0,0.85)'
          : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

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

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 bg-white transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
          />
        </button>

      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.06]"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== base && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] rounded-lg transition-colors duration-200"
                    style={{
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                      background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

    </motion.header>
  );
};
