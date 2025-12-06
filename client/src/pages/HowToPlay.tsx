const HowToPlay = () => {
  return (
    <>
      <p className='text-sm'>
        Guess the hidden word in 6 attempts. Each guess must be the same length
        as the target word.
      </p>
      <ul className='list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300'>
        <li>
          <strong className='text-green-500 dark:text-green-400'>Green</strong>:
          correct letter in correct spot.
        </li>
        <li>
          <strong className='text-yellow-500 dark:text-yellow-400'>
            Yellow
          </strong>
          : correct letter wrong spot.
        </li>
        <li>
          <strong className='text-gray-500 dark:text-gray-300'>Grey</strong>:
          letter not in the word.
        </li>
      </ul>
      <p className='text-sm'>
        Use keyboard or the on-screen keyboard to play. Word lengths supported:
        3–8.
      </p>
    </>
  );
};

export default HowToPlay;
