import { useState, type FC, PropsWithChildren, ReactNode, useCallback } from 'react';

import { SidebarContext } from './useSidebarContext';

export const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarTitle, setSidebarTitle] = useState('');
  const [sidebarContent, setSidebarContent] = useState<ReactNode | null>(null);

  const handleCloseSidebar = () => setIsOpen(false);

  const openSidebar = useCallback((title: string, content: ReactNode) => {
    setSidebarTitle(title);
    setSidebarContent(content);
    setIsOpen(true);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isOpen, setIsOpen, handleCloseSidebar, sidebarTitle, sidebarContent, openSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
