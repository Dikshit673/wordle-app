import Board from './Board';
import Keyboard from './KeyBoard';
import { useGame } from '@/contexts/game/useGame';
import GameProvider from '@/contexts/game/GameProvider';

type GameProps = {
  winWord: string;
  wordLength: number;
  maxGuesses: number;
};

function Game({ winWord, wordLength = 5, maxGuesses = 6 }: GameProps) {
  return (
    <GameProvider
      wordLength={wordLength}
      winWord={winWord}
      maxGuesses={maxGuesses}
    >
      <GameUI />
    </GameProvider>
  );
}

function GameUI() {
  const { status } = useGame();
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='text-sm text-slate-600'>{status}</div>
      <Board />
      <Keyboard />

      {/* {gameStatus === 'won' && (
        <p className='text-xl font-bold text-green-500'>You Won! 🎉</p>
      )}

      {gameStatus === 'lost' && (
        <p className='text-xl text-red-500'>
          You Lost! Word was: <b>{winWord}</b>
        </p>
      )} */}
    </div>
  );
}

export default Game;
