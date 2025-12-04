import { createContext } from 'react';

export const AppThemes = ['light', 'dark'] as const;
export type ThemesType = (typeof AppThemes)[number];

export type ThemeContextType = {
  theme: ThemesType;
  toggleTheme: (theme: ThemesType) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
