import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Chapter01SecretDoorProps {
  onOpenDoor: () => void;
}

export const Chapter01SecretDoor: React.FC<Chapter01SecretDoorProps> = ({ onOpenDoor }) => {
  const [step, setStep] = useState(1);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    const t2 = setTimeout(() => setStep(2), 1600);
    const t3 = setTimeout(() => setStep(3), 3400);
    const t4 = setTimeout(() => setStep(4), 5000);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleOpen = () => {
    setIsExpanding(true);
    setTimeout(() => {
      onOpenDoor();
    }, 850);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F7F2EA] bg-grain px-6 select-none overflow-hidden">
      {/* Subtle ambient light dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E9C9C3]/25 blur-[1px] animate-pulse"
            style={{
              width: `${(i % 4) + 3}px`,
              height: `${(i % 4) + 3}px`,
              left: `${(i * 19) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDuration: `${3.5 + (i % 4)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        animate={isExpanding ? { opacity: 0, scale: 0.95, y: -25 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full text-center space-y-8 relative z-10"
      >
        <AnimatePresence>
          {step >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal tracking-wide"
            >
              hey, akshita.
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="font-serif italic text-base sm:text-lg text-[#76545B] tracking-wide"
            >
              i made something for you.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0 }}
              className="font-handwriting text-xl sm:text-2xl text-[#CFA5A1] pt-1"
            >
              this might have gotten slightly out of hand.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="pt-6"
            >
              <button
                onClick={handleOpen}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#FFFDF9] text-[#76545B] hover:text-[#292627] font-serif text-lg tracking-wide border border-[#D9C8B5]/70 shadow-[0_6px_25px_-5px_rgba(207,165,161,0.4)] hover:shadow-[0_10px_35px_-5px_rgba(207,165,161,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
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
