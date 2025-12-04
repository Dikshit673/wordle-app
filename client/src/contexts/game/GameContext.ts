import { createContext } from 'react';

/**
 * Local types — kept here so context is self-contained.
 * evaluate function (used by provider) will produce these shapes.
 */
export type LetterState = 'correct' | 'present' | 'absent';
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface LetterResult {
  letter: string;
  state: LetterState;
}

/**
 * The game context exposes all game-state and actions the UI needs.
 */
export interface GameContextType {
  // config
  winWord: string | null; // uppercase
  wordLength: number;
  maxGuesses: number;

  // game state
  status: GameStatus;
  currentRow: number;

  // board state
  board: string[]; // each row string ('' until submitted)
  evaluations: (LetterResult[] | undefined)[]; // per row results or undefined
  usedKeys: Record<string, LetterState>;

  // actions
  startGame: (length?: number, word?: string) => void;
  resetGame: () => void;
  handleKeyPress: (key: string) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
