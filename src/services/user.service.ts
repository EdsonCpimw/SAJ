import { api } from 'src/boot/axios';
import type { IUser, IUserWithCompany, IUserCreate } from 'src/types/user/user.types';
import type { ICompanyCreate } from 'src/types/company.types';
import type { IUserFilters } from 'src/types/user/user.filters';
import type { IPageResponse } from 'src/types/pagination.types';
import { PAGINATION_DEFAULT_PAGE, PAGINATION_DEFAULT_SIZE } from 'src/types/pagination.types';

export const UserService = {
  async register(payload: ICompanyCreate): Promise<ICompanyCreate> {
    const { data } = await api.post<ICompanyCreate>('/auth/register', payload);
    return data;
  },

  async findAll(filters?: IUserFilters): Promise<IPageResponse<IUserWithCompany>> {
    const { data } = await api.get<IPageResponse<IUserWithCompany>>('/users', {
      params: {
        search: filters?.search,
        active: filters?.active,
        page: filters?.page ?? PAGINATION_DEFAULT_PAGE,
        size: filters?.size ?? PAGINATION_DEFAULT_SIZE,
        sortBy: filters?.sortBy,
        direction: filters?.direction,
      },
    });
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

  async inactiveUserById(id: string): Promise<IUser> {
    const { data } = await api.patch<IUser>(`/users/${id}/status`);
    return data;
  },
};
