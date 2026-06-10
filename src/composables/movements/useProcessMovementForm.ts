import axios from 'axios';
import { ProcessMovimentService } from 'src/services/process-moviment.service';
import { ProcessMovementType } from 'src/types/enum/movements/processMovementType.enum';
import { ProcessStatus } from 'src/types/enum/process/process-status.enum';
import type { IProcessMovementCreate } from 'src/types/process-movment.types';
import { fromISO, toISOString } from 'src/utils/date.utils';
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
    dateEvent: '',
    status: ProcessStatus.OPEN,
    isImportant: false,
  });

  function resetFormProcess() {
    formProcessMovement.title = '';
    formProcessMovement.description = '';
    formProcessMovement.type = ProcessMovementType.CASE_CREATED;
    formProcessMovement.dateEvent = new Date().toISOString();
    formProcessMovement.status = ProcessStatus.OPEN;
    formProcessMovement.isImportant = false;
  }

  const rulesProcessMovement = {
    title: [
      (v: string) => !!v || 'Título é obrigatório',
      (v: string) => v.length >= 3 || 'Mínimo 3 caracteres',
    ],
    description: [(v: string) => !!v || 'Descrição é obrigatória'],
    type: [(v: string) => !!v || 'Tipo é obrigatório'],
    status: [(v: string) => !!v || 'status é obrigatório'],
  };

  async function createProcessMovement() {
    loading.value = true;
    error.value = null;
    try {
      const payload = {
        ...toRaw(formProcessMovement),
        dateEvent: toISOString(formProcessMovement.dateEvent),
      };
      const response = await ProcessMovimentService.createProcessMovement(payload);
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

  function fillFormProcessMovement(processMovement: IProcessMovementCreate) {
    formProcessMovement.title = processMovement.title;
    formProcessMovement.description = processMovement.description;
    formProcessMovement.status = processMovement.status;
    formProcessMovement.type = processMovement.type;
    formProcessMovement.dateEvent = processMovement.dateEvent;
    formProcessMovement.isImportant = processMovement.isImportant;
  }

  async function findProcessMovementById(id: string) {
    loading.value = true;
    error.value = null;
    try {
      const processMovement = await ProcessMovimentService.findProcessMovementById(id);
      processMovement.dateEvent = fromISO(processMovement.dateEvent);
      console.log(processMovement);
      return fillFormProcessMovement(processMovement);
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

  async function updateProcessMovement(id: string) {
    loading.value = true;
    error.value = null;
    try {
      debugger;
      const payload = {
        ...toRaw(formProcessMovement),
        dateEvent: toISOString(formProcessMovement.dateEvent),
      };
      debugger;
      const response = await ProcessMovimentService.updateProcessMovement(id, payload);
      processMovement.value = response;
    } catch (erro) {
      console.log(erro);
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
    fillFormProcessMovement,
    findProcessMovementById,
    updateProcessMovement,
  };
}
