<template>
  <q-btn round flat>
    <q-avatar size="36px" color="blue-1" text-color="blue-8">
      {{ initials }}
    </q-avatar>

    <q-menu anchor="bottom right" self="top right" :offset="[0, 8]">
      <!-- Header com nome e email -->
      <div class="q-pa-md row items-center no-wrap" style="min-width: 220px">
        <q-avatar size="44px" color="blue-1" text-color="blue-8" class="q-mr-md">
          {{ initials }}
        </q-avatar>
        <div style="overflow: hidden">
          <div class="text-body2 text-weight-medium ellipsis">
            {{ user?.name }}
          </div>
          <div class="text-caption text-grey-6 ellipsis">{{ user?.email }}</div>
        </div>
      </div>

      <q-separator />

      <!-- Perfil -->
      <q-item clickable v-close-popup :to="{ name: 'user-profile' }">
        <q-item-section avatar>
          <q-icon name="person_outline" />
        </q-item-section>
        <q-item-section>Meu perfil</q-item-section>
      </q-item>
      <!-- Reset Password -->
      <q-item clickable v-close-popup :to="{ name: 'forgot-password' }">
        <q-item-section avatar>
          <q-icon name="lock_reset" />
        </q-item-section>
        <q-item-section>Trocar Senha</q-item-section>
      </q-item>

      <q-separator />

      <!-- Logout -->
      <q-item clickable v-close-popup @click="handleLogout" class="text-negative">
        <q-item-section avatar>
          <q-icon name="logout" color="negative" />
        </q-item-section>
        <q-item-section>Sair</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';

// const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.userKeycloak);

const initials = computed(() => {
  const nameComplete = user.value?.name ?? '';
  return nameComplete
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
});

// function goToProfile() {
//   void router.push('/profile');
// }

async function handleLogout() {
  await authStore.logout();
}
</script>
