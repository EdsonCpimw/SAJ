<template>
  <div class="q-pa-md">
    <q-table title="Lista de Processos" :rows="rows" :columns="columns" row-key="id">
      <!-- BOTÃO NOVO PROCESSO -->
      <template #top-right>
        <q-btn
          color="primary"
          icon="add"
          label="Novo Processo"
          @click="$router.push({ name: 'user-create' })"
        />
      </template>

      <!-- COLUNA STATUS -->
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getStatusColor(props.row.status)">
            {{ getStatusLabel(props.row.status) }}
          </q-badge>
        </q-td>
      </template>

      <!-- COLUNA AÇÕES -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            color="orange"
            icon="edit"
            @click="$router.push({ name: 'user-edit', params: { id: props.row.id } })"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { type QTableColumn } from 'quasar';
import { useProcess } from 'src/composables/useProcess';
import type { IProcess } from 'src/types/process.types';

const { rows, getStatusColor, getStatusLabel } = useProcess();

const columns: QTableColumn[] = [
  {
    name: 'processNumber',
    align: 'left',
    label: 'Processos',
    field: (row: { processNumber: string }) => row.processNumber,
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
    name: 'createdAt',
    label: 'Data de Cadastro',
    align: 'left',
    field: (row: IProcess) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString('pt-BR') : '-',
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: (row: { status: string }) => row.status,
    sortable: true,
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
