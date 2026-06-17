import { ProcessService } from 'src/services/process.service';
import { ProcessStatus } from 'src/types/enum/process/process-status.enum';
import type { IProcess, IProcessCreate, IProcessStatus } from 'src/types/process.types';
import { reactive, ref } from 'vue';
import axios from 'axios';
import { ProcessPriority } from 'src/types/enum/process/process-priority.enum';
import { ProcessLegalArea } from 'src/types/enum/process/process-legal-area.enum';

export function useProcessForm() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const processStatus = ref<IProcessStatus | null>(null);
  const processCreate = ref<IProcessCreate | null>(null);

  const formProcess = reactive<IProcessCreate>({
    title: '',
    numberProcess: '',
    description: '',
    legalArea: ProcessLegalArea.ADMINISTRATIVE,
    courtDivision: '',
    court: '',
    status: ProcessStatus.OPEN,
    priority: ProcessPriority.MEDIUM,
    clientId: '',
  });

  const formStatusProcess = reactive<IProcessStatus>({
    status: ProcessStatus.CANCELLED,
  });

  function resetFormProcess() {
    formProcess.numberProcess = '';
    formProcess.title = '';
    formProcess.description = '';
    formProcess.status = ProcessStatus.OPEN;
    formProcess.legalArea = ProcessLegalArea.ADMINISTRATIVE;
    formProcess.courtDivision = '';
    formProcess.court = '';
    formProcess.priority = ProcessPriority.MEDIUM;
    formProcess.clientId = '';
  }

  const rulesProcess = {
    title: [(v: string) => !!v || 'Título é obrigatório'],
    processNumber: [(v: string) => !!v || 'Número do processo é obrigatório'],
    description: [(v: string) => !!v || 'Descrição é obrigatória'],
    status: [(v: string) => !!v || 'Status é obrigatório'],
    legalArea: [(v: string) => !!v || 'Área trabalhista é obrigatório'],
    courtDivision: [(v: string) => !!v || 'Vara é obrigatório'],
    court: [(v: string) => !!v || 'Tribunal é obrigatório'],
  };

  async function createProcess() {
    loading.value = true;
    error.value = null;
    try {
      const response = await ProcessService.saveProcess(formProcess);
      processCreate.value = response;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
      throw erro;
    } finally {
      loading.value = false;
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
    formProcess.numberProcess = process.numberProcess;
    formProcess.description = process.description;
    formProcess.status = process.status;
    formProcess.legalArea = process.legalArea;
    formProcess.court = process.court;
    formProcess.courtDivision = process.courtDivision;
    formProcess.priority = process.priority;
  }

  async function updateProcess(id: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await ProcessService.updateProcess(id, formProcess);
      processCreate.value = response;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }

  async function updateStatusProcess(id: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await ProcessService.updateProcessStatus(id, formStatusProcess);
      processStatus.value = response;
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
    formProcess,
    rulesProcess,
    formStatusProcess,
    createProcess,
    resetFormProcess,
    updateProcess,
    findProcessById,
    updateStatusProcess,
  };
}
