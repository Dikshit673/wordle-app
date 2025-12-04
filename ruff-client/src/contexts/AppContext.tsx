import type { ColorKeysType } from '@/components/Box';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export type AppContextType = {
  guesses: Array<string>;
  setGuesses: Dispatch<SetStateAction<Array<string>>>;
  currentGuess: string;
  setCurrentGuess: Dispatch<SetStateAction<string>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  feedbackList: Array<Array<ColorKeysType>>;
  setFeedbackList: Dispatch<SetStateAction<Array<Array<ColorKeysType>>>>;
  targetWord: string;
  wordLength: number;
};

export const AppContext = createContext<AppContextType | null>(null);
