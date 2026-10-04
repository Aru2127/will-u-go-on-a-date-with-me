import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { MEMORIES } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';

interface Chapter05ThingsIMissProps {
  onEasterEggFound: () => void;
  onNext: () => void;
}

export const Chapter05ThingsIMiss: React.FC<Chapter05ThingsIMissProps> = ({
  onEasterEggFound,
  onNext,
}) => {
  // Stepped emotional revelation
  const missItems = [
    { text: 'your face.', sub: 'every tiny expression you make without realizing it.' },
    { text: 'your smile.', sub: 'the way it completely takes over your eyes.' },
    { text: 'your stupid expressions.', sub: 'especially when you think no one is looking.' },
    { text: 'the little things you do.', sub: 'the random comments, the giggles, the chaos.' },
    { text: 'random conversations.', sub: 'talking about everything and absolutely nothing.' },
    { text: 'being around you.', sub: 'the room just feels different when you walk in.' },
    { text: 'laughing with you.', sub: 'until our stomachs hurt and we lose breath.' },
    { text: 'and honestly…', sub: 'i miss you. a lot. like a stupid amount.' },
    { text: 'sometimes i don\'t even have a reason.', sub: 'i just miss you.' },
  ];

  const [activeStep, setActiveStep] = useState(0);

  // Pair with intimate car ride and slumber memories (Photos 8 & 10)
  const currentPhoto = activeStep > 4 ? MEMORIES[7] : MEMORIES[6];
  const imgSrc = currentPhoto.image;

  const handleNextStep = () => {
    if (activeStep < missItems.length - 1) {
      setActiveStep((prev) => prev + 1);
      onEasterEggFound();
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto space-y-12 text-center">
        {/* Intro */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            chapter 05
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal"
          >
            things i miss.
          </motion.h2>
        </div>

        {/* Solo Contemplative Photo */}
        <div className="relative aspect-[4/5] max-w-xs mx-auto p-3 bg-[#FFFDF9] rounded-2xl shadow-lg border border-[#D9C8B5]/50 photo-frame">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full rounded-xl overflow-hidden bg-[#F2E9DD]"
            >
              <MemoryImage
                src={imgSrc}
                alt={currentPhoto.title}
                artType={currentPhoto.artPlaceholderSvg}
                title={currentPhoto.title}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slow deliberate revelation */}
        <div className="min-h-[110px] flex flex-col items-center justify-center space-y-2 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="space-y-1.5"
            >
              <div className="font-serif text-2xl sm:text-3xl text-[#292627] font-medium">
                {missItems[activeStep].text}
              </div>
              <div className="font-handwriting text-xl text-[#76545B]">
                ~ {missItems[activeStep].sub}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stepper control */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={handleNextStep}
            className="px-8 py-3 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>{activeStep < missItems.length - 1 ? 'next thought' : 'enter the universe'}</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#D9C8B5]">
          thought {activeStep + 1} of {missItems.length}
        </div>
      </div>
    </div>
  );
};
