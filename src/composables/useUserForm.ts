import { reactive, ref } from 'vue';
import type { IUserCreate } from 'src/types/user.types';

export function useUserForm() {
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
  const confirmPassword = ref('');
  const showPassword = ref(false);

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
    formUser.name = '';
    formUser.email = '';
    formUser.phone = '';
    formUser.password = '';
    confirmPassword.value = '';
    formCompany.name = '';
    formCompany.document = '';
  }

  return {
    formUser,
    formCompany,
    confirmPassword,
    showPassword,
    rulesUser,
    rulesCompany,
    resetForm,
  };
}
