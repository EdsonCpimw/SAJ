import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: 'register', component: () => import('pages/auth/RegisterPage.vue') }],
  },
  /*
   * ROTAS DE USUÁRIOS
   */
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'user-list',
        component: () => import('pages/users/ListUsers.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Usuários', icon: 'people' },
          ],
        },
      },
      {
        path: 'create',
        name: 'user-create',
        component: () => import('pages/users/UserForm.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Usuários', icon: 'people', to: { name: 'user-list' } },
            { label: 'Novo usuário', icon: 'person_add' },
          ],
        },
      },
      {
        path: 'edit/:id',
        name: 'user-edit',
        component: () => import('pages/users/UserForm.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Usuários', icon: 'people', to: { name: 'user-list' } },
            { label: 'Editar Usuário', icon: 'edit' },
          ],
        },
      },
    ],
  },
  /*
   * ROTAS DE PROCESSOS
   */
  {
    path: '/process',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'process-list',
        component: () => import('pages/process/ListProcess.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'people' },
          ],
        },
      },
      {
        path: 'create',
        name: 'process-create',
        component: () => import('pages/process/ProcessForm.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'people', to: { name: 'process-list' } },
            { label: 'Cadastro de processos', icon: 'person_add' },
          ],
        },
      },
      {
        path: 'edit/:id',
        name: 'process-edit',
        component: () => import('pages/process/ProcessForm.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'people', to: { name: 'process-list' } },
            { label: 'Editar Processos', icon: 'edit' },
          ],
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
