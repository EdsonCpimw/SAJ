export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR');
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('pt-BR');
}

export function isValidDate(v: string): boolean {
  if (v.length !== 10) return false;
  const [day, month, year] = v.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  return !isNaN(date.getTime());
}

export function isNotFutureDate(v: string): boolean {
  const [day, month, year] = v.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  return date <= new Date();
}
