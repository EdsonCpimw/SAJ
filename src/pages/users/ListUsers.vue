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
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 25, 50]"
      rows-per-page-label="Registros por página:"
      @request="onRequest"
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
      <template #no-data>
        <div class="full-width column flex-center q-pa-lg text-grey-6">
          <q-icon name="folder_open" size="4rem" class="q-mb-md" />
          <div class="text-h6">Nenhum usuário encontrado</div>
          <div class="text-caption">Adicione um novo usuário para começar</div>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import { useQuasar, type QTableColumn } from 'quasar';
import { useUsers } from '../../composables/users/useUsers';
import type { IUser } from 'src/types/user/user.types';
import { onMounted, ref, watch } from 'vue';
import SearchInput from 'src/components/shared/SearchInput.vue';
import { UserStatusOptions } from '../../types/enum/users/user-status.enum';
import { watchDebounced } from '@vueuse/core';

const { rows, pagination, loading, toggleUser, findAllUsers } = useUsers();
const $q = useQuasar();
const search = ref('');
const filterActive = ref<boolean | null>(null);

watchDebounced(
  search,
  async () => {
    pagination.value.page = 1;
    await findAllUsers({
      search: search.value || undefined,
      active: filterActive.value ?? undefined,
    });
  },
  { debounce: 400 },
);

watch(filterActive, async () => {
  pagination.value.page = 1;
  await findAllUsers({
    search: search.value || undefined,
    active: filterActive.value ?? undefined,
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
  await findAllUsers({
    search: search.value || undefined,
    active: filterActive.value ?? undefined,
  });
}

onMounted(async () => {
  await findAllUsers();
});

const columns: QTableColumn[] = [
  {
    name: 'companyName',
    required: true,
    label: 'Nome do Escritório',
    align: 'left',
    field: (row: { companyName: string }) => row.companyName,
    sortable: true,
  },
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
    void toggleUser(user.id!);
  });
}
</script>
<style scoped></style>
