import React, { useEffect, useRef } from 'react';

export const HeartCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only enable on fine pointer (desktop / laptop mice), never on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovered = false;
    let isClicking = false;
    let animationFrameId: number;

    const particles: Array<{ x: number; y: number; opacity: number; size: number; vy: number }> = [];

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastSpawnTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const now = performance.now();
      if (now - lastSpawnTime > 35) {
        lastSpawnTime = now;
        if (particles.length < 25) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            opacity: 0.7,
            size: Math.random() * 4 + 3,
            vy: -0.3,
          });
        }
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [role="button"], .photo-frame, .cursor-pointer');
        isHovered = !!interactive;
      }
    };

    const handleMouseDown = () => { isClicking = true; };
    const handleMouseUp = () => { isClicking = false; };
    const handleMouseLeave = () => { mouseX = -100; mouseY = -100; };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      // Smooth interpolation for silky lag-free cursor lag
      const factor = isHovered ? 0.35 : 0.45;
      currentX += (mouseX - currentX) * factor;
      currentY += (mouseY - currentY) * factor;

      if (cursorRef.current) {
        const scale = isClicking ? 0.78 : isHovered ? 1.45 : 1;
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      if (auraRef.current) {
        auraRef.current.style.opacity = isHovered ? '0.85' : '0.25';
      }

      // Render particle trail on lightweight canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.y += p.vy;
          p.opacity -= 0.025;
          p.size = Math.max(1, p.size - 0.08);

          if (p.opacity <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = '#CFA5A1';
          ctx.beginPath();
          // Draw tiny heart path
          const s = p.size / 2;
          ctx.translate(p.x, p.y);
          ctx.moveTo(0, s * 0.4);
          ctx.bezierCurveTo(-s, -s * 0.8, -s * 1.6, s * 0.3, 0, s * 1.5);
          ctx.bezierCurveTo(s * 1.6, s * 0.3, s, -s * 0.8, 0, s * 0.4);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Hardware-accelerated canvas for the heart particle trail */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Main cursor element with will-change: transform */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="relative">
          {/* Subtle soft glowing aura */}
          <div
            ref={auraRef}
            className="absolute -inset-2 rounded-full bg-[#E9C9C3] blur-md transition-opacity duration-200"
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="relative drop-shadow-[0_2px_8px_rgba(118,84,91,0.4)]"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#76545B"
              stroke="#FFFDF9"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
