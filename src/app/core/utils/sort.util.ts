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

  static sortByProperties<T>(
  array: T[],
  propertyOrders: (keyof T | `${string}:${'asc' | 'desc'}`)[]
): T[] {
  return array.sort((a, b) => {
    for (const propertyOrder of propertyOrders) {
      // Extrai nome da propriedade e direção (asc ou desc)
      let [propertyName, order] = (propertyOrder as string).split(':') as [
        keyof T,
        'asc' | 'desc' | undefined
      ];
      order = order ?? 'asc'; // padrão: ascendente

      const propA = a[propertyName];
      const propB = b[propertyName];

      if (propA === propB) continue; // se iguais, vai pra próxima coluna

      let result = 0;

      if (typeof propA === 'string' && typeof propB === 'string') {
        result = propA.localeCompare(propB);
      } else if (typeof propA === 'number' && typeof propB === 'number') {
        result = propA - propB;
      } else if (typeof propA === 'boolean' && typeof propB === 'boolean') {
        result = propA === propB ? 0 : propA ? -1 : 1;
      } else {
        // fallback genérico (null, undefined ou outros tipos)
        if (propA == null && propB != null) result = 1;
        else if (propA != null && propB == null) result = -1;
        else if (propA! < propB!) result = -1;
        else if (propA! > propB!) result = 1;
      }

      if (result !== 0) {
        return order === 'desc' ? -result : result;
      }
    }

    return 0;
  });
}


}
