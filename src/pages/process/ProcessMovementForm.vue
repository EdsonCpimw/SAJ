<script setup lang="ts">
import { useProcessMovementForm } from 'src/composables/movements/useProcessMovementForm';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { ProcessMovementOptions } from 'src/types/enum/movements/processMovementType.enum';

const router = useRouter();
const route = useRoute();
const formProcessMovementRef = ref();
const $q = useQuasar();
const loading = ref(false);
const isEditing = computed(() => !!route.params.id);
const title = computed(() =>
  isEditing.value ? 'Editar movimentação processo' : 'Nova movimentação processo',
);
const subtitle = computed(() =>
  isEditing.value ? 'Editar informações do processo' : 'Dados do processo',
);

const { formProcessMovement, rulesProcessMovement, createProcessMovement } =
  useProcessMovementForm();

// onMounted(async () => {
//   if (isEditing.value) {
//     // await findProcessById(route.params.id as string);
//   }
// });

function goBack() {
  void router.push({ name: 'process-list' });
}

async function onSubmit() {
  const valid = await formProcessMovementRef.value.validate();
  if (!valid) return;
  try {
    await createProcessMovement();
    $q.notify({
      type: 'positive',
      message: 'Movimentação de processo cadastrada com sucesso!',
      position: 'top',
    });
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
        <q-form ref="formRef" class="row q-col-gutter-md">
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
          <!-- DATA DA CRIAÇÃO -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formProcessMovement.createdAt"
              outlined
              label="Data"
              mask="##/##/####"
              :rules="rulesProcessMovement.createdAt"
            >
              <template #prepend>
                <q-icon name="event" />
              </template>
              <template #append>
                <q-icon name="calendar_month" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="formProcessMovement.createdAt" mask="DD/MM/YYYY" today-btn>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <!-- VISÍVEL PARA O CLIENTE -->
          <div class="col-12 col-md-6">
            <q-toggle
              v-model="formProcessMovement.visibleToClient"
              label="Visível para o cliente"
              color="primary"
              keep-color
            />
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
