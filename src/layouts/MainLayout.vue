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
      <div id="q-app">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/"></q-breadcrumbs-el>
            <q-breadcrumbs-el
              label="Docs"
              icon="widgets"
              to="/start/pick-quasar-flavour"
            ></q-breadcrumbs-el>
            <q-breadcrumbs-el
              label="Breadcrumbs"
              icon="navigation"
              to="/vue-components/breadcrumbs"
            ></q-breadcrumbs-el>
            <q-breadcrumbs-el label="Build" icon="build"></q-breadcrumbs-el>
          </q-breadcrumbs>
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Usuários',
    caption: 'Gerenciar usuários',
    icon: 'perm_identity',
    link: '/users',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
