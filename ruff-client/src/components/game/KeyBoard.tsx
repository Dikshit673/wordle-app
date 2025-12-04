import { useGame } from '@/contexts/game/useGame';

const KEYS = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  ['ENTER', ...'ZXCVBNM'.split(''), 'BACKSPACE'],
];

type KeyBoardButtonProps = {
  label: string;
};

const KeyBoardButton = ({ label }: KeyBoardButtonProps) => {
  const { handleKeyPress, usedKeys } = useGame();
  console.log(usedKeys[label.toUpperCase()]);
  const colors = {
    correct: 'bg-green-500 text-white',
    present: 'bg-yellow-500 text-white',
    absent: 'bg-gray-400 text-white',
    empty: 'border border-gray-500',
    filled: 'border border-gray-500',
  };
  return (
    <button
      onClick={() => handleKeyPress(label)}
      className={`rounded px-3 py-2 text-sm font-bold uppercase ${colors[usedKeys[label.toUpperCase()] || 'empty']}`}
    >
      {label === 'BACKSPACE' ? '⌫' : label}
    </button>
  );
};

type KeyBoardRowProps = {
  row: string[];
};

const KeyboardRow = ({ row }: KeyBoardRowProps) => {
  return (
    <div className='flex justify-center gap-2'>
      {row.map((key) => (
        <KeyBoardButton key={key} label={key} />
      ))}
    </div>
  );
};

export default function Keyboard() {
  return (
    <div className='grid gap-2'>
      {KEYS.map((row, i) => (
        <KeyboardRow key={i} row={row} />
      ))}
    </div>
  );
}
