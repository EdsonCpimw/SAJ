import { ref, onMounted } from 'vue';
import { UserService } from 'src/services/user.service';
import type { IUser } from 'src/types/user.types';

export function useUsers() {
  const rows = ref<IUser[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

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

  return {
    rows,
    loading,
    error,
    findAllUsers,
  };
}
