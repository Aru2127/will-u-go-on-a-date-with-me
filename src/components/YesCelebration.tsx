import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MEMORIES } from '../data/memories';
import { MemoryImage } from './MemoryImage';

interface YesCelebrationProps {
  onProceedToPlanner: () => void;
}

export const YesCelebration: React.FC<YesCelebrationProps> = ({
  onProceedToPlanner,
}) => {
  const [phase, setPhase] = useState<'flash' | 'flying' | 'banners' | 'calm'>('flash');

  useEffect(() => {
    // 1. Initial screen flash & ripple
    const tFlash = setTimeout(() => {
      setPhase('flying');
      // Fire confetti bursts in romantic palette
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E9C9C3', '#CFA5A1', '#76545B', '#FFFDF9', '#F48FB1']
        });
      } catch (e) {}
    }, 450);

    // 2. Flying photos & handwritten banners
    const tBanners = setTimeout(() => {
      setPhase('banners');
      try {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { y: 0.4 },
          colors: ['#76545B', '#CFA5A1', '#D9C8B5']
        });
      } catch (e) {}
    }, 2200);

    // 3. Suddenly everything settles into intimate calm
    const tCalm = setTimeout(() => {
      setPhase('calm');
    }, 6500);

    return () => {
      clearTimeout(tFlash);
      clearTimeout(tBanners);
      clearTimeout(tCalm);
    };
  }, []);

  const celebrationBanners = [
    { text: 'YES.', x: '15%', y: '20%', rot: -12, size: 'text-4xl sm:text-6xl' },
    { text: 'FINALLY.', x: '65%', y: '25%', rot: 8, size: 'text-3xl sm:text-5xl' },
    { text: 'i love you.', x: '20%', y: '70%', rot: -6, size: 'text-3xl sm:text-5xl' },
    { text: 'i miss you.', x: '70%', y: '65%', rot: 10, size: 'text-3xl sm:text-5xl' },
    { text: 'WE HAVE A DATE.', x: '45%', y: '45%', rot: -2, size: 'text-4xl sm:text-6xl' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F2EA] overflow-hidden select-none">
      {/* Warm screen flash wave */}
      {phase === 'flash' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-[#FFFDF9] z-50"
        />
      )}

      {/* Chaotic Flying Memories in 3D Depth */}
      {(phase === 'flying' || phase === 'banners') && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {MEMORIES.map((m, idx) => {
            const imgSrc = m.image;
            // Generate random flight paths from center exploding outward
            const angle = (idx / MEMORIES.length) * Math.PI * 2;
            const dist = 350 + (idx % 3) * 100;
            const targetX = Math.cos(angle) * dist;
            const targetY = Math.sin(angle) * dist;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.2, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0.9],
                  scale: [0.2, 1.1, 0.85],
                  x: [0, targetX * 0.7, targetX],
                  y: [0, targetY * 0.7, targetY],
                  rotate: [0, (idx % 2 === 0 ? 1 : -1) * (20 + idx * 8)],
                }}
                transition={{
                  duration: 4.8,
                  ease: [0.16, 1, 0.3, 1],
                  times: [0, 0.3, 1],
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-44 p-2 bg-white rounded-xl shadow-2xl border border-[#D9C8B5]"
              >
                <div className="aspect-[4/5] rounded overflow-hidden bg-[#F2E9DD]">
                  <MemoryImage
                    src={imgSrc}
                    alt={m.title}
                    artType={m.artPlaceholderSvg}
                    title={m.title}
                  />
                </div>
                <div className="pt-1.5 text-center font-handwriting text-xs text-[#76545B] truncate">
                  {m.caption}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Bursting Handwritten Banners */}
      {phase === 'banners' && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {celebrationBanners.map((b, i) => (
            <motion.div
              key={b.text}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5, type: 'spring' }}
              style={{
                left: b.x,
                top: b.y,
                transform: `translate(-50%, -50%) rotate(${b.rot}deg)`,
              }}
              className={`absolute font-handwriting font-bold ${b.size} text-[#76545B] drop-shadow-[0_4px_12px_rgba(255,255,255,0.9)]`}
            >
              {b.text}
            </motion.div>
          ))}
        </div>
      )}

      {/* Settle: Calm & Intimate resolution */}
      <AnimatePresence>
        {phase === 'calm' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md w-full mx-auto px-6 text-center space-y-8 relative z-50"
          >
            {/* The Sunlight Hug photograph in peaceful focus */}
            <div className="relative max-w-[260px] mx-auto p-3 bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#D9C8B5]/50 photo-frame">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F2E9DD]">
                <MemoryImage
                  src={MEMORIES[0].image}
                  alt="it's a date"
                  artType={MEMORIES[0].artPlaceholderSvg}
                  title="celebration"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#292627] font-medium">
                it's a date. ♡
              </h2>
              <p className="font-handwriting text-2xl text-[#76545B]">
                okay… now we actually have to plan it.
              </p>
            </div>

            <button
              onClick={onProceedToPlanner}
              className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-lg tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              let's plan our date →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
