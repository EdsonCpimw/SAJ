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

export function toISOString(date: string): string {
  if (!date) return '';
  const [datePart, timePart] = date.split(' ');
  if (!datePart || !timePart) return '';
  const [day, month, year] = datePart.split('/');
  const [hour, minute] = timePart.split(':');
  return `${year}-${month}-${day}T${hour}:${minute}:00`;
}

export function fromISO(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}`;
}
