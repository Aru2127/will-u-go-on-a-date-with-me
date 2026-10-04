// Centralized Memory Universe Configuration for Akshita & Vivaan

export interface MemoryItem {
  id: string;
  image: string;
  alternatePaths: string[];
  title: string;
  caption: string;
  secondaryText: string;
  handwrittenNote: string;
  secretReveal: string;
  theme: 'joy' | 'teasing' | 'intimate' | 'peaceful' | 'comfort' | 'cheeky';
  aspectRatio: 'portrait' | 'landscape' | 'square';
  rotationDeg: number;
  missYouNote?: string;
  loveYouNote?: string;
  interactionType: 'zoom' | 'tilt' | 'reveal' | 'sticker' | 'sparkle' | 'polaroid';
  artPlaceholderSvg: string;
}

// SONG CONFIGURATION (per prompt requirement)
export const SONG_AUDIO_PATH = "/assets/piche-tere-main-part.mp3";
export const SONG_START_SECONDS = 0; // Extremely easy to adjust timestamp

export const MEMORIES: MemoryItem[] = [
  {
    id: "photo-01",
    image: "/assets/photo-01.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 4.jpg",
      "/PHOTO-2026-10-04-20-54-33 4.jpg",
      "PHOTO-2026-10-04-20-54-33 4.jpg"
    ],
    title: "the sunlight hug",
    caption: "look at that smile.",
    secondaryText: "i still don't know how i got this lucky.",
    handwrittenNote: "you were laughing at something stupid i whispered right before this ♡",
    secretReveal: "honestly my favourite picture of us ever. your smile literally stops my thoughts.",
    theme: "joy",
    aspectRatio: "portrait",
    rotationDeg: -2,
    missYouNote: "i miss you.",
    loveYouNote: "i love having you around.",
    interactionType: "polaroid",
    artPlaceholderSvg: "sunlight-hug"
  },
  {
    id: "photo-02",
    image: "/assets/photo-02.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33.jpg",
      "/PHOTO-2026-10-04-20-54-33.jpg",
      "PHOTO-2026-10-04-20-54-33.jpg"
    ],
    title: "caught you being shy",
    caption: "caught you blushing in class.",
    secondaryText: "trying to hide your smile like i couldn't see your eyes light up.",
    handwrittenNote: "stop covering your face... it's unfair how pretty you are.",
    secretReveal: "my heart did an embarrassing little flip right at this exact second.",
    theme: "teasing",
    aspectRatio: "portrait",
    rotationDeg: 3,
    missYouNote: "okay... i miss you a little.",
    interactionType: "reveal",
    artPlaceholderSvg: "shy-blush"
  },
  {
    id: "photo-03",
    image: "/assets/photo-03.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 8.jpg",
      "/PHOTO-2026-10-04-20-54-33 8.jpg",
      "PHOTO-2026-10-04-20-54-33 8.jpg"
    ],
    title: "the octopus incident",
    caption: "evidence that you are 80% drama, 20% octopus.",
    secondaryText: "why are you actually like this? 😭",
    handwrittenNote: "the octopus was living its absolute best life on your head.",
    secretReveal: "mood: completely unhinged (and i wouldn't trade your craziness for anything in the world).",
    theme: "cheeky",
    aspectRatio: "portrait",
    rotationDeg: -3,
    loveYouNote: "i love you, idiot.",
    interactionType: "sticker",
    artPlaceholderSvg: "octopus-head"
  },
  {
    id: "photo-04",
    image: "/assets/photo-04.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 9.jpg",
      "/PHOTO-2026-10-04-20-54-33 9.jpg",
      "PHOTO-2026-10-04-20-54-33 9.jpg"
    ],
    title: "retro weirdness",
    caption: "matching your weirdness since day one.",
    secondaryText: "pixel glasses because we're clearly too cool for normal photos.",
    handwrittenNote: "10/10 aesthetic, 0/10 serious human beings.",
    secretReveal: "never let anyone tell us we're normal. this is peak us.",
    theme: "teasing",
    aspectRatio: "portrait",
    rotationDeg: 2,
    missYouNote: "actually that's a lie. i miss you a lot.",
    interactionType: "sparkle",
    artPlaceholderSvg: "pixel-halftone"
  },
  {
    id: "photo-05",
    image: "/assets/photo-05.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 12.jpg",
      "/PHOTO-2026-10-04-20-54-33 12.jpg",
      "PHOTO-2026-10-04-20-54-33 12.jpg"
    ],
    title: "the mall mirror verdict",
    caption: "the mirror literally told us: 'BUT YOU LOOK FANTASTIC'.",
    secondaryText: "(it was talking about you obviously).",
    handwrittenNote: "shopping date where you picked everything and made me carry all the bags 🤘",
    secretReveal: "and yes... you looked ridiculously fantastic.",
    theme: "joy",
    aspectRatio: "portrait",
    rotationDeg: -1,
    loveYouNote: "i love our stupid little dates.",
    interactionType: "zoom",
    artPlaceholderSvg: "mall-mirror"
  },
  {
    id: "photo-06",
    image: "/assets/photo-06.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 2.jpg",
      "/PHOTO-2026-10-04-20-54-33 2.jpg",
      "PHOTO-2026-10-04-20-54-33 2.jpg"
    ],
    title: "the dangerous wink",
    caption: "this picture has caused serious problems.",
    secondaryText: "mostly because i can't stop staring at it.",
    handwrittenNote: "the wink that ruined my concentration for an entire week.",
    secretReveal: "i love this version of us. no filters, just our faces doing stupid things.",
    theme: "intimate",
    aspectRatio: "portrait",
    rotationDeg: 1,
    missYouNote: "i miss you so much.",
    interactionType: "polaroid",
    artPlaceholderSvg: "winking-selfie"
  },
  {
    id: "photo-07",
    image: "/assets/photo-07.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 6.jpg",
      "/PHOTO-2026-10-04-20-54-33 6.jpg",
      "PHOTO-2026-10-04-20-54-33 6.jpg"
    ],
    title: "the bus nap",
    caption: "long journeys feel like five minutes when you fall asleep on me.",
    secondaryText: "safest place in the world.",
    handwrittenNote: "my arm was completely numb for 3 hours. 100% worth it.",
    secretReveal: "i would stay still for ten more hours just to let you rest safely.",
    theme: "comfort",
    aspectRatio: "portrait",
    rotationDeg: -2,
    loveYouNote: "i love the way you feel so safe with me.",
    interactionType: "reveal",
    artPlaceholderSvg: "bus-sleep"
  },
  {
    id: "photo-08",
    image: "/assets/photo-08.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 3.jpg",
      "/PHOTO-2026-10-04-20-54-33 3.jpg",
      "PHOTO-2026-10-04-20-54-33 3.jpg"
    ],
    title: "car ride head on shoulder",
    caption: "windows down, music playing, your head on my shoulder.",
    secondaryText: "the simplest drives are the ones i miss the most.",
    handwrittenNote: "you fell asleep 4 minutes after saying 'i'm not even tired' 😂",
    secretReveal: "every journey is better when your hand is in mine.",
    theme: "comfort",
    aspectRatio: "portrait",
    rotationDeg: 2,
    missYouNote: "sometimes I don't even have a reason... i just miss you.",
    interactionType: "tilt",
    artPlaceholderSvg: "car-shoulder"
  },
  {
    id: "photo-09",
    image: "/assets/photo-09.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 5.jpg",
      "/PHOTO-2026-10-04-20-54-33 5.jpg",
      "PHOTO-2026-10-04-20-54-33 5.jpg"
    ],
    title: "the curtain profile",
    caption: "okay I'm staring. don't ask how long.",
    secondaryText: "you make existing look unfairly graceful.",
    handwrittenNote: "peaceful for once in your life ♡ that peacock earring is magic on you.",
    secretReveal: "i could look at this side profile for hours and never get tired.",
    theme: "peaceful",
    aspectRatio: "portrait",
    rotationDeg: -1,
    loveYouNote: "i love the quiet in your presence.",
    interactionType: "zoom",
    artPlaceholderSvg: "peacock-earring"
  },
  {
    id: "photo-10",
    image: "/assets/photo-10.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 10.jpg",
      "/PHOTO-2026-10-04-20-54-33 10.jpg",
      "PHOTO-2026-10-04-20-54-33 10.jpg"
    ],
    title: "tucked into home",
    caption: "this is what home feels like.",
    secondaryText: "no noise. no rush. just you tucked right into my neck.",
    handwrittenNote: "i never sleep this peacefully anywhere else.",
    secretReveal: "waking up with you is my favourite feeling in the universe.",
    theme: "intimate",
    aspectRatio: "portrait",
    rotationDeg: 1,
    missYouNote: "like... a lot a lot.",
    loveYouNote: "i love you more than i know how to explain.",
    interactionType: "polaroid",
    artPlaceholderSvg: "nestled-sleep"
  },
  {
    id: "photo-11",
    image: "/assets/photo-11.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 7.jpg",
      "/PHOTO-2026-10-04-20-54-33 7.jpg",
      "PHOTO-2026-10-04-20-54-33 7.jpg"
    ],
    title: "the whisper",
    caption: "some moments don't need words.",
    secondaryText: "they just need you.",
    handwrittenNote: "just breathing in your warmth and your hair.",
    secretReveal: "every little second with you matters to me.",
    theme: "intimate",
    aspectRatio: "portrait",
    rotationDeg: -2,
    interactionType: "reveal",
    artPlaceholderSvg: "curls-whisper"
  },
  {
    id: "photo-12",
    image: "/assets/photo-12.jpg",
    alternatePaths: [
      "/assets/PHOTO-2026-10-04-20-54-33 11.jpg",
      "/PHOTO-2026-10-04-20-54-33 11.jpg",
      "PHOTO-2026-10-04-20-54-33 11.jpg"
    ],
    title: "late night secrets",
    caption: "late nights with you hit different.",
    secondaryText: "when the world goes quiet and it's just our little universe.",
    handwrittenNote: "you always give the sweetest cheek kisses ♡",
    secretReveal: "and this is why i want to make another memory with you.",
    theme: "intimate",
    aspectRatio: "portrait",
    rotationDeg: 2,
    missYouNote: "if you're wondering... yes. i still miss you.",
    loveYouNote: "i love you, akshita.",
    interactionType: "sparkle",
    artPlaceholderSvg: "night-kiss"
  }
];

export const DATE_ACTIVITIES = [
  { id: 'coffee', label: 'coffee date', emoji: '☕', sub: 'warm mugs, quiet corner, talking for hours' },
  { id: 'movie', label: 'movie night', emoji: '🍿', sub: 'dark theatre, sharing popcorn, your head on my shoulder' },
  { id: 'walk', label: 'evening walk', emoji: '🌆', sub: 'cool breeze, sunset skies, holding hands slowly' },
  { id: 'dinner', label: 'dinner together', emoji: '🍝', sub: 'candlelight, delicious food, you looking pretty across the table' },
  { id: 'random', label: 'something random', emoji: '🎡', sub: 'no plan, just spontaneous adventure wherever we end up' },
  { id: 'you_choose', label: 'you choose', emoji: '❤️', sub: 'anything you want. your wish is my command.' }
];
