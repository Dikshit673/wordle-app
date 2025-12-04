import { tv } from 'tailwind-variants';
import { type LetterState } from '@/contexts/game/GameContext';

const boxTWV = tv({
  base: 'size-10 flex items-center justify-center rounded-md text-lg font-bold uppercase select-none border ',
  variants: {
    state: {
      correct: 'bg-correct text-white border-correct',
      present: 'bg-present text-white border-present',
      absent: 'bg-absent text-white border-absent',
      empty: 'bg-slate-300 text-slate-800 border-slate-900',
    },
  },
});
interface Props {
  letter: string;
  state?: LetterState;
}

export default function Box({ letter, state }: Props) {
  return <div className={boxTWV({ state: state || 'empty' })}>{letter}</div>;
}
