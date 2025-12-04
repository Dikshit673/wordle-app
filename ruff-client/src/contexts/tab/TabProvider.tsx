import React, { useMemo, useState, type ReactNode } from 'react';
import { TabContext, type ActiveTab } from './TabContext';

type TabProviderProps = {
  children: ReactNode;
};

const TabProvider = ({ children }: TabProviderProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('none');
  const [winWord, setWinWord] = useState<string>('');
  const [wordLength, setWordLength] = useState<number>(5);
  const [maxGuesses, setMaxGuesses] = useState<number>(6);

  const openTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const closeTab = () => {
    setActiveTab('none');
  };

  const value = {
    activeTab,
    openTab,
    closeTab,
  };

  return <TabContext value={value}>{children}</TabContext>;
};

export default TabProvider;
