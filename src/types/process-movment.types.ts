import type { UUID } from 'crypto';

/*
 * TODO: O status tem que ser o do processo, movimentação não possui status
 */
export interface IProcessMovement {
  id?: UUID;
  processId?: UUID;
  userId?: UUID;
  type?: string;
  title: string;
  description: string;
  status: string;
  visibleToClient: boolean;
  important: boolean;
  eventDate: string;
  createdAt: string;
}
