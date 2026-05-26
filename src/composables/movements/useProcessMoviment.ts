import { ref } from 'vue';
import type { IProcessMovement } from 'src/types/process-movment.types';
import { ProcessMovimentService } from 'src/services/process-moviment.service';

export function useProcessMoviment() {
  const processMovements = ref<IProcessMovement[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);

  async function findProcessMovimentsById(id: string) {
    loading.value = true;

    try {
      debugger;
      processMovements.value = await ProcessMovimentService.findAllProcessMovimentById(id);
      return processMovements.value;
    } catch (erro) {
      error.value = 'Erro ao buscar as movimentações do processo';
      console.error(erro);
    } finally {
      loading.value = false;
    }
  }

  return {
    processMovements,
    loading,
    error,
    findProcessMovimentsById,
  };
}
