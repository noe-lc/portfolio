import { useCallback } from 'react';
import joinClasses from '~/utils/joinClasses';

const useModuleClasses = (classes: Record<string, string>) => {
  const joinModuleClasses = useCallback(
    function (classList: string, includeNonModule?: boolean) {
      return joinClasses(classes, classList, includeNonModule);
    },
    [classes]
  );

  return joinModuleClasses;
};

export default useModuleClasses;
