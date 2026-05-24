import type { UUID } from 'crypto';
import type { ProcessStatus } from './enum/process-status.enum';
import type { ProcessPriority } from './enum/process-priority.enum';
import type { ProcessLegalArea } from './enum/process-legal-area.enum';

export interface IProcess {
  id?: UUID;
  officeId?: UUID;
  clientId?: UUID;
  createdBy?: UUID;
  assignedTo?: UUID;

  title: string;
  processNumber: string;
  document: string;
  description: string;
  status: ProcessStatus;
  createdAt?: string;

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
  document: string;
  legalArea: ProcessLegalArea;
  courtDivision: string;
  court: string;
  priority: ProcessPriority;
}
