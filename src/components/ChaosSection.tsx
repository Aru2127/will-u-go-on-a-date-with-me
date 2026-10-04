import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MEMORIES } from '../data/memories';
import { MemoryImage } from './MemoryImage';

interface ChaosSectionProps {
  onEasterEggFound?: () => void;
}

export const ChaosSection: React.FC<ChaosSectionProps> = ({
  onEasterEggFound,
}) => {
  const [clickedTags, setClickedTags] = useState<string[]>([]);
  const [punchlineRevealed, setPunchlineRevealed] = useState(false);

  const tags = [
    { text: 'cute.', rotate: -6, color: '#CFA5A1' },
    { text: 'pretty.', rotate: 4, color: '#76545B' },
    { text: 'annoying.', rotate: -3, color: '#292627' },
    { text: 'VERY annoying.', rotate: 7, color: '#76545B' },
    { text: 'okay fine.', rotate: -5, color: '#D9C8B5' },
    { text: 'adorable.', rotate: 3, color: '#CFA5A1' },
    { text: 'STOP ✋', rotate: -8, color: '#292627' },
  ];

  // Pick 4 diverse memories for the playful collage cluster
  const chaoticPhotos = [MEMORIES[2], MEMORIES[3], MEMORIES[4], MEMORIES[1]];

  const handleTagClick = (tag: string) => {
    if (!clickedTags.includes(tag)) {
      setClickedTags((prev) => [...prev, tag]);
      onEasterEggFound?.();
    }
  };

  return (
    <section className="relative my-24 py-16 px-4 bg-[#F2E9DD]/50 rounded-3xl border border-[#D9C8B5]/40 overflow-hidden select-none">
      {/* Decorative floating stickers / doodle arrows */}
      <div className="absolute top-4 left-6 font-handwriting text-2xl text-[#CFA5A1] opacity-70 -rotate-12 pointer-events-none">
        chaos warning ⚠️
      </div>
      <div className="absolute bottom-6 right-8 font-handwriting text-xl text-[#76545B]/60 rotate-6 pointer-events-none">
        ~ definitely not normal
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        {/* Chaotic headline with bouncy playful tags */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-sm text-[#76545B] tracking-widest uppercase"
          >
            a brief breakdown of my camera roll
          </motion.p>

          <div className="flex flex-wrap justify-center items-center gap-3 max-w-lg mx-auto py-2">
            {tags.map((tag, i) => (
              <motion.button
                key={tag.text}
                whileHover={{ scale: 1.12, rotate: tag.rotate * 1.5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTagClick(tag.text)}
                style={{ rotate: `${tag.rotate}deg`, borderColor: tag.color }}
                className={`px-4 py-2 rounded-full font-handwriting text-xl border shadow-sm transition-colors duration-200 cursor-pointer ${
                  clickedTags.includes(tag.text)
                    ? 'bg-[#76545B] text-white'
                    : 'bg-[#FFFDF9] text-[#292627] hover:bg-[#F7F2EA]'
                }`}
              >
                {tag.text}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dynamic scattered photo cluster */}
        <div className="relative py-8 h-[380px] sm:h-[440px] flex items-center justify-center">
          {chaoticPhotos.map((photo, idx) => {
            const imgSrc = photo.image;
            // Precise staggered positions for designed explosion
            const offsets = [
              { x: -110, y: -40, rot: -8, scale: 0.9, z: 2 },
              { x: 100, y: -20, rot: 7, scale: 0.95, z: 3 },
              { x: -60, y: 60, rot: 4, scale: 0.88, z: 1 },
              { x: 70, y: 70, rot: -5, scale: 0.92, z: 4 }
            ][idx];

            return (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.08, zIndex: 10, rotate: 0 }}
                style={{
                  transform: `translate(${offsets.x}px, ${offsets.y}px) rotate(${offsets.rot}deg) scale(${offsets.scale})`,
                  zIndex: offsets.z,
                }}
                className="absolute w-44 sm:w-56 p-2.5 bg-white rounded-lg shadow-lg border border-[#D9C8B5]/50 photo-frame transition-all duration-300"
              >
                <div className="aspect-[4/5] rounded overflow-hidden bg-[#F2E9DD]">
                  <MemoryImage
                    src={imgSrc}
                    alt={photo.title}
                    artType={photo.artPlaceholderSvg}
                    title={photo.title}
                  />
                </div>
                <div className="pt-2 text-center font-handwriting text-sm text-[#76545B] truncate">
                  {photo.caption}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Punchline Question */}
        <div className="pt-6 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-xl sm:text-2xl text-[#292627]"
          >
            “why do i even have this many pictures of you?”
          </motion.div>

          <button
            onClick={() => setPunchlineRevealed(true)}
            className="font-handwriting text-lg text-[#CFA5A1] hover:text-[#76545B] underline underline-offset-4 cursor-pointer transition-colors"
          >
            {punchlineRevealed ? "oh..." : "(tap for the scientific answer)"}
          </button>

          {punchlineRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-[#FFFDF9] max-w-sm mx-auto rounded-2xl border border-[#D9C8B5]/60 shadow-md font-serif text-lg text-[#76545B]"
            >
              “because I like you. a ridiculous amount. 😂”
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
