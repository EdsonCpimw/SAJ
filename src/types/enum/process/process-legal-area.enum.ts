export enum ProcessLegalArea {
  CIVIL = 'CIVIL',
  LABOR = 'LABOR',
  CRIMINAL = 'CRIMINAL',
  BUSINESS = 'BUSINESS',
  TAX = 'TAX',
  SOCIAL_SECURITY = 'SOCIAL_SECURITY',
  FAMILY = 'FAMILY',
  CONSUMER = 'CONSUMER',
  ADMINISTRATIVE = 'ADMINISTRATIVE',
}

export const ProcessLegalAreaOptions = [
  { label: 'Civil', value: ProcessLegalArea.CIVIL },
  { label: 'Trabalhista', value: ProcessLegalArea.LABOR },
  { label: 'Penal', value: ProcessLegalArea.CRIMINAL },
  { label: 'Empresarial', value: ProcessLegalArea.BUSINESS },
  { label: 'Tributario', value: ProcessLegalArea.TAX },
  { label: 'Previdenciario', value: ProcessLegalArea.SOCIAL_SECURITY },
  { label: 'Familia', value: ProcessLegalArea.FAMILY },
  { label: 'Consumidor', value: ProcessLegalArea.CONSUMER },
  { label: 'Administrativo', value: ProcessLegalArea.ADMINISTRATIVE },
];

export const ProcessLegalAreaLabel: Record<ProcessLegalArea, string> = {
  [ProcessLegalArea.CIVIL]: 'Civil',
  [ProcessLegalArea.LABOR]: 'Trabalhista',
  [ProcessLegalArea.CRIMINAL]: 'Penal',
  [ProcessLegalArea.BUSINESS]: 'Empresarial',
  [ProcessLegalArea.TAX]: 'Tributario',
  [ProcessLegalArea.SOCIAL_SECURITY]: 'Previdenciario',
  [ProcessLegalArea.FAMILY]: 'Familia',
  [ProcessLegalArea.CONSUMER]: 'Consumidor',
  [ProcessLegalArea.ADMINISTRATIVE]: 'Administrativo',
};

export function getProcessLegalAreaLabel(legalArea: string): string {
  return ProcessLegalAreaLabel[legalArea as ProcessLegalArea] ?? 'Área jurídica desconhecida';
}
