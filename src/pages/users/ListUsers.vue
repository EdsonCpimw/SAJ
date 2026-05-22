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
                  placeholder="Buscar por Nome, Email, Telefone"
                  :debounce="400"
                />
              </div>
              <!-- FILTRO POR STATUS -->
              <div class="col-12 col-md-4">
                <q-select
                  v-model="filterActive"
                  outlined
                  dense
                  clearable
                  label="Status"
                  :options="UserStatusOptions"
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
                          :color="scope.opt.value ? 'green' : 'red'"
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
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <q-table
      title="Lista de usuários"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :pagination="{ rowsPerPage: 10 }"
      rows-per-page-label="Registros por página:"
    >
      <!-- BOTÃO NOVO USUÁRIO -->
      <template #top-right>
        <q-btn
          color="primary"
          icon="add"
          label="Novo usuário"
          @click="$router.push({ name: 'user-create' })"
        />
      </template>

      <!-- COLUNA ATIVO -->
      <template #body-cell-active="props">
        <q-td :props="props">
          <q-badge :color="props.row.active ? 'positive' : 'negative'">
            {{ props.row.active ? 'Ativo' : 'Inativo' }}
          </q-badge>
        </q-td>
      </template>

      <!-- COLUNA AÇÕES -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            :color="props.row.active ? 'positive' : 'grey-5'"
            :icon="props.row.active ? 'toggle_on' : 'toggle_off'"
            @click="confirmToggleUser(props.row)"
          >
            <q-tooltip>{{ props.row.active ? 'Inativar usuário' : 'Ativar usuário' }}</q-tooltip>
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
import { useQuasar, type QTableColumn } from 'quasar';
import { useUsers } from 'src/composables/useUsers';
import type { IUser } from 'src/types/user.types';
import { computed, ref } from 'vue';
import SearchInput from 'src/components/shared/SearchInput.vue';
import { UserStatusOptions } from 'src/types/enum/user-status.enum';

const { rows, inactiveUser } = useUsers();
const $q = useQuasar();
const search = ref('');
const filterActive = ref<boolean | null>(null);

const filteredRows = computed(() =>
  rows.value.filter((row) => {
    const matchSearch =
      row.name.toLowerCase().includes(search.value.toLowerCase()) ||
      row.email.toLowerCase().includes(search.value.toLowerCase()) ||
      row.phone.includes(search.value);

    const matchActive = filterActive.value === null || row.active === filterActive.value;

    return matchSearch && matchActive;
  }),
);

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
    name: 'active',
    label: 'Ativo',
    align: 'left',
    field: 'active',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center' as const,
  },
];

function confirmToggleUser(user: IUser) {
  $q.dialog({
    title: user.active ? 'Inativar usuário' : 'Ativar usuário',
    message: user.active
      ? `Tem certeza que deseja inativar o usuário? ${user.name}`
      : `Tem certeza que deseja ativar o usuário? ${user.name}`,
    cancel: { label: 'Cancelar', flat: true, color: 'grey-7' },
    ok: {
      label: user.active ? 'Inativar' : 'Ativar',
      color: user.active ? 'negative' : 'positive',
    },
    persistent: true,
  }).onOk(() => {
    void inactiveUser(user.id!);
  });
}
</script>
<style scoped></style>
