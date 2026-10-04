import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { YesCelebration } from '../YesCelebration';
import { DatePlanner, DatePlanData } from '../DatePlanner';
import { FinalDateConfirmation } from '../FinalDateConfirmation';
import { MEMORIES } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';

interface Chapter10TheQuestionProps {
  easterEggCount: number;
  onRestart: () => void;
}

export const Chapter10TheQuestion: React.FC<Chapter10TheQuestionProps> = ({
  easterEggCount,
  onRestart,
}) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMessage, setNoMessage] = useState('NO :(');
  const [yesClicked, setYesClicked] = useState(false);
  const [inPlanner, setInPlanner] = useState(false);
  const [datePlan, setDatePlan] = useState<DatePlanData | null>(null);

  const funnyNoMessages = [
    'are you sure?',
    'hmmm…',
    'nice try.',
    'nope 😭',
    'you came all this way for this?',
    'Akshita…',
    'please.',
    'think again.',
    'really?',
    'that\'s rude 😭',
    'system error: NO is not permitted',
    'be serious for once 😤',
  ];

  const dodgeNoButton = () => {
    setNoAttempts((prev) => {
      const next = prev + 1;
      const msgIndex = (next - 1) % funnyNoMessages.length;
      setNoMessage(funnyNoMessages[msgIndex]);
      return next;
    });

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.floor(Math.random() * 80 + 70);
    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * distance;

    setNoPos({
      x: Math.max(-120, Math.min(120, newX)),
      y: Math.max(-80, Math.min(80, newY)),
    });
  };

  const handleYes = () => {
    setYesClicked(true);
  };

  const handleProceedToPlanner = () => {
    setYesClicked(false);
    setInPlanner(true);
  };

  const handlePlanConfirmed = (plan: DatePlanData) => {
    setDatePlan(plan);
    setInPlanner(false);
  };

  // Background floating subtle photos
  const bgPhoto1 = MEMORIES[0];
  const bgPhoto2 = MEMORIES[9];

  if (yesClicked) {
    return (
      <YesCelebration
        onProceedToPlanner={handleProceedToPlanner}
      />
    );
  }

  if (inPlanner) {
    return <DatePlanner onPlanConfirmed={handlePlanConfirmed} />;
  }

  if (datePlan) {
    return <FinalDateConfirmation plan={datePlan} onRestart={onRestart} />;
  }

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none relative flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Floating Blurred Memories */}
      <div className="absolute top-12 left-8 w-32 sm:w-44 opacity-25 filter blur-[2px] pointer-events-none rotate-[-6deg]">
        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F2E9DD]">
          <MemoryImage
            src={bgPhoto1.image}
            alt={bgPhoto1.title}
            artType={bgPhoto1.artPlaceholderSvg}
            title={bgPhoto1.title}
          />
        </div>
      </div>

      <div className="absolute bottom-16 right-8 w-32 sm:w-44 opacity-25 filter blur-[2px] pointer-events-none rotate-[6deg]">
        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F2E9DD]">
          <MemoryImage
            src={bgPhoto2.image}
            alt={bgPhoto2.title}
            artType={bgPhoto2.artPlaceholderSvg}
            title={bgPhoto2.title}
          />
        </div>
      </div>

      {/* Main Question Stage */}
      <div className="max-w-2xl w-full mx-auto space-y-12 relative z-20">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            the destination
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0 }}
            className="font-serif text-4xl sm:text-6xl text-[#292627] font-normal tracking-wide"
          >
            Akshita…
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="font-serif text-3xl sm:text-5xl text-[#76545B] font-medium leading-tight"
          >
            will u go on a date with me?
          </motion.h2>
        </div>

        {/* Choice Buttons: Grand YES vs Evasive NO */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[140px]">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleYes}
            className="relative px-10 py-4 rounded-full bg-[#76545B] text-[#FFFDF9] font-serif text-2xl sm:text-3xl tracking-wide shadow-[0_12px_40px_-5px_rgba(118,84,91,0.5)] hover:shadow-[0_18px_50px_-5px_rgba(118,84,91,0.65)] cursor-pointer flex items-center gap-3 group transition-all duration-300 border border-[#FFFDF9]/20"
          >
            <span>YES</span>
            <Heart
              size={22}
              className="fill-current text-[#E9C9C3] group-hover:scale-125 transition-transform duration-200"
            />
          </motion.button>

          {/* Dodging NO Button */}
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

        {/* Humorous notice if NO is repeatedly clicked */}
        <AnimatePresence>
          {noAttempts > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-handwriting text-xl text-[#CFA5A1] pt-2"
            >
              {noAttempts > 5
                ? 'you really have infinite persistence don\'t you? just press YES already 😭'
                : 'it is physically impossible to say no. trust the physics.'}
            </motion.div>
          )}
        </AnimatePresence>

        {easterEggCount >= 3 && (
          <div className="text-xs font-handwriting text-[#76545B]/60 pt-4">
            ps: thank you for discovering every secret along the way ♡
          </div>
        )}
      </div>
    </div>
  );
};
