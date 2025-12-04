import { GameRootProvider } from '@/contexts/game/GameProvider';
import GameUi from './GameUi';

type Props = {
  winWord: string;
  wordLength: number;
  maxGuesses: number;
};

export default function Game({ winWord, wordLength, maxGuesses }: Props) {
  return (
    <GameRootProvider
      winWord={winWord}
      wordLength={wordLength}
      maxGuesses={maxGuesses}
    >
      <GameUi />
    </GameRootProvider>
  );
}
