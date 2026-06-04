import { ref } from 'vue';
import type { IProcessMovement } from 'src/types/process-movment.types';
import { ProcessMovimentService } from 'src/services/process-moviment.service';
import axios from 'axios';

export function useProcessMoviment() {
  const processMovements = ref<IProcessMovement[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const rowsProcessMovements = ref<IProcessMovement[]>([]);

  async function findProcessMovimentsById(id: string) {
    loading.value = true;
    try {
      processMovements.value = await ProcessMovimentService.findAllProcessMovimentById(id);
      return processMovements.value;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        error.value = erro.response?.data?.message || 'Erro ao buscar movimentações';
      } else {
        error.value = 'Erro inesperado';
      }
      throw erro;
    } finally {
      loading.value = false;
    }
  }

  async function findAllProcessMovement() {
    loading.value = true;
    error.value = null;
    try {
      rowsProcessMovements.value = await ProcessMovimentService.findAll();
      console.log(rowsProcessMovements.value);
    } catch (erro) {
      error.value = 'Erro ao buscar as movimentações de processo';
      console.error(erro);
    } finally {
      loading.value = false;
    }
  }

  return {
    processMovements,
    rowsProcessMovements,
    loading,
    error,
    findProcessMovimentsById,
    findAllProcessMovement,
  };
}
