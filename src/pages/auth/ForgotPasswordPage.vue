<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">Trocar Senha</div>
        <div class="text-caption text-grey">Informe seu e-mail para receber as instruções</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="email"
            label="E-mail"
            type="email"
            outlined
            :rules="[
              (val) => !!val || 'E-mail é obrigatório',
              (val) => /.+@.+\..+/.test(val) || 'E-mail inválido',
            ]"
          />

          <q-btn
            type="submit"
            label="Enviar instruções"
            color="primary"
            class="full-width q-mt-md"
            :loading="loading"
          />

          <q-btn flat label="Voltar para o login" class="full-width q-mt-sm" to="/auth/login" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { AuthService } from 'src/services/auth.service';

const $q = useQuasar();
const email = ref('');
const loading = ref(false);

async function onSubmit() {
  loading.value = true;
  try {
    await AuthService.forgotPassword(email.value);
    $q.notify({
      type: 'positive',
      message: 'Se o e-mail estiver cadastrado, você receberá as instruções em breve',
      position: 'top',
    });
    email.value = '';
  } catch (error) {
    console.log(error);
    $q.notify({
      type: 'negative',
      message: 'Erro ao processar solicitação. Tente novamente.',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
}
</script>
