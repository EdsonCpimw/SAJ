<script setup lang="ts">
import { ref } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { ProcessMovementOptions } from 'src/types/enum/movements/processMovementType.enum';
import { useProcessMovementForm } from 'src/composables/movements/useProcessMovementForm';
import { ProcessStatusOptions } from 'src/types/enum/process/process-status.enum';

const props = defineProps<{
  processId: string;
  processTitle: string;
}>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const $q = useQuasar();
const loading = ref(false);
const formRef = ref();
const error = ref<string | null>(null);

const { createProcessMovement, rulesProcessMovement, formProcessMovement } =
  useProcessMovementForm();

async function onSubmit() {
  const valid = await formRef.value.validate();
  error.value = null;
  if (!valid) return;
  loading.value = true;
  formProcessMovement.processId = props.processId;
  try {
    await createProcessMovement();
    $q.notify({ type: 'positive', message: 'Movimentação adicionada!', position: 'top' });
    onDialogOK({ refresh: true });
  } catch {
    $q.notify({
      type: 'negative',
      message: error.value ?? 'Erro ao adicionar movimentação',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 600px; max-width: 90vw">
      <!-- HEADER -->
      <q-card-section class="row items-center">
        <q-icon name="playlist_add" color="primary" size="sm" class="q-mr-sm" />
        <div>
          <div class="text-h6">Nova Movimentação</div>
          <div class="text-caption text-grey-6">{{ props.processTitle }}</div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <!-- FORMULÁRIO -->
      <q-card-section>
        <q-form ref="formRef" class="row q-col-gutter-md">
          <!-- IMPORTANTE -->
          <div class="col-12 col-md-6 flex items-center">
            <q-toggle
              v-model="formProcessMovement.isImportant"
              label="Importante"
              color="positive"
              keep-color
            />
          </div>
          <!-- TIPO -->
          <div class="col-12">
            <q-select
              v-model="formProcessMovement.type"
              outlined
              label="Tipo de movimentação"
              :options="ProcessMovementOptions"
              emit-value
              map-options
              :rules="rulesProcessMovement.type"
            >
              <template #prepend>
                <q-icon name="category" />
              </template>
            </q-select>
          </div>
          <!-- TÍTULO -->
          <div class="col-12">
            <q-input
              v-model="formProcessMovement.title"
              outlined
              label="Título"
              :rules="rulesProcessMovement.title"
            >
              <template #prepend>
                <q-icon name="title" />
              </template>
            </q-input>
          </div>

          <!-- DESCRIÇÃO -->
          <div class="col-12">
            <q-input
              v-model="formProcessMovement.description"
              outlined
              label="Descrição"
              type="textarea"
              rows="3"
              :rules="rulesProcessMovement.description"
            >
              <template #prepend>
                <q-icon name="description" />
              </template>
            </q-input>
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
        <q-btn flat label="Cancelar" color="grey-7" v-close-popup />
        <q-space />
        <q-btn label="Salvar" color="primary" icon="save" :loading="loading" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
