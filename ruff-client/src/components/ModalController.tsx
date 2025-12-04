import Modal from './Modal';
import { useTab } from '@/contexts/tab/useTab';
import RandomWordTab from './tabs/RandomWordTab';
import RandomLengthTab from './tabs/RandomLengthTab';
import HowToPlayTab from './tabs/HowToPlayTab';
import StatsTab from './tabs/StatsTab';
import GameTab from './tabs/GameTab';

const ModalController = () => {
  const { activeTab } = useTab();
  return (
    <Modal>
      {activeTab === 'newGame' && <GameTab />}
      {activeTab === 'randomWord' && <RandomWordTab />}
      {activeTab === 'randomlength' && <RandomLengthTab />}
      {activeTab === 'howToPlay' && <HowToPlayTab />}
      {activeTab === 'stats' && <StatsTab />}
    </Modal>
  );
};

export default ModalController;
