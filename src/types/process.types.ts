import type { UUID } from 'crypto';
import type { ProcessStatus } from './enum/process-status.enum';

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
}

export interface IProcessCreate {
  title: string;
  processNumber: string;
  description: string;
  status: ProcessStatus;
}
