import type { UUID } from 'crypto';
import type { IProcessSummary } from './process.types';

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
  visibleToClient: boolean;
  important: boolean;
  eventDate: string;
  createdAt: string;
  process: IProcessSummary;
}

export interface IProcessMovementCreate {
  processId: string;
  title: string;
  description: string;
  type: string;
  visibleToClient: boolean;
  createdAt: string;
}
