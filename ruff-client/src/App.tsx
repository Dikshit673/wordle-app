import './App.css';

import ModalController from './components/ModalController';
import NavTabs from './components/NavTabs';
import { Heading } from './components/ui/Heading';

function App() {
  return (
    <div className='text-prime-600 flex h-screen w-full items-center justify-center bg-black/90'>
      <div className='shadow-prime-600 w-full max-w-90 min-w-70 space-y-4 rounded-lg bg-white p-6 shadow'>
        <Heading.H3 title='Wordle' className='text-center text-blue-400' />
        <NavTabs />
        <ModalController />
      </div>
    </div>
  );
}

export default App;
