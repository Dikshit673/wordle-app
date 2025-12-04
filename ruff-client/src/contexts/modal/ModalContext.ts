import { createContext } from 'react';

export type ModalContextType = {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
