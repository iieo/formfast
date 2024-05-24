import * as React from 'react';

// Hook to check if the keyboard is open
export function useIsKeyboardOpen() {
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const initialViewportHeight = React.useRef(
    typeof window !== 'undefined' ? window.innerHeight : 0,
  );

  React.useEffect(() => {
    // Function to handle focus event
    const handleFocus = () => {
      setIsKeyboardOpen(true);
      // Calculate the difference in height to estimate keyboard height
      setKeyboardHeight(initialViewportHeight.current - window.innerHeight);
    };

    // Function to handle blur event
    const handleBlur = () => {
      setIsKeyboardOpen(false);
      // Reset keyboard height
      setKeyboardHeight(0);
    };
    // Adjust initial viewport height on resize when the keyboard is not open
    const handleResize = () => {
      if (!isKeyboardOpen) {
        initialViewportHeight.current = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Add event listeners for focus and blur on input elements
    window.addEventListener('focusin', handleFocus, true);
    window.addEventListener('focusout', handleBlur, true);
    window.addEventListener('blur', handleBlur, true);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('focusin', handleFocus, true);
      window.removeEventListener('focusout', handleBlur, true);
      window.removeEventListener('blur', handleBlur, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isKeyboardOpen]);

  const isTouchDevice =
    typeof window !== 'undefined'
      ? 'ontouchstart' in window || navigator.maxTouchPoints > 0
      : false;

  return { isKeyboardOpen: isKeyboardOpen && isTouchDevice, keyboardHeight };
}
