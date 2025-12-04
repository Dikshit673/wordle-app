import { useTheme } from '@/contexts/theme/useTheme';
import { useCallback } from 'react';

const themeLabels = {
  light: '🌞 Light',
  dark: '🌜 Dark',
};

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = useCallback(() => {
    if (theme === 'dark') {
      toggleTheme('light');
    } else {
      toggleTheme('dark');
    }
  }, [toggleTheme, theme]);

  return (
    <div>
      <button
        type='button'
        className='cursor-pointer select-none'
        onClick={handleClick}
      >
        {themeLabels[theme]}
      </button>
    </div>
  );
}
