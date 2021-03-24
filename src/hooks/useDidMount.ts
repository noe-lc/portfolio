import { useEffect, useRef } from 'react';

const useDidMount = (): boolean => {
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;
  }, []);

  return didMount.current;
};

export default useDidMount;
