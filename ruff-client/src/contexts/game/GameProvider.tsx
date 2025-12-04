import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  GameContext,
  type CellStates,
  type GameContextType,
  type GuessResult,
} from './GameContext';
import { evaluateGuess } from '@/utils/evaluate';

interface GameProviderProps {
  children: React.ReactNode;
  winWord: string;
  wordLength: number;
  maxGuesses: number;
}

const alphabetRegex = /^[a-zA-Z]$/;

export const GameProvider = ({
  children,
  winWord,
  wordLength,
  maxGuesses,
}: GameProviderProps) => {
  const [currentRow, setCurrentRow] = useState(0);

  const [guesses, setGuesses] = useState<string[]>([]); //guess
  const [rowStates, setRowStates] = useState<GuessResult[][]>([]);

  const [usedKeys, setUsedKeys] = useState<Record<string, CellStates>>({});

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);

  const [_, setError] = useState<string | null>(null);

  useEffect(() => {
    // reset when answer changes
    const emptyGuesses = Array<string>(maxGuesses).fill('');
    setGuesses(emptyGuesses);
    setRowStates([]);
    setCurrentRow(0);
    setGameOver(false);
    setStatus(null);
    setUsedKeys({});
  }, [winWord, maxGuesses]);

  const toastError = useCallback((msg: string) => {
    setError(msg);
    setTimeout(() => {
      setError(null);
    }, 1200);
  }, []);

  const handleChar = useCallback(
    (ch: string) => {
      if (gameOver) return;

      setGuesses((prev) => {
        const row = prev[currentRow] ?? '';
        if (row.length >= wordLength) return prev;
        const next = [...prev];
        next[currentRow] = row + ch;
        return next;
      });
    },
    [gameOver, currentRow, wordLength]
  );

  const handleBackspace = useCallback(() => {
    if (gameOver) return;
    setGuesses((prev) => {
      const row = prev[currentRow] ?? '';
      if (!row) return prev;
      const next = [...prev];
      next[currentRow] = row.slice(0, -1);
      return next;
    });
  }, [gameOver, currentRow]);

  const handleDelete = useCallback(() => {
    if (gameOver) return;
    setGuesses((prev) => {
      const row = prev[currentRow] ?? '';
      if (!row) return prev;
      const next = [...prev];
      next[currentRow] = row.slice(1);
      return next;
    });
  }, [gameOver, currentRow]);

  const handleEnter = useCallback(() => {
    if (gameOver) return;
    const currGuess = guesses[currentRow];
    if (currGuess.length !== wordLength)
      return toastError(`Guess must be ${wordLength} letters`);

    const result = evaluateGuess(currGuess, winWord);
    setRowStates((prev) => [...prev, result]);

    setUsedKeys((prev) => {
      const next = { ...prev };
      result.forEach((r) => {
        const existing = next[r.letter];
        // priority: correct > present > absent
        if (existing === 'correct') return;
        if (existing === 'present' && r.state === 'absent') return;
        next[r.letter] = r.state;
      });
      return next;
    });

    if (currGuess === winWord) {
      setGameOver(true);
      setStatus('You win!');
      return;
    } else if (currentRow + 1 >= maxGuesses) {
      setGameOver(true);
      setStatus(`Game over — answer: ${winWord}`);
      return;
    } else {
      setCurrentRow((r) => r + 1);
      return;
    }
  }, [
    gameOver,
    currentRow,
    guesses,
    maxGuesses,
    winWord,
    wordLength,
    toastError,
  ]);

  const resetGame = useCallback((_length: number, _word: string) => {
    setGuesses(Array(6).fill(''));
    setRowStates([]);
    setCurrentRow(0);
    setGameOver(false);
    setStatus(null);
    setUsedKeys({});
  }, []);

  // screen keyboard press
  const handleKeyPress = useCallback(
    (key: string) => {
      const newKey = key.toUpperCase();
      const isAlphabet = alphabetRegex.test(key);
      switch (newKey) {
        case 'ENTER':
          handleEnter();
          break;
        case 'BACKSPACE':
          handleBackspace();
          break;
        case 'DELETE':
          handleDelete();
          break;
        default:
          if (isAlphabet) {
            handleChar(newKey);
            break;
          }
          break;
      }
    },
    [handleChar, handleBackspace, handleDelete, handleEnter]
  );

  // physical keyboard press
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      e.preventDefault();
      const { key } = e;
      handleKeyPress(key.toUpperCase());
    }

    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [handleKeyPress]);

  const value: GameContextType = useMemo(
    () => ({
      winWord,
      wordLength,
      maxGuesses,
      currentGuess: guesses[currentRow],
      guesses,
      currentRow,
      usedKeys,
      rowStates,
      status,
      gameOver,
      handleKeyPress,
      resetGame,
    }),
    [
      winWord,
      wordLength,
      maxGuesses,
      currentRow,
      usedKeys,
      guesses,
      rowStates,
      status,
      gameOver,
      handleKeyPress,
      resetGame,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
