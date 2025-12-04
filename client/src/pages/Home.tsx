import { Link } from 'react-router';

export default function Home() {
  return (
    <div className='bg-white p-20 text-center text-black dark:bg-gray-800 dark:text-white'>
      <h1 className='mb-10 text-4xl font-bold'>Wordle Clone</h1>

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
    </div>
  );
}
