import axios from 'axios';
import { ProcessMovimentService } from 'src/services/process-moviment.service';
import { ProcessMovementType } from 'src/types/enum/movements/processMovementType.enum';
import type { IProcessMovementCreate } from 'src/types/process-movment.types';
import { isNotFutureDate, isValidDate } from 'src/utils/date.utils';
import { reactive, ref, toRaw } from 'vue';

export function useProcessMovementForm() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const processMovement = ref<IProcessMovementCreate | null>(null);

  const formProcessMovement = reactive<IProcessMovementCreate>({
    processId: '',
    title: '',
    description: '',
    type: ProcessMovementType.CASE_CREATED,
    visibleToClient: false,
    createdAt: new Date().toISOString().split('T')[0] ?? '',
  });

  function resetFormProcess() {
    formProcessMovement.title = '';
    formProcessMovement.description = '';
    formProcessMovement.type = ProcessMovementType.CASE_CREATED;
    formProcessMovement.visibleToClient = false;
    formProcessMovement.createdAt = new Date().toISOString();
  }

  const rulesProcessMovement = {
    title: [
      (v: string) => !!v || 'Título é obrigatório',
      (v: string) => v.length >= 3 || 'Mínimo 3 caracteres',
    ],
    description: [(v: string) => !!v || 'Descrição é obrigatória'],
    createdAt: [
      (v: string) => !!v || 'Data é obrigatória',
      (v: string) => isValidDate(v) || 'Data inválida',
      (v: string) => isNotFutureDate(v) || 'Data não pode ser futura',
    ],
    type: [(v: string) => !!v || 'Tipo é obrigatório'],
  };

  async function createProcessMovement() {
    loading.value = true;
    error.value = null;
    try {
      const response = await ProcessMovimentService.createProcessMovement(
        toRaw(formProcessMovement),
      );
      processMovement.value = response;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || 'Erro desconhecido';
      } else {
        error.value = 'Erro inesperado';
      }
      throw erro;
    } finally {
      loading.value = false;
    }
  }

  return {
    formProcessMovement,
    rulesProcessMovement,
    createProcessMovement,
    resetFormProcess,
  };
}
