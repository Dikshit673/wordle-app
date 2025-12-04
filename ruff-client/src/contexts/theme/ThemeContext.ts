import { createContext } from 'react';

export const themes = ['light', 'dark'] as const;
export type ThemesType = (typeof themes)[number];

export type ThemeContextType = {
  theme: ThemesType;
  toggleTheme: (theme: ThemesType) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
