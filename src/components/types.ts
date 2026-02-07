
export enum DuckCategory {
  TIDE_SETTERS = 'Tide Setters',
  CANADIAN_GEESE = 'Canadian Geese',
  GOLDEN_BEAK = 'Golden Beak Society',
  WADING_WADDLERS = 'Wading Waddlers',
  MISCHIEVOUS_MALLARDS = 'Mischievous Mallards'
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
}

export interface GeminiResponse {
  category: string;
  summary: string;
  reasoning: string;
  traits: string[];
}
