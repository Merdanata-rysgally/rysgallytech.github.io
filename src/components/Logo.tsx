import React from 'react';

interface LogoProps {
  /** 'light' = white text (for dark backgrounds like navbar/hero)
   *  'dark'  = dark text (for light backgrounds like footer on white) */
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ theme = 'light', className }) => {
  const nameColor  = theme === 'light' ? '#ffffff'              : '#0a0a0a';
  const sinceColor = theme === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';

  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      {/* Gradient square mark */}
      <span
        className="w-7 h-7 rounded-md flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #3fbad2, #1a8fa6)' }}
        aria-hidden
      />

      {/* Word-mark + since */}
      <span className="flex flex-col leading-none">
        <span
          className="font-bold text-sm tracking-widest uppercase"
          style={{ color: nameColor }}
        >
          Rysgally Technology
        </span>
        <span
          className="text-[10px] tracking-widest uppercase mt-0.5"
          style={{ color: sinceColor }}
        >
          Since 1994
        </span>
      </span>
    </span>
  );
};
