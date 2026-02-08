export const DuckCategory = {
  TIDE_SETTERS: 'Tide Setters',
  CANADA_GOOSE: 'Canada Goose',
  GOLDEN_BEAK: 'Golden Beak',
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
  name: string;
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

export interface WaddleMember {
  id: string;
  name: string;
  category: DuckCategory;
  avatar: DuckAvatarConfig;
  joinedAt: string;
  summary: string;
  detailedReasoning: string;
  spiritAnimalTraits: string[];
}