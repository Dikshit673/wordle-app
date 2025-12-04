import Box from './Box';
import { type LetterResult } from '@/contexts/game/GameContext';

interface Props {
  guess: string;
  evaluation: LetterResult[];
  wordLength: number;
}

export default function Row({ guess, evaluation, wordLength }: Props) {
  return (
    <div className='flex gap-2'>
      {Array.from({ length: wordLength }).map((_, col) => (
        <Box
          key={col}
          letter={guess[col] || ''}
          state={evaluation[col]?.state}
        />
      ))}
    </div>
  );
}

// import { Box } from "./Box";

// export function Row({
//   letters,
//   statuses,
//   shake,
// }: {
//   letters: string[];
//   statuses: ("correct" | "present" | "absent" | null)[];
//   shake: boolean;
// }) {
//   return (
//     <div className={`flex gap-2 ${shake ? "animate-shake" : ""}`}>
//       {letters.map((letter, i) => (
//         <Box key={i} value={letter} status={statuses[i]} animate={!!statuses[i]} />
//       ))}
//     </div>
//   );
// }
