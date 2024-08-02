export function formatDate(date: Date, format: string): string {
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: string = String(date.getFullYear());

  return format.replace('dd', day).replace('MM', month).replace('yyyy', year);
}

