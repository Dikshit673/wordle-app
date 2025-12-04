import React, { useCallback, useState } from 'react';
import {
  GameContext,
  type GameContextType,
  type GameStatus,
  type LetterResult,
  type LetterState,
} from './GameContext';
import { evaluateGuess } from '@/utils/evaluate'; // <-- implement in Part 4
// import { pickRandomWord } from '@/lib/wordList'; // <-- implement in Part 4

// const DEFAULT_WORD_LENGTH = 5;
// const DEFAULT_MAX_GUESSES = 6;

type Prpps = {
  children: React.ReactNode;
  winWord: string;
  wordLength: number;
  maxGuesses: number;
};

export const GameRootProvider = ({
  children,
  winWord,
  wordLength,
  maxGuesses,
}: Prpps) => {
  // const [winWord, setWinWord] = useState<string | null>('');
  // const [wordLength, setWordLength] = useState<number>(DEFAULT_WORD_LENGTH);
  // const [maxGuesses, setMaxGuesses] = useState<number>(DEFAULT_MAX_GUESSES);

  const [status, setStatus] = useState<GameStatus>('idle');
  const [currentRow, setCurrentRow] = useState<number>(0);

  const [board, setBoard] = useState<string[]>([]);
  const [usedKeys, setUsedKeys] = useState<Record<string, LetterState>>({});
  const [evaluations, setEvaluations] = useState<
    (LetterResult[] | undefined)[]
  >([]);

  // start a game: either with provided word (win word) or pick random
  const startGame = useCallback(() => {
    // const usedLen = length ?? 5;
    // setWordLength(usedLen);

    // const chosenWord = word
    //   ? word.toUpperCase()
    //   : pickRandomWord(usedLen).toUpperCase();
    // setWinWord(chosenWord);

    setBoard([]);
    setEvaluations([]);
    setCurrentRow(0);
    setStatus('playing');
  }, []);

  const addChar = useCallback(
    (ch: string) => {
      setBoard((prev) => {
        const row = prev[currentRow] ?? '';
        if (row.length >= wordLength) return prev;
        const next = [...prev];
        next[currentRow] = row + ch;
        return next;
      });
    },
    [wordLength, currentRow]
  );

  const backspace = useCallback(() => {
    setBoard((prev) => {
      const row = prev[currentRow] ?? '';
      if (!row) return prev;
      const next = [...prev];
      next[currentRow] = row.slice(0, -1);
      return next;
    });
  }, [currentRow]);

  const deleteGuess = useCallback(() => {
    setBoard((prev) => {
      const row = prev[currentRow] ?? '';
      if (!row) return prev;
      const next = [...prev];
      next[currentRow] = '';
      return next;
    });
  }, [currentRow]);

  const submitGuess = useCallback(() => {
    if (!winWord) return;
    const currentGuess = board[currentRow].toUpperCase();
    if (currentGuess.length !== wordLength) return;

    // evaluate
    const result = evaluateGuess(currentGuess, winWord);
    setEvaluations((prev) => [...prev, result]);

    // update used keys
    setUsedKeys((prev) => {
      const next = { ...prev };
      result.forEach((r) => {
        const existing = next[r.letter];
        if (existing === 'correct') return;
        if (existing === 'present' && r.state === 'absent') return;
        next[r.letter] = r.state;
      });
      return next;
    });

    // check win
    if (currentGuess === winWord) {
      setStatus('won');
      return;
    }

    // move to next or lose
    if (currentRow + 1 >= maxGuesses) {
      setStatus('lost');
      return;
    }

    setCurrentRow((r) => r + 1);
    // setCurrentGuess('');
  }, [winWord, board, currentRow, wordLength, maxGuesses]);

  const resetGame = useCallback(() => {
    setBoard([]);
    setEvaluations([]);
    setCurrentRow(0);
    setStatus('idle');
  }, []);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!winWord) return;
      if (status !== 'playing') return;
      const uppercasedKey = key.toUpperCase();
      switch (uppercasedKey) {
        case 'ENTER': {
          submitGuess();
          break;
        }
        case 'BACKSPACE': {
          backspace();
          break;
        }
        case 'DELETE': {
          deleteGuess();
          break;
        }
        default: {
          const isAlphabet = /^[A-Z]$/.test(uppercasedKey);
          if (!isAlphabet) break;
          addChar(key);
          break;
        }
      }
    },
    [status, winWord, backspace, deleteGuess, addChar, submitGuess]
  );

  const value = {
    winWord,
    wordLength,
    maxGuesses,
    status,
    currentRow,
    board,
    evaluations,
    usedKeys,
    startGame,
    resetGame,
    handleKeyPress,
  } satisfies GameContextType;

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
