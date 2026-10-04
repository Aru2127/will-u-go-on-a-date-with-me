import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';

interface ChapterNavigationProps {
  currentChapter: number;
  maxReachedChapter: number;
  onSelectChapter: (chapter: number) => void;
  onNextChapter: () => void;
  onPrevChapter: () => void;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  currentChapter,
  maxReachedChapter,
  onSelectChapter,
  onNextChapter,
  onPrevChapter,
}) => {
  if (currentChapter === 1) return null; // Page 1 is the secret door, kept pristine

  const activeChapterData = CHAPTERS.find((c) => c.id === currentChapter) || CHAPTERS[0];

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 px-4 pointer-events-none select-none">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#D9C8B5]/60 shadow-lg pointer-events-auto">
        {/* Previous Button */}
        <button
          onClick={onPrevChapter}
          disabled={currentChapter <= 2}
          aria-label="Previous chapter"
          className={`p-2 rounded-full transition-all ${
            currentChapter > 2
              ? 'text-[#76545B] hover:text-[#292627] hover:bg-[#F2E9DD] cursor-pointer'
              : 'text-[#D9C8B5]/50 cursor-not-allowed opacity-40'
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Minimalist Chapter Dots & Title */}
        <div className="flex flex-col items-center gap-1.5 min-w-0">
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((c) => {
              const isCurrent = c.id === currentChapter;
              const isUnlocked = c.id <= maxReachedChapter;
              return (
                <button
                  key={c.id}
                  onClick={() => isUnlocked && onSelectChapter(c.id)}
                  disabled={!isUnlocked}
                  title={`${c.id}. ${c.title}`}
                  className={`transition-all duration-300 rounded-full ${
                    isCurrent
                      ? 'w-6 h-2 bg-[#76545B]'
                      : isUnlocked
                      ? 'w-2 h-2 bg-[#D9C8B5] hover:bg-[#CFA5A1] cursor-pointer'
                      : 'w-1.5 h-1.5 bg-[#D9C8B5]/40 cursor-not-allowed'
                  }`}
                />
              );
            })}
          </div>

          <div className="text-[11px] font-sans tracking-wide text-[#76545B] truncate flex items-center gap-1.5">
            <span className="font-mono text-[10px] opacity-70">
              0{currentChapter}/10
            </span>
            <span className="text-[#D9C8B5]">·</span>
            <span className="font-serif italic capitalize">
              {activeChapterData.title}
            </span>
          </div>
        </div>

        {/* Next / Continue Button */}
        <button
          onClick={onNextChapter}
          disabled={currentChapter >= 10}
          aria-label="Next chapter"
          className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            currentChapter < 10
              ? 'bg-[#76545B] text-white hover:bg-[#5b3e45] shadow-xs cursor-pointer'
              : 'bg-[#D9C8B5]/40 text-[#76545B]/40 cursor-not-allowed'
          }`}
        >
          <span>continue</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
