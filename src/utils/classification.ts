export type ValuesOf<T extends unknown[]> = T[number];

interface GetUniqueValues {
  <T>(input: T[]): T[];
  <T, U extends keyof ValuesOf<T[]>>(input: T[], field?: U): T[U][];
}

export const getUniqueValues: GetUniqueValues = <
  T,
  U extends keyof ValuesOf<T[]>
>(
  input: T[],
  field?: U
): T[] | T[U][] => {
  let element;
  const keys = {};
  const set = [];
  const [first] = input;

  if (field && first[field]) {
    for (const item of input) {
      element = item[field];

      if (typeof element !== 'string' && typeof element !== 'number') {
        throw 'Cannot create sets of non-string, non-number values';
      }

      if (!keys[element]) {
        keys[element as string] = 1;
        set.push(element);
      }
    }

    return set;
  }

  return [...new Set(input)];
};
