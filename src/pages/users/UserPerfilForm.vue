<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserForm } from '../../composables/users/useUserForm';
import { UserService } from 'src/services/user.service';
import { ROUTE_NAMES } from 'src/constants/routes.constants';

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const loading = ref(false);
const formRef = ref();
const { formUserPerfil, rulesUserPerfil, resetForm, fillPerfilForm, updateUserPerfil } =
  useUserForm();

const isProfile = computed(() => route.name == ROUTE_NAMES.USER_EDIT_PROFILE);

onMounted(async () => {
  if (isProfile.value) {
    const userPerfil = await UserService.findUserPerfil();
    fillPerfilForm(userPerfil);
  }
});

function goBack() {
  void router.push({ name: 'user-list' });
}

async function onSubmit() {
  const valid = await formRef.value.validate();
  if (!valid) return;
  try {
    await updateUserPerfil();
    $q.notify({
      type: 'positive',
      message: 'Perfil atualizado com sucesso!',
      position: 'top',
    });
    resetForm();
    await router.push({ name: 'user-list' });
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Erro ao atualizar o perfil de usuário',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <q-page class="q-pa-md">
    <!-- CABEÇALHO -->
    <div class="row items-center q-mb-md">
      <q-btn flat round icon="arrow_back" color="grey-7" @click="goBack" />
      <div class="text-h6 text-weight-bold q-ml-sm">Editar Perfil</div>
    </div>

    <!-- CARD DO FORMULÁRIO — mesmo tamanho da listagem -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium text-grey-8">
          Editar informações de perfil
        </div>
        <div class="text-caption text-grey-5">Preencha todos os campos obrigatórios</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form ref="formRef" class="row q-col-gutter-md">
          <!-- NOME -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formUserPerfil.name"
              label="Nome completo"
              outlined
              :rules="rulesUserPerfil.name"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!-- SOBRENOME -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formUserPerfil.lastName"
              label="Nome completo"
              outlined
              :rules="rulesUserPerfil.name"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!-- TELEFONE -->
          <div class="col-12 col-md-6">
            <q-input
              v-model="formUserPerfil.phone"
              label="Telefone"
              outlined
              mask="(##) #####-####"
              :rules="rulesUserPerfil.phone"
            >
              <template #prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <!-- AÇÕES -->
      <q-card-actions class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-7" @click="goBack" />
        <q-space />
        <q-btn label="Atualizar" color="primary" icon="save" :loading="loading" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
