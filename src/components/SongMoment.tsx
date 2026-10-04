import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMORIES } from '../data/memories';
import { MemoryImage } from './MemoryImage';

export const SongMoment: React.FC = () => {
  // Rotate through 4 cinematic photos slowly
  const songPhotos = [MEMORIES[0], MEMORIES[8], MEMORIES[6], MEMORIES[11]];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % songPhotos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [songPhotos.length]);

  const activePhoto = songPhotos[currentIdx];
  const imgSrc = activePhoto.image;

  return (
    <section className="relative my-28 py-20 px-6 bg-gradient-to-b from-transparent via-[#F2E9DD]/60 to-transparent overflow-hidden select-none">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E9C9C3]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto text-center space-y-10 relative z-10">
        {/* Intimate quiet intro */}
        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-base text-[#76545B]"
          >
            there's one song…
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-serif text-2xl sm:text-3xl text-[#292627] font-normal"
          >
            that makes me think of you.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="w-12 h-px bg-[#D9C8B5] mx-auto pt-1"
          />
        </div>

        {/* Cinematic slowly dissolving photo frame */}
        <div className="relative aspect-[4/5] max-w-sm mx-auto p-3 bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#D9C8B5]/60 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="w-full h-full rounded-xl overflow-hidden bg-[#F2E9DD] relative"
            >
              <MemoryImage
                src={imgSrc}
                alt={activePhoto.title}
                artType={activePhoto.artPlaceholderSvg}
                title={activePhoto.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <div className="font-handwriting text-xl text-[#FFFDF9] drop-shadow-md">
                  {activePhoto.caption}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="font-serif italic text-xs text-[#76545B] tracking-widest uppercase"
        >
          listen closely to this part.
        </motion.p>
      </div>
    </section>
  );
};
