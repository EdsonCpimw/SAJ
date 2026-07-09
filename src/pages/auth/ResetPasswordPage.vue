<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">Nova Senha</div>
        <div class="text-caption text-grey">Defina sua nova senha de acesso</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="password"
            label="Nova senha"
            :type="showPassword ? 'text' : 'password'"
            outlined
            class="q-mb-md"
            :rules="[
              (val) => !!val || 'Senha é obrigatória',
              (val) => val.length >= 8 || 'Mínimo 8 caracteres',
            ]"
          >
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-input
            v-model="confirmPassword"
            label="Confirmar senha"
            :type="showPassword ? 'text' : 'password'"
            outlined
            :rules="[
              (val) => !!val || 'Confirmação é obrigatória',
              (val) => val === password || 'Senhas não conferem',
            ]"
          />

          <q-btn
            type="submit"
            label="Redefinir senha"
            color="primary"
            class="full-width q-mt-md"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { AuthService } from 'src/services/auth.service';
import type { UUID } from 'crypto';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const token = route.query.token as UUID;
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const showPassword = ref(false);

async function onSubmit() {
  loading.value = true;
  if (!token) {
    $q.notify({ type: 'negative', message: 'Token inválido ou expirado' });
    await router.push('auth/forgot-password');
    return;
  }
  try {
    await AuthService.resetPassword({
      token: token,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
    $q.notify({ type: 'positive', message: 'Senha redefinida com sucesso!', position: 'top' });
    await router.push({ name: 'login' });
  } catch (error) {
    console.log(error);
    $q.notify({
      type: 'negative',
      message: 'Token inválido ou expirado',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
}
</script>
