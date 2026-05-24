export function isValidCPF(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11;
}

export function isValidCNPJ(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 14;
}

export function isValidDocument(value: string): boolean {
  return isValidCPF(value) || isValidCNPJ(value);
}

export function getDocumentType(value: string): 'CPF' | 'CNPJ' | null {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11) return 'CPF';
  if (digits.length === 14) return 'CNPJ';
  return null;
}

export function formatDocument(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);

  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}
