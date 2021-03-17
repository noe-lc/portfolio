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
  const [first] = input;

  if (field && first[field]) {
    return [first[field]];
  } else {
    return first;
  }
};
