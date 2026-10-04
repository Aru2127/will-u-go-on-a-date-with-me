import React, { useEffect, useRef } from 'react';

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  vx: number;
  vy: number;
  fadeSpeed: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  baseX: number;
  phase: number;
}

export const DustParticlesOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Number of subtle dust motes
    const particleCount = Math.min(45, Math.floor(width / 30));
    const particles: DustParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.3 + 0.1,
        maxAlpha: Math.random() * 0.35 + 0.2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.15), // Slow upward drift
        fadeSpeed: Math.random() * 0.003 + 0.002,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 18 + 8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions with gentle drifting Brownian sway
        p.phase += p.oscillationSpeed;
        p.y += p.vy * (dt / 16);
        p.x = p.baseX + Math.sin(p.phase) * p.oscillationDistance;
        p.baseX += p.vx * (dt / 16);

        // Alpha pulsating shimmer
        p.alpha += p.fadeSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.08) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.baseX = Math.random() * width;
          p.x = p.baseX;
        }
        if (p.x < -20) p.baseX = width + 10;
        if (p.x > width + 20) p.baseX = -10;

        // Render warm golden/ivory dust mote with soft blur
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = '#D9C8B5';
        ctx.shadowColor = '#E9C9C3';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 select-none will-change-transform"
      style={{ opacity: 0.85 }}
    />
  );
};
