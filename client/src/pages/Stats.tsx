export default function Stats() {
  const stats = { totalGames: 10, wins: 5, winRate: 50 };

  return (
    <div className='bg-white p-10 text-black dark:bg-gray-800 dark:text-white'>
      <h1 className='mb-4 text-2xl font-bold'>Statistics</h1>

      <div className='text-lg'>
        <p>Total Games: {stats.totalGames}</p>
        <p>Wins: {stats.wins}</p>
        <p>Win Rate: {stats.winRate}%</p>
      </div>
    </div>
  );
}
