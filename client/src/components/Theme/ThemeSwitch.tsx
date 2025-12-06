import { useTheme } from '@/contexts/theme/useTheme';
import { useCallback } from 'react';
import { Switch } from './Switch';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = useCallback(() => {
    if (theme === 'dark') {
      toggleTheme('light');
    } else {
      toggleTheme('dark');
    }
  }, [toggleTheme, theme]);

  return (
    <div className='h-full origin-center scale-80'>
      <Switch checked={theme === 'dark'} onChange={handleClick} />
    </div>
  );
}
