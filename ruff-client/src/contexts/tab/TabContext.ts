import { createContext } from 'react';

export type ActiveTab =
  | 'none'
  | 'newGame'
  | 'randomWord'
  | 'randomlength'
  | 'howToPlay'
  | 'stats';

export type TabContextType = {
  activeTab: ActiveTab;
  openTab: (tab: ActiveTab) => void;
  closeTab: () => void;
};

export const TabContext = createContext<TabContextType | null>(null);
