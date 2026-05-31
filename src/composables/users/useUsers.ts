import { ref } from 'vue';
import { UserService } from 'src/services/user.service';
import type { IUserWithCompany } from 'src/types/user/user.types';
import axios from 'axios';
import type { IUserFilters } from 'src/types/user/user.filters';

export function useUsers() {
  const rows = ref<IUserWithCompany[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalElements = ref(0);

  const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
    sortBy: 'name',
    descending: false,
  });

  async function findAllUsers(filters?: IUserFilters) {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserService.findAll({
        ...filters,
        page: pagination.value.page - 1,
        size: pagination.value.rowsPerPage,
        sortBy: pagination.value.sortBy,
        direction: pagination.value.descending ? 'desc' : 'asc',
      });
      rows.value = response.data;
      totalElements.value = response.totalElements;
      pagination.value.rowsNumber = response.totalElements;
    } catch (err) {
      error.value = 'Erro ao buscar usuários';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function toggleUser(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await UserService.inactiveUserById(id);
      await findAllUsers();
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    rows,
    loading,
    error,
    pagination,
    totalElements,
    findAllUsers,
    toggleUser,
  };
}
