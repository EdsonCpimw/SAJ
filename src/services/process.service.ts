import { api } from 'src/boot/axios';
import type { IPageResponse } from 'src/types/pagination.types';
import type { IProcess, IProcessCreate } from 'src/types/process.types';
import type { IProcessFilters } from 'src/types/process/process.filters';
import { PAGINATION_DEFAULT_PAGE, PAGINATION_DEFAULT_SIZE } from 'src/types/pagination.types';

export const ProcessService = {
  async findAll(filters?: IProcessFilters): Promise<IPageResponse<IProcess>> {
    const { data } = await api.get<IPageResponse<IProcess>>('/process', {
      params: {
        search: filters?.search,
        status: filters?.status,
        priority: filters?.priority,
        legalArea: filters?.legalArea,
        page: filters?.page ?? PAGINATION_DEFAULT_PAGE,
        size: filters?.size ?? PAGINATION_DEFAULT_SIZE,
        sortBy: filters?.sortBy,
        direction: filters?.direction,
      },
    });
    return data;
  },

  async saveProcess(payload: IProcessCreate): Promise<IProcessCreate> {
    const { data } = await api.post<IProcessCreate>('/process', payload);
    return data;
  },

  async updateProcess(id: string, payload: IProcessCreate): Promise<IProcessCreate> {
    const { data } = await api.put<IProcessCreate>(`/process/${id}`, payload);
    return data;
  },

  async findProcessById(id: string): Promise<IProcess> {
    const { data } = await api.get<IProcess>(`/process/${id}`);
    return data;
  },
};
