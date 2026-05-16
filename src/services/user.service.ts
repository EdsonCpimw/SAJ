import { api } from 'src/boot/axios';
import type { IUser } from 'src/types/user.types';
import type { ICompanyCreate } from 'src/types/company.types';

export const UserService = {
  async register(payload: ICompanyCreate): Promise<ICompanyCreate> {
    // const { data } = await api.post<IUserResponse>('/register', payload);
    const { data } = await api.post<ICompanyCreate>('/CompanyUser', payload);
    debugger;
    return data;
  },

  async findAll(): Promise<IUser[]> {
    const { data } = await api.get<IUser[]>('/users');
    return data;
  },
};
