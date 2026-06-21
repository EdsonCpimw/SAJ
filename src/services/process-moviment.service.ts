import { api } from 'src/boot/axios';
import type { IProcessMovement, IProcessMovementCreate } from 'src/types/process-movment.types';

export const ProcessMovimentService = {
  async findAllProcessMovimentById(id: string): Promise<IProcessMovement[]> {
    const { data } = await api.get<IProcessMovement[]>(`/process-movements/process/${id}`);
    return data;
  },

  async findAll(): Promise<IProcessMovement[]> {
    const { data } = await api.get<IProcessMovement[]>('/process-movements');
    return data;
  },

  async createProcessMovement(payload: IProcessMovementCreate): Promise<IProcessMovementCreate> {
    const { data } = await api.post<IProcessMovementCreate>('/process-movements', payload);
    return data;
  },

  async findProcessMovementById(id: string): Promise<IProcessMovementCreate> {
    const { data } = await api.get<IProcessMovementCreate>(`/process-movements/${id}`);
    return data;
  },

  async updateProcessMovement(
    id: string,
    payload: IProcessMovementCreate,
  ): Promise<IProcessMovementCreate> {
    const { data } = await api.put<IProcessMovementCreate>(`/process-movements/${id}`, payload);
    return data;
  },
};
