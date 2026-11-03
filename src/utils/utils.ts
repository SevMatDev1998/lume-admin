export const divideAndRoundUp = (num: number): number => {
  return Math.ceil(num / 10);
}

export const transformForSelect = (initialArray: any[], value: string, label: string) => {
  return initialArray?.map((item: any) => ({
    value: item[value],
    label: item[label]
  })) ?? [];
}

export function truncateText(text: string, size: number): string {
  return text.length > size ? text.slice(0, size) + "..." : text;
}

export function toLocaleDate(input?: string | Date, time?: boolean): string {
  if (!input) return 'N/A';

  const date = new Date(input);
  return time ? date.toLocaleString() : date.toLocaleDateString();
}
