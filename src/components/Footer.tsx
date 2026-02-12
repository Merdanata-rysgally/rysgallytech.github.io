'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const t = useTranslations('footer');

  // next-intl v3 doesn't expose t.optional, so we guard manually
  const safeT = (key: string, fallback: string) => {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  };

  const linkLabel = (key: string, fallback: string) => safeT(key, fallback);
  const tagline = safeT('tagline', 'Engineering • Manufacturing • Trade');
  const copyright = safeT('copyright', 'All rights reserved.');

  const navItems = [
    { label: linkLabel('links.main', 'Main'), href: '#' },
    { label: linkLabel('links.contact', 'Contact'), href: '#' },
  ];

  const socials = [
    { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
    { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
    { icon: <YoutubeIcon />, href: '#', label: 'YouTube' },
    { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-background text-foreground border-t border-black/5 dark:border-white/10 pt-12 pb-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Logo + nav */ }
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex-shrink-0"
              style={ { background: 'linear-gradient(135deg, #3fbad2, #1a8fa6)' } }
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide uppercase">Rysgally Tech</span>
              <span className="text-xs text-foreground/50">{ tagline }</span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            { navItems.map((item, i) => (
              <a
                key={ i }
                href={ item.href }
                className="px-3 py-1 rounded-full border border-transparent hover:border-foreground/15 hover:bg-foreground/5 transition-colors duration-150"
              >
                { item.label }
              </a>
            )) }
          </nav>
        </div>

        <div className="h-px bg-foreground/10 dark:bg-white/10" />

        {/* Bottom bar */ }
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span className="text-foreground/60">
            © { new Date().getFullYear() } Rysgally Tech. { copyright }
          </span>

          <div className="flex items-center gap-2">
            { socials.map((s, i) => (
              <a
                key={ i }
                href={ s.href }
                aria-label={ s.label }
                className="w-9 h-9 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center
                           text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors duration-150"
              >
                { s.icon }
              </a>
            )) }
          </div>
        </div>

      </div>
    </footer>
  );
};
