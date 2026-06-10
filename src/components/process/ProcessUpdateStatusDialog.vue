<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
// import { ProcessMovementOptions } from 'src/types/enum/movements/processMovementType.enum';
import type { ProcessStatus } from 'src/types/enum/process/process-status.enum';
import { ProcessStatusOptions } from 'src/types/enum/process/process-status.enum';
import { useProcessForm } from 'src/composables/process/useProcessForm';

const props = defineProps<{
  processId: string;
  processTitle: string;
  processStatus: ProcessStatus;
}>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const $q = useQuasar();
const loading = ref(false);
const formRef = ref();
const error = ref<string | null>(null);

const { formStatusProcess, updateStatusProcess } = useProcessForm();

onMounted(() => {
  formStatusProcess.status = props.processStatus;
});

async function onSubmit() {
  const valid = await formRef.value.validate();
  error.value = null;
  if (!valid) return;
  loading.value = true;
  try {
    await updateStatusProcess(props.processId);
    $q.notify({
      type: 'positive',
      message: 'Status do processo atualizado com sucesso!',
      position: 'top',
    });
    onDialogOK({
      refresh: true,
    });
  } catch {
    $q.notify({
      type: 'negative',
      message: error.value ?? 'Erro ao atualizar status do processo',
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
          <div class="text-h6">Atualizar Status do Processo</div>
          <div class="text-caption text-grey-6">{{ props.processTitle }}</div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <!-- FORMULÁRIO -->
      <q-card-section>
        <q-form ref="formRef" class="row q-col-gutter-md">
          <!-- STATUS DO PROCESSO-->
          <div class="col-12">
            <q-select
              v-model="formStatusProcess.status"
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
