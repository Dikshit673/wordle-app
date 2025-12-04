import { useGame } from '@/contexts/game/useGame';
import Row from './Row';

export default function Board() {
  const { guesses, maxGuesses, rowStates, wordLength } = useGame();

  return (
    <div className='grid gap-2'>
      {Array.from({ length: maxGuesses }).map((_, row) => {
        return (
          <Row
            key={row}
            guess={guesses[row] || ''}
            evaluation={rowStates[row] || []}
            wordLength={wordLength}
          />
        );
      })}
    </div>
  );
}
