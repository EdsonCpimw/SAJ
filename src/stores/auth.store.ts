import { defineStore } from 'pinia';
import axios from 'axios';
import { UserService } from 'src/services/user.service';
import type { ICompanyCreate } from 'src/types/company.types';
import type { IUser } from 'src/types/user/user.types';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function register(payload: ICompanyCreate) {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserService.register(payload);
      user.value = response.user;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }
  return { user, loading, error, register };
});
