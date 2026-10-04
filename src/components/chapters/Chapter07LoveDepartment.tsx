import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { MEMORIES } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';

interface Chapter07LoveDepartmentProps {
  onEasterEggFound: () => void;
  onNext: () => void;
}

export const Chapter07LoveDepartment: React.FC<Chapter07LoveDepartmentProps> = ({
  onEasterEggFound,
  onNext,
}) => {
  const [revealedIdx, setRevealedIdx] = useState<number[]>([]);

  const loveStatements = [
    { text: 'i love your laugh.', sub: 'the loud, uninhibited one that makes everyone smile.' },
    { text: 'i love your face.', sub: 'especially when you are doing your funny scrunch expressions.' },
    { text: 'i love our conversations.', sub: 'even the ones about completely ridiculous things at 2 AM.' },
    { text: 'i love our stupid little moments.', sub: 'the inside jokes that no one else in the world would understand.' },
    { text: 'i love seeing you happy.', sub: 'your happiness makes everything else feel calm.' },
    { text: 'i love having you around.', sub: 'everything is just better when you are in the room.' },
  ];

  const handleReveal = (index: number) => {
    if (!revealedIdx.includes(index)) {
      setRevealedIdx((prev) => [...prev, index]);
      onEasterEggFound();
    }
  };

  // Pair with intimate and cozy photos (Winking photo & Late night kiss)
  const photo1 = MEMORIES[5];
  const photo2 = MEMORIES[11];

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none">
      <div className="max-w-3xl mx-auto space-y-14 text-center">
        {/* Intro */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            chapter 07
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-5xl text-[#292627] font-normal"
          >
            the 'i love you' department.
          </motion.h2>
          <p className="font-serif text-lg text-[#76545B]">
            “okay… we should probably talk about this.”
          </p>
        </div>

        {/* The Direct Confession Card */}
        <div className="p-8 bg-[#FFFDF9] rounded-3xl border border-[#D9C8B5]/80 shadow-lg space-y-4 max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl text-[#76545B] font-medium"
          >
            i love you.
          </motion.div>
          <div className="font-handwriting text-xl text-[#292627]">
            yes. i actually do.
          </div>
        </div>

        {/* Interactive Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left max-w-2xl mx-auto">
          {loveStatements.map((item, i) => {
            const isOpened = revealedIdx.includes(i);
            return (
              <motion.div
                key={item.text}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleReveal(i)}
                className="p-4 rounded-xl bg-[#FFFDF9] border border-[#D9C8B5]/60 shadow-xs cursor-pointer space-y-1 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-[#292627] font-medium">
                    {item.text}
                  </span>
                  <Heart
                    size={14}
                    className={`transition-colors ${
                      isOpened ? 'text-[#76545B] fill-current' : 'text-[#D9C8B5]'
                    }`}
                  />
                </div>
                <div className="font-handwriting text-base text-[#76545B] leading-tight">
                  {isOpened ? item.sub : '(tap to read why)'}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Two physical photographs framing the bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <div className="w-44 p-2 bg-white rounded-xl shadow-md border border-[#D9C8B5] photo-frame rotate-[-3deg]">
            <div className="aspect-[4/5] rounded overflow-hidden bg-[#F2E9DD]">
              <MemoryImage
                src={photo1.image}
                alt={photo1.title}
                artType={photo1.artPlaceholderSvg}
                title={photo1.title}
              />
            </div>
            <div className="pt-1.5 font-handwriting text-xs text-[#76545B]">
              ~ the dangerous wink
            </div>
          </div>

          <div className="w-44 p-2 bg-white rounded-xl shadow-md border border-[#D9C8B5] photo-frame rotate-[3deg]">
            <div className="aspect-[4/5] rounded overflow-hidden bg-[#F2E9DD]">
              <MemoryImage
                src={photo2.image}
                alt={photo2.title}
                artType={photo2.artPlaceholderSvg}
                title={photo2.title}
              />
            </div>
            <div className="pt-1.5 font-handwriting text-xs text-[#76545B]">
              ~ late night secrets
            </div>
          </div>
        </div>

        {/* Humorous and deep ending */}
        <div className="space-y-3 pt-4">
          <p className="font-handwriting text-3xl sm:text-4xl text-[#76545B]">
            i love you, idiot.
          </p>
          <p className="font-serif italic text-base text-[#292627]">
            probably more than i know how to explain properly.
          </p>
        </div>

        {/* Next Chapter */}
        <div className="pt-4">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            listen to the dream sequence →
          </button>
        </div>
      </div>
    </div>
  );
};
