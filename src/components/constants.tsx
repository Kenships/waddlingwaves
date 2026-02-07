//comment
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
