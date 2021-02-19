const extractClasses = (
  classes: Record<string, string>,
  names: string
): string => {
  let className;
  let classNames = '';
  names.split(' ').forEach(name => {
    className = classes[name];
    classNames += className ? ` ${classes[name]}` : '';
  });

  return classNames;
};

export default extractClasses;
