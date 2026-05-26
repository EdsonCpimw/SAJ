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
                  placeholder="Buscar por Numero do Processo, CNPJ, Título, Vara"
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
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :pagination="{ rowsPerPage: 10 }"
      rows-per-page-label="Registros por página:"
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
          <q-btn flat round color="positive" icon="timeline" @click="openTimeline(props.row)">
            <q-tooltip>Histórico de movimentações</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            color="primary"
            icon="playlist_add"
            @click="$router.push({ name: 'process-movement', params: { id: props.row.id } })"
          >
            <q-tooltip>Adicionar movimentação</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            color="warning"
            icon="edit"
            @click="$router.push({ name: 'process-edit', params: { id: props.row.id } })"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { useQuasar, type QTableColumn } from 'quasar';
import { computed, ref } from 'vue';
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
import type { ProcessStatus } from '../../types/enum/process/process-status.enum';
import {
  getProcessStatusColor,
  getProcessStatusLabel,
  ProcessStatusOptions,
} from '../../types/enum/process/process-status.enum';
import type { IProcess } from 'src/types/process.types';
import SearchInput from 'src/components/shared/SearchInput.vue';
import ProcessTimelineDialog from 'src/components/process/ProcessTimelineDialog.vue';

const $q = useQuasar();
const { rows } = useProcess();
const { findProcessMovimentsById } = useProcessMoviment();
const search = ref('');
const filterStatus = ref<ProcessStatus | null>(null);
const filterPriority = ref<ProcessPriority | null>(null);
const filterLegalArea = ref<ProcessLegalArea | null>(null);

const filteredRows = computed(() =>
  rows.value.filter((row) => {
    const matchSearch =
      row.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      row.court.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      row.processNumber.includes(search.value) ||
      row.document.includes(search.value);

    const matchStatus = filterStatus.value === null || row.status === filterStatus.value;
    const matchPriority = filterPriority.value === null || row.priority === filterPriority.value;
    const matchLegalArea =
      filterLegalArea.value === null || row.legalArea === filterLegalArea.value;

    return matchSearch && matchStatus && matchPriority && matchLegalArea;
  }),
);

async function openTimeline(process: IProcess) {
  const rowsMoviments = await findProcessMovimentsById(process.id!);
  $q.dialog({
    component: ProcessTimelineDialog,
    componentProps: {
      movements: rowsMoviments,
    },
  });
}

const columns: QTableColumn[] = [
  {
    name: 'processNumber',
    align: 'left',
    label: 'Número do processo',
    field: (row: { processNumber: string }) => row.processNumber,
    sortable: true,
  },
  {
    name: 'document',
    align: 'left',
    label: 'CNPJ',
    field: (row: { document: string }) => row.document,
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
