import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartCursor } from './components/HeartCursor';
import { DustParticlesOverlay } from './components/DustParticlesOverlay';
import { AudioAtmosphere } from './components/AudioAtmosphere';
import { ChapterNavigation } from './components/ChapterNavigation';
import { Chapter01SecretDoor } from './components/chapters/Chapter01SecretDoor';
import { Chapter02MemoryRoom } from './components/chapters/Chapter02MemoryRoom';
import { Chapter03AkshitaArchive } from './components/chapters/Chapter03AkshitaArchive';
import { Chapter04ChaosMachine } from './components/chapters/Chapter04ChaosMachine';
import { Chapter05ThingsIMiss } from './components/chapters/Chapter05ThingsIMiss';
import { Chapter06PhotoUniverse } from './components/chapters/Chapter06PhotoUniverse';
import { Chapter07LoveDepartment } from './components/chapters/Chapter07LoveDepartment';
import { Chapter08SongDreamSequence } from './components/chapters/Chapter08SongDreamSequence';
import { Chapter09FinalWalk } from './components/chapters/Chapter09FinalWalk';
import { Chapter10TheQuestion } from './components/chapters/Chapter10TheQuestion';

export function App() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [maxReachedChapter, setMaxReachedChapter] = useState(1);
  const [musicStarted, setMusicStarted] = useState(false);
  const [easterEggsCount, setEasterEggsCount] = useState(0);

  const goToChapter = (chapterNum: number) => {
    setCurrentChapter(chapterNum);
    setMaxReachedChapter((prev) => Math.max(prev, chapterNum));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextChapter = () => {
    if (currentChapter < 10) {
      goToChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      goToChapter(currentChapter - 1);
    }
  };

  const handleOpenDoor = () => {
    setMusicStarted(true);
    goToChapter(2);
  };

  const handleEasterEggFound = () => {
    setEasterEggsCount((prev) => prev + 1);
  };

  const handleRestart = () => {
    goToChapter(1);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA] bg-grain text-[#292627] font-sans selection:bg-[#E9C9C3]/50 selection:text-[#76545B] relative overflow-x-hidden">
      {/* Custom Ultra-Smooth Glowing Heart Cursor (Hardware-Accelerated 120 FPS) */}
      <HeartCursor />

      {/* Floating Film Dust Particles Overlay Across All Chapters */}
      <DustParticlesOverlay />

      {/* Atmospheric Audio Controller (Piche Tere + acoustic fallback) */}
      <AudioAtmosphere isPlaying={musicStarted} />

      {/* Main Multi-Chapter Storyline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pb-24"
        >
          {currentChapter === 1 && (
            <Chapter01SecretDoor onOpenDoor={handleOpenDoor} />
          )}

          {currentChapter === 2 && (
            <Chapter02MemoryRoom
              onEasterEggFound={handleEasterEggFound}
              onNext={nextChapter}
            />
          )}

          {currentChapter === 3 && (
            <Chapter03AkshitaArchive
              onEasterEggFound={handleEasterEggFound}
              onNext={nextChapter}
            />
          )}

          {currentChapter === 4 && (
            <Chapter04ChaosMachine
              videoSrc="/assets/video-01.mp4"
              onEasterEggFound={handleEasterEggFound}
              onNext={nextChapter}
            />
          )}

          {currentChapter === 5 && (
            <Chapter05ThingsIMiss
              onEasterEggFound={handleEasterEggFound}
              onNext={nextChapter}
            />
          )}

          {currentChapter === 6 && (
            <Chapter06PhotoUniverse
              onEasterEggFound={handleEasterEggFound}
              onNext={nextChapter}
            />
          )}

          {currentChapter === 7 && (
            <Chapter07LoveDepartment
              onEasterEggFound={handleEasterEggFound}
              onNext={nextChapter}
            />
          )}

          {currentChapter === 8 && (
            <Chapter08SongDreamSequence
              videoSrc="/assets/video-02.mp4"
              onEasterEggFound={handleEasterEggFound}
              onNext={nextChapter}
            />
          )}

          {currentChapter === 9 && (
            <Chapter09FinalWalk onNext={nextChapter} />
          )}

          {currentChapter === 10 && (
            <Chapter10TheQuestion
              easterEggCount={easterEggsCount}
              onRestart={handleRestart}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Subtle Minimal Chapter Progress Navigation */}
      <ChapterNavigation
        currentChapter={currentChapter}
        maxReachedChapter={maxReachedChapter}
        onSelectChapter={goToChapter}
        onNextChapter={nextChapter}
        onPrevChapter={prevChapter}
      />

    </div>
  );
}

export default App;
