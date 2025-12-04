import { createPortal } from 'react-dom';
import { Heading } from './ui/Heading';
import { useModal } from '@/contexts/modal/useModal';
import type { ReactNode } from 'react';
import { useTab } from '@/contexts/tab/useTab';
import { Button } from './ui/Button';

const PORTAL_ID = 'portal-root';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const { closeModal } = useModal();
  const { activeTab } = useTab();
  const handleClose = () => {
    closeModal();
  };
  if (activeTab === 'none') return null;
  return (
    <div className='fixed inset-0 flex h-screen w-full items-center justify-center bg-black/80 backdrop-blur-md'>
      <div className='shadow-prime-600 max-h-screen min-w-min space-y-4 overflow-y-auto rounded-lg bg-white p-6 shadow'>
        <div className='flex items-center justify-between gap-2'>
          <Heading.H4 title={activeTab} className='text-blue-400' />
          <button
            className='hover:bg-prime-600 flex size-9 items-center justify-center rounded-lg border border-transparent bg-transparent font-extrabold text-black shadow-md active:scale-95'
            onClick={handleClose}
          >
            ✕
          </button>
          <Button>✕</Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const elem = document.getElementById(PORTAL_ID);
  if (!elem) return null;

  return createPortal(<Wrapper>{children}</Wrapper>, elem);
};

export default Modal;
