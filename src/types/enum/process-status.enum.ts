export enum ProcessStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING = 'WAITING',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export const ProcessStatusOptions = [
  { label: 'Aberto', value: ProcessStatus.OPEN },
  { label: 'Em andamento', value: ProcessStatus.IN_PROGRESS },
  { label: 'Aguardando', value: ProcessStatus.WAITING },
  { label: 'Finalizado', value: ProcessStatus.FINISHED },
  { label: 'Cancelado', value: ProcessStatus.CANCELLED },
];

export const ProcessStatusColor: Record<ProcessStatus, string> = {
  [ProcessStatus.OPEN]: 'primary',
  [ProcessStatus.IN_PROGRESS]: 'warning',
  [ProcessStatus.WAITING]: 'purple',
  [ProcessStatus.FINISHED]: 'positive',
  [ProcessStatus.CANCELLED]: 'negative',
};

export function getProcessStatusColor(status: string): string {
  return ProcessStatusColor[status as ProcessStatus] ?? 'grey';
}

export const ProcessStatusLabel: Record<ProcessStatus, string> = {
  [ProcessStatus.OPEN]: 'Aberto',
  [ProcessStatus.IN_PROGRESS]: 'Em andamento',
  [ProcessStatus.WAITING]: 'Aguardando',
  [ProcessStatus.FINISHED]: 'Finalizado',
  [ProcessStatus.CANCELLED]: 'Cancelado',
};

export function getProcessStatusLabel(status: string): string {
  return ProcessStatusLabel[status as ProcessStatus] ?? 'Status desconhecido';
}
