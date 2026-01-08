import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) throw new Error('useSidebar must be used within SidebarProvider');

  return context;
};
