import React from 'react';
import { motion } from 'motion/react';
import { MEMORIES } from '../data/memories';
import { MemoryImage } from './MemoryImage';

export const EmotionalSection: React.FC = () => {
  // Single intimate photograph: Photo 10 (tucked safely into neck sleeping)
  const featuredPhoto = MEMORIES[9];
  const imgSrc = featuredPhoto.image;

  return (
    <section className="relative my-36 py-28 px-6 bg-[#F7F2EA] overflow-hidden select-none">
      <div className="max-w-xl mx-auto space-y-16">
        {/* The single solitary intimate photograph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative max-w-sm mx-auto p-4 bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#D9C8B5]/40"
        >
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F2E9DD]">
            <MemoryImage
              src={imgSrc}
              alt="tucked into home"
              artType={featuredPhoto.artPlaceholderSvg}
              title="intimate calm"
              className="filter brightness-[0.98] contrast-[1.02]"
            />
          </div>
          <div className="pt-3 text-center font-handwriting text-sm text-[#76545B]/80">
            ~ no noise, just you
          </div>
        </motion.div>

        {/* Quiet, slow line-by-line prose */}
        <div className="space-y-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif text-xl sm:text-2xl text-[#292627] font-normal leading-relaxed"
          >
            sometimes i miss you for no reason.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="font-serif text-xl sm:text-2xl text-[#292627] font-normal leading-relaxed"
          >
            sometimes something reminds me of you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="font-serif text-xl sm:text-2xl text-[#292627] font-normal leading-relaxed"
          >
            sometimes i just wish you were right here.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.7 }}
            className="font-serif italic text-lg sm:text-xl text-[#76545B]"
          >
            and sometimes…
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 2.2 }}
            className="font-serif text-2xl sm:text-3xl text-[#292627] font-medium leading-relaxed"
          >
            i just want another day with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 2.8 }}
            className="pt-6 font-handwriting text-3xl sm:text-4xl text-[#76545B]"
          >
            i love you.
          </motion.div>
        </div>
      </div>
    </section>
  );
};
