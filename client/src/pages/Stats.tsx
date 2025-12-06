import { Heading } from '@/components/ui/Heading';

export default function Stats() {
  const stats = { totalGames: 10, wins: 5, winRate: 50 };

  return (
    <>
      <Heading.H3 title='Statistics' className='mb-4' />
      <div className='text-lg'>
        <p>Total Games: {stats.totalGames}</p>
        <p>Wins: {stats.wins}</p>
        <p>Win Rate: {stats.winRate}%</p>
      </div>
    </>
  );
}
