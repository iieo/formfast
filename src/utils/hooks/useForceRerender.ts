import React from 'react';

export function useForceRerender() {
  const [, increment] = React.useReducer((i) => i + 1, 0);

  return () => increment();
}
