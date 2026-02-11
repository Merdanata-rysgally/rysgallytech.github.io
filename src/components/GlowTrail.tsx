// 'use client';

// import { useEffect, useRef } from 'react';
// import { useCursor } from './CursorContext';

// interface Particle {
//   x: number;
//   y: number;
//   color: string;
//   alpha: number;     // starts at 1, decays to 0
//   radius: number;
//   born: number;      // timestamp ms
// }

// const LIFETIME_MS = 1000;   // fade out over 1 s
// const RADIUS      = 36;     // blob radius in px
// const SPACING     = 6;      // min px between new particles

// export function GlowTrail({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
//   const canvasRef   = useRef<HTMLCanvasElement>(null);
//   const particles   = useRef<Particle[]>([]);
//   const lastPos     = useRef<{ x: number; y: number } | null>(null);
//   const rafId       = useRef<number>(0);
//   const { cursor }  = useCursor();
//   const colorRef    = useRef<string>('#3fbad2');

//   // Keep color ref in sync without needing to re-register listeners
//   useEffect(() => {
//     colorRef.current = cursor.color ?? '#3fbad2';
//   }, [cursor.color]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

//     // Size canvas to container (hi-dpi aware)
//     const resize = () => {
//       if (!container) return;
//       const { offsetWidth: w, offsetHeight: h } = container;
//       dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
//       canvas.style.width = `${w}px`;
//       canvas.style.height = `${h}px`;
//       canvas.width = Math.floor(w * dpr);
//       canvas.height = Math.floor(h * dpr);
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     };
//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(container);

//     // Mouse move — add particles
//     const onMove = (e: MouseEvent) => {
//       const rect = container.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       // Skip if too close to last point
//       if (lastPos.current) {
//         const dx = x - lastPos.current.x;
//         const dy = y - lastPos.current.y;
//         if (dx * dx + dy * dy < SPACING * SPACING) return;
//       }
//       lastPos.current = { x, y };

//       particles.current.push({
//         x, y,
//         color: colorRef.current,
//         alpha: 1,
//         radius: RADIUS,
//         born: performance.now(),
//       });
//     };

//     const onLeave = () => {
//       lastPos.current = null;
//     };

//     container.addEventListener('mousemove', onMove, { passive: true });
//     container.addEventListener('mouseleave', onLeave);

//     // rAF render loop
//     const draw = (now: number) => {
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

//       // Update + draw particles
//       particles.current = particles.current.filter(p => {
//         const age = now - p.born;
//         if (age >= LIFETIME_MS) return false;

//         p.alpha = 1 - age / LIFETIME_MS;

//         const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
//         grad.addColorStop(0,   hexToRgba(p.color, p.alpha * 0.55));
//         grad.addColorStop(0.5, hexToRgba(p.color, p.alpha * 0.18));
//         grad.addColorStop(1,   hexToRgba(p.color, 0));

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//         ctx.fillStyle = grad;
//         ctx.fill();

//         return true;
//       });

//       rafId.current = requestAnimationFrame(draw);
//     };
//     rafId.current = requestAnimationFrame(draw);

//     return () => {
//       container.removeEventListener('mousemove', onMove);
//       container.removeEventListener('mouseleave', onLeave);
//       cancelAnimationFrame(rafId.current);
//       ro.disconnect();
//     };
//   }, [containerRef]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 pointer-events-none z-10"
//       style={{ mixBlendMode: 'screen' }}
//     />
//   );
// }

// // Convert #rrggbb to rgba(r,g,b,a)
// function hexToRgba(hex: string, alpha: number): string {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return `rgba(${r},${g},${b},${alpha})`;
// }
