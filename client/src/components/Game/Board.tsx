import { useGame } from '@/contexts/game/useGame';
import Row from './Row';

export default function Board() {
  const { board, maxGuesses, wordLength, evaluations } = useGame();

  return (
    <div className='w-full overflow-x-auto pb-2'>
      <div className='flex min-w-max flex-col items-center justify-center gap-2'>
        {Array.from({ length: maxGuesses }).map((_, row) => (
          <Row
            key={row}
            guess={board[row] || ''}
            evaluation={evaluations[row] || []}
            wordLength={wordLength || 5}
          />
        ))}
      </div>
    </div>
  );
}

// import { Row } from "./Row";

// export function Board({ rows }: { rows: any[] }) {
//   return (
//     <div className="flex flex-col gap-2 my-6">
//       {rows.map((row, i) => (
//         <Row
//           key={i}
//           letters={row.letters}
//           statuses={row.statuses}
//           shake={row.shake}
//         />
//       ))}
//     </div>
//   );
// }
