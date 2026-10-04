import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, BarChart3, Database } from 'lucide-react';
import { MEMORIES } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';

interface Chapter03AkshitaArchiveProps {
  onEasterEggFound: () => void;
  onNext: () => void;
}

export const Chapter03AkshitaArchive: React.FC<Chapter03AkshitaArchiveProps> = ({
  onEasterEggFound,
  onNext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('SMILE');

  const categories = [
    {
      id: 'SMILE',
      label: 'SMILE',
      memory: MEMORIES[0], // Sunlight hug bright smile
      verdict: 'threat level: heart-stopping. smiles without a permit.',
      stats: { cute: 98, annoying: 12, missYou: 145 },
    },
    {
      id: 'CHAOS',
      label: 'CHAOS',
      memory: MEMORIES[2], // Pink octopus plushie
      verdict: 'unpredictable. balances stuffed cephalopods on head in public.',
      stats: { cute: 94, annoying: 89, missYou: 110 },
    },
    {
      id: 'CUTENESS',
      label: 'CUTENESS',
      memory: MEMORIES[1], // Classroom shy blushing glance
      verdict: 'unfortunately very high. tries to cover smile, fails completely.',
      stats: { cute: 99, annoying: 30, missYou: 135 },
    },
    {
      id: 'ANNOYINGNESS',
      label: 'ANNOYINGNESS',
      memory: MEMORIES[4], // Mall mirror selfie rock-on & shopping bags
      verdict: 'confirmed. made me carry all the shopping bags while throwing rock signs 🤘.',
      stats: { cute: 92, annoying: 84, missYou: 125 },
    },
    {
      id: 'PRETTY',
      label: 'PRETTY',
      memory: MEMORIES[8], // Window profile with peacock earring
      verdict: 'okay this database is getting biased. side profile is pure poetry.',
      stats: { cute: 97, annoying: 5, missYou: 150 },
    },
    {
      id: 'DANGEROUSLY_PRETTY',
      label: 'DANGEROUSLY PRETTY',
      memory: MEMORIES[5], // Winking bed selfie
      verdict: 'illegal. wink observed directly causing cognitive shutdown.',
      stats: { cute: 100, annoying: 65, missYou: 160 },
    },
  ];

  const currentCategory = categories.find((c) => c.id === selectedCategory) || categories[0];
  const imgSrc = currentCategory.memory.image;

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    onEasterEggFound();
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Fake Classified Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C9C3]/50 text-[#76545B] text-xs font-mono uppercase tracking-widest border border-[#D9C8B5]">
            <ShieldAlert size={14} />
            <span>top secret dossier // clearance required</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl text-[#292627] font-semibold tracking-tight"
          >
            THE AKSHITA ARCHIVE.
          </motion.h2>

          <p className="font-mono text-xs text-[#76545B]">
            SUBJECT: AKSHITA // STATUS: PERMANENT RESIDENT IN MY BRAIN
          </p>
        </div>

        {/* Interactive Database Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#76545B] text-white shadow-sm ring-2 ring-[#76545B]/20'
                    : 'bg-[#FFFDF9] text-[#292627] border border-[#D9C8B5]/60 hover:bg-[#F2E9DD]'
                }`}
              >
                [{cat.label}]
              </button>
            );
          })}
        </div>

        {/* Dossier Display Card */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#D9C8B5]/80 p-6 sm:p-8 shadow-xl max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Photo Evidence Container */}
              <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-xl overflow-hidden bg-[#F2E9DD] shadow-inner border border-[#D9C8B5]/60">
                <MemoryImage
                  src={imgSrc}
                  alt={currentCategory.memory.title}
                  artType={currentCategory.memory.artPlaceholderSvg}
                  title={currentCategory.memory.title}
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs font-mono text-[10px] text-white uppercase tracking-wider">
                  exhibit: {currentCategory.label}
                </div>
              </div>

              {/* Fictional System Verdict */}
              <div className="p-3.5 bg-[#F2E9DD]/60 rounded-xl border border-[#D9C8B5]/40 text-center space-y-1">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#76545B]">
                  system verdict
                </div>
                <div className="font-handwriting text-xl text-[#292627]">
                  "{currentCategory.verdict}"
                </div>
              </div>

              {/* Playful Data Visualizations / Stat Gauges */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-[#292627]">
                    <span>Cuteness quotient</span>
                    <span>{currentCategory.stats.cute}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E9C9C3]/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, currentCategory.stats.cute)}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-[#76545B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-[#292627]">
                    <span>Annoying index</span>
                    <span>{currentCategory.stats.annoying}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E9C9C3]/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, currentCategory.stats.annoying)}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="h-full bg-[#CFA5A1]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-[#292627]">
                    <span>Ability to make me miss you</span>
                    <span className="font-bold text-[#76545B]">
                      {currentCategory.stats.missYou}% (OVERFLOW)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E9C9C3]/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#CFA5A1] to-[#76545B]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Proceed to Chapter 4 */}
        <div className="pt-4 text-center">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            proceed to the chaos machine →
          </button>
        </div>
      </div>
    </div>
  );
};
