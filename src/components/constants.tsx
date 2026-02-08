
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
    { id: 'volcano_red', name: 'Fire Red', imagePath: RedDuck, description: 'The timeless pond look. Reliable and bright.' },
    { id: 'mallard_green', name: 'Earth Green', imagePath: GreenDuck, description: 'Regal and wild. Perfectly adapted for mischief.' },
    { id: 'ghost_white', name: 'Cloud White', imagePath: WhiteDuck, description: 'Pure, calm, and slightly introverted.' },
    { id: 'deep_blue', name: 'Water Blue', imagePath: BlueDuck, description: 'Pure, calm, and slightly introverted.' }
  ],
  hats: [
    { id: 'bucket_hat', name: 'Bucket Hat', imagePath: BucketHat, description: 'For the duck that rules the roost.' },
    { id: 'straw_hat', name: 'Straw Hat', imagePath: StrawHat, description: 'Cool, casual, and definitely doesn’t care about the currents.' },
    { id: 'halo', name: 'Halo', imagePath: Halo, description: 'Sharp-eyed and ready to solve pond mysteries.' },
    { id: 'backwards_cap', name: 'Backwards Cap', imagePath: Cap, description: 'Keeping it natural.' },
    { id: 'beanie', name: 'Beanie', imagePath: Beanie, description: 'Keeping it natural.' }
  ],
  wings: [
    { id: 'angel_wings', name: 'Angelic Wings', imagePath: Angelic, description: 'Graceful feathers for a duck of pure intentions.' },
    { id: 'butterfly_wings', name: 'Butterfly Wings', imagePath: Butterfly, description: 'For the Mischievous Mallard that thrives in the dark.' },
    { id: 'Demon_Wings', name: 'Demon Wings', imagePath: Demon, description: 'High-tech mobility for the modern pond leader.' },
    { id: 'Mechanical_Wings', name: 'Mechanical Wings', imagePath: Mechanical, description: 'Plain, aerodynamic, and functional.' },
    { id: 'Phoenix_Wings', name: 'Phoenix Wings', imagePath: Phoenix, description: 'Plain, aerodynamic, and functional.' }
  ],
  'handheld-items': [
    { id: 'Paintbrush', name: 'Painter', imagePath: Brush, description: 'Busy making big pond business moves.' },
    { id: 'Basketball', name: 'Baller', imagePath: Ball, description: 'A hard-earned (stolen) snack.' },
    { id: 'Gaming controller', name: 'Gamer', imagePath: Controller, description: 'Ready to cast unpredictable spells.' },
    { id: 'Martini Glass', name: 'Drinker', imagePath: Martini, description: 'Ready to cast unpredictable spells.' },
    { id: 'Briefcase', name: 'Worker', imagePath: Briefcase, description: 'Ready to cast unpredictable spells.' }
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
