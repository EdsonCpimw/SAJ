import { ref, onMounted } from 'vue';
import { UserService } from 'src/services/user.service';
import type { IUser } from 'src/types/user.types';
import { useRouter } from 'vue-router';
import axios from 'axios';

export function useUsers() {
  const rows = ref<IUser[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const router = useRouter();

  async function findAllUsers() {
    loading.value = true;
    error.value = null;
    try {
      rows.value = await UserService.findAll();
    } catch (err) {
      error.value = 'Erro ao buscar usuários';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await findAllUsers();
  });

  async function inactiveUser(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await UserService.inactiveUserById(id);
      await router.push({ name: 'user-list' });
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }

  return {
    rows,
    loading,
    error,
    findAllUsers,
    inactiveUser,
  };
}
