import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

import { Button } from './button';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useSidebarContext } from '@/contexts/useSidebarContext';

export const Sidebar: FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isOpen, handleCloseSidebar, sidebarTitle, sidebarContent } = useSidebarContext();

  useOnClickOutside({ ref: sidebarRef, handler: handleCloseSidebar, enabled: isOpen });

  const sidebar = (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-[max(0px,calc((100vw-80rem)/2))] h-screen w-80 max-w-[calc(100vw-2rem)] bg-muted/95 backdrop-blur-sm border-l shadow-lg z-50 transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{sidebarTitle}</h2>

          <Button variant="ghost" size="icon" onClick={handleCloseSidebar} className="h-8 w-8 cursor-pointer">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{sidebarContent}</div>
      </div>
    </div>
  );

  return createPortal(sidebar, document.body);
};
