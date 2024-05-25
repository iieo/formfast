'use client';

import * as React from 'react';

export const ReadonlyContext = React.createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({ isOpen: true, toggle: () => {} });

export function useSidebarVisibility() {
  return React.useContext(ReadonlyContext);
}

export function SidebarVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, toggle] = React.useReducer((open) => !open, true);
  React.useEffect(() => {
    if (window.innerWidth > 720) {
      toggle();
    }
  }, [toggle]);

  return (
    <ReadonlyContext.Provider value={{ isOpen: isOpen, toggle: toggle }}>
      {children}
    </ReadonlyContext.Provider>
  );
}
