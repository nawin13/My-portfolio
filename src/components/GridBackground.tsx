import React, { useEffect, useRef, useState } from 'react';

export const GridBackground: React.FC = () => {
  // Smooth mouse/touch tracking & drag panning for interactive moveable grid
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const normX = (e.clientX - cx) / Math.max(cx, 1);
      const normY = (e.clientY - cy) / Math.max(cy, 1);

      // Smooth parallax shift based on cursor position
      targetOffset.current = {
        x: normX * 32,
        y: normY * 32,
      };

      setMousePos({ x: e.clientX, y: e.clientY, active: true });
    };

    const handleMouseLeave = () => {
      targetOffset.current = { x: 0, y: 0 };
      setMousePos((prev) => ({ ...prev, active: false }));
      isDragging.current = false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Allow drag movement on non-clickable background areas
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        return;
      }
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = { x: e.clientX, y: e.clientY };
      // Move grid interactively with drag gesture
      dragOffset.current.x += dx * 0.7;
      dragOffset.current.y += dy * 0.7;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetOffset.current = {
          x: ((touch.clientX - cx) / Math.max(cx, 1)) * 24,
          y: ((touch.clientY - cy) / Math.max(cy, 1)) * 24,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Smooth RAF loop with gentle lerp and elastic drag dissipation
    const animate = () => {
      const ease = 0.06;
      if (!isDragging.current) {
        // Elastic glide back toward baseline parallax position
        dragOffset.current.x *= 0.94;
        dragOffset.current.y *= 0.94;
      }

      const totalTargetX = targetOffset.current.x + dragOffset.current.x;
      const totalTargetY = targetOffset.current.y + dragOffset.current.y;

      currentOffset.current.x += (totalTargetX - currentOffset.current.x) * ease;
      currentOffset.current.y += (totalTargetY - currentOffset.current.y) * ease;

      setOffset({
        x: Math.round(currentOffset.current.x * 100) / 100,
        y: Math.round(currentOffset.current.y * 100) / 100,
      });

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* =========================================================================
          LAYER 1: DEEP NAVY BASE (Subtle deep teal undertone)
          ========================================================================= */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#070e17] transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-950/10 via-transparent to-cyan-950/10 dark:from-[#03141f]/60 dark:via-transparent dark:to-[#04121d]/60" />

      {/* =========================================================================
          LAYER 2: VIBRANT INTERACTIVE MOVEABLE CYBER BLUEPRINT GRID
          - Matches exact visual language from user screenshot
          - Prominent, gorgeous cyan/teal blocks (64px desktop / 52px mobile)
          - Clear, visible opacity (0.12 light / 0.22 dark)
          - Interactive parallax shifting with mouse & touch drag
          - Continuous 26s background drift animation across the canvas
          ========================================================================= */}
      <div
        className="absolute -inset-16 transition-transform duration-100 will-change-transform"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        {/* Desktop Grid (64px x 64px crisp architectural blocks) */}
        <div
          className="hidden sm:block absolute inset-0 opacity-[0.12] dark:opacity-[0.22] animate-grid-drift transition-opacity duration-300"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(45, 212, 191, 0.45) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(45, 212, 191, 0.45) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Mobile Grid (52px x 52px blocks matching mobile screenshot) */}
        <div
          className="sm:hidden absolute inset-0 opacity-[0.14] dark:opacity-[0.24] animate-grid-drift transition-opacity duration-300"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(45, 212, 191, 0.48) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(45, 212, 191, 0.48) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      {/* =========================================================================
          INTERACTIVE CURSOR BLUEPRINT SPOTLIGHT
          - Very soft, subtle glow that gently follows cursor across the grid
          ========================================================================= */}
      {mousePos.active && (
        <div
          className="hidden sm:block absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.05), transparent 75%)`,
          }}
        />
      )}

      {/* =========================================================================
          LAYER 3: VERTICAL ARCHITECTURAL LIGHT COLUMNS (Ultra-soft, restrained)
          ========================================================================= */}
      <div className="absolute top-0 left-[20%] w-[200px] sm:w-[280px] h-[150vh] bg-gradient-to-b from-cyan-400/10 via-teal-500/5 to-transparent blur-[140px] rounded-full pointer-events-none transform -translate-x-1/2 motion-safe:animate-[pulse_16s_ease-in-out_infinite]" />
      <div className="absolute top-0 left-[50%] w-[240px] sm:w-[340px] h-[160vh] bg-gradient-to-b from-teal-400/10 via-cyan-400/5 to-transparent blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 motion-safe:animate-[pulse_20s_ease-in-out_infinite] delay-1000" />
      <div className="absolute top-0 left-[80%] w-[180px] sm:w-[260px] h-[140vh] bg-gradient-to-b from-sky-400/8 via-teal-500/5 to-transparent blur-[140px] rounded-full pointer-events-none transform -translate-x-1/2 motion-safe:animate-[pulse_18s_ease-in-out_infinite] delay-3000" />

      {/* =========================================================================
          LAYER 4: ATMOSPHERIC RADIAL GLOW BEHIND SECTIONS
          ========================================================================= */}
      <div className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-teal-400/12 via-cyan-500/6 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-cyan-500/8 via-teal-500/4 to-transparent blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-b from-teal-500/9 via-sky-500/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

      {/* =========================================================================
          LAYER 5: SUBTLE VIGNETTE (Gentle perimeter vignette protecting readability)
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, transparent 65%, rgba(4, 9, 15, 0.6) 100%)',
        }}
      />
    </div>
  );
};
