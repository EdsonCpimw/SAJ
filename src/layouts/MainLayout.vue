<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Sistema de Agendamento Jurídico </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item class="q-pt-lg q-pb-md">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="gavel" size="42px" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold text-h6 text-primary">SAJ</q-item-label>
            <q-item-label caption class="text-grey-6">Sistema de Agendamento Jurídico</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mb-sm" />

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md q-pb-none" v-if="breadcrumbs.length">
        <q-breadcrumbs>
          <q-breadcrumbs-el
            v-for="(bc, index) in breadcrumbs"
            :key="index"
            :label="bc.label"
            :icon="bc.icon"
            :to="bc.to"
          />
        </q-breadcrumbs>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { IBreadcrumb } from 'src/types/router.types';

const route = useRoute();

const breadcrumbs = computed<IBreadcrumb[]>(() => (route.meta.breadcrumbs as IBreadcrumb[]) ?? []);

const linksList: EssentialLinkProps[] = [
  {
    title: 'Usuários',
    caption: 'Gerenciar usuários',
    icon: 'perm_identity',
    link: '/users',
  },
  {
    title: 'Processos',
    caption: 'Gerenciar Processos',
    icon: 'balance',
    link: 'https://github.com/quasarframework',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
