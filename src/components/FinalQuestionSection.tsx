import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface FinalQuestionSectionProps {
  onYesClicked: () => void;
  noAttempts: number;
  setNoAttempts: React.Dispatch<React.SetStateAction<number>>;
  easterEggCount: number;
}

export const FinalQuestionSection: React.FC<FinalQuestionSectionProps> = ({
  onYesClicked,
  noAttempts,
  setNoAttempts,
  easterEggCount,
}) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMessage, setNoMessage] = useState('NO :(');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const funnyNoMessages = [
    'are you sure?',
    'hmmm…',
    'nice try.',
    'nope 😭',
    'you really came all this way for this?',
    'Akshita.',
    'please.',
    'think again.',
    "I'm giving you another chance.",
    'you are really committed to this no thing 😭',
    'be serious for once 😤',
    'system error: NO is not permitted',
    'ok but like... really? 🥺',
  ];

  const dodgeNoButton = () => {
    setNoAttempts((prev) => {
      const next = prev + 1;
      const msgIndex = (next - 1) % funnyNoMessages.length;
      setNoMessage(funnyNoMessages[msgIndex]);
      return next;
    });

    // Unpredictable smooth offset within safe container boundary
    const randomAngle = Math.random() * Math.PI * 2;
    const distance = Math.floor(Math.random() * 80 + 70);
    const newX = Math.cos(randomAngle) * distance;
    const newY = Math.sin(randomAngle) * distance;

    setNoPos({
      x: Math.max(-120, Math.min(120, newX)),
      y: Math.max(-80, Math.min(80, newY)),
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center text-center bg-[#F7F2EA] bg-grain select-none overflow-hidden"
    >
      {/* Background ethereal particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E9C9C3]/25 blur-[1px] animate-pulse"
            style={{
              width: `${(i % 5) + 3}px`,
              height: `${(i % 5) + 3}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto space-y-12 relative z-10">
        {/* Lead-in narrative building toward the question */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-base text-[#76545B]"
          >
            okay…
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-serif text-2xl text-[#292627]"
          >
            there's something i actually wanted to ask you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="font-handwriting text-xl text-[#76545B]/80"
          >
            (and yes… apparently i needed an entire website first.)
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="max-w-md mx-auto pt-4 space-y-2 text-[#76545B] font-serif text-base"
          >
            <p>i wanted you to see all of this.</p>
            <p className="italic">because these are some of my favourite memories.</p>
            <p className="pt-2 font-medium text-[#292627]">and because i miss you. a lot.</p>
          </motion.div>
        </div>

        {/* Aware easter-egg remark if user was curious */}
        {easterEggCount >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-handwriting text-[#CFA5A1]"
          >
            ps: i noticed you explored all the little secrets. i love that about you ♡
          </motion.div>
        )}

        {/* The Big Question */}
        <div className="pt-8 space-y-6">
          <motion.h3
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#292627] font-normal tracking-wide"
          >
            Akshita…
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#76545B] font-medium leading-tight"
          >
            will u go on a date with me?
          </motion.h2>
        </div>

        {/* Interactive Choice Buttons: YES vs DODGING NO */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[140px]">
          {/* YES Button (The Grand Destination) */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={onYesClicked}
            className="relative px-10 py-4 rounded-full bg-[#76545B] text-[#FFFDF9] font-serif text-xl sm:text-2xl tracking-wide shadow-[0_10px_35px_-5px_rgba(118,84,91,0.45)] hover:shadow-[0_16px_45px_-5px_rgba(118,84,91,0.6)] cursor-pointer flex items-center gap-3 group transition-all duration-300 border border-[#FFFDF9]/20"
          >
            <span>YES</span>
            <Heart
              size={20}
              className="fill-current text-[#E9C9C3] group-hover:scale-125 transition-transform duration-200"
            />
          </motion.button>

          {/* Dodging Playful NO Button */}
          <motion.button
            onMouseEnter={dodgeNoButton}
            onTouchStart={dodgeNoButton}
            onClick={dodgeNoButton}
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="px-6 py-3 rounded-full bg-[#FFFDF9] text-[#76545B] border border-[#D9C8B5] font-sans text-sm sm:text-base hover:bg-[#F2E9DD] shadow-xs cursor-pointer whitespace-nowrap"
          >
            {noMessage}
          </motion.button>
        </div>

        {/* Reactive notice if NO attempts are high */}
        <AnimatePresence>
          {noAttempts > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-handwriting text-lg text-[#CFA5A1] pt-2"
            >
              {noAttempts > 5
                ? 'you really have infinite persistence don’t you? just press YES already 😭'
                : 'it is physically impossible to say no. trust the physics.'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
