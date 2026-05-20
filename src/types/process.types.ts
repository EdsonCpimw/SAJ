import type { UUID } from 'crypto';

export type ProcessStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'FINISHED' | 'CANCELLED';

export interface IProcess {
  id?: UUID;
  officeId?: UUID;
  clientId?: UUID;
  createdBy?: UUID;
  assignedTo?: UUID;

  title: string;
  processNumber: string;
  description: Text;
  status: ProcessStatus;
  createdAt?: string;
}
