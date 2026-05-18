<template>
  <div class="q-pa-md">
    <q-table title="Lista de usuários" :rows="rows" :columns="columns" row-key="id">
      <template #top-right>
        <q-btn
          color="primary"
          icon="add"
          label="Novo usuário"
          @click="$router.push({ name: 'user-create' })"
        />
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            color="primary"
            icon="visibility"
            @click="$router.push({ name: 'user-detail', params: { id: props.row.id } })"
          >
            <q-tooltip>Ver detalhes</q-tooltip>
          </q-btn>

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
import type { QTableColumn } from 'quasar';
import { useUsers } from 'src/composables/useUsers';

const { rows } = useUsers();

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: (row: { name: string }) => row.name,
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: (row: { email: string }) => row.email,
    sortable: true,
  },
  {
    name: 'phone',
    label: 'Telefone',
    align: 'left',
    field: (row: { phone: string }) => row.phone,
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
