<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { getProcessMovementTypeLabel } from '../../types/enum/movements/processMovementType.enum';
import type { IProcessMovement } from 'src/types/process-movment.types';

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
        <div class="text-h6">Histórico de Movimentações</div>
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
              <div class="row items-center q-gutter-xs">
                <span class="text-grey-6">{{
                  movement.createdAt
                    ? new Date(movement.createdAt).toLocaleDateString('pt-BR')
                    : '-'
                }}</span>
                <q-badge v-if="movement.type" color="purple">
                  {{ getProcessMovementTypeLabel(movement.type!) }}
                </q-badge>
              </div>
            </template>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
