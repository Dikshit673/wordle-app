import { useModal } from '@/contexts/modal/useModal';
import { useTab } from '@/contexts/tab/useTab';
import { pickRandomWord } from '@/lib/wordList';

function RandomWordTab() {
  // const { openTab } = useModal();
  const { activeTab } = useTab();

  const startDefault = () => {
    // default 5 letter random
    const word = pickRandomWord(5);
    // openTab('newGame', { word, length: 5 });
  };

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-700'>
        Start a new 5-letter game with a random word.
      </p>
      <div>
        <button
          onClick={startDefault}
          className='rounded bg-sky-600 px-4 py-2 text-white'
        >
          Start 5-letter Game
        </button>
      </div>
    </div>
  );
}

export default RandomWordTab;
