import { useGame } from '@/contexts/game/useGame';

const Results = () => {
  const { status, winWord } = useGame();

  switch (status) {
    case 'won':
      return <p className='font-bold text-green-600'>You Won! 🎉</p>;
    case 'lost':
      return (
        <p className='font-bold text-red-600'>You Lost! Answer: {winWord}</p>
      );
    default:
      return null;
  }
};

export default Results;
