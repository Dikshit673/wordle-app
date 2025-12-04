// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { randomNo } from '@/utils/random';
import { pickRandomWord } from '@/lib/wordList';
// import { pickRandomWord } from '@/lib/wordList';
// import { randomNo } from '@/utils/random';

function RandomLengthTab() {
  // const { openTab, changeTab } = useModal();
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

  const startRandom = () => {
    // const min = 3;
    // const max = 8;
    // const len = randomNo(min, max);
    // const w = pickRandomWord(len);
    // console.log({ len, w });
    // openTab('newGame', { word: w, length: len });
    // openTab('newGame');
    // changeTab('newGame');
  };

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-700'>
        Start a game with a random length (3–8).
      </p>
      <div>
        <button
          onClick={startRandom}
          className='rounded bg-sky-600 px-4 py-2 text-white'
        >
          Start Random-Length Game
        </button>
      </div>
      {/* <Modal>
        <Game
          winWord={winWord}
          wordLength={wordLength}
          maxGuesses={maxGuesses}
        />
      </Modal> */}
    </div>
  );
}

export default RandomLengthTab;
