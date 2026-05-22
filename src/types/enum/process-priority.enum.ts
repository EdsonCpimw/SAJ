export enum ProcessPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export const ProcessPriorityOptions = [
  { label: 'Baixo', value: ProcessPriority.LOW },
  { label: 'Medio', value: ProcessPriority.MEDIUM },
  { label: 'Alta', value: ProcessPriority.HIGH },
  { label: 'Urgente', value: ProcessPriority.URGENT },
];

export const ProcessPriorityColor: Record<ProcessPriority, string> = {
  [ProcessPriority.LOW]: 'primary',
  [ProcessPriority.MEDIUM]: 'purple',
  [ProcessPriority.HIGH]: 'warning',
  [ProcessPriority.URGENT]: 'negative',
};

export function getProcessPriorityColor(priority: string): string {
  return ProcessPriorityColor[priority as ProcessPriority] ?? 'grey';
}

export const ProcessPriorityLabel: Record<ProcessPriority, string> = {
  [ProcessPriority.LOW]: 'Baixo',
  [ProcessPriority.MEDIUM]: 'Medio',
  [ProcessPriority.HIGH]: 'Alta',
  [ProcessPriority.URGENT]: 'Urgente',
};

export function getProcessPriorityLabel(priority: string): string {
  return ProcessPriorityLabel[priority as ProcessPriority] ?? 'Prioridade desconhecida';
}
