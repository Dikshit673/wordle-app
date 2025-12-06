import { Link } from 'react-router';
import ThemeSwitch from '../Theme/ThemeSwitch';
import { Card } from '../ui/Card';
import { Heading } from '../ui/Heading';

function Navbar() {
  return (
    <nav className='h-15 bg-gray-300 py-2 text-black dark:bg-gray-700 dark:text-white'>
      <Card className='flex items-center justify-between gap-4 overflow-hidden'>
        <Link to='/'>
          <Heading.H4 title='Wordle' />
        </Link>
        <ThemeSwitch />
      </Card>
    </nav>
  );
}

export default Navbar;
