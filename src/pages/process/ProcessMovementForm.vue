<script setup lang="ts">
import { useProcessMovementForm } from 'src/composables/movements/useProcessMovementForm';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { ProcessMovementOptions } from 'src/types/enum/movements/processMovementType.enum';
import { ROUTE_NAMES } from 'src/constants/routes.constants';
import { ProcessStatusOptions } from 'src/types/enum/process/process-status.enum';

const router = useRouter();
const route = useRoute();
const formProcessMovementRef = ref();
const $q = useQuasar();
const loading = ref(false);
const title = ref('Nova movimentação processo');
const subtitle = ref('Dados da movimentação de processo');
const isEditing = computed(() => route.name == ROUTE_NAMES.PROCESS_MOVEMENT_EDIT);

const {
  formProcessMovement,
  rulesProcessMovement,
  createProcessMovement,
  findProcessMovementById,
  updateProcessMovement,
} = useProcessMovementForm();

onMounted(async () => {
  if (route.name !== ROUTE_NAMES.PROCESS_MOVEMENT_CREATE) {
    console.log('URL: ', route);
    title.value = 'Editar movimentação processo';
    subtitle.value = 'Editar informações do processo';
    await findProcessMovementById(route.params.id as string);
  }
});

function goBack() {
  void router.push({ name: 'process-list' });
}

async function onSubmit() {
  formProcessMovement.processId = route.params.processId as string;
  const valid = await formProcessMovementRef.value.validate();
  const movementId = route.params.id as string;
  if (!valid) return;
  try {
    if (isEditing.value) {
      await updateProcessMovement(movementId);
      $q.notify({
        type: 'positive',
        message: 'Movimentação de processo atualizada com sucesso!',
        position: 'top',
      });
      return;
    }
    await createProcessMovement();
    $q.notify({
      type: 'positive',
      message: 'Movimentação de processo cadastrada com sucesso!',
      position: 'top',
    });
    await router.push({ name: 'process-movement-list' });
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Erro ao cadastrar movimentação do processo',
      position: 'top',
    });
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
        <q-form ref="formProcessMovementRef" class="row q-col-gutter-md">
          <!-- IMPORTANTE -->
          <div class="col-12 col-md-12 flex items-center">
            <q-toggle
              v-model="formProcessMovement.isImportant"
              label="Importante"
              color="positive"
              keep-color
            />
          </div>
          <!-- TITLE -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcessMovement.title"
              outlined
              label="Título"
              :rules="rulesProcessMovement.title"
            >
              <template #prepend>
                <q-icon name="tag" />
              </template>
            </q-input>
          </div>
          <!-- DESCRIPTION -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcessMovement.description"
              outlined
              label="Description"
              :rules="rulesProcessMovement.description"
            >
              <template #prepend>
                <q-icon name="description" />
              </template>
            </q-input>
          </div>
          <!-- TYPE -->
          <div class="col-12 col-md-6">
            <q-select
              v-model="formProcessMovement.type"
              outlined
              label="Tipo"
              :options="ProcessMovementOptions"
              emit-value
              map-options
            >
              <template #prepend>
                <q-icon name="info" />
              </template>
            </q-select>
          </div>
          <!-- DATA DA AUDIENCIA -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcessMovement.dateEvent"
              outlined
              label="Data e hora da audiência"
              mask="##/##/#### ##:##"
            >
              <template #prepend>
                <q-icon name="event" />
              </template>
              <template #append>
                <q-icon name="calendar_month" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <div class="row">
                      <q-date
                        v-model="formProcessMovement.dateEvent"
                        mask="DD/MM/YYYY HH:mm"
                        today-btn
                      />
                      <q-separator vertical />
                      <q-time
                        v-model="formProcessMovement.dateEvent"
                        mask="DD/MM/YYYY HH:mm"
                        format24h
                      />
                    </div>
                    <div class="row items-center justify-end q-pa-sm">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <!-- STATUS DO PROCESSO-->
          <div class="col-12 col-md-6">
            <q-select
              v-model="formProcessMovement.status"
              outlined
              label="Status"
              :options="ProcessStatusOptions"
              emit-value
              map-options
              :rules="rulesProcessMovement.status"
            >
              <template #prepend>
                <q-icon name="info" />
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
