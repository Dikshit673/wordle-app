import type { ColorKeysType } from "@/components/Box";
import { createContext, type Dispatch, type SetStateAction } from "react";

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

export const AppContext= createContext<AppContextType | null>(null)