<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> SAJ - Sistema de Acompanhamento Jurídico </q-toolbar-title>
        <q-btn
          flat
          round
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          :tooltip="$q.dark.isActive ? 'Modo claro' : 'Modo escuro'"
          @click="toggleDark"
        >
          <q-tooltip>{{ $q.dark.isActive ? 'Modo claro' : 'Modo escuro' }}</q-tooltip>
        </q-btn>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useDarkMode } from 'src/composables/useDarkMode';
import { onMounted } from 'vue';

const $q = useQuasar();
const { toggleDark } = useDarkMode();

onMounted(() => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    $q.dark.set(saved === 'true');
  }
});
</script>
