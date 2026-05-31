import { reactive, ref } from 'vue';
import type { IUser, IUserCreate } from 'src/types/user/user.types';
import axios from 'axios';
import { UserService } from 'src/services/user.service';

export function useUserForm() {
  const confirmPassword = ref('');
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const user = ref<IUser | null>(null);

  const formCompany = reactive({
    name: '',
    document: '',
  });

  const rulesCompany = {
    name: [
      (v: string) => !!v || 'Nome do escritório é obrigatório',
      (v: string) => v.length >= 3 || 'Mínimo 3 caracteres',
    ],
    document: [
      (v: string) => !!v || 'CNPJ é obrigatório',
      (v: string) => v.length === 18 || 'CNPJ inválido',
    ],
  };

  const formUser = reactive<IUserCreate>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const rulesUser = {
    name: [
      (v: string) => !!v || 'Nome é obrigatório',
      (v: string) => v.length >= 3 || 'Mínimo de 3 caracteres',
    ],
    email: [
      (v: string) => !!v || 'Email é obrigatório',
      (v: string) => /.+@.+\..+/.test(v) || 'Email inválido',
    ],
    phone: [
      (v: string) => !!v || 'Telefone é obrigatório',
      (v: string) => v.length >= 10 || 'Telefone inválido',
    ],
    password: [
      (v: string) => !!v || 'Senha é obrigatória',
      (v: string) => v.length >= 6 || 'Mínimo de 6 caracteres',
    ],
    confirmPassword: [
      (v: string) => !!v || 'Confirme a senha',
      (v: string) => v === formUser.password || 'As senhas não coincidem',
    ],
  };

  function resetForm() {
    resetFormUser();
    resetFormCompany();
  }

  function resetFormUser() {
    formUser.name = '';
    formUser.email = '';
    formUser.phone = '';
    formUser.password = '';
    confirmPassword.value = '';
  }

  function resetFormCompany() {
    formCompany.name = '';
    formCompany.document = '';
  }

  async function createUser() {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserService.saveUser(formUser);
      user.value = response;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }

  async function updateUser(id: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserService.updateUserById(id, formUser);
      user.value = response;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }

  function fillForm(user: IUser) {
    formUser.name = user.name;
    formUser.email = user.email;
    formUser.phone = user.phone;
  }

  return {
    formUser,
    formCompany,
    confirmPassword,
    showConfirmPassword,
    showPassword,
    rulesUser,
    rulesCompany,
    resetForm,
    resetFormUser,
    resetFormCompany,
    createUser,
    fillForm,
    updateUser,
  };
}
