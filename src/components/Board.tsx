import { MAX_GUESSES } from '@/constants';
import { useAppContext } from '@/states/hooks/AppContext';
import Row from './Row';

const Board = () => {
  const { guesses, feedbackList } = useAppContext();
  return (
    <div className='grid gap-2'>
      {[...Array(MAX_GUESSES)].map((_, rowIndex) => {
        const guess = guesses[rowIndex] || '';
        const feedback = feedbackList[rowIndex] || [];

        return (
          <Row key={rowIndex} id={rowIndex} guess={guess} feedback={feedback} />
        );
      })}
    </div>
  );
};

export default Board;
