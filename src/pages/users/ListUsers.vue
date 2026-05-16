<template>
  <div class="q-pa-md">
    <q-table
      title="Lista de usuário"
      :rows="rows"
      :columns="columns"
      row-key="id"
      table-style="table-layout: fixed"
    />
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
];
</script>
<style scoped></style>
