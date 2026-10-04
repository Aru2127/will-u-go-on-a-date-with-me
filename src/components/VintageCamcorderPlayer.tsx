import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Video, Film } from 'lucide-react';

interface VintageCamcorderPlayerProps {
  tapeTitle: string;
  tapeDate: string;
  tapeTime: string;
  videoSrc: string;
  fallbackQuote: string;
  candidDescription: string;
  aspectRatio?: 'portrait' | 'landscape';
}

export const VintageCamcorderPlayer: React.FC<VintageCamcorderPlayerProps> = ({
  tapeTitle,
  tapeDate,
  tapeTime,
  videoSrc,
  fallbackQuote,
  candidDescription,
  aspectRatio = 'portrait',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setHasError(false);
  }, [videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = Math.floor(videoRef.current.currentTime);
    const mins = String(Math.floor(cur / 60)).padStart(2, '0');
    const secs = String(cur % 60).padStart(2, '0');
    setCurrentTime(`${mins}:${secs}`);
  };

  const isPortrait = aspectRatio === 'portrait';

  return (
    <div className="relative max-w-sm sm:max-w-md mx-auto my-8 select-none">
      {/* Tape Header Label */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#292627] text-white rounded-t-xl text-[11px] font-mono tracking-wider border-b border-[#D9C8B5]/30">
        <div className="flex items-center gap-2">
          <Film size={12} className="text-[#CFA5A1]" />
          <span className="truncate">{tapeTitle}</span>
        </div>
        <span className="text-[#E9C9C3] shrink-0">VHS·Hi8</span>
      </div>

      {/* Camcorder Viewfinder Housing */}
      <div className="relative bg-[#1A1819] rounded-b-2xl p-2.5 sm:p-3 shadow-2xl border border-[#292627]">
        {/* Screen Viewport with scanlines */}
        <div
          className={`relative w-full ${
            isPortrait ? 'aspect-[9/14] sm:aspect-[3/4]' : 'aspect-[16/10]'
          } rounded-xl overflow-hidden bg-black flex items-center justify-center`}
        >
          {/* Real Video Element if available */}
          {videoSrc && !hasError ? (
            <video
              ref={videoRef}
              src={videoSrc}
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />
          ) : (
            /* Atmospheric Candid Camcorder Standby Canvas */
            <div
              onClick={togglePlay}
              className="relative w-full h-full flex flex-col justify-between p-6 text-center bg-gradient-to-b from-[#2A2326] via-[#1B181A] to-[#121011] cursor-pointer"
            >
              {/* Gentle camera grain & vintage scanline lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

              <div className="pt-8 space-y-2 z-10">
                <div className="w-12 h-12 rounded-full bg-[#76545B]/50 border border-[#E9C9C3]/40 flex items-center justify-center mx-auto text-[#E9C9C3]">
                  <Video size={22} />
                </div>
                <div className="font-serif italic text-base text-[#E9C9C3]">
                  candid memory tape
                </div>
              </div>

              <div className="space-y-3 z-10 my-auto">
                <div className="font-handwriting text-2xl text-[#FFFDF9] leading-snug">
                  "{fallbackQuote}"
                </div>
                <p className="text-xs font-sans text-[#D9C8B5]/80 max-w-xs mx-auto">
                  {candidDescription}
                </p>
              </div>

              <div className="z-10 pt-2">
                <span className="font-mono text-[11px] text-[#D9C8B5]">local footage unavailable</span>
              </div>
            </div>
          )}

          {/* Retro Camcorder On-Screen Display (OSD) Overlays */}
          <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between text-white font-mono text-[11px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-20">
            {/* Top OSD Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 font-bold tracking-widest">REC</span>
                <span className="text-white/60 ml-2">SP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">▮▮▮▯ BATT</span>
              </div>
            </div>

            {/* Bottom OSD Bar */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-white/80">{tapeDate}</div>
                <div className="text-[#E9C9C3] font-bold">{tapeTime}</div>
              </div>
              <div className="text-right">
                <div className="text-white/70">TC {currentTime}</div>
                <div className="text-[9px] text-white/50 tracking-wider">AUTO FOCUS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Camcorder Physical Controls Bar */}
        <div className="pt-3 px-1 flex items-center justify-between text-[#D9C8B5]">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-[#292627] hover:bg-[#3d383a] text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-[#292627] hover:bg-[#3d383a] text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-[#D9C8B5]/70 uppercase">
              90s VHS Camcorder
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
