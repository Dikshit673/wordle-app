import type { GuessResult } from '@/contexts/game/GameContext';
import Box from './Box';

interface RowProps {
  guess: string;
  evaluation: GuessResult[];
  wordLength: number;
}

export default function Row({ guess, evaluation, wordLength }: RowProps) {
  return (
    <div className='flex gap-2'>
      {Array.from({ length: wordLength }).map((_, jIndex) => (
        <Box
          key={jIndex}
          label={guess[jIndex] || ''}
          status={evaluation[jIndex] ? evaluation[jIndex].state : 'empty'}
        />
      ))}
    </div>
  );
}
