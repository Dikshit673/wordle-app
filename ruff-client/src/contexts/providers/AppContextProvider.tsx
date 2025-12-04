import type { ColorKeysType } from '@/components/Box';
import { MAX_GUESSES, TARGET_WORD, WORD_LENGTH } from '@/constants';
import { getFeedback } from '@/utils/getFeedback';
import { useEffect, useState, type ReactNode } from 'react';
import { AppContext, type AppContextType } from '../AppContext';
import { decryptWord } from '@/lib/crypto';
import { EnvVars } from '@/utils/EnvVars';
import { createHmacSignature } from '@/lib/hmac';

type ContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [targetWord, setTargetWord] = useState<string>(
    TARGET_WORD.toUpperCase()
  );
  const [wordLength, setWordLength] = useState<number>(WORD_LENGTH);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [feedbackList, setFeedbackList] = useState<Array<Array<ColorKeysType>>>(
    []
  );
  const [encryptedWord, setEncryptedWord] = useState<string>('');

  useEffect(() => {
    const getTrust = async () => {
      try {
        const urlSuffix = '/api/v1/auth/init';
        const { signature, timestamp } = await createHmacSignature(
          {},
          urlSuffix
        );
        console.log({ signature, timestamp });
        const response = await fetch(`${EnvVars.VITE_API_URL}${urlSuffix}`, {
          method: 'GET',
          headers: {
            'x-timestamp': timestamp,
            'x-signature': signature,
          },
          credentials: 'include',
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    // getTrust();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${EnvVars.VITE_API_URL}/api/v1/word`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        setEncryptedWord(result?.data?.word);
        setWordLength(result?.data?.length);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getdecryptedWord = async () => {
      if (!encryptedWord) return;
      const decoded = await decryptWord(encryptedWord);
      console.log('decoded:', decoded);
      setTargetWord(decoded.toUpperCase());
    };
    getdecryptedWord();
  }, [encryptedWord]);

  useEffect(() => {
    if (gameOver) return;
    const keyDownFn = (e: KeyboardEvent) => {
      e.preventDefault();
      const { key } = e;
      const regex = /^[a-zA-Z]$/;

      switch (key) {
        case 'Enter': {
          if (currentGuess.length !== wordLength) return;

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
          if (currentGuess.length < wordLength && !!regex.test(key)) {
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
    wordLength,
  ]);

  const value = {
    guesses,
    setGuesses,
    currentGuess,
    setCurrentGuess,
    gameOver,
    setGameOver,
    feedbackList,
    setFeedbackList,
    targetWord,
    wordLength,
  } satisfies AppContextType;

  if (!value) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
