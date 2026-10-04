import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { SONG_AUDIO_PATH, SONG_START_SECONDS } from '../data/memories';

interface AudioAtmosphereProps {
  isPlaying: boolean;
  onAudioStarted?: () => void;
  isCrescendo?: boolean; // For the YES moment!
  customAudioSrc?: string;
}

export const AudioAtmosphere: React.FC<AudioAtmosphereProps> = ({
  isPlaying,
  onAudioStarted,
  isCrescendo = false,
  customAudioSrc,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioSrc = customAudioSrc || SONG_AUDIO_PATH;
  const [hasRealAudio, setHasRealAudio] = useState(false);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState(false);
  const synthIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize and handle playback when `isPlaying` becomes true
  useEffect(() => {
    if (!isPlaying) return;

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = SONG_START_SECONDS;
      audio.volume = 0.78;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasRealAudio(true);
            setUsingFallbackSynth(false);
            if (synthIntervalRef.current) {
              clearInterval(synthIntervalRef.current);
            }
            onAudioStarted?.();
          })
          .catch((err) => {
            console.log('Audio file play notice:', err);
            // Fallback to warm ambient acoustic chords
            startFallbackSynth();
          });
      }
    }
  }, [isPlaying, audioSrc]);

  // Crescendo volume during YES celebration
  useEffect(() => {
    if (audioRef.current && isPlaying && !isMuted) {
      if (isCrescendo) {
        audioRef.current.volume = 1.0;
      }
    }
  }, [isCrescendo, isPlaying, isMuted]);

  // Fallback acoustic ambient synthesizer matching the warm chord structure of "Piche Tere"
  const startFallbackSynth = () => {
    if (synthIntervalRef.current || hasRealAudio) return;
    setUsingFallbackSynth(true);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Chord progression: Fmaj7 -> G6 -> Em7 -> Am7 (warm romantic lo-fi vibe)
      const chords = [
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 392.0],  // G6
        [164.81, 196.0, 246.94, 329.63], // Em7
        [220.0, 261.63, 329.63, 440.0],  // Am7
      ];

      let chordIdx = 0;

      const playChord = () => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        if (isMuted) return;

        const chord = chords[chordIdx % chords.length];
        chordIdx++;

        chord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(650 + noteIdx * 100, ctx.currentTime);

          const startTime = ctx.currentTime + noteIdx * 0.12; // Arpeggiated gentle strum
          gain.gain.setValueAtTime(0.0001, startTime);
          gain.gain.exponentialRampToValueAtTime(0.035, startTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 4.0);
        });
      };

      playChord();
      synthIntervalRef.current = window.setInterval(playChord, 3800);
      onAudioStarted?.();
    } catch (e) {
      console.warn('Web Audio could not start:', e);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    if (audioCtxRef.current) {
      if (nextMuted) {
        audioCtxRef.current.suspend();
      } else {
        audioCtxRef.current.resume();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Audio Element with fallback error handling */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onError={() => {
          if (isPlaying && !hasRealAudio && !usingFallbackSynth) {
            startFallbackSynth();
          }
        }}
      />

      {/* Floating Audio Controls in Top-Right Corner */}
      {isPlaying && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 select-none">
          {/* Minimal unobtrusive mute control */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#D9C8B5]/60 text-[#76545B] hover:text-[#292627] hover:bg-[#F2E9DD] shadow-sm transition-all duration-200 cursor-pointer"
            title={isMuted ? 'Turn music on' : 'Mute music'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="animate-pulse" />}
          </button>
        </div>
      )}
    </>
  );
};
