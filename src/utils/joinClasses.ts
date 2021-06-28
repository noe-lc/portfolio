const joinClasses = (
  classes: Record<string, string>,
  classList: string,
  includeNonModule: boolean = false
): string => {
  let className;
  let classNames = '';
  classList.split(' ').forEach(name => {
    className = classes[name] || (includeNonModule && name);
    classNames += className ? ` ${className}` : '';
  });

  return classNames;
};

export default joinClasses;
