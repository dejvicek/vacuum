import { useState, type FC, PropsWithChildren } from 'react';
import { SidebarContext } from './useSidebarContext';

export const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>;
};
