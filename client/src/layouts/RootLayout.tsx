import Navbar from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className='flex h-min w-full items-center justify-center bg-gray-300 py-4 dark:bg-gray-700'>
        <Card className='h-full p-6 md:p-8'>
          <Outlet />
        </Card>
      </main>
    </>
  );
};

export default RootLayout;
