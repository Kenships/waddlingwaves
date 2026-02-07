export const DuckCategory = {
  TIDE_SETTERS: 'Tide Setters',
  CANADIAN_GEESE: 'Canadian Geese',
  GOLDEN_BEAK: 'Golden Beak Society',
  WADING_WADDLERS: 'Wading Waddlers',
  MISCHIEVOUS_MALLARDS: 'Mischievous Mallards'
} as const;

export type DuckCategory = (typeof DuckCategory)[keyof typeof DuckCategory];

export interface AvatarAsset {
  id: string;
  name: string;
  imagePath: string;
  description: string;
}

export interface DuckAvatarConfig {
  skin: string;
  hat: string;
  'handheld-item': string;
  wings: string;
}

export interface UserAnswers {
  mbti?: string;
  firstSong: string;
  memeResonance: string;
  favoriteMovie: string;
  birthday: string;
  duckActivity: string;
  foodStrategy: string;
  personalityTraits: string;
}

export interface DuckResult {
  category: DuckCategory;
  summary: string;
  detailedReasoning: string;
  spiritAnimalTraits: string[];
  vibeColor: string;
  avatar: DuckAvatarConfig;
}
