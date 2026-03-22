import { useEffect } from 'react';

type Params = {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
  enabled?: boolean;
};

export const useOnClickOutside = ({ ref, handler, enabled = true }: Params) => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      const targetElement = ref.current;

      if (!targetElement) return;

      if (event.composedPath().includes(targetElement)) return;

      handler();
    };

    document.addEventListener('mousedown', listener);

    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler, enabled]);
};
