import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AppContext } from '../hooks/AppContext';
import { getFeedback } from '@/utils/getFeedback';
import { MAX_GUESSES, TARGET_WORD, WORD_LENGTH } from '@/constants';
import type { ColorKeysType } from '@/components/Box';

type ContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [targetWord, setTargetWord] = useState<string>(
    TARGET_WORD.toUpperCase()
  );
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [feedbackList, setFeedbackList] = useState<Array<Array<ColorKeysType>>>(
    []
  );

  useEffect(() => {
    setTargetWord(TARGET_WORD.toUpperCase());
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const keyDownFn = (e: KeyboardEvent) => {
      e.preventDefault();
      const { key } = e;
      const regex = /^[a-zA-Z]$/;

      switch (key) {
        case 'Enter': {
          if (currentGuess.length !== WORD_LENGTH) return;

          const upperCasedCurrentGuess = currentGuess.toUpperCase();
          const feedback = getFeedback(upperCasedCurrentGuess, targetWord);
          const updatedGuesses = [...guesses, upperCasedCurrentGuess];

          setGuesses(updatedGuesses);
          setFeedbackList([...feedbackList, feedback]);
          setCurrentGuess('');

          if (
            upperCasedCurrentGuess === targetWord ||
            updatedGuesses.length >= MAX_GUESSES
          ) {
            setGameOver(true);
          }
          break;
        }
        case 'Backspace': {
          setCurrentGuess((prev) => prev.slice(0, -1));
          break;
        }
        case 'Delete': {
          setCurrentGuess('');
          break;
        }
        default: {
          if (currentGuess.length < 5 && !!regex.test(key)) {
            setCurrentGuess((prev) => prev + key);
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', keyDownFn);

    return () => {
      window.removeEventListener('keydown', keyDownFn);
    };
  }, [
    guesses,
    currentGuess,
    setCurrentGuess,
    setGuesses,
    feedbackList,
    gameOver,
    targetWord,
  ]);

  return (
    <AppContext
      value={{
        guesses,
        setGuesses,
        currentGuess,
        setCurrentGuess,
        feedbackList,
        setFeedbackList,
        gameOver,
        setGameOver,
        targetWord,
      }}
    >
      {children}
    </AppContext>
  );
};

export default AppContextProvider;
