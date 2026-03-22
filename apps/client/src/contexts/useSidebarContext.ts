import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react';

export type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleCloseSidebar: () => void;
  sidebarTitle: string;
  sidebarContent: ReactNode | null;
  openSidebar: (title: string, content: ReactNode) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) throw new Error('useSidebar must be used within SidebarProvider');

  return context;
};
