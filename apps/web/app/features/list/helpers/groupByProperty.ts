export function groupByProperty(items: any[], prop: string): any[][] {
  return items.reduce((acc: any[], item: any, index: number, arr: any[]) => {
    if (index === 0 || item[prop] !== arr[index - 1][prop]) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);
}
