'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorContext';

const CURSOR_SIZE_DEFAULT = 48;
const CURSOR_SIZE_HOVER   = 48;
const MAGNET_STRENGTH     = 0.35;

export function MagneticCursor() {
  const { cursor } = useCursor();
  const [mounted, setMounted] = useState(false);

  // Target position (what the cursor should track)
  const targetX = useMotionValue(-200);
  const targetY = useMotionValue(-200);

  // Fast spring for normal movement (stiff = near-instant)
  const fastX = useSpring(targetX, { stiffness: 1000, damping: 50 });
  const fastY = useSpring(targetY, { stiffness: 1000, damping: 50 });

  // Slow spring for magnetic pull on bento cards
  const slowX = useSpring(targetX, { stiffness: 260, damping: 16 });
  const slowY = useSpring(targetY, { stiffness: 260, damping: 16 });

  const isMagnetic = cursor.magnetX !== null && cursor.magnetY !== null;

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      const mx = cursor.magnetX;
      const my = cursor.magnetY;

      if (mx !== null && my !== null) {
        targetX.set(e.clientX + (mx - e.clientX) * MAGNET_STRENGTH);
        targetY.set(e.clientY + (my - e.clientY) * MAGNET_STRENGTH);
      } else {
        targetX.set(e.clientX);
        targetY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor.magnetX, cursor.magnetY]);

  if (!mounted) return null;

  const isHovering = cursor.color !== null;
  const size = isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE_DEFAULT;
  const color = cursor.color ?? '#3fbad2';

  // Use slow spring while magnetic, fast spring otherwise
  const displayX = isMagnetic ? slowX : fastX;
  const displayY = isMagnetic ? slowY : fastY;

  return (
    <>
      {/* Hide native cursor globally when this component is mounted */}
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full select-none"
        style={{
          x: displayX,
          y: displayY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: `1px solid ${color}55`,
          boxShadow: `0 10px 35px -12px ${color}55, inset 0 0 0 1px rgba(255,255,255,0.18)`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          mixBlendMode: 'normal',
        }}
        animate={{
          width: size,
          height: size,
          opacity: 1,
        }}
        transition={{
          width:  { type: 'spring', stiffness: 320, damping: 22 },
          height: { type: 'spring', stiffness: 320, damping: 22 },
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
