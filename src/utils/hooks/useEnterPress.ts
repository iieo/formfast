import React from 'react';

export function useKeyboardPress(callback: () => void, keys = ['Enter']) {
  React.useEffect(() => {
    function handleKeypress(e: KeyboardEvent) {
      if (keys.includes(e.key)) {
        callback();
      }
    }

    function handleKeypressEscape(e: KeyboardEvent) {
      if (!keys.includes('Escape')) return;
      if (e.key === 'Escape' && keys.includes('Escape')) {
        callback();
      }
    }
    document.addEventListener('keypress', handleKeypress);
    // this is only here to register the 'escape' key
    document.addEventListener('keydown', handleKeypressEscape);

    return () => {
      document.removeEventListener('keypress', handleKeypress);
      document.removeEventListener('keydown', handleKeypressEscape);
    };
  });
}
