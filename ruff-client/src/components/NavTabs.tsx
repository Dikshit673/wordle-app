import { type MouseEvent } from 'react';
import type { ActiveTab } from '@/contexts/tab/TabContext';
import { useTab } from '@/contexts/tab/useTab';

type NavItemProps = {
  activeTab: ActiveTab;
  tabName: ActiveTab;
  label: string;
};

const NavItem = ({ activeTab, tabName, label }: NavItemProps) => {
  return (
    <li
      data-tab-name={tabName}
      className={`${activeTab === tabName ? 'border-blue-400 bg-blue-100 font-semibold' : 'border-slate-200 bg-white'} w-full cursor-pointer rounded-md border-2 px-4 py-2 text-center transition-colors duration-100 ease-in-out`}
    >
      {label}
    </li>
  );
};

type TabListType = {
  name: ActiveTab;
  label: string;
}[];

const TabList: TabListType = [
  {
    name: 'randomWord',
    label: 'New game (random)',
  },
  {
    name: 'randomlength',
    label: 'New game (choose length)',
  },
  {
    name: 'howToPlay',
    label: 'How to play',
  },
  {
    name: 'stats',
    label: 'Stats',
  },
];

const NavTabs = () => {
  // const { openTab } = useModal();
  const { activeTab } = useTab();
  const handleNavClick = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    const elem = e.target as HTMLLIElement;
    const liElem = elem.closest('li');
    if (!liElem) return;
    const tabName = liElem.getAttribute('data-tab-name') as ActiveTab;
    if (!tabName) return;
    // openTab(tabName);
  };
  return (
    <div>
      <ul
        className='flex flex-col gap-3 text-gray-700 capitalize'
        onClick={handleNavClick}
      >
        {TabList.map(({ name, label }, index) => (
          <NavItem
            key={index}
            activeTab={activeTab}
            tabName={name}
            label={label}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavTabs;
