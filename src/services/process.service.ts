import { api } from 'src/boot/axios';
import type { IProcess } from 'src/types/process.types';

export const ProcessService = {
  async findAll(): Promise<IProcess[]> {
    const { data } = await api.get<IProcess[]>('/processos');
    return data;
  },
};
