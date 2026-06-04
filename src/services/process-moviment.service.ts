import { api } from 'src/boot/axios';
import type { IProcessMovement, IProcessMovementCreate } from 'src/types/process-movment.types';

export const ProcessMovimentService = {
  async findAllProcessMovimentById(id: string): Promise<IProcessMovement[]> {
    const { data } = await api.get<IProcessMovement[]>(`/process-movements/${id}`);
    return data;
  },

  async findAll(): Promise<IProcessMovement[]> {
    const { data } = await api.get<IProcessMovement[]>('/process-movements');
    return data;
  },

  async createProcessMovement(payload: IProcessMovementCreate): Promise<IProcessMovementCreate> {
    console.log('Enviando dados para api...', payload);
    const { data } = await api.post<IProcessMovementCreate>('/process/movement', payload);
    return data;
  },
};
