import { Link } from 'react-router';
import DarkModeToggle from '../DarkModeToggle';

function Navbar() {
  return (
    <nav className='flex justify-between bg-gray-300 px-4 py-2 text-black dark:bg-gray-700 dark:text-white'>
      <Link to='/'>
        <h1 className='text-2xl font-bold'>Wordle</h1>
      </Link>
      <DarkModeToggle />
    </nav>
  );
}

export default Navbar;
