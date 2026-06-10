<template>
  <div class="q-pa-md">
    <div class="row q-mt-md">
      <div class="col-12"></div>
    </div>
  </div>
  <div class="q-pa-md">
    <q-table
      title="Lista de Movimentações do Processo"
      :rows="processMovements"
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
          label="Nova movimentação"
          @click="$router.push({ name: 'process-movement-create' })"
        />
      </template>
      <!-- COLUNA STATUS -->
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getProcessStatusColor(props.row.status)">
            {{ getProcessStatusLabel(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
      <!-- COLUNA TIPO DE MOVIMENTAÇÃO -->
      <template #body-cell-type="props">
        <q-td :props="props">
          <q-badge>
            {{ getProcessMovementTypeLabel(props.row.type) }}
          </q-badge>
        </q-td>
      </template>

      <!-- COLUNA AÇÕES -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            color="warning"
            icon="edit"
            @click="
              $router.push({
                name: ROUTE_NAMES.PROCESS_MOVEMENT_EDIT,
                params: { processId: processId, id: props.row.id },
              })
            "
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template #no-data>
        <div class="full-width column flex-center q-pa-lg text-grey-6">
          <q-icon name="folder_open" size="4rem" class="q-mb-md" />
          <div class="text-h6">Nenhuma movimentação encontrada</div>
          <div class="text-caption">Adicione uma nova movimentação para começar</div>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { type QTableColumn } from 'quasar';
import {
  getProcessStatusColor,
  getProcessStatusLabel,
} from '../../types/enum/process/process-status.enum';
import { useProcessMoviment } from 'src/composables/movements/useProcessMoviment';
import type { IProcessMovement } from 'src/types/process-movment.types';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProcessMovementTypeLabel } from 'src/types/enum/movements/processMovementType.enum';
import { ROUTE_NAMES } from 'src/constants/routes.constants';
import { fromISO } from 'src/utils/date.utils';

const route = useRoute();
const processId = route.params.processId;
const { processMovements, findProcessMovimentsById } = useProcessMoviment();

onMounted(async () => {
  if (processId) {
    await findProcessMovimentsById(processId as string);
  }
});

const columns: QTableColumn[] = [
  {
    name: 'processNumber',
    label: 'Numero do Processo',
    align: 'left',
    field: (row: IProcessMovement) => row.processNumber,
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status do processo',
    align: 'left',
    field: (row: IProcessMovement) => row.status,
    sortable: true,
  },
  {
    name: 'title',
    required: true,
    label: 'Título da Movimentação',
    align: 'left',
    field: (row: { title: string }) => row.title,
    sortable: true,
  },
  {
    name: 'description',
    label: 'Descrição da Movimentação',
    align: 'left',
    field: (row: { description: string }) => row.description,
    sortable: true,
  },
  {
    name: 'dateEvent',
    label: 'Data e Hora da Audiência',
    align: 'left',
    field: (row: IProcessMovement) => (row.dateEvent ? fromISO(row.dateEvent) : '-'),
  },
  {
    name: 'type',
    label: 'Tipo de Movimentação',
    align: 'left',
    field: (row: IProcessMovement) => row.type,
    sortable: true,
  },
  {
    name: 'createdAt',
    label: 'Data de Cadastro',
    align: 'left',
    field: (row: IProcessMovement) =>
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
