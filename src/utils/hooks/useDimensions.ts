import React from 'react';

type Dimensions = {
  height: number;
  width: number;
};

export function useDimensions<T extends HTMLElement>(): [Dimensions, React.RefObject<T>] {
  const ref = React.useRef<T>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const observeTarget = ref.current;
    if (observeTarget) {
      const updateDimensions = () => {
        setDimensions({
          width: observeTarget.getBoundingClientRect().width,
          height: observeTarget.getBoundingClientRect().height,
        });
      };

      // Update dimensions initially in case the element's size is already set
      updateDimensions();

      // Create a ResizeObserver to listen for changes in size
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(observeTarget);

      // Cleanup observer on component unmount
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [ref]);

  return [dimensions, ref as React.RefObject<T>];
}
