import { useGame } from '@/contexts/game/useGame';

const Results = () => {
  const { status, winWord } = useGame();

  switch (status) {
    case 'won':
      return <p className='font-bold text-green-600'>You Won! 🎉</p>;
    case 'lost':
      return (
        <p className='flex flex-col items-center font-bold text-red-600'>
          <span>You Lost!</span>
          <span>Answer: {winWord}</span>
        </p>
      );
    default:
      return null;
  }
};

export default Results;
