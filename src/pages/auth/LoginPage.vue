<template>
  <q-page class="flex flex-center">
    <q-card style="width: 100%; max-width: 420px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h5 text-weight-bold">Bem-vindo de volta</div>
        <div class="text-subtitle2 text-grey-6">Faça login para continuar</div>
      </q-card-section>
      <q-form @keyup.enter="onSubmit">
        <q-card-section class="q-gutter-md q-pt-none">
          <q-input
            v-model="form.email"
            label="E-mail"
            type="email"
            outlined
            :rules="rules.email"
            :error="!!errorMessage"
          >
            <template #prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="form.password"
            label="Senha"
            outlined
            :type="showPassword ? 'text' : 'password'"
            :rules="rules.password"
            :error="!!errorMessage"
            :error-message="errorMessage"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            size="lg"
            :loading="loading"
            @click="onSubmit"
          />
        </q-card-section>
      </q-form>
      <div class="text-center q-pb-md">
        <span class="text-grey-6">Esqueceu a senha? </span>
        <router-link to="/auth/forgot-password" class="text-primary">Trocar senha</router-link>
      </div>
      <div class="text-center q-pb-md">
        <span class="text-grey-6">Não tem conta? </span>
        <router-link to="/auth/register" class="text-primary">Criar conta</router-link>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth.store';

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

const loading = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');

const form = ref({
  email: '',
  password: '',
});

const rules = {
  email: [
    (v: string) => !!v || 'E-mail obrigatório',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
  ],
  password: [(v: string) => !!v || 'Senha obrigatória'],
};

async function onSubmit() {
  errorMessage.value = '';
  loading.value = true;
  try {
    await authStore.login(form.value.email, form.value.password);
    await router.push('/');
  } catch {
    errorMessage.value = 'E-mail ou senha inválidos';
    $q.notify({
      type: 'negative',
      message: 'E-mail ou senha inválidos',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
}
</script>
