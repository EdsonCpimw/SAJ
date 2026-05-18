import { api } from 'src/boot/axios';
import type { IUser, IUserCreate } from 'src/types/user.types';
import type { ICompanyCreate } from 'src/types/company.types';

export const UserService = {
  async register(payload: ICompanyCreate): Promise<ICompanyCreate> {
    const { data } = await api.post<ICompanyCreate>('/register', payload);
    debugger;
    return data;
  },

  async findAll(): Promise<IUser[]> {
    const { data } = await api.get<IUser[]>('/users');
    return data;
  },

  async saveUser(paylod: IUserCreate): Promise<IUserCreate> {
    const { data } = await api.post<IUserCreate>('/users', paylod);
    return data;
  },

  async findById(id: string): Promise<IUser> {
    const { data } = await api.get<IUser>(`/users/${id}`);
    return data;
  },

  async updateUserById(id: string, payload: IUser): Promise<IUser> {
    const { data } = await api.put<IUser>(`/users/${id}`, payload);
    return data;
  },
};
