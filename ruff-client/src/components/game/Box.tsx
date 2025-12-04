import type { CellStates } from '@/contexts/game/GameContext';

type BoxProps = {
  label: string;
  status: CellStates;
};

export default function Box({ label, status }: BoxProps) {
  const colors = {
    correct: 'bg-green-500 text-white',
    present: 'bg-yellow-500 text-white',
    absent: 'bg-gray-400 text-white',
    empty: 'border border-gray-500',
    filled: 'border border-gray-500',
  };

  return (
    <div
      className={`flex size-9 items-center justify-center rounded text-xl font-bold uppercase ${colors[status]}`}
    >
      {label}
    </div>
  );
}
