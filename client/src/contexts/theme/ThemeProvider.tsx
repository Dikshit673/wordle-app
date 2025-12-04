import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  ThemeContext,
  AppThemes,
  type ThemeContextType,
  type ThemesType,
} from './ThemeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemesType>(AppThemes[0]);

  const toggleTheme = useCallback((theme: ThemesType) => {
    setTheme(theme);
  }, []);

  useEffect(() => {
    switch (theme) {
      case 'light':
        document.body.classList.remove('dark');
        break;
      case 'dark':
        document.body.classList.add('dark');
        break;
      default:
        break;
    }
  }, [theme]);

  const values = {
    theme,
    toggleTheme,
  } satisfies ThemeContextType;

  if (!values) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return <ThemeContext value={values}>{children}</ThemeContext>;
};
