import type { UUID } from 'crypto';
import type { ProcessStatus } from './enum/process/process-status.enum';

/*
 * TODO: O status tem que ser o do processo, movimentação não possui status
 */
export interface IProcessMovement {
  id?: UUID;
  processId: string;
  userId?: UUID;
  type?: string;
  title: string;
  description: string;
  important: boolean;
  dateEvent: string;
  createdAt: string;
  processNumber: string;
  status: string;
}

export interface IProcessMovementCreate {
  processId: string;
  title: string;
  description: string;
  type: string;
  dateEvent: string;
  status: ProcessStatus.OPEN;
  isImportant: boolean;
}

export interface IProcessMovementFormResponse {
  id?: string;
  title: string;
  description: string;
  type: string;
  dateEvent: string;
  status: ProcessStatus.OPEN;
  isImportant: boolean;
}

export interface IProcessMovementUpdate {
  processId: string;
  title: string;
  description: string;
  type: string;
  dateEvent: string;
}
