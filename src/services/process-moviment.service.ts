import { api } from 'src/boot/axios';
import type { IProcessMovement } from 'src/types/process-movment.types';

export const ProcessMovimentService = {
  async findAllProcessMovimentById(id: string): Promise<IProcessMovement[]> {
    const { data } = await api.get<IProcessMovement[]>(`/process-movements`, {
      params: { processId: id },
    });
    debugger;
    return data;
  },
};
