function HowToPlayTab() {
  return (
    <div className='max-w-xl space-y-3'>
      <p className='text-sm text-slate-700'>
        Guess the hidden word in 6 attempts. Each guess must be the same length
        as the target word.
      </p>
      <ul className='list-disc space-y-2 pl-5 text-sm text-slate-600'>
        <li>
          <strong>Green</strong>: correct letter in correct spot.
        </li>
        <li>
          <strong>Yellow</strong>: correct letter wrong spot.
        </li>
        <li>
          <strong>Grey</strong>: letter not in the word.
        </li>
      </ul>
      <p className='text-sm text-slate-700'>
        Use keyboard or the on-screen keyboard to play. Word lengths supported:
        3–8.
      </p>
    </div>
  );
}

export default HowToPlayTab;
