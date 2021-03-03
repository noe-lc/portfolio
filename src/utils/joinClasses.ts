const joinClasses = (
  classes: Record<string, string>,
  classList: string
): string => {
  let className;
  let classNames = '';
  classList.split(' ').forEach(name => {
    className = classes[name];
    classNames += className ? ` ${classes[name]}` : '';
  });

  return classNames;
};

export default joinClasses;
