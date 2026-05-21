import { api } from 'src/boot/axios';
import type { IProcess, IProcessCreate } from 'src/types/process.types';

export const ProcessService = {
  async findAll(): Promise<IProcess[]> {
    const { data } = await api.get<IProcess[]>('/processos');
    return data;
  },

  async saveProcess(payload: IProcessCreate): Promise<IProcessCreate> {
    const { data } = await api.post<IProcessCreate>('/processos', payload);
    return data;
  },

  async updateProcess(id: string, payload: IProcessCreate): Promise<IProcessCreate> {
    const { data } = await api.put<IProcessCreate>(`/processos/${id}`, payload);
    return data;
  },

  async findProcessById(id: string): Promise<IProcess> {
    const { data } = await api.get<IProcess>(`/processos/${id}`);
    return data;
  },
};
