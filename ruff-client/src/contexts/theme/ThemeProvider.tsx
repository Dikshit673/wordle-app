import { useState, type ReactNode } from 'react';
import {
  ThemeContext,
  themes,
  type ThemeContextType,
  type ThemesType,
} from './ThemeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemesType>(themes[0]);

  const toggleTheme = (theme: ThemesType) => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
        break;
      default:
        setTheme('light');
        break;
    }
  };

  const values = {
    theme,
    toggleTheme,
  } satisfies ThemeContextType;

  if (!values) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return <ThemeContext value={values}>{children}</ThemeContext>;
};
