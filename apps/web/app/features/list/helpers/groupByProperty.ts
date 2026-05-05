export function groupByProperty<T>(items: T[], prop: keyof T): T[][] {
  return items.reduce((acc: T[][], item: T, index: number, arr: T[]) => {
    const prev = arr[index - 1];
    const lastGroup = acc[acc.length - 1];
    if (index === 0 || prev == null || item[prop] !== prev[prop]) {
      acc.push([item]);
    } else if (lastGroup) {
      lastGroup.push(item);
    }
    return acc;
  }, []);
}
