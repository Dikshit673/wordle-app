import { useSearchParams } from 'react-router';
import Game from '@/components/Game/Game';
import { useState } from 'react';
import { pickRandomWord } from '@/lib/wordList';
import { randomNo } from '@/utils/random';

export default function NewGame() {
  const [params] = useSearchParams();

  const wordLength = Number(params.get('wordlength')) || 5;

  const [winWord] = useState(() => {
    const word = pickRandomWord(wordLength);
    return word;
  });
  const [maxGuesses] = useState<number>(() => randomNo(4, 6));

  return (
    <div className='bg-white p-8 text-black dark:bg-gray-800 dark:text-white'>
      <Game winWord={winWord} wordLength={wordLength} maxGuesses={maxGuesses} />
    </div>
  );
}
