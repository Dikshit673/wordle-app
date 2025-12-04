import { createContext } from 'react';

export type CellState = 'correct' | 'present' | 'absent';

export type CellStates = 'empty' | 'filled' | 'correct' | 'present' | 'absent';

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GuessResult {
  letter: string;
  state: CellStates;
}

export type ResultItemType = {
  guess: string;
  evaluation: CellState[];
};

export interface GameContextType {
  winWord: string;
  wordLength: number;
  maxGuesses: number;

  currentGuess: string;
  guesses: string[];
  currentRow: number;
  usedKeys: Record<string, CellStates>;
  rowStates: GuessResult[][];
  status: string | null;
  gameOver: boolean;

  handleKeyPress: (key: string) => void;
  resetGame: (length: number, word: string) => void;
}

export const GameContext = createContext<GameContextType | null>(null);
