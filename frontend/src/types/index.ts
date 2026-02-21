export type Level =
  | 'BEGINNER'
  | 'ELEMENTARY'
  | 'INTERMEDIATE'
  | 'UPPER_INTERMEDIATE'
  | 'ADVANCED';

export const LEVEL_LABELS: Record<Level, string> = {
  BEGINNER: '입문',
  ELEMENTARY: '초급',
  INTERMEDIATE: '중급',
  UPPER_INTERMEDIATE: '중고급',
  ADVANCED: '고급',
};

export interface Sentence {
  id: number;
  englishText: string;
  koreanTranslation: string;
  keyExpression: string;
  explanation: string;
  level: Level;
  scheduledDate: string;
}

export interface LevelQuestion {
  id: number;
  orderIndex: number;
  questionText: string;
  options: LevelOption[];
}

export interface LevelOption {
  id: number;
  optionText: string;
  score: number;
  orderIndex: number;
}

export interface LevelSubmitResult {
  level: Level;
  totalScore: number;
}

export interface GuestState {
  guestId: string;
  level: Level | null;
  levelScore: number;
  bookmarkedSentenceIds: number[];
  attendanceDates: string[];
  currentStreak: number;
  maxStreak: number;
}
