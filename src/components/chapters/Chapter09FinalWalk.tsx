import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface Chapter09FinalWalkProps {
  onNext: () => void;
}

export const Chapter09FinalWalk: React.FC<Chapter09FinalWalkProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);

  const walkSteps = [
    'okay.',
    'we\'ve come a long way.',
    'you\'ve seen a lot of things.',
    'you\'ve seen my favourite memories.',
    'you\'ve seen how much i miss you.',
    'you\'ve seen how much i love you.',
    'and…',
    'there\'s one thing left.',
  ];

  const handleStep = () => {
    if (step < walkSteps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 px-6 bg-[#F7F2EA] bg-grain select-none flex items-center justify-center text-center">
      <div className="max-w-lg w-full mx-auto space-y-12">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            chapter 09
          </motion.div>
          <div className="text-xs uppercase font-mono tracking-widest text-[#D9C8B5]">
            the final walk
          </div>
        </div>

        {/* Minimalist Centered Revelations */}
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal leading-relaxed"
            >
              {walkSteps[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quiet Continue trigger */}
        <div className="pt-6">
          <button
            onClick={handleStep}
            className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <span>{step < walkSteps.length - 1 ? 'step forward' : 'take the final step'}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#D9C8B5]">
          step {step + 1} of {walkSteps.length}
        </div>
      </div>
    </div>
  );
};
