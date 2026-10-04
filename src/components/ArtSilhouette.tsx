import React from 'react';

interface ArtSilhouetteProps {
  type: string;
  className?: string;
  title: string;
}

export const ArtSilhouette: React.FC<ArtSilhouetteProps> = ({ type, className = '', title }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-[#F2E9DD] via-[#F7F2EA] to-[#E9C9C3]/40 ${className}`}
    >
      <div className="relative w-full max-w-[260px] aspect-[4/5] flex items-center justify-center">
        {/* Render specific artistic scenes matching the 12 photos */}
        {type === 'sunlight-hug' && (
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
            {/* Outdoor foliage */}
            <circle cx="100" cy="120" r="85" fill="#E8F0E4" opacity="0.6" />
            <path d="M20 70 Q40 40 70 50 Q100 20 130 40 Q170 30 180 70" stroke="#7A9A7B" strokeWidth="2" strokeDasharray="3 3" />
            {/* Boy in yellow kurta hugging behind */}
            <path d="M60 110 Q100 70 140 110 L145 220 L55 220 Z" fill="#F4DE88" opacity="0.9" />
            <circle cx="100" cy="85" r="28" fill="#4A3E3D" />
            {/* Messy curly hair */}
            <path d="M72 75 Q100 55 128 75 Q135 60 115 50 Q90 48 72 75 Z" fill="#2E2423" />
            {/* Girl in white with radiant smile */}
            <circle cx="102" cy="140" r="24" fill="#FCEEE6" />
            <path d="M80 130 Q102 110 124 130 Q128 160 118 175 Q102 180 84 170 Z" fill="#292627" />
            {/* Arms wrapped in hug */}
            <path d="M55 140 Q100 170 145 140" stroke="#E5B942" strokeWidth="12" strokeLinecap="round" />
            {/* Big smiling mouth */}
            <path d="M96 148 Q102 156 108 148" stroke="#76545B" strokeWidth="2.5" strokeLinecap="round" />
            <text x="40" y="160" fontSize="14" fill="#E5B942">☀️</text>
          </svg>
        )}

        {type === 'octopus-head' && (
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
            {/* Stairs background */}
            <line x1="30" y1="60" x2="170" y2="60" stroke="#D9C8B5" strokeWidth="3" />
            <line x1="45" y1="100" x2="185" y2="100" stroke="#D9C8B5" strokeWidth="3" />
            {/* Cute pink octopus on head */}
            <g transform="translate(75, 45)">
              <ellipse cx="25" cy="22" rx="22" ry="18" fill="#F48FB1" />
              {/* Octopus eyes and happy smile */}
              <circle cx="19" cy="19" r="2.5" fill="#292627" />
              <circle cx="31" cy="19" r="2.5" fill="#292627" />
              <path d="M22 25 Q25 28 28 25" stroke="#292627" strokeWidth="1.5" strokeLinecap="round" />
              {/* Tentacles */}
              <path d="M5 32 Q15 40 25 32 Q35 40 45 32" fill="#F06292" />
            </g>
            {/* Girl sticking tongue out with hand under chin */}
            <circle cx="100" cy="115" r="26" fill="#FCEEE6" />
            <path d="M72 105 Q100 85 128 105 Q135 160 120 180 Q100 190 80 180 Z" fill="#292627" />
            {/* Sassy tongue */}
            <ellipse cx="100" cy="125" rx="4" ry="5" fill="#E91E63" />
            {/* Hand under chin */}
            <path d="M75 140 Q100 135 125 140" stroke="#F5D0C5" strokeWidth="8" strokeLinecap="round" />
            <text x="145" y="65" fontSize="16">🐙</text>
            <text x="45" y="145" fontSize="14">😜</text>
          </svg>
        )}

        {type === 'peacock-earring' && (
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
            {/* Sheer curtains */}
            <path d="M140 20 Q155 120 145 220" stroke="#E9C9C3" strokeWidth="16" opacity="0.4" />
            <path d="M165 20 Q175 120 170 220" stroke="#F2E9DD" strokeWidth="16" opacity="0.6" />
            {/* Ethereal side profile */}
            <path d="M75 120 Q80 90 95 75 Q115 65 120 85 Q118 100 124 108 Q120 114 116 116 Q122 124 116 130 Q112 142 98 150 Q90 152 85 170" stroke="#76545B" strokeWidth="2.5" fill="#FFFDF9" />
            {/* Wavy long hair */}
            <path d="M70 80 Q60 140 80 210 Q65 180 60 120 Z" fill="#292627" />
            {/* Peacock earring */}
            <g transform="translate(100, 125)">
              <circle cx="0" cy="0" r="5" fill="#B0BEC5" stroke="#78909C" strokeWidth="1" />
              <path d="M-6 8 Q0 18 6 8 Q0 24 -6 8 Z" fill="#26A69A" stroke="#00796B" strokeWidth="1" />
              <circle cx="0" cy="14" r="2" fill="#1565C0" />
            </g>
            <text x="40" y="60" fontSize="14">🪶</text>
          </svg>
        )}

        {type === 'bus-sleep' && (
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
            {/* Bus seats */}
            <rect x="40" y="30" width="120" height="180" rx="16" fill="#D9C8B5" opacity="0.5" />
            {/* Blue neck pillow */}
            <ellipse cx="95" cy="85" rx="35" ry="16" fill="#42A5F5" />
            {/* Asleep together */}
            <circle cx="95" cy="75" r="20" fill="#FCEEE6" />
            <circle cx="115" cy="115" r="18" fill="#FCEEE6" />
            <path d="M90 135 Q110 110 130 140" fill="#292627" />
            <text x="135" y="70" fontSize="14">💤</text>
          </svg>
        )}

        {type === 'mall-mirror' && (
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
            {/* Mirror frame */}
            <rect x="25" y="25" width="150" height="190" rx="8" stroke="#D9C8B5" strokeWidth="3" fill="#FFFDF9" />
            {/* Mirror inverted text */}
            <text x="45" y="60" fontSize="10" fill="#CFA5A1" letterSpacing="2">KIRANA INVESTMENT</text>
            {/* Rock-on pose & mirror selfie */}
            <circle cx="115" cy="95" r="18" fill="#292627" />
            <circle cx="85" cy="120" r="16" fill="#292627" />
            <text x="60" y="130" fontSize="18">🤘</text>
            {/* Red text sticker "BUT YOU LOOK FANTASTIC" */}
            <rect x="40" y="180" width="120" height="22" rx="4" fill="#76545B" />
            <text x="45" y="195" fontSize="8" fontWeight="bold" fill="#FFF" letterSpacing="0.5">BUT YOU LOOK FANTASTIC</text>
          </svg>
        )}

        {type === 'shy-blush' && (
          <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
            <circle cx="100" cy="110" r="50" fill="#FFFDF9" stroke="#E9C9C3" strokeWidth="2" />
            {/* Big eyes looking shyly */}
            <ellipse cx="85" cy="95" rx="6" ry="8" fill="#292627" />
            <ellipse cx="115" cy="95" rx="6" ry="8" fill="#292627" />
            <circle cx="87" cy="92" r="2" fill="#FFF" />
            <circle cx="117" cy="92" r="2" fill="#FFF" />
            {/* Blushing cheeks */}
            <ellipse cx="75" cy="115" rx="10" ry="6" fill="#F48FB1" opacity="0.6" />
            <ellipse cx="125" cy="115" rx="10" ry="6" fill="#F48FB1" opacity="0.6" />
            {/* Hand covering mouth */}
            <path d="M80 120 Q100 115 125 125 Q120 150 90 145 Z" fill="#F5D0C5" stroke="#E9C9C3" />
            <text x="140" y="80" fontSize="14">🙈</text>
          </svg>
        )}

        {!['sunlight-hug', 'octopus-head', 'peacock-earring', 'bus-sleep', 'mall-mirror', 'shy-blush'].includes(type) && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#E9C9C3]/40 flex items-center justify-center text-2xl shadow-inner">
              ♡
            </div>
            <div className="text-xs font-serif italic text-[#76545B] tracking-wide">
              memory universe
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-[13px] font-medium text-[#76545B] tracking-tight line-clamp-1">
        {title}
      </div>
      <div className="text-[11px] font-handwriting text-[#76545B]/70 mt-0.5">
        authentic memory
      </div>
    </div>
  );
};
