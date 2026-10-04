import React from 'react';
import { motion } from 'motion/react';
import { MEMORIES } from '../data/memories';
import { MemoryImage } from './MemoryImage';

interface MemoryWallProps {
  onPhotoClick?: (id: string) => void;
}

export const MemoryWall: React.FC<MemoryWallProps> = ({ onPhotoClick }) => {
  // 12 photos arranged in an organic heart/arch constellation
  const layout = [
    // Top left lobe
    { x: -140, y: -160, rot: -8, scale: 0.9, z: 2 },
    { x: -60, y: -200, rot: -4, scale: 0.95, z: 3 },
    // Top right lobe
    { x: 60, y: -200, rot: 4, scale: 0.95, z: 3 },
    { x: 140, y: -160, rot: 8, scale: 0.9, z: 2 },
    // Center cluster
    { x: -180, y: -60, rot: -6, scale: 0.92, z: 1 },
    { x: -60, y: -80, rot: 2, scale: 1.05, z: 5 }, // Featured
    { x: 60, y: -80, rot: -3, scale: 1.05, z: 5 }, // Featured
    { x: 180, y: -60, rot: 7, scale: 0.92, z: 1 },
    // Lower taper
    { x: -110, y: 50, rot: -4, scale: 0.92, z: 2 },
    { x: 110, y: 50, rot: 5, scale: 0.92, z: 2 },
    // Tip
    { x: -40, y: 150, rot: 3, scale: 0.96, z: 4 },
    { x: 40, y: 160, rot: -2, scale: 0.98, z: 4 },
  ];

  return (
    <section className="relative my-32 py-24 px-4 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-base text-[#76545B]"
        >
          look at all of this.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal leading-relaxed"
        >
          and somehow…
          <br />
          <span className="font-handwriting text-3xl sm:text-4xl text-[#76545B]">
            my favourite part is still having you in my life.
          </span>
        </motion.h2>
      </div>

      {/* Constellation Container */}
      <div className="relative h-[650px] sm:h-[750px] max-w-4xl mx-auto flex items-center justify-center">
        {/* Soft background glow */}
        <div className="absolute w-[450px] h-[450px] bg-[#E9C9C3]/25 rounded-full blur-3xl pointer-events-none" />

        {MEMORIES.map((m, idx) => {
          const pos = layout[idx] || { x: 0, y: 0, rot: 0, scale: 1, z: 1 };
          const imgSrc = m.image;

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: pos.scale }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: pos.scale * 1.15,
                zIndex: 40,
                rotate: 0,
                transition: { duration: 0.2 },
              }}
              onClick={() => onPhotoClick?.(m.id)}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg)`,
                zIndex: pos.z,
              }}
              className="photo-frame absolute w-28 sm:w-36 p-1.5 sm:p-2 bg-white rounded-lg shadow-lg border border-[#D9C8B5]/60 cursor-pointer"
            >
              <div className="aspect-[4/5] rounded overflow-hidden bg-[#F2E9DD] relative">
                <MemoryImage
                  src={imgSrc}
                  alt={m.title}
                  artType={m.artPlaceholderSvg}
                  title={m.title}
                />
              </div>
              <div className="pt-1 text-center font-handwriting text-[11px] sm:text-xs text-[#76545B] truncate">
                {m.caption}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
