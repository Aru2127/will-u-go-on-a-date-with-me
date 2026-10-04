import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Orbit, Compass, X, Move3d } from 'lucide-react';
import { MEMORIES, MemoryItem } from '../../data/memories';
import { MemoryImage } from '../MemoryImage';

interface Chapter06PhotoUniverseProps {
  onEasterEggFound: () => void;
  onNext: () => void;
}

export const Chapter06PhotoUniverse: React.FC<Chapter06PhotoUniverseProps> = ({
  onEasterEggFound,
  onNext,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [isHeartMode, setIsHeartMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Rotation angles & velocities in radians
  const rotRef = useRef({ x: 0.1, y: 0.2, vx: 0.002, vy: 0.003 });
  const isPointerDownRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  // Store projected 3D coordinates for all 12 memories
  const [projected, setProjected] = useState<
    Array<{
      id: string;
      x: number;
      y: number;
      z: number;
      scale: number;
      opacity: number;
      zIndex: number;
      memory: MemoryItem;
    }>
  >([]);

  // Base spherical coordinates for galaxy mode
  const baseGalaxyCoords = useRef(
    MEMORIES.map((m, i) => {
      // Golden spiral distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / MEMORIES.length);
      const theta = Math.sqrt(MEMORIES.length * Math.PI) * phi;
      const radius = 230;
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi) * 0.85,
        z: radius * Math.cos(phi),
      };
    })
  );

  // Base coordinates for 3D Heart Constellation mode
  const baseHeartCoords = useRef(
    MEMORIES.map((m, i) => {
      // Parametric heart formula scaled
      const t = (i / MEMORIES.length) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3) * 14;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 14;
      const z = Math.sin(t * 2) * 50;
      return { x, y, z };
    })
  );

  // Physics animation loop using requestAnimationFrame
  useEffect(() => {
    let animId: number;
    const focalLength = 460;

    const tick = () => {
      // If not dragging with mouse, apply natural gentle rotation + momentum inertia
      if (!isPointerDownRef.current) {
        rotRef.current.x += rotRef.current.vx;
        rotRef.current.y += rotRef.current.vy;

        // Dampen velocity to idle drift
        rotRef.current.vx = rotRef.current.vx * 0.96 + 0.001 * 0.04;
        rotRef.current.vy = rotRef.current.vy * 0.96 + 0.0025 * 0.04;
      }

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;
      const cosRx = Math.cos(rx);
      const sinRx = Math.sin(rx);
      const cosRy = Math.cos(ry);
      const sinRy = Math.sin(ry);

      const targetCoords = isHeartMode ? baseHeartCoords.current : baseGalaxyCoords.current;

      const calculated = MEMORIES.map((memory, i) => {
        const { x: bx, y: by, z: bz } = targetCoords[i];

        // 3D rotation around Y axis then X axis
        const x1 = bx * cosRy + bz * sinRy;
        const z1 = -bx * sinRy + bz * cosRy;

        const y2 = by * cosRx - z1 * sinRx;
        const z2 = by * sinRx + z1 * cosRx;

        const scale = Math.max(0.45, Math.min(1.35, focalLength / (focalLength + z2)));
        const opacity = Math.max(0.4, Math.min(1, (z2 + 250) / 450));
        const zIndex = Math.floor(z2 + 300);

        return {
          id: memory.id,
          x: x1,
          y: y2,
          z: z2,
          scale,
          opacity,
          zIndex,
          memory,
        };
      });

      setProjected(calculated);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHeartMode]);

  // Pointer drag event handlers for mouse & touch
  const handlePointerDown = (clientX: number, clientY: number) => {
    isPointerDownRef.current = true;
    setIsDragging(true);
    lastPointerRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isPointerDownRef.current) return;
    const dx = clientX - lastPointerRef.current.x;
    const dy = clientY - lastPointerRef.current.y;

    rotRef.current.y += dx * 0.007;
    rotRef.current.x -= dy * 0.007;

    rotRef.current.vy = dx * 0.003;
    rotRef.current.vx = -dy * 0.003;

    lastPointerRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    setIsDragging(false);
  };

  const toggleHeartMode = () => {
    setIsHeartMode((prev) => !prev);
    onEasterEggFound();
  };

  const openMemoryDetail = (mem: MemoryItem) => {
    setActiveMemory(mem);
    onEasterEggFound();
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none relative overflow-hidden flex flex-col justify-between">
      {/* Header Info */}
      <div className="max-w-2xl mx-auto text-center space-y-3 z-30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C9C3]/50 text-[#76545B] text-xs font-mono uppercase tracking-widest border border-[#D9C8B5]">
          <Orbit size={13} className="animate-spin" style={{ animationDuration: '8s' }} />
          <span>interactive 3d memory universe</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl sm:text-5xl text-[#292627] font-normal"
        >
          the photo universe.
        </motion.h2>

        <p className="font-serif text-base sm:text-lg text-[#76545B] max-w-lg mx-auto">
          “this is basically my brain whenever i think about you... 360° of memories orbiting everywhere.”
        </p>

        {/* Orbit Controls Bar */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={toggleHeartMode}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-xs cursor-pointer ${
              isHeartMode
                ? 'bg-[#76545B] text-white shadow-md'
                : 'bg-[#FFFDF9] text-[#76545B] border border-[#D9C8B5] hover:bg-[#F2E9DD]'
            }`}
          >
            <Heart size={14} className={isHeartMode ? 'fill-current text-[#E9C9C3]' : ''} />
            <span>{isHeartMode ? 'Heart Constellation Active' : 'Assemble Heart Constellation'}</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#D9C8B5] flex items-center justify-center gap-2">
          <Move3d size={13} />
          <span>drag anywhere to spin the 3d galaxy · tap any memory to inspect</span>
        </div>
      </div>

      {/* 3D Orbiting Galaxy Canvas Container */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handlePointerUp}
        className={`relative w-full max-w-4xl h-[520px] sm:h-[620px] mx-auto my-auto flex items-center justify-center cursor-grab ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {/* Soft celestial core glow */}
        <div className="absolute w-[360px] h-[360px] rounded-full bg-[#E9C9C3]/20 blur-3xl pointer-events-none" />

        {/* Dynamic 3D Projected Memories */}
        {projected.map((item) => {
          const imgSrc = item.memory.image;

          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                openMemoryDetail(item.memory);
              }}
              style={{
                transform: `translate3d(${item.x}px, ${item.y}px, 0) scale(${item.scale})`,
                opacity: item.opacity,
                zIndex: item.zIndex,
                willChange: 'transform, opacity',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 p-1.5 bg-[#FFFDF9] rounded-xl shadow-lg border border-[#D9C8B5]/80 transition-shadow duration-200 hover:shadow-2xl hover:border-[#76545B] cursor-pointer group"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#F2E9DD] shadow-inner pointer-events-none">
                <MemoryImage
                  src={imgSrc}
                  alt={item.memory.title}
                  artType={item.memory.artPlaceholderSvg}
                  title={item.memory.title}
                />
              </div>
              <div className="pt-1 text-center font-handwriting text-[10px] sm:text-xs text-[#76545B] truncate pointer-events-none">
                {item.memory.caption}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Focus Modal when user taps any memory */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none"
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#D9C8B5] space-y-4"
            >
              <button
                onClick={() => setActiveMemory(null)}
                aria-label="Close detail modal"
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F2E9DD] text-[#76545B] hover:bg-[#E9C9C3] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F2E9DD] shadow-inner">
                <MemoryImage
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  artType={activeMemory.artPlaceholderSvg}
                  title={activeMemory.title}
                />
              </div>

              <div className="space-y-2 text-center pt-1">
                <div className="font-serif text-xl text-[#292627] font-medium">
                  "{activeMemory.caption}"
                </div>
                <div className="font-handwriting text-lg text-[#76545B]">
                  ~ {activeMemory.handwrittenNote}
                </div>
                <div className="p-3 bg-[#F2E9DD]/60 rounded-xl text-xs font-serif italic text-[#76545B]">
                  secret note: {activeMemory.secretReveal}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Button to Next Chapter */}
      <div className="pt-4 pb-6 text-center z-30">
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-[#76545B] text-white hover:bg-[#5b3e45] font-serif text-base tracking-wide shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          enter the 'i love you' department →
        </button>
      </div>
    </div>
  );
};
