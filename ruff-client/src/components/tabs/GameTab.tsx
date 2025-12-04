import { randomNo } from '@/utils/random';
import Game from '../game/Game';
import { useEffect, useState } from 'react';
import { pickRandomWord } from '@/lib/wordList';

const GameTab = () => {
  const [winWord, setWinWord] = useState('');
  const [wordLength, setWordLength] = useState(5);
  const [maxGuesses, setMaxGuesses] = useState(6);

  useEffect(() => {
    const len = randomNo(4, 8);
    const maxGuess = randomNo(4, 6);
    const word = pickRandomWord(len);

    setWinWord(word);
    setWordLength(wordLength);
    setMaxGuesses(maxGuess);
  }, [wordLength]);

  return (
    <div>
      <Game winWord={winWord} wordLength={wordLength} maxGuesses={maxGuesses} />
    </div>
  );
};

export default GameTab;
