import { useCallback } from 'react';
import joinClasses from '~/utils/joinClasses';

const useModuleClasses = (classes: Record<string, string>) => {
  const joinModuleClasses = useCallback(
    function (classList: string) {
      return joinClasses(classes, classList);
    },
    [classes]
  );

  return joinModuleClasses;
};

export default useModuleClasses;
