import './App.css';

import Board from './components/Board';
import Results from './components/Results';

function App() {
  return (
    <section className='min-h-screen w-full bg-gray-300'>
      <div className='mx-auto w-9/10 md:w-7/10 lg:w-5/10 xl:w-3/10 2xl:w-4/10'>
        <div className='flex min-h-screen flex-col items-center justify-center bg-white p-4'>
          <h1 className='mb-4 text-3xl font-bold'>Wordle</h1>
          <Board />
          <Results />
          <p className='mt-2 text-sm text-gray-500'>
            Type your guess and press Enter
          </p>
        </div>
      </div>
    </section>
  );
}

export default App;
