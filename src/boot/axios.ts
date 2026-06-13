import { boot } from 'quasar/wrappers';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth.store';
// import keycloak from './keycloak';

const { refreshAccessToken, logout, token } = useAuthStore();

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

const api = axios.create({
  // baseURL: process.env.API_URL ?? 'http://localhost:2000',
  // baseURL: process.env.API_URL ?? 'http://192.168.0.2:8080/api/v1',
  baseURL: process.env.API_URL ?? 'http://localhost:8080/api/v1',
  // baseURL: process.env.API_URL ?? 'http://192.168.0.5:8080/api/v1',
});

// api.interceptors.request.use(async (config) => {
//   if (keycloak.token) {
//     await keycloak.updateToken(30);
//     config.headers.Authorization = `Bearer ${keycloak.token}`;
//   }
//   return config;
// });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        console.log('RENOVANDO TOKEN: ');
        await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${token}`;
        return api.request(error.config);
      } catch {
        await logout();
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
});

export { api };
