import { createContext, useContext } from 'react';
import type { ColorKeysType } from '@/components/Box';
import type { Dispatch, SetStateAction } from 'react';

type AppContextType = {
  guesses: Array<string>;
  setGuesses: Dispatch<SetStateAction<Array<string>>>;
  currentGuess: string;
  setCurrentGuess: Dispatch<SetStateAction<string>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  feedbackList: Array<Array<ColorKeysType>>;
  setFeedbackList: Dispatch<SetStateAction<Array<Array<ColorKeysType>>>>;
  targetWord: string;
};

const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
  const values = useContext(AppContext);
  if (!values) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return values;
};

export { AppContext, useAppContext };
