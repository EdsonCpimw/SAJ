<script setup lang="ts">
import { useProcessForm } from '../../composables/process/useProcessForm';
import { ProcessStatusOptions } from '../../types/enum/process/process-status.enum';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ProcessLegalAreaOptions } from '../../types/enum/process/process-legal-area.enum';
import { ProcessPriorityOptions } from '../../types/enum/process/process-priority.enum';
import { useUsers } from 'src/composables/users/useUsers';

const isEditing = computed(() => !!route.params.id);
const router = useRouter();
const route = useRoute();
const title = computed(() => (isEditing.value ? 'Editar processo' : 'Novo processo'));
const subtitle = computed(() =>
  isEditing.value ? 'Editar informações do processo' : 'Dados do processo',
);
const loading = ref(false);

const {
  formProcess,
  rulesProcess,
  createProcess,
  resetFormProcess,
  updateProcess,
  findProcessById,
} = useProcessForm();
const formRef = ref();
const $q = useQuasar();
const { rowsClients, loadingClients, findClients } = useUsers();

// options do select
const clientOptions = computed(() => rowsClients.value);

onMounted(async () => {
  if (isEditing.value) {
    await findProcessById(route.params.id as string);
  }
});

function goBack() {
  void router.push({ name: 'process-list' });
}

// função chamada pelo @filter do select
async function filterClients(search: string, update: (fn: () => void) => void) {
  await findClients({ search });
  update(() => {});
}

async function onSubmit() {
  const valid = await formRef.value.validate();
  if (!valid) return;
  try {
    if (isEditing.value) {
      await updateProcess(route.params.id as string);
      $q.notify({
        type: 'positive',
        message: 'Processo atualizado com sucesso!',
        position: 'top',
      });
      await router.push({ name: 'process-list' });
      return;
    }
    await createProcess();
    $q.notify({
      type: 'positive',
      message: 'Processo cadastrado com sucesso!',
      position: 'top',
    });
    resetFormProcess();
    await router.push({ name: 'process-list' });
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao cadastrar processo', position: 'top' });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <q-page class="q-pa-md">
    <!-- CABEÇALHO -->
    <div class="row items-center q-mb-md">
      <q-btn flat round icon="arrow_back" color="grey-7" @click="goBack" />
      <div class="text-h6 text-weight-bold q-ml-sm">{{ title }}</div>
    </div>

    <!-- CARD DO FORMULÁRIO — mesmo tamanho da listagem -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium text-grey-8">{{ subtitle }}</div>
        <div class="text-caption text-grey-5">Preencha todos os campos obrigatórios</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formRef" class="row q-col-gutter-md">
          <!-- NUMERO DO PROCESSO -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcess.numberProcess"
              outlined
              label="Numero do Processo"
              :rules="rulesProcess.processNumber"
            >
              <template #prepend>
                <q-icon name="gavel" />
              </template>
            </q-input>
          </div>
          <!-- TITLE -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcess.title"
              outlined
              label="Título"
              :rules="rulesProcess.title"
            >
              <template #prepend>
                <q-icon name="tag" />
              </template>
            </q-input>
          </div>
          <!-- DESCRIPTION -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcess.description"
              outlined
              label="Descrição"
              :rules="rulesProcess.description"
            >
              <template #prepend>
                <q-icon name="description" />
              </template>
            </q-input>
          </div>
          <!-- STATUS -->
          <div class="col-12 col-md-6">
            <q-select
              v-model="formProcess.status"
              outlined
              label="Status"
              :options="ProcessStatusOptions"
              emit-value
              map-options
            >
              <template #prepend>
                <q-icon name="info" />
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="formProcess.priority"
              outlined
              label="Prioridade"
              :options="ProcessPriorityOptions"
              emit-value
              map-options
            >
              <template #prepend>
                <q-icon name="info" />
              </template>
            </q-select>
          </div>
          <!-- AREA TRABALHISTA -->
          <div class="col-12 col-md-6">
            <q-select
              v-model="formProcess.legalArea"
              outlined
              label="Área Trabalhista"
              :options="ProcessLegalAreaOptions"
              emit-value
              map-options
            >
              <template #prepend>
                <q-icon name="local_library" />
              </template>
            </q-select>
          </div>
          <!-- VARA -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcess.courtDivision"
              outlined
              label="Vara"
              :rules="rulesProcess.courtDivision"
            >
              <template #prepend>
                <q-icon name="corporate_fare" />
              </template>
            </q-input>
          </div>
          <!-- TRIBUNAL -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcess.court"
              outlined
              label="Tribunal"
              :rules="rulesProcess.court"
            >
              <template #prepend>
                <q-icon name=" account_balance" />
              </template>
            </q-input>
          </div>
          <!-- CLIENTE -->
          <div class="col-12 col-md-6">
            <q-select
              v-model="formProcess.clientId"
              :options="clientOptions"
              option-label="email"
              option-value="id"
              emit-value
              map-options
              use-input
              fill-input
              hide-selected
              input-debounce="500"
              outlined
              label="Cliente"
              :loading="loadingClients"
              @filter="filterClients"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>

              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey"> Nenhum cliente encontrado </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <!-- AÇÕES -->
      <q-card-actions class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-7" @click="goBack" />
        <q-space />
        <q-btn label="Salvar" color="primary" icon="save" :loading="loading" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
