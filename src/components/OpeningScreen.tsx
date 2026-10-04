import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OpeningScreenProps {
  onOpen: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen }) => {
  const [step, setStep] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Timed progression of emotional text
    const t1 = setTimeout(() => setStep(1), 1200); // "hey, akshita."
    const t2 = setTimeout(() => setStep(2), 2800); // "i made something for you."
    const t3 = setTimeout(() => setStep(3), 4600); // "please don't judge me."
    const t4 = setTimeout(() => setStep(4), 6200); // "open it ♡"

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F2EA] bg-grain px-6 select-none overflow-hidden">
      {/* Gentle floating dust / ambient light particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E9C9C3]/30 blur-[1px] animate-pulse"
            style={{
              width: `${(i % 4) + 3}px`,
              height: `${(i % 4) + 3}px`,
              left: `${(i * 19) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDuration: `${3 + (i % 5)}s`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-md w-full text-center space-y-8 relative z-10"
        animate={isOpening ? { opacity: 0, scale: 0.95, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Step 1: hey, akshita. */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal tracking-wide"
            >
              hey, akshita.
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Step 2: i made something for you. */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="text-base sm:text-lg text-[#76545B] font-serif italic tracking-wide"
            >
              i made something for you.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Step 3: please don't judge me. */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="font-handwriting text-xl sm:text-2xl text-[#CFA5A1] pt-1"
            >
              please don't judge me.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: open it ♡ button styled like opening a secret letter */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6"
            >
              <button
                onClick={handleOpenClick}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#FFFDF9] text-[#76545B] hover:text-[#292627] font-serif text-lg tracking-wide border border-[#D9C8B5]/60 shadow-[0_4px_20px_-4px_rgba(207,165,161,0.35)] hover:shadow-[0_8px_30px_-4px_rgba(207,165,161,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                {/* Subtle envelope wax stamp motif */}
                <span className="relative flex items-center gap-2">
                  <span>open it</span>
                  <span className="text-[#CFA5A1] group-hover:text-[#76545B] transition-colors duration-200">
                    ♡
                  </span>
                </span>
              </button>
              <div className="mt-3 text-[11px] text-[#D9C8B5] font-sans tracking-widest uppercase">
                sound on for best experience
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
