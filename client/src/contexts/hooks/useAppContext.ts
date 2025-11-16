import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const useAppContext = () => {
  const values = useContext(AppContext);
  if (!values) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return values;
};
