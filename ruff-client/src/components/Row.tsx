import { useAppContext } from '@/contexts/hooks/useAppContext';
import Box, { type ColorKeysType } from './Box';

type RowProps = {
  id: number;
  guess: string;
  feedback: ColorKeysType[];
};

const Row = ({ id, guess, feedback }: RowProps) => {
  const { currentGuess, guesses, wordLength } = useAppContext();
  return (
    <div className='flex gap-2'>
      {[...Array(wordLength)].map((_, colIndex) => {
        const letter =
          guess[colIndex] ||
          (id === guesses.length ? currentGuess[colIndex] || '' : '');
        const color: ColorKeysType = feedback[colIndex] || 'none';
        return <Box key={colIndex} color={color} letter={letter} />;
      })}
    </div>
  );
};

export default Row;
