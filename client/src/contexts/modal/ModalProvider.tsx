import React, { useCallback, useState } from 'react';
import { ModalContext, type ModalTab, type ModalPayload } from './ModalContext';

type ModalProviderProps = { children: React.ReactNode };

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>('none');
  const [payload, setPayload] = useState<ModalPayload | undefined>(undefined);

  const openModal = useCallback((tab: ModalTab, payloadArg?: ModalPayload) => {
    setActiveTab(tab);
    setPayload(payloadArg);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setActiveTab('none');
    setPayload(undefined);
  }, []);

  const value = {
    open,
    activeTab,
    payload,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
