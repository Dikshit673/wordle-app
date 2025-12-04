import type { LetterResult } from '@/contexts/game/GameContext';

export function evaluateGuess(guess: string, answer: string): LetterResult[] {
  const result: LetterResult[] = [];

  const uppercasedGuess = guess.toUpperCase();
  const guessArr = uppercasedGuess.split('');

  const upperCasedAnswer = answer.toUpperCase();
  const answerArr = upperCasedAnswer.split('');

  const used = new Array<boolean>(answerArr.length).fill(false);

  // First pass: mark correct
  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = { letter: guessArr[i], state: 'correct' };
      used[i] = true;
    } else {
      result[i] = { letter: guessArr[i], state: 'absent' };
    }
  }

  // Second pass: mark present/absent
  for (let i = 0; i < guessArr.length; i++) {
    if (result[i].state === 'correct') continue;
    const idx = answerArr.findIndex((ch, j) => ch === guessArr[i] && !used[j]);
    if (idx >= 0) {
      result[i].state = 'present';
      used[idx] = true;
    } else {
      result[i].state = 'absent';
    }
  }

  return result;
}
