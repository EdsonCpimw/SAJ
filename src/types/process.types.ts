import type { UUID } from 'crypto';
import type { ProcessStatus } from './enum/process/process-status.enum';
import type { ProcessPriority } from './enum/process/process-priority.enum';
import type { ProcessLegalArea } from './enum/process/process-legal-area.enum';

export interface IProcess {
  id?: UUID;
  officeId?: UUID;
  clientId?: UUID;
  createdBy?: UUID;
  assignedTo?: UUID;

  title: string;
  processNumber: string;
  description: string;
  status: ProcessStatus;
  createdAt?: string;
  hasMovements: boolean;

  legalArea: ProcessLegalArea;
  courtDivision: string;
  court: string;
  priority: ProcessPriority;
}

export interface IProcessCreate {
  title: string;
  processNumber: string;
  description: string;
  status: ProcessStatus;
  legalArea: ProcessLegalArea;
  courtDivision: string;
  court: string;
  priority: ProcessPriority;
}

export interface IProcessSummary {
  processId: string;
  processNumber: string;
  status: string;
}

export interface IProcessStatus {
  status: ProcessStatus;
}
