import type { ColorKeysType } from '@/components/Box';
import { WORD_LENGTH } from '@/constants';

export const getFeedback = (guess: string, target: string) => {
  const feedback = Array<ColorKeysType>(WORD_LENGTH).fill('gray');

  const targetArr = target.split('');
  const guessArr = guess.split('');

  // First pass: correct letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      feedback[i] = 'green';
      targetArr[i] = null!;
      guessArr[i] = null!;
    }

    if (guessArr[i] && targetArr.includes(guessArr[i])) {
      feedback[i] = 'yellow';
      targetArr[targetArr.indexOf(guessArr[i])] = null!;
    }
  }

  // Second pass: wrong position
  // for (let i = 0; i < WORD_LENGTH; i++) {
  //   if (guessArr[i] && targetArr.includes(guessArr[i])) {
  //     feedback[i] = 'yellow';
  //     targetArr[targetArr.indexOf(guessArr[i])] = null!;
  //   }
  // }
  return feedback;
};
