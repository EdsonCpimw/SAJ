import { boot } from 'quasar/wrappers';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

const api = axios.create({
  // baseURL: process.env.API_URL ?? 'http://localhost:2000',
  // baseURL: process.env.API_URL ?? 'http://192.168.0.2:8080/api/v1',
  baseURL: process.env.API_URL ?? 'http://localhost:8080/api/v1',
});

api.interceptors.response.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.reponse?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(new Error('Erro'));
  },
);

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
});

export { api };
