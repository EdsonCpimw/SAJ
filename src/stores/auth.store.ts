import { defineStore } from 'pinia';
import axios from 'axios';
import { UserService } from 'src/services/user.service';
import type { ICompanyCreate } from 'src/types/company.types';
import type { IUser } from 'src/types/user/user.types';
import { ref } from 'vue';
import keycloak from 'src/boot/keycloak';
import type { IUserTokenPayload } from 'src/types/user/user-token.types';
import type { IUserKeycloak } from 'src/types/user/user-keyclok.types';

// Decodifica o token
function parseToken(token: string): IUserTokenPayload {
  const base64 = token.split('.')[1];
  const decoded = atob(base64 ?? '');
  return JSON.parse(decoded) as IUserTokenPayload;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const isAuthenticated = ref(keycloak.authenticated ?? false);
  const token = ref<string | null>(keycloak.token ?? null);

  // reconstrói userKeycloak do token salvo no reload
  const storedToken = localStorage.getItem('token');
  const userKeycloak = ref<IUserKeycloak | null>(
    storedToken
      ? (() => {
          const payload = parseToken(storedToken);
          return {
            name: payload.name,
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            userName: payload.preferred_username,
            sub: payload.sub,
          };
        })()
      : null,
  );

  // registro de usuario e empresa
  async function register(payload: ICompanyCreate) {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserService.register(payload);
      user.value = response.user;
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        error.value = data?.message || data?.error || `Erro desconhecido`;
      } else {
        error.value = 'Erro inesperado';
      }
    }
  }
  // Funciona se for usar a tela do keycloak
  // async function login() {
  //   await keycloak.login({
  //     redirectUri: window.location.origin + '/home',
  //   });
  // }

  // Efetua o login e persistencia dos dados no localStorage
  async function login(email: string, password: string) {
    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: 'saj-front', // client público que criamos
      username: email,
      password: password,
    });

    const response = await fetch(
      'http://192.168.0.9:28080/realms/SAJ/protocol/openid-connect/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      },
    );

    if (!response.ok) throw new Error('Credenciais inválidas');

    const data = (await response.json()) as { access_token: string; refresh_token: string };
    const payload = parseToken(data.access_token);
    token.value = data.access_token;
    isAuthenticated.value = true;
    userKeycloak.value = {
      name: payload.name,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      userName: payload.preferred_username,
      sub: payload.sub,
    };
    console.log('Data: ', data);
    console.log('userKeycloak: ', userKeycloak);

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  // Remove os dados do localStorage e desloga no keycloak e redireciona para tela de login
  async function logout() {
    const refreshToken = localStorage.getItem('refresh_token'); // lê ANTES de remover

    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    isAuthenticated.value = false;
    token.value = null;
    user.value = null;

    if (refreshToken) {
      await fetch('http://192.168.0.9:28080/realms/SAJ/protocol/openid-connect/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: 'saj-front',
          refresh_token: refreshToken,
        }),
      }).catch(() => {});
    }
    window.location.href = '/auth/login';
  }

  // Funciona se for usar a tela do keycloak
  // async function logout() {
  //   await keycloak.logout({
  //     redirectUri: window.location.origin,
  //   });
  // }

  // function loadUser() {
  //   isAuthenticated.value = keycloak.authenticated ?? false;
  //   token.value = keycloak.token ?? null;
  //   user.value = (keycloak.tokenParsed as IUser) ?? null;
  // }
  return {
    user,
    userKeycloak,
    loading,
    error,
    isAuthenticated,
    token,
    register,
    login,
    logout,
    // loadUser,
  };
});
