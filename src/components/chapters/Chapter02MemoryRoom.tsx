import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pin, Sparkles, Heart } from 'lucide-react';
import { MEMORIES } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';

interface Chapter02MemoryRoomProps {
  onEasterEggFound: () => void;
  onNext: () => void;
}

export const Chapter02MemoryRoom: React.FC<Chapter02MemoryRoomProps> = ({
  onEasterEggFound,
  onNext,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [heartBursts, setHeartBursts] = useState<number[]>([]);

  // 4 featured physical memories inside this room space
  const roomMemories = [
    { memory: MEMORIES[0], type: 'pinned', tilt: -3, note: 'the yellow kurta sunlight hug. her smile stopped my whole world.' },
    { memory: MEMORIES[1], type: 'leaning', tilt: 2, note: 'caught blushing in class. trying so hard to hide her smile.' },
    { memory: MEMORIES[5], type: 'taped', tilt: -2, note: 'the wink that ruined my concentration for a week.' },
    { memory: MEMORIES[6], type: 'suspended', tilt: 3, note: 'sleeping curled on my chest on the bus. my arm went numb, 100% worth it.' },
  ];

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => {
      const next = !prev[id];
      if (next) onEasterEggFound();
      return { ...prev, [id]: next };
    });
  };

  const triggerHeartBurst = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartBursts((prev) => [...prev, Date.now()]);
    setTimeout(() => {
      setHeartBursts((prev) => prev.slice(1));
    }, 1200);
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none">
      {/* Floating burst hearts */}
      <AnimatePresence>
        {heartBursts.map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 1, scale: 0.5, y: 0, x: 0 }}
            animate={{
              opacity: 0,
              scale: 1.8,
              y: -140 + Math.random() * 40,
              x: (Math.random() - 0.5) * 160,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 pointer-events-none z-50 text-[#76545B] text-2xl"
          >
            ♡
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Editorial Intro */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            chapter 02
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal"
          >
            the memory room.
          </motion.h2>
          <p className="font-handwriting text-xl sm:text-2xl text-[#76545B]/80 max-w-md mx-auto">
            “this was probably a warning sign... because apparently i started missing you.”
          </p>
        </div>

        {/* 3D-feeling Room Wall with physical photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 pt-4">
          {roomMemories.map(({ memory, type, tilt, note }, idx) => {
            const isFlipped = !!flippedCards[memory.id];
            const imgSrc = memory.image;

            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                style={{ rotate: `${tilt}deg` }}
                className="relative group cursor-pointer"
                onClick={() => toggleFlip(memory.id)}
              >
                {/* Physical Mounting Accents */}
                {type === 'pinned' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 text-[#76545B] drop-shadow-sm flex items-center justify-center w-7 h-7 rounded-full bg-[#E9C9C3]/80 border border-white">
                    <Pin size={14} className="fill-current rotate-45" />
                  </div>
                )}
                {type === 'taped' && (
                  <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 rounded-xs z-30 opacity-90 rotate-[-1deg]" />
                )}
                {type === 'suspended' && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                    <div className="w-px h-7 bg-[#D9C8B5] border-l border-dashed border-[#76545B]/40" />
                    <div className="w-2 h-2 rounded-full bg-[#76545B]" />
                  </div>
                )}

                {/* Polaroid Frame */}
                <div className="photo-frame relative bg-[#FFFDF9] p-3 sm:p-4 rounded-xl border border-[#D9C8B5]/60 transition-all duration-300 group-hover:scale-[1.02]">
                  {!isFlipped ? (
                    <div>
                      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#F2E9DD] shadow-inner">
                        <MemoryImage
                          src={imgSrc}
                          alt={memory.title}
                          artType={memory.artPlaceholderSvg}
                          title={memory.title}
                          className="transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <button
                          onClick={triggerHeartBurst}
                          aria-label="Heart burst"
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/75 backdrop-blur-sm text-[#76545B] hover:text-[#CFA5A1] hover:bg-white transition-colors z-20 shadow-sm"
                        >
                          <Heart size={14} className="fill-current" />
                        </button>
                      </div>

                      <div className="pt-4 pb-2 text-center space-y-1">
                        <div className="font-serif text-lg text-[#292627] font-medium">
                          "{memory.caption}"
                        </div>
                        <div className="font-handwriting text-base text-[#76545B]">
                          ~ {memory.handwrittenNote}
                        </div>
                        <div className="text-[11px] font-mono text-[#D9C8B5] pt-1">
                          (click photo to flip over)
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Backside of the physical photograph */
                    <div className="aspect-[4/5] flex flex-col justify-between p-6 bg-[#F2E9DD]/60 rounded-lg border border-dashed border-[#D9C8B5] text-left">
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#76545B]">
                        <Sparkles size={12} className="text-[#CFA5A1]" />
                        <span>written on the back</span>
                      </div>
                      <div className="font-handwriting text-xl sm:text-2xl text-[#292627] leading-relaxed my-auto">
                        "{note}"
                      </div>
                      <div className="text-[11px] font-mono text-[#76545B]/60 text-right">
                        click to flip back ⟳
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative Step to Next Chapter */}
        <div className="pt-8 text-center">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            open the classified archive →
          </button>
        </div>
      </div>
    </div>
  );
};
