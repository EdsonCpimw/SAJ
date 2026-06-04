import type { IProcess } from 'src/types/process.types';
import { onMounted, ref } from 'vue';
import { ProcessService } from 'src/services/process.service';
import type { IProcessFilters } from 'src/types/process/process.filters';

export function useProcess() {
  const rows = ref<IProcess[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalElements = ref(0);

  const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
    sortBy: 'numberProcess',
    descending: false,
  });

  async function findAllProcess(filters?: IProcessFilters) {
    loading.value = true;
    error.value = null;
    try {
      const response = await ProcessService.findAll({
        ...filters,
        page: pagination.value.page - 1,
        size: pagination.value.rowsPerPage,
        sortBy: pagination.value.sortBy,
        direction: pagination.value.descending ? 'desc' : 'asc',
      });
      rows.value = response.data;
      totalElements.value = response.totalElements;
      pagination.value.rowsNumber = response.totalElements;
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
    pagination,
    totalElements,
    findAllProcess,
  };
}
