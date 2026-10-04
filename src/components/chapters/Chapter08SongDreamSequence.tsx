import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music2 } from 'lucide-react';
import { MEMORIES } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';
import { VintageCamcorderPlayer } from '../VintageCamcorderPlayer';

interface Chapter08SongDreamSequenceProps {
  videoSrc: string;
  onEasterEggFound: () => void;
  onNext: () => void;
}

export const Chapter08SongDreamSequence: React.FC<Chapter08SongDreamSequenceProps> = ({
  videoSrc,
  onEasterEggFound,
  onNext,
}) => {
  // Rotate through 4 cinematic dream moments
  const dreamPhotos = [MEMORIES[0], MEMORIES[8], MEMORIES[6], MEMORIES[10]];
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % dreamPhotos.length);
    }, 4600);
    return () => clearInterval(timer);
  }, [dreamPhotos.length]);

  const activePhoto = dreamPhotos[photoIndex];
  const imgSrc = activePhoto.image;

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none relative flex flex-col items-center justify-center overflow-hidden">
      {/* Dreamlike glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E9C9C3]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full mx-auto space-y-12 text-center relative z-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            chapter 08
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif italic text-lg text-[#76545B]"
          >
            there's one song…
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl sm:text-5xl text-[#292627] font-normal"
          >
            that makes me think of you.
          </motion.h2>
        </div>

        {/* Cinematic slowly dissolving memory portal */}
        <div className="relative aspect-[4/5] max-w-sm mx-auto p-4 bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#D9C8B5]/60 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="w-full h-full rounded-2xl overflow-hidden bg-[#F2E9DD] relative shadow-inner"
            >
              <MemoryImage
                src={imgSrc}
                alt={activePhoto.title}
                artType={activePhoto.artPlaceholderSvg}
                title={activePhoto.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 inset-x-4 text-center">
                <div className="font-handwriting text-2xl text-white drop-shadow-md">
                  "{activePhoto.caption}"
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vintage Camcorder Tape 02: Morning Light & Purple Shirt */}
        <div className="pt-8 max-w-md mx-auto space-y-2">
          <div className="text-center space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#76545B]">
              candid archives // tape reel 02
            </span>
            <div className="font-handwriting text-2xl text-[#292627]">
              ~ morning light & purple shirt
            </div>
          </div>

          <VintageCamcorderPlayer
            tapeTitle="TAPE 02: MORNING LIGHT & SHY SMILE"
            tapeDate="OCT 04 2026"
            tapeTime="10:14:02 AM"
            videoSrc={videoSrc}
            fallbackQuote="achi dikh rahi hai... dekh na idhar"
            candidDescription="Akshita sitting on the bed in her purple shirt, hair cascading down her back, turning around playfully over her shoulder with a shy smile."
            aspectRatio="portrait"
          />
        </div>

        <p className="font-serif italic text-xs text-[#76545B] tracking-widest uppercase opacity-75 pt-2">
          let the music and memories carry the story.
        </p>

        {/* Proceed to Chapter 9 */}
        <div className="pt-4">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            begin the final walk →
          </button>
        </div>
      </div>
    </div>
  );
};
