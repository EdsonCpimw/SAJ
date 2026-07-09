import { api } from 'src/boot/axios';
import type { IAuth } from 'src/types/auth/auth.types';
import type { ICompanyCreate } from 'src/types/company.types';

export const AuthService = {
  async register(payload: ICompanyCreate): Promise<ICompanyCreate> {
    const { data } = await api.post<ICompanyCreate>('/auth/register', payload);
    return data;
  },

  async forgotPassword(email: string) {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  async resetPassword(payload: IAuth) {
    const { data } = await api.post('/auth/reset-password', payload);
    return data;
  },
};
