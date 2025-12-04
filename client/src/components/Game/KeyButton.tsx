import type { LetterState } from '@/contexts/game/GameContext';
import { tv } from 'tailwind-variants';

const buttonTWV = tv({
  base: 'rounded-md px-3 py-2 text-sm font-semibold active:scale-95 border border-slate-900',
  variants: {
    state: {
      correct: 'bg-correct text-white',
      present: 'bg-present text-white',
      absent: 'bg-absent text-white',
      empty: 'bg-slate-300 text-slate-700',
    },
  },
});

interface Props {
  label: string;
  keyState: LetterState | undefined;
}

export default function KeyButton({ label, keyState }: Props) {
  return (
    <button
      type='button'
      data-name={label}
      disabled={keyState === 'absent'}
      className={buttonTWV({ state: keyState || 'empty' })}
    >
      {label}
    </button>
  );
}
