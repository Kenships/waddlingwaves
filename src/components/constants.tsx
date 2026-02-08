
import { DuckCategory } from './types';
import WhiteDuck from '../assets/WhiteDuck.png'
import RedDuck from '../assets/RedDuck.png'
import GreenDuck from '../assets/GreenDuck.png'
import BlueDuck from '../assets/BlueDuck.png'
import BucketHat from '../assets/BucketHat.png'
import StrawHat from '../assets/StrawHat.png'
import Halo from '../assets/Halo.png'
import Cap from '../assets/Cap.png'
import Beanie from '../assets/Beanie.png'
import Angelic from '../assets/Angelic.png'
import Butterfly from '../assets/Butterfly.png'
import Demon from '../assets/Demon.png'
import Mechanical from '../assets/Mechanical.png'
import Phoenix from '../assets/Phoenix.png'
import Brush from '../assets/Brush.png'
import Ball from '../assets/Ball.png'
import Controller from '../assets/Controller.png'
import Martini from '../assets/Martini.png'
import Briefcase from '../assets/Briefcase.png'

export const MBTI_OPTIONS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

export const MEME_OPTIONS = [
  { id: 'doge', label: 'Doge (Much Wow, Very Duck)', image: 'https://picsum.photos/seed/doge/200' },
  { id: 'distracted', label: 'Distracted Boyfriend', image: 'https://picsum.photos/seed/distracted/200' },
  { id: 'fine', label: 'This is Fine (Burning Pond)', image: 'https://picsum.photos/seed/fine/200' },
  { id: 'success', label: 'Success Kid', image: 'https://picsum.photos/seed/success/200' }
];

export const DUCK_ACTIVITIES = [
  'Venture into the ocean',
  'Chill on the banks',
  'Play with humans that pass by',
  'Mess with the other ducks',
  'Help out the weaker ducks'
];

export const FOOD_STRATEGIES = [
  'Hunt for food yourself',
  'Find someone else who’s better at hunting and piggyback them',
  'Beg humans for food',
  'Harass innocent bystanders for food',
  'Dig out the trash for food'
];

// Expanded Avatar Asset Registry to support Zodiac-based skins
export const AVATAR_ASSETS = {
  skins: [
    { id: 'volcano_red', name: 'Fire Red', imagePath: RedDuck, description: 'According to your astrology sign, you’re a fire type. This means you have great passion and lots of fiery energy! When you believe in it, you tend to give it your all, even sometimes stubbornly so.' },
    { id: 'mallard_green', name: 'Earth Green', imagePath: GreenDuck, description: 'According to your astrology sign, you’re an earth type. This means that you’re typically a very practical and stable person. You\'re grounded and reliable, with a great sense of loyalty to the people you care about.' },
    { id: 'ghost_white', name: 'Cloud White', imagePath: WhiteDuck, description: 'According to your astrology sign, you’re an air type. You tend to follow the natural flow of life, using your creative and witty personality to flourish in social situations.' },
    { id: 'deep_blue', name: 'Water Blue', imagePath: BlueDuck, description: 'According to your astrology sign, you’re a water type. You are very in touch with your emotions, backed by your intelligence, you always trust your intuition to lead you in the right direction.' }
  ],
  hats: [
    { id: 'bucket_hat', name: 'Bucket Hat', imagePath: BucketHat, description: 'You’re adventurous and curious, always ready to explore beyond the pond. The bucket hat says you’re prepared for splashes, waves, and a little chaos.' },
    { id: 'straw_hat', name: 'Straw Hat', imagePath: StrawHat, description: 'You’re relaxed and laid-back, soaking in the sun by the water’s edge. Life’s better when you take it slow and enjoy the breeze.' },
    { id: 'halo', name: 'Halo', imagePath: Halo, description: 'You’re friendly, charming, and impossible to ignore. Ducks and humans alike can’t help but smile when you’re around.' },
    { id: 'backwards_cap', name: 'Backwards Cap', imagePath: Cap, description: 'You’re mischievous and playful, always stirring trouble just for fun. Rules are optional, and chaos is part of your charm.' },
    { id: 'beanie', name: 'Beanie', imagePath: Beanie, description: 'You’re warm-hearted and protective, always looking out for the flock. Comfort and kindness are your signature moves.' }
  ],
  wings: [
    { id: 'angel_wings', name: 'Angelic Wings', imagePath: Angelic, description: 'Soft and fluffy, these wings belong to a duck who always watches over the flock. You’re gentle, caring, and quick to help a fellow duck in need.' },
    { id: 'butterfly_wings', name: 'Butterfly Wings', imagePath: Butterfly, description: 'Bright and colorful, these wings make you stand out on the pond. You’re playful, creative, and bring joy wherever you waddle.' },
    { id: 'Demon_Wings', name: 'Demon Wings', imagePath: Demon, description: 'Dark and dramatic, these wings belong to a duck who thrives on chaos. You’re bold, rebellious, and definitely not afraid to ruffle a few feathers.' },
    { id: 'Mechanical_Wings', name: 'Mechanical Wings', imagePath: Mechanical, description: 'Metallic and precise, built for a duck who loves innovation. You’re clever, resourceful, and always thinking one step ahead.' },
    { id: 'Phoenix_Wings', name: 'Phoenix Wings', imagePath: Phoenix, description: 'Fiery and radiant, these wings belong to a duck that always bounces back. No matter what happens, you rise again stronger than before.' }
  ],
  'handheld-items': [
    { id: 'Paintbrush', name: 'Painter', imagePath: Brush, description: 'You’re creative and expressive, always seeing the world a little differently. You enjoy bringing ideas to life in your own unique way. Creativity isn’t just a hobby for you—it’s part of who you are!' },
    { id: 'Basketball', name: 'Baller', imagePath: Ball, description: 'You seem like a duck who is competitive, energetic, and loves a good challenge. You thrive in fast-paced environments and never back down easily. Once the game starts, you’re locked in.' },
    { id: 'Gaming controller', name: 'Gamer', imagePath: Controller, description: 'Whether it’s co-op or solo, you love settling in for a good game. You enjoy strategy, teamwork, and having fun in the moment.' },
    { id: 'Martini Glass', name: 'Drinker', imagePath: Martini, description: 'You’re a social butterfly who loves being around people. You thrive in lively settings filled with conversation and laughter. Wherever you go, you bring good vibes with you!' },
    { id: 'Briefcase', name: 'Worker', imagePath: Briefcase, description: 'You’re all about that bag and focused on your future. You’re ambitious, organized, and know what you want. When it comes to your goals, you don’t play around!' }
  ]
};

export const CATEGORY_SUMMARIES: Record<DuckCategory, string> = {
  [DuckCategory.TIDE_SETTERS]: "Natural leaders who tend to take charge and would prefer to be in charge of the pond. Tide setters are driven and motivated to achieve their goals, even if it ends up ruffling a few feathers.",
  [DuckCategory.CANADA_GOOSE]: "Straight to the point ducks who don’t shy away from confrontation and will never be afraid to speak their mind. Canadian geese will point out even the harshest of truths to their fellow ducks when nobody else would.",
  [DuckCategory.GOLDEN_BEAK]: "The stars of the show, ducks of the Golden Beak Society tend to be the life of the pond. They thrive on interaction and energy, often becoming the glue that holds the flock together and will never miss a good duck get-together.",
  [DuckCategory.WADING_WADDLERS]: "Self-reserved ducks who like to stay out of trouble and mind their own business. Wading Waddlers prefer the edges of the pond, and hold their closest duckpals very close to their hearts.",
  [DuckCategory.MISCHIEVOUS_MALLARDS]: "The playful ducks that tend to act before they think (even if it ends a little chaotic). Mischievous mallards are never afraid to stir the pond just to have a good laugh, love them or hate them, they’re always good company."
};

export const CATEGORY_METADATA: Record<string, { color: string; icon: string }> = {
  [DuckCategory.TIDE_SETTERS]: { color: 'bg-blue-600', icon: '🌊' },
  [DuckCategory.CANADA_GOOSE]: { color: 'bg-red-500', icon: '🦢' },
  [DuckCategory.GOLDEN_BEAK]: { color: 'bg-yellow-400', icon: '👑' },
  [DuckCategory.WADING_WADDLERS]: { color: 'bg-emerald-500', icon: '🌿' },
  [DuckCategory.MISCHIEVOUS_MALLARDS]: { color: 'bg-purple-500', icon: '🎭' }
};
