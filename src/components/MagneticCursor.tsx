'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorContext';

const CURSOR_SIZE_DEFAULT = 20;
const CURSOR_SIZE_HOVER   = 48;
const MAGNET_STRENGTH     = 0.35; // 0 = no pull, 1 = fully locked to center

export function MagneticCursor() {
  const { cursor } = useCursor();
  const [mounted, setMounted] = useState(false);

  // Raw mouse position
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Spring-smoothed position
  const springX = useSpring(rawX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 18 });

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      const mx = cursor.magnetX;
      const my = cursor.magnetY;

      if (mx !== null && my !== null) {
        // Pull cursor toward card center
        rawX.set(e.clientX + (mx - e.clientX) * MAGNET_STRENGTH);
        rawY.set(e.clientY + (my - e.clientY) * MAGNET_STRENGTH);
      } else {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  // Re-register when magnet target changes so strength applies immediately
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor.magnetX, cursor.magnetY]);

  if (!mounted) return null;

  const isHovering = cursor.color !== null;
  const size = isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE_DEFAULT;
  const color = cursor.color ?? '#3fbad2';

  return (
    <>
      {/* Hide native cursor globally when this component is mounted */}
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full select-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: color,
          mixBlendMode: isHovering ? 'normal' : 'difference',
        }}
        animate={{
          width: size,
          height: size,
          opacity: 1,
        }}
        transition={{
          width:  { type: 'spring', stiffness: 300, damping: 25 },
          height: { type: 'spring', stiffness: 300, damping: 25 },
        }}
      >
        <motion.span
          className="text-white font-bold tracking-widest uppercase select-none"
          style={{ fontSize: 9, letterSpacing: '0.12em' }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        >
          VIEW
        </motion.span>
      </motion.div>
    </>
  );
}
