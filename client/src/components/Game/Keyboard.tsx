import { useGame } from '@/contexts/game/useGame';
import KeyButton from './KeyButton';
import { useCallback, type MouseEvent } from 'react';

const KEY_ROWS = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  ['ENTER', ...'ZXCVBNM'.split(''), '⌫'],
];

export default function Keyboard() {
  const { handleKeyPress, usedKeys } = useGame();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const target = e.target as HTMLDivElement;
      if (!target) return;
      const elem = target.closest('button');
      if (!elem) return;
      const name = elem.getAttribute('data-name');
      if (!name) return;
      handleKeyPress(name);
    },
    [handleKeyPress]
  );
  return (
    <div className='mt-4 flex flex-col gap-2 select-none' onClick={handleClick}>
      {KEY_ROWS.map((row, i) => (
        <div key={i} className='flex justify-center gap-1'>
          {row.map((k) => (
            <KeyButton key={k} label={k} keyState={usedKeys[k]} />
          ))}
        </div>
      ))}
    </div>
  );
}
