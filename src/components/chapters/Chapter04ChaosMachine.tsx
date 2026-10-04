import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Flame, ShieldAlert } from 'lucide-react';
import { MEMORIES } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';
import { VintageCamcorderPlayer } from '../VintageCamcorderPlayer';

interface Chapter04ChaosMachineProps {
  videoSrc: string;
  onEasterEggFound: () => void;
  onNext: () => void;
}

export const Chapter04ChaosMachine: React.FC<Chapter04ChaosMachineProps> = ({
  videoSrc,
  onEasterEggFound,
  onNext,
}) => {
  const [chaosLevel, setChaosLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [fakeResuming, setFakeResuming] = useState(false);

  const chaosNotes = [
    { text: 'cute.', x: '-35%', y: '-25%', rot: -10, color: '#CFA5A1' },
    { text: 'pretty.', x: '35%', y: '-30%', rot: 12, color: '#76545B' },
    { text: 'annoying.', x: '-40%', y: '15%', rot: -7, color: '#292627' },
    { text: 'VERY annoying.', x: '38%', y: '10%', rot: 8, color: '#76545B' },
    { text: 'why are you like this 😭', x: '-20%', y: '40%', rot: -5, color: '#CFA5A1' },
    { text: 'STOP ✋', x: '25%', y: '35%', rot: 15, color: '#292627' },
    { text: 'actually don\'t stop', x: '0%', y: '-45%', rot: -2, color: '#76545B' },
    { text: 'fine. adorable.', x: '0%', y: '50%', rot: 4, color: '#CFA5A1' },
  ];

  const fakeWarnings = [
    'WARNING: excessive cuteness detected.',
    'WARNING: missing her again.',
    'WARNING: emotional stability unavailable.',
    'CRITICAL: brain completely overtaken by Akshita.',
  ];

  const handleMakeItWorse = () => {
    setChaosLevel((prev) => Math.min(prev + 1, 4));
    onEasterEggFound();
  };

  const handleStopChaos = () => {
    setIsPaused(true);
    setTimeout(() => {
      setFakeResuming(true);
      setTimeout(() => {
        setIsPaused(false);
        setFakeResuming(false);
        setChaosLevel((prev) => prev + 1);
        onEasterEggFound();
      }, 1400);
    }, 1800);
  };

  // 4 photos with dynamic offsets
  const activePhotos = [MEMORIES[2], MEMORIES[3], MEMORIES[4], MEMORIES[1]];

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none relative overflow-hidden">
      {/* Dynamic Screen Warnings */}
      <div className="max-w-3xl mx-auto space-y-10 text-center relative z-20">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            chapter 04
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl text-[#292627] font-semibold"
          >
            the chaos machine.
          </motion.h2>
          <p className="font-serif text-lg text-[#76545B]">
            “okay. now we're going to be honest.”
          </p>
        </div>

        {/* Warning Banner Reel */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9C9C3]/60 border border-[#76545B]/30 text-xs sm:text-sm font-mono text-[#76545B]"
        >
          <AlertTriangle size={16} />
          <span>{fakeWarnings[(chaosLevel - 1) % fakeWarnings.length]}</span>
        </motion.div>

        {/* Chaos Escalation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-2">
          <button
            onClick={handleMakeItWorse}
            disabled={chaosLevel >= 4}
            className="px-5 py-2.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Flame size={14} />
            <span>make it worse (level {chaosLevel}/4)</span>
          </button>

          <button
            onClick={handleStopChaos}
            className="px-5 py-2.5 rounded-full bg-[#FFFDF9] text-[#76545B] border border-[#D9C8B5] hover:bg-[#F2E9DD] text-xs font-mono uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
          >
            okay stop 🛑
          </button>
        </div>

        {/* Fake Resuming Overlay */}
        <AnimatePresence>
          {isPaused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 max-w-sm mx-auto bg-[#FFFDF9] rounded-2xl border border-[#76545B] shadow-2xl font-serif text-lg text-[#292627]"
            >
              {fakeResuming ? (
                <span className="font-handwriting text-2xl text-[#76545B]">
                  just kidding. chaos resumes! 😂
                </span>
              ) : (
                <span>chaos temporarily suspended...</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Swirling Photographic Arena */}
        <div className="relative h-[420px] sm:h-[480px] max-w-lg mx-auto flex items-center justify-center">
          {/* Floating Notes */}
          {chaosNotes.slice(0, 4 + chaosLevel * 1).map((note, i) => (
            <motion.div
              key={note.text}
              animate={{
                x: [0, (i % 2 === 0 ? 1 : -1) * (10 * chaosLevel), 0],
                y: [0, (i % 3 === 0 ? 1 : -1) * (12 * chaosLevel), 0],
                rotate: [note.rot, note.rot + (chaosLevel * 4), note.rot],
              }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.4 }}
              style={{
                left: `calc(50% + ${note.x})`,
                top: `calc(50% + ${note.y})`,
                color: note.color,
                borderColor: note.color,
              }}
              className="absolute px-3.5 py-1.5 rounded-full bg-white/95 border shadow-sm font-handwriting text-lg sm:text-xl pointer-events-none z-30"
            >
              {note.text}
            </motion.div>
          ))}

          {/* Staggered Flying Photos */}
          {activePhotos.map((photo, idx) => {
            const imgSrc = photo.image;
            const offsets = [
              { x: -110, y: -50, r: -12 * chaosLevel },
              { x: 100, y: -30, r: 10 * chaosLevel },
              { x: -70, y: 70, r: 6 * chaosLevel },
              { x: 80, y: 80, r: -8 * chaosLevel },
            ][idx];

            return (
              <motion.div
                key={photo.id}
                animate={{
                  x: offsets.x,
                  y: offsets.y,
                  rotate: offsets.r,
                  scale: 0.9 + chaosLevel * 0.05,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute w-40 sm:w-52 p-2 bg-white rounded-xl shadow-xl border border-[#D9C8B5] photo-frame"
              >
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#F2E9DD]">
                  <MemoryImage
                    src={imgSrc}
                    alt={photo.title}
                    artType={photo.artPlaceholderSvg}
                    title={photo.title}
                  />
                </div>
                <div className="pt-1.5 text-center font-handwriting text-xs text-[#76545B] truncate">
                  {photo.caption}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vintage Camcorder Tape 01: Late Night Bed Giggles */}
        <div className="pt-6 max-w-md mx-auto space-y-2">
          <div className="text-center space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#76545B]">
              recovered surveillance footage
            </span>
            <div className="font-handwriting text-2xl text-[#292627]">
              ~ the late night giggles tape
            </div>
          </div>

          <VintageCamcorderPlayer
            tapeTitle="TAPE 01: BEDROOM GIGGLES & HIDING HER FACE"
            tapeDate="OCT 04 2026"
            tapeTime="02:41:18 AM"
            videoSrc={videoSrc}
            fallbackQuote="in dono ko dekh lo... cookie... look at them laughing on the bed"
            candidDescription="Akshita hiding her face in her hands, giggling uncontrollably while Vivaan narrates to the camera."
            aspectRatio="portrait"
          />
        </div>

        {/* Proceed to Chapter 5 */}
        <div className="pt-6">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            take a breath & enter the quiet →
          </button>
        </div>
      </div>
    </div>
  );
};
