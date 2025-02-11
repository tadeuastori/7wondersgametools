export class SortUtils {
  static sortAlphabetically(array: string[]): string[] {
    return array.sort((a, b) => a.localeCompare(b));
  }

  static sortByProperty<T>(array: T[], propertyName: keyof T): T[] {
    return array.sort((a, b) => {
      const propA = a[propertyName];
      const propB = b[propertyName];

      if (typeof propA === 'string' && typeof propB === 'string') {
        return propA.localeCompare(propB);
      }

      if (typeof propA === 'number' && typeof propB === 'number') {
        return propA - propB;
      }

      if (typeof propA === 'boolean' && typeof propB === 'boolean') {
        return propA === propB ? 0 : propA ? -1 : 1;
      }

      return 0;
    });
  }
}
