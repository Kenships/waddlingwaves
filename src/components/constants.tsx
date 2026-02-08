
import { DuckCategory } from './types';

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
    { id: 'classic_yellow', name: 'Classic Yellow', imagePath: '/assets/duck/skin_yellow.png', description: 'The timeless pond look. Reliable and bright.' },
    { id: 'mallard_green', name: 'Earth Green', imagePath: '/assets/duck/skin_green.png', description: 'Grounded and wild. Perfectly adapted for Earth signs.' },
    { id: 'ghost_white', name: 'Cloud White', imagePath: '/assets/duck/skin_white.png', description: 'Pure, calm, and breezy. Floating like an Air sign.' },
    { id: 'volcano_red', name: 'Fire Red', imagePath: '/assets/duck/skin_red.png', description: 'Bold, hot, and spicy. For the ducks with Fire in their feathers.' },
    { id: 'deep_blue', name: 'Water Blue', imagePath: '/assets/duck/skin_blue.png', description: 'Cool, deep, and flowing. Perfectly at home in the Water.' }
  ],
  hats: [
    { id: 'crown', name: 'Golden Crown', imagePath: '/assets/duck/hat_crown.png', description: 'For the duck that rules the roost.' },
    { id: 'beanie', name: 'Slouchy Beanie', imagePath: '/assets/duck/hat_beanie.png', description: 'Cool, casual, and definitely doesn’t care about the currents.' },
    { id: 'detective', name: 'Detective Cap', imagePath: '/assets/duck/hat_detective.png', description: 'Sharp-eyed and ready to solve pond mysteries.' },
    { id: 'none', name: 'No Hat', imagePath: '', description: 'Keeping it natural.' }
  ],
  wings: [
    { id: 'angelic', name: 'Angelic Wings', imagePath: '/assets/duck/wings_angelic.png', description: 'Graceful feathers for a duck of pure intentions.' },
    { id: 'bat_wings', name: 'Bat Wings', imagePath: '/assets/duck/wings_bat.png', description: 'For the Mischievous Mallard that thrives in the dark.' },
    { id: 'cyber', name: 'Cybernetic Wings', imagePath: '/assets/duck/wings_cyber.png', description: 'High-tech mobility for the modern pond leader.' },
    { id: 'none', name: 'Standard Wings', imagePath: '', description: 'Plain, aerodynamic, and functional.' }
  ],
  'handheld-items': [
    { id: 'briefcase', name: 'Gold Briefcase', imagePath: '/assets/duck/item_case.png', description: 'Busy making big pond business moves.' },
    { id: 'bread', name: 'Stolen Bread', imagePath: '/assets/duck/item_bread.png', description: 'A hard-earned (stolen) snack.' },
    { id: 'wand', name: 'Magic Wand', imagePath: '/assets/duck/item_wand.png', description: 'Ready to cast unpredictable spells.' }
  ]
};

export const CATEGORY_SUMMARIES: Record<DuckCategory, string> = {
  [DuckCategory.TIDE_SETTERS]: "Natural leaders who tend to take charge and would prefer to be in charge of the pond. Tide setters are driven and motivated to achieve their goals, even if it ends up ruffling a few feathers.",
  [DuckCategory.CANADIAN_GEESE]: "Straight to the point ducks who don’t shy away from confrontation and will never be afraid to speak their mind. Canadian geese will point out even the harshest of truths to their fellow ducks when nobody else would.",
  [DuckCategory.GOLDEN_BEAK]: "The stars of the show, ducks of the Golden Beak Society tend to be the life of the pond. They thrive on interaction and energy, often becoming the glue that holds the flock together and will never miss a good duck get-together.",
  [DuckCategory.WADING_WADDLERS]: "Self-reserved ducks who like to stay out of trouble and mind their own business. Wading Waddlers prefer the edges of the pond, and hold their closest duckpals very close to their hearts.",
  [DuckCategory.MISCHIEVOUS_MALLARDS]: "The playful ducks that tend to act before they think (even if it ends a little chaotic). Mischievous mallards are never afraid to stir the pond just to have a good laugh, love them or hate them, they’re always good company."
};

export const CATEGORY_METADATA: Record<string, { color: string; icon: string }> = {
  [DuckCategory.TIDE_SETTERS]: { color: 'bg-blue-600', icon: '🌊' },
  [DuckCategory.CANADIAN_GEESE]: { color: 'bg-red-500', icon: '🦢' },
  [DuckCategory.GOLDEN_BEAK]: { color: 'bg-yellow-400', icon: '👑' },
  [DuckCategory.WADING_WADDLERS]: { color: 'bg-emerald-500', icon: '🌿' },
  [DuckCategory.MISCHIEVOUS_MALLARDS]: { color: 'bg-purple-500', icon: '🎭' }
};
