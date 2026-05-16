<template>
  <div class="q-pa-md">
    <!-- Cards superiores -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-blue text-white full-height">
          <q-card-section>
            <div class="text-h6">Our Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-purple text-white full-height">
          <q-card-section>
            <div class="text-h6">Our Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-indigo text-white full-height">
          <q-card-section>
            <div class="text-h6">Our Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-teal text-white full-height">
          <q-card-section>
            <div class="text-h6">Our Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Card grande -->
    <div class="row q-mt-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Dashboard</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-separator />
          <div class="q-pa-md">
            <q-table
              title="Lista de usuário"
              :rows="rows"
              :columns="columns"
              row-key="id"
              table-style="table-layout: fixed"
            />
          </div>

          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { useUsers } from 'src/composables/useUsers';

const { rows } = useUsers();
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

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
