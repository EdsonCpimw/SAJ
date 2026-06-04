import type { ProcessLegalArea } from '../enum/process/process-legal-area.enum';
import type { ProcessPriority } from '../enum/process/process-priority.enum';
import type { ProcessStatus } from '../enum/process/process-status.enum';

export interface IProcessFilters {
  search?: string | undefined;
  status?: ProcessStatus | undefined;
  priority?: ProcessPriority | undefined;
  legalArea?: ProcessLegalArea | undefined;
  page?: number | undefined;
  size?: number | undefined;
  sortBy?: string | undefined;
  direction?: 'asc' | 'desc' | undefined;
}
