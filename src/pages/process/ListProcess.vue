<template>
  <div class="q-pa-md">
    <div class="row q-mt-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Pequisar</div>
            <div class="text-caption text-grey-5">
              Preencha o campo para filtrar os dados da tabela
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <SearchInput
                  v-model="search"
                  placeholder="Buscar por Numero do Processo, Título, Vara"
                  :debounce="400"
                />
              </div>
              <!-- FILTRO POR STATUS -->
              <div class="col-12 col-md-4">
                <q-select
                  v-model="filterStatus"
                  outlined
                  dense
                  clearable
                  label="Status"
                  :options="ProcessStatusOptions"
                  emit-value
                  map-options
                >
                  <template #prepend>
                    <q-icon name="filter_list" />
                  </template>
                  <!-- OPÇÕES -->
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-badge
                          rounded
                          :color="getProcessStatusColor(scope.opt.value)"
                          style="width: 12px; height: 12px"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <!-- FILTRO POR PRIORIDADE -->
              <div class="col-12 col-md-4">
                <q-select
                  v-model="filterPriority"
                  outlined
                  dense
                  clearable
                  label="Prioridade"
                  :options="ProcessPriorityOptions"
                  emit-value
                  map-options
                >
                  <template #prepend>
                    <q-icon name="filter_list" />
                  </template>
                  <!-- OPÇÕES -->
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-badge
                          rounded
                          :color="getProcessPriorityColor(scope.opt.value)"
                          style="width: 12px; height: 12px"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <!-- FILTRO POR AREA JURÍDICA -->
              <div class="col-12 col-md-4">
                <q-select
                  v-model="filterLegalArea"
                  outlined
                  dense
                  clearable
                  label="Área jurídica"
                  :options="ProcessLegalAreaOptions"
                  emit-value
                  map-options
                >
                  <template #prepend>
                    <q-icon name="filter_list" />
                  </template>
                  <!-- OPÇÕES -->
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps">
                      <!-- <q-item-section avatar>
                        <q-badge rounded style="width: 12px; height: 12px" />
                      </q-item-section> -->
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <div class="q-pa-md">
    <q-table
      title="Lista de Processos"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 25, 50]"
      rows-per-page-label="Registros por página:"
      @request="onRequest"
    >
      <!-- BOTÃO NOVO PROCESSO -->
      <template #top-right>
        <q-btn
          color="primary"
          icon="add"
          label="Novo Processo"
          @click="$router.push({ name: 'process-create' })"
        />
      </template>
      <!-- COLUNA AREA JURÍDICA -->
      <template #body-cell-legalArea="props">
        <q-td :props="props">
          {{ getProcessLegalAreaLabel(props.row.legalArea) }}
        </q-td>
      </template>
      <!-- COLUNA STATUS -->
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getProcessStatusColor(props.row.status)">
            {{ getProcessStatusLabel(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
      <!-- COLUNA PRIORIDADE -->
      <template #body-cell-priority="props">
        <q-td :props="props">
          <q-badge :color="getProcessPriorityColor(props.row.priority)">
            {{ getProcessPriorityLabel(props.row.priority) }}
          </q-badge>
        </q-td>
      </template>

      <!-- COLUNA AÇÕES -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round icon="more_vert">
            <q-menu>
              <q-list style="min-width: 200px">
                <q-item
                  clickable
                  v-close-popup
                  v-if="props.row.hasMovements"
                  @click="openTimeline(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="timeline" color="positive" />
                  </q-item-section>
                  <q-item-section>Histórico de movimentações</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  v-if="props.row.hasMovements"
                  @click="
                    $router.push({
                      name: ROUTE_NAMES.PROCESS_MOVEMENT_LIST,
                      params: { processId: props.row.id },
                    })
                  "
                >
                  <q-item-section avatar>
                    <q-icon name="list_alt" color="teal" />
                  </q-item-section>
                  <q-item-section>Gerenciar movimentações</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  v-if="
                    props.row.status != ProcessStatus.FINISHED &&
                    props.row.status != ProcessStatus.CANCELLED
                  "
                  @click="openMovementDialog(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="playlist_add" color="primary" />
                  </q-item-section>
                  <q-item-section>Adicionar movimentação</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup @click="openProcessUpdateStatusDialog(props.row)">
                  <q-item-section avatar>
                    <q-icon name="update" color="teal" />
                  </q-item-section>
                  <q-item-section>Atualizar status do processo</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="$router.push({ name: 'process-edit', params: { id: props.row.id } })"
                >
                  <q-item-section avatar>
                    <q-icon name="edit" color="warning" />
                  </q-item-section>
                  <q-item-section>Editar processo</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
      <template #no-data>
        <div class="full-width column flex-center q-pa-lg text-grey-6">
          <q-icon name="folder_open" size="4rem" class="q-mb-md" />
          <div class="text-h6">Nenhum processo encontrado</div>
          <div class="text-caption">Adicione um novo processo para começar</div>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { useQuasar, type QTableColumn } from 'quasar';
import { ref, watch } from 'vue';
import { useProcess } from '../../composables/process/useProcess';
import { useProcessMoviment } from '../../composables/movements/useProcessMoviment';
import type { ProcessLegalArea } from '../../types/enum/process/process-legal-area.enum';
import {
  getProcessLegalAreaLabel,
  ProcessLegalAreaOptions,
} from '../../types/enum/process/process-legal-area.enum';
import type { ProcessPriority } from '../../types/enum/process/process-priority.enum';
import {
  getProcessPriorityColor,
  getProcessPriorityLabel,
  ProcessPriorityOptions,
} from '../../types/enum/process/process-priority.enum';
import {
  getProcessStatusColor,
  getProcessStatusLabel,
  ProcessStatus,
  ProcessStatusOptions,
} from '../../types/enum/process/process-status.enum';
import type { IProcess } from 'src/types/process.types';
import SearchInput from 'src/components/shared/SearchInput.vue';
import ProcessTimelineDialog from 'src/components/process/ProcessTimelineDialog.vue';
import { watchDebounced } from '@vueuse/core';
import ProcessCreateMovementDialog from 'src/components/process/ProcessCreateMovementDialog.vue';
import axios from 'axios';
import ProcessUpdateStatusDialog from 'src/components/process/ProcessUpdateStatusDialog.vue';
import { ROUTE_NAMES } from 'src/constants/routes.constants';

const $q = useQuasar();
const { rows, pagination, loading, findAllProcess } = useProcess();
const { findProcessMovimentsById } = useProcessMoviment();
const search = ref('');
const filterStatus = ref<ProcessStatus | null>(null);
const filterPriority = ref<ProcessPriority | null>(null);
const filterLegalArea = ref<ProcessLegalArea | null>(null);

async function openTimeline(process: IProcess) {
  try {
    const rowsMoviments = await findProcessMovimentsById(process.id!);
    $q.dialog({
      component: ProcessTimelineDialog,
      componentProps: {
        movements: rowsMoviments,
      },
    });
  } catch (erro) {
    if (axios.isAxiosError(erro) && erro.response?.status === 404) {
      $q.notify({
        type: 'warning',
        message: 'Nenhuma movimentação encontrada para este processo',
        position: 'top',
      });
    } else {
      $q.notify({
        type: 'negative',
        message: 'Erro ao buscar movimentações',
        position: 'top',
      });
    }
  }
}

function openMovementDialog(process: IProcess) {
  $q.dialog({
    component: ProcessCreateMovementDialog,
    componentProps: {
      processId: process.id,
      processTitle: process.title,
    },
  }).onOk((data) => {
    if (data?.refresh) {
      void findAllProcess();
    }
  });
}

function openProcessUpdateStatusDialog(process: IProcess) {
  $q.dialog({
    component: ProcessUpdateStatusDialog,
    componentProps: {
      processId: process.id,
      processTitle: process.title,
      processStatus: process.status,
    },
  }).onOk((data) => {
    if (data?.refresh) {
      void findAllProcess();
    }
  });
}

watchDebounced(
  search,
  async () => {
    pagination.value.page = 1;
    await findAllProcess({
      search: search.value || undefined,
      status: filterStatus.value ?? undefined,
      priority: filterPriority.value ?? undefined,
      legalArea: filterLegalArea.value ?? undefined,
    });
  },
  { debounce: 400 },
);

watch([filterStatus, filterPriority, filterLegalArea], async () => {
  pagination.value.page = 1;
  await findAllProcess({
    search: search.value || undefined,
    status: filterStatus.value ?? undefined,
    priority: filterPriority.value ?? undefined,
    legalArea: filterLegalArea.value ?? undefined,
  });
});

async function onRequest(props: {
  pagination: {
    page: number;
    rowsPerPage: number;
    rowsNumber?: number;
    sortBy: string;
    descending: boolean;
  };
}) {
  pagination.value = {
    ...props.pagination,
    rowsNumber: props.pagination.rowsNumber ?? pagination.value.rowsNumber,
  };
  await findAllProcess({
    search: search.value || undefined,
    status: filterStatus.value ?? undefined,
    priority: filterPriority.value ?? undefined,
    legalArea: filterLegalArea.value ?? undefined,
  });
}

const columns: QTableColumn[] = [
  {
    name: 'numberProcess',
    align: 'left',
    label: 'Número do processo',
    field: (row: { numberProcess: string }) => row.numberProcess,
    sortable: true,
  },
  {
    name: 'title',
    required: true,
    label: 'Título',
    align: 'left',
    field: (row: { title: string }) => row.title,
    sortable: true,
  },
  {
    name: 'legalArea',
    label: 'Area Jurídica',
    align: 'left',
    field: (row: { legalArea: string }) => row.legalArea,
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: (row: { status: string }) => row.status,
    sortable: true,
  },
  {
    name: 'courtDivision',
    align: 'left',
    label: 'Vara',
    field: (row: { courtDivision: string }) => row.courtDivision,
    sortable: true,
  },
  {
    name: 'court',
    align: 'left',
    label: 'Tribunal',
    field: (row: { court: string }) => row.court,
    sortable: true,
  },
  {
    name: 'priority',
    label: 'Proridade',
    align: 'left',
    field: (row: { priority: string }) => row.priority,
    sortable: true,
  },
  {
    name: 'createdAt',
    label: 'Data de Cadastro',
    align: 'left',
    field: (row: IProcess) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString('pt-BR') : '-',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center' as const,
  },
];
</script>
<style scoped></style>
