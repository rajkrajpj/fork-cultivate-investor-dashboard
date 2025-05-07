import { createContext } from 'react';

interface OpenContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpenContext = createContext<OpenContextType>(undefined);
