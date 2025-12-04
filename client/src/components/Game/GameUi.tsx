import { useGame } from '@/contexts/game/useGame';
import { useEffect } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import Results from './Results';

export default function GameUi() {
  const { wordLength, usedKeys, handleKeyPress, startGame } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const upperCasedKey = e.key.toUpperCase();
      const keyState = usedKeys[upperCasedKey];
      if (keyState === 'absent') return;
      handleKeyPress(upperCasedKey);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress, usedKeys]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div className='mt-4 flex flex-col items-center gap-4'>
      <p className='text-sm font-semibold text-slate-700 dark:text-slate-300'>
        Word Length: {wordLength}
      </p>

      <Board />
      <Keyboard />
      <Results />
    </div>
  );
}
