import { Heading } from '@/components/ui/Heading';
import { Link } from 'react-router';

export default function Home() {
  return (
    <>
      <Heading.H2
        title='Wordle'
        className='mb-4 text-slate-900 dark:text-gray-100'
      />
      <div className='flex flex-col gap-4 text-lg'>
        <Link to='/new-game' className='text-blue-500 underline'>
          ▶ Start Random Game
        </Link>

        <Link to='/new-game?wordlength=5' className='text-blue-500 underline'>
          ▶ Start Game (Word Length: 5)
        </Link>

        <Link to='/stats' className='text-blue-500 underline'>
          📊 View Stats
        </Link>

        <Link to='/how-to-play' className='text-blue-500 underline'>
          ❓ How to Play
        </Link>
      </div>
    </>
  );
}
