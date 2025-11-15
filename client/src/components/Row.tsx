import { useAppContext } from '@/states/hooks/AppContext';
import Box, { type ColorKeysType } from './Box';
import { WORD_LENGTH } from '@/constants';

type RowProps = {
  id: number;
  guess: string;
  feedback: ColorKeysType[];
};

const Row = ({ id, guess, feedback }: RowProps) => {
  const { currentGuess, guesses } = useAppContext();
  return (
    <div className='flex gap-2'>
      {[...Array(WORD_LENGTH)].map((_, colIndex) => {
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
