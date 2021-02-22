import { useState } from 'react';

type A = <T extends Record<string, unknown>>(
  initialState: T
) => [T, <K extends keyof T>(key: keyof T | T, value?: T[K]) => void];

const useStateObject: A = initialState => {
  const [state, setState] = useState(initialState);

  function updateState(key, value) {
    if (typeof key === 'string') {
      setState(previous => ({ ...previous, [key]: value }));
    } else {
      setState(key);
    }
  }

  return [state, updateState];
};

export default useStateObject;
