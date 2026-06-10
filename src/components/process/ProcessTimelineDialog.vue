<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { getProcessMovementTypeLabel } from '../../types/enum/movements/processMovementType.enum';
import type { IProcessMovement } from 'src/types/process-movment.types';
import { fromISO } from 'src/utils/date.utils';

defineProps<{
  movements: IProcessMovement[];
}>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 600px; max-width: 90vw">
      <q-card-section class="row items-center">
        <q-icon name="timeline" color="teal" size="sm" class="q-mr-sm" />
        <div class="text-h6">Histórico de Movimentações do processo</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 60vh" class="scroll">
        <q-timeline color="positive">
          <q-timeline-entry
            v-for="movement in movements"
            :key="movement.id ?? movement.title"
            :title="movement.title"
            icon="gavel"
          >
            <div>{{ movement.description }}</div>
            <!-- SUBTITULO COM DATA E STATUS -->
            <template #subtitle>
              <div class="column q-gutter-xs q-mt-xs">
                <!-- LINHA 1 — DATAS -->
                <div class="row items-center q-gutter-sm">
                  <div class="row items-center q-gutter-xs">
                    <q-icon name="schedule" size="12px" color="grey-5" />
                    <span class="text-grey-6 text-caption">Cadastro:</span>
                    <span class="text-grey-8 text-caption text-weight-medium">
                      {{
                        movement.createdAt
                          ? new Date(movement.createdAt).toLocaleDateString('pt-BR')
                          : '-'
                      }}
                    </span>
                  </div>

                  <q-separator vertical inset />

                  <div class="row items-center q-gutter-xs">
                    <q-icon name="event" size="12px" color="grey-5" />
                    <span class="text-grey-6 text-caption">Audiência:</span>
                    <span class="text-grey-8 text-caption text-weight-medium">
                      {{ movement.dateEvent ? fromISO(movement.dateEvent) : '-' }}
                    </span>
                  </div>
                </div>

                <!-- LINHA 2 — TIPO -->
                <div v-if="movement.type">
                  <q-badge color="purple" outline>
                    {{ getProcessMovementTypeLabel(movement.type) }}
                  </q-badge>
                </div>
              </div>
            </template>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
