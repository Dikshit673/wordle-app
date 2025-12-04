import { createContext } from 'react';

/**
 * Modal payload is optional extra data you want to pass when opening the modal.
 * Example: { length: 6, word: "REACT" }
 */
export type ModalPayload = {
  length?: number;
  word?: string;
  [k: string]: unknown;
};

export type ModalTab =
  | 'none'
  | 'new-game'
  | 'random-length'
  | 'how-to'
  | 'stats';

export interface ModalContextType {
  open: boolean;
  activeTab: ModalTab;
  payload?: ModalPayload;

  openModal: (tab: ModalTab, payload?: ModalPayload) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
