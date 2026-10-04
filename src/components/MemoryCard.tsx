import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { MemoryItem } from '../data/memories';
import { MemoryImage } from './MemoryImage';

interface MemoryCardProps {
  memory: MemoryItem;
  customSrc?: string;
  onEasterEggFound?: () => void;
  index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  customSrc,
  onEasterEggFound,
  index,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [heartBursts, setHeartBursts] = useState<number[]>([]);

  const imgSrc = customSrc || memory.image;

  const handleCardClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      onEasterEggFound?.();
    }
  };

  const triggerHeartBurst = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartBursts((prev) => [...prev, Date.now()]);
    setTimeout(() => {
      setHeartBursts((prev) => prev.slice(1));
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-8 select-none">
      {/* Floating burst hearts */}
      <AnimatePresence>
        {heartBursts.map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 1, scale: 0.5, y: 0, x: 0 }}
            animate={{
              opacity: 0,
              scale: 1.6,
              y: -120 + Math.random() * 40,
              x: (Math.random() - 0.5) * 160
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute -top-4 left-1/2 pointer-events-none z-40 text-[#76545B]"
          >
            ♡
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main photographic card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotate: `${memory.rotationDeg}deg` }}
        onClick={handleCardClick}
        className="photo-frame relative bg-[#FFFDF9] p-3 sm:p-4 rounded-xl border border-[#D9C8B5]/50 cursor-pointer group transition-all duration-300"
      >
        {/* Washi tape on top for select memories */}
        {index % 3 === 0 && (
          <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-xs z-20 pointer-events-none opacity-85 rotate-[-1deg]" />
        )}

        {/* Image container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F2E9DD] shadow-inner">
          <MemoryImage
            src={imgSrc}
            alt={memory.title}
            artType={memory.artPlaceholderSvg}
            title={memory.title}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle vignette gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none opacity-60" />

          {/* Interactive surprise prompt indicator */}
          <button
            onClick={triggerHeartBurst}
            aria-label="Send love"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/70 backdrop-blur-sm text-[#76545B] hover:text-[#CFA5A1] hover:bg-white transition-colors z-20 shadow-sm"
          >
            <Heart size={14} className="fill-current" />
          </button>
        </div>

        {/* Polaroid caption & editorial writing */}
        <div className="pt-4 pb-2 px-1 text-center space-y-1.5">
          <p className="font-serif text-lg sm:text-xl text-[#292627] font-medium tracking-tight">
            "{memory.caption}"
          </p>
          <p className="text-xs text-[#76545B] font-sans tracking-wide">
            {memory.secondaryText}
          </p>

          {/* Handwritten margin note */}
          <div className="pt-2 font-handwriting text-lg text-[#76545B]/90 transform -rotate-1">
            ~ {memory.handwrittenNote}
          </div>

          {/* Secret Easter Egg reveal */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-[#D9C8B5]/30 text-left bg-[#F7F2EA]/60 rounded-lg p-2.5"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#76545B] uppercase tracking-wider mb-1">
                  <span>secret thought</span>
                </div>
                <p className="font-handwriting text-base text-[#292627] leading-tight">
                  "{memory.secretReveal}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isRevealed && (
            <div className="pt-1 text-[11px] font-sans text-[#D9C8B5] italic">
              (tap photo for a secret note)
            </div>
          )}
        </div>
      </motion.div>

      {/* Miss You recurring ribbon if assigned */}
      {memory.missYouNote && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-center font-serif text-sm italic text-[#CFA5A1] tracking-widest"
        >
          — {memory.missYouNote} —
        </motion.div>
      )}

      {/* Love You recurring ribbon if assigned */}
      {memory.loveYouNote && !memory.missYouNote && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-center font-serif text-sm italic text-[#76545B]/80 tracking-widest"
        >
          {memory.loveYouNote}
        </motion.div>
      )}
    </div>
  );
};
