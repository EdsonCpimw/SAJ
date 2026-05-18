<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserForm } from 'src/composables/useUserForm';

const router = useRouter();
const $q = useQuasar();
const loading = ref(false);
const formRef = ref();
const {
  formUser,
  confirmPassword,
  showConfirmPassword,
  showPassword,
  rulesUser,
  createUser,
  resetForm,
} = useUserForm();

async function onSubmit() {
  const valid = await formRef.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    await createUser();
    $q.notify({
      type: 'positive',
      message: 'Usuário cadastrado com sucesso!',
      position: 'top',
    });
    resetForm();
    await router.push({ name: 'user-list' });
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao cadastrar usuário', position: 'top' });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <q-page class="q-pa-md">
    <!-- CABEÇALHO -->
    <div class="row items-center q-mb-md">
      <q-btn flat round icon="arrow_back" color="grey-7" @click="router.push({ name: 'users' })" />
      <div class="text-h6 text-weight-bold q-ml-sm">Novo Usuário</div>
    </div>

    <!-- CARD DO FORMULÁRIO — mesmo tamanho da listagem -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium text-grey-8">Dados do usuário</div>
        <div class="text-caption text-grey-5">Preencha todos os campos obrigatórios</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form ref="formRef" class="row q-col-gutter-md">
          <!-- NOME -->
          <div class="col-12 col-md-6">
            <q-input v-model="formUser.name" label="Nome completo" outlined :rules="rulesUser.name">
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>

          <!-- EMAIL -->
          <div class="col-12 col-md-6">
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
          </div>

          <!-- TELEFONE -->
          <div class="col-12 col-md-6">
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
          </div>

          <!-- SENHA -->
          <div class="col-12 col-md-6">
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
          </div>
          <!-- CONFIRMAÇÃO DE SENHA -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="confirmPassword"
              label="Confirme a senha"
              outlined
              :type="showConfirmPassword ? 'text' : 'password'"
              :rules="rulesUser.password"
            >
              <template #prepend>
                <q-icon name="lock" />
              </template>
              <template #append>
                <q-icon
                  :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </q-input>
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <!-- AÇÕES -->
      <q-card-actions class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-7" @click="router.push({ name: 'users' })" />
        <q-space />
        <q-btn label="Salvar" color="primary" icon="save" :loading="loading" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
