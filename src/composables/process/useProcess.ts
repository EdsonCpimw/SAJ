import type { IProcess } from 'src/types/process.types';
import { onMounted, ref } from 'vue';
import { ProcessService } from 'src/services/process.service';

export function useProcess() {
  const rows = ref<IProcess[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function findAllProcess() {
    loading.value = true;
    error.value = null;
    try {
      rows.value = await ProcessService.findAll();
    } catch (erro) {
      error.value = 'Erro ao buscar os processos';
      console.error(erro);
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await findAllProcess();
  });

  return {
    rows,
    loading,
    error,
    findAllProcess,
  };
}
