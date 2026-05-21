import { ProcessService } from 'src/services/process.service';
import { ProcessStatus } from 'src/types/enum/process-status.enum';
import type { IProcess } from 'src/types/process.types';
import { reactive, ref } from 'vue';
import axios from 'axios';

export function useProcessForm() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const process = ref<IProcess | null>(null);

  const formProcess = reactive<IProcess>({
    title: '',
    processNumber: '',
    description: '',
    status: ProcessStatus.OPEN,
  });

  function resetFormProcess() {
    formProcess.processNumber = '';
    formProcess.title = '';
    formProcess.description = '';
    formProcess.status = ProcessStatus.OPEN;
  }

  const rulesProcess = {
    title: [(v: string) => !!v || 'Título é obrigatório'],
    processNumber: [(v: string) => !!v || 'Número do processo é obrigatório'],
    description: [(v: string) => !!v || 'Descrição é obrigatória'],
    status: [(v: string) => !!v || 'Status é obrigatório'],
  };

  function restFormProcess() {
    formProcess.title = '';
    formProcess.processNumber = '';
    formProcess.description = '';
    formProcess.status = ProcessStatus.OPEN;
  }

  async function createProcess() {
    loading.value = true;
    error.value = null;
    try {
      const response = await ProcessService.saveProcess(formProcess);
      process.value = response;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }

  async function findProcessById(id: string) {
    try {
      const response = await ProcessService.findProcessById(id);
      fillFormProcess(response);
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }

  function fillFormProcess(process: IProcess) {
    formProcess.title = process.title;
    formProcess.processNumber = process.processNumber;
    formProcess.description = process.description;
    formProcess.status = process.status;
  }

  async function updateProcess(id: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await ProcessService.updateProcess(id, formProcess);
      process.value = response;
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
    formProcess,
    rulesProcess,
    restFormProcess,
    createProcess,
    resetFormProcess,
    updateProcess,
    findProcessById,
  };
}
