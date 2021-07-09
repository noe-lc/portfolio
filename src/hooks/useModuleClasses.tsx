import React, { useCallback } from 'react';
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

export const withModuleClasses = <P,>(
  InputComponent: React.ComponentType<P>,
  classes
): React.FC<Omit<P, 'joinClasses'>> => {
  const ComponentWithClasses: React.FC<P> = props => {
    const joinClasses = useModuleClasses(classes);

    return <InputComponent {...props} joinClasses={joinClasses} />;
  };

  return ComponentWithClasses;
};

export default useModuleClasses;
