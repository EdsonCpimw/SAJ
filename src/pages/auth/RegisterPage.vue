<template>
  <q-page class="flex flex-center">
    <q-card style="width: 100%; max-width: 480px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h5 text-weight-bold">Criar conta</div>
        <div class="text-subtitle2 text-grey-6">Preencha os dados abaixo</div>
      </q-card-section>

      <!-- STEPPER -->
      <q-stepper v-model="step" flat animated color="primary">
        <!-- STEP 1 — ESCRITÓRIO -->
        <q-step :name="1" title="Escritório" icon="business" :done="step > 1">
          <q-form ref="stepEscritorioRef" class="q-gutter-md">
            <q-input
              v-model="formCompany.name"
              label="Nome do escritório"
              outlined
              :rules="rulesCompany.name"
            >
              <template #prepend>
                <q-icon name="business" />
              </template>
            </q-input>

            <q-input
              v-model="formCompany.document"
              label="CNPJ"
              outlined
              mask="##.###.###/####-##"
              :rules="rulesCompany.document"
            >
              <template #prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </q-form>
        </q-step>

        <!-- STEP 2 — USUÁRIO -->
        <q-step :name="2" title="Usuário" icon="person" :done="step > 2">
          <q-form ref="stepUsuarioRef" class="q-gutter-md">
            <q-input v-model="formUser.name" label="Nome completo" outlined :rules="rulesUser.name">
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              v-model="formUser.email"
              label="E-mail"
              type="email"
              outlined
              :rules="rulesUser.email"
            >
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="formUser.phone"
              label="Telefone"
              outlined
              mask="(##) #####-####"
              :rules="rulesUser.phone"
            >
              <template #prepend>
                <q-icon name="phone" />
              </template>
            </q-input>

            <q-input
              v-model="formUser.password"
              label="Senha"
              outlined
              :type="showPassword ? 'text' : 'password'"
              :rules="rulesUser.password"
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

            <q-input
              v-model="confirmPassword"
              label="Confirmar senha"
              outlined
              :type="showPassword ? 'text' : 'password'"
              :rules="rulesUser.confirmPassword"
            >
              <template #prepend>
                <q-icon name="lock_outline" />
              </template>
            </q-input>
          </q-form>
        </q-step>

        <!-- NAVEGAÇÃO DOS STEPS -->
        <template #navigation>
          <q-stepper-navigation class="q-gutter-sm">
            <!-- Step 1 → próximo -->
            <q-btn
              v-if="step === 1"
              label="Próximo"
              color="primary"
              class="full-width"
              size="lg"
              @click="nextStep"
            />

            <!-- Step 2 → voltar + cadastrar -->
            <template v-if="step === 2">
              <q-btn
                label="Cadastrar"
                color="primary"
                class="full-width"
                size="lg"
                :loading="loading"
                @click="onSubmit"
              />
              <q-btn flat label="Voltar" color="grey-7" class="full-width" @click="step = 1" />
            </template>
          </q-stepper-navigation>
        </template>
      </q-stepper>

      <!-- LINK LOGIN -->
      <div class="text-center q-pb-md">
        <span class="text-grey-6">Já tem conta? </span>
      </div>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserForm } from 'src/composables/useUserForm';
import { ref, toRaw } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';

const router = useRouter();
const $q = useQuasar();
const step = ref(1);
const authStore = useAuthStore();
const loading = ref(false);
const { formUser, formCompany, confirmPassword, showPassword, rulesUser, rulesCompany, resetForm } =
  useUserForm();

const stepEscritorioRef = ref();
const stepUsuarioRef = ref();

async function nextStep() {
  const valid = await stepEscritorioRef.value.validate();
  if (valid) step.value = 2;
}

async function onSubmit() {
  try {
    debugger;
    await authStore.register({
      company: toRaw(formCompany),
      user: toRaw(formUser),
    });
    $q.notify({
      type: 'positive',
      message: 'Cadastro realizado com sucesso',
      position: 'top',
    });
    resetForm();
    await router.push('/');
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Ocorreu um erro ao cadastrar',
      position: 'top',
    });
  }
}
</script>

<style scoped></style>
