'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { Logo } from './Logo';

const LOCALES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'tk', label: 'TK', name: 'Türkmen' },
];

export const Navbar: React.FC = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Detect scroll to add subtle bg on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const DEFAULT_LOCALE = 'en';

  // useLocale() gives the true current locale (even when URL has no prefix)
  const base = locale === DEFAULT_LOCALE ? '/' : `/${locale}`;
  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
    setLangOpen(false);
  };

  const links = [
    { label: t('main'), href: base },
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
        <Link href={base} className="group">
          <Logo theme="light" />
        </Link>

        {/* Desktop nav links + lang switcher */}
        <div className="hidden md:flex items-center gap-1">
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

          {/* Divider */}
          <div className="w-px h-4 bg-white/20 mx-2" />

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.75)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}
            >
              {currentLocale.label}
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                style={{ transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}
              >
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 min-w-[120px] rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    background: 'rgba(15,15,15,0.95)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-150"
                      style={{
                        color: loc.code === locale ? '#3fbad2' : 'rgba(255,255,255,0.65)',
                        background: loc.code === locale ? 'rgba(63,186,210,0.08)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (loc.code !== locale)
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                      }}
                      onMouseLeave={(e) => {
                        if (loc.code !== locale)
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <span>{loc.label}</span>
                      <span className="text-[10px] font-normal normal-case tracking-normal opacity-60">{loc.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile right side: lang switcher + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {/* Inline lang pills on mobile */}
          <div className="flex items-center gap-1">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors duration-150"
                style={{
                  color: loc.code === locale ? '#3fbad2' : 'rgba(255,255,255,0.4)',
                  background: loc.code === locale ? 'rgba(63,186,210,0.12)' : 'transparent',
                }}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
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
