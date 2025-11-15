import { useAppContext } from '@/states/hooks/AppContext';

const Results = () => {
  const { gameOver, guesses, targetWord } = useAppContext();
  const gameWon = guesses[guesses.length - 1] === targetWord;
  return (
    <>
      {gameOver && (
        <div
          className={`mt-4 text-xl font-medium ${gameWon ? 'text-green-500' : 'text-red-500'}`}
        >
          {gameWon
            ? `🎉 You won! Word is "${targetWord}"`
            : `Game Over! Word was "${targetWord}"`}
        </div>
      )}
    </>
  );
};

export default Results;
