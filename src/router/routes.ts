import { ROUTE_NAMES } from 'src/constants/routes.constants';
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
    meta: { public: true },
    children: [{ path: 'register', component: () => import('pages/auth/RegisterPage.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { public: true },
    children: [{ path: 'login', component: () => import('pages/auth/LoginPage.vue') }],
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
        name: ROUTE_NAMES.PROCESS_LIST,
        component: () => import('pages/process/ListProcess.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'folder_open' },
          ],
        },
      },
      {
        path: 'create',
        name: ROUTE_NAMES.PROCESS_CREATE,
        component: () => import('pages/process/ProcessForm.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'folder_open', to: { name: 'process-list' } },
            { label: 'Cadastro de processos', icon: 'gavel' },
          ],
        },
      },
      {
        path: 'edit/:id',
        name: ROUTE_NAMES.PROCESS_EDIT,
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
  /*
   * ROTAS DE MOVIMENTAÇÃO DE PROCESSOS
   */
  {
    path: '/process/:processId/movements',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.PROCESS_MOVEMENT_LIST,
        component: () => import('pages/process/ProcessMovement.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'folder_open', to: { name: ROUTE_NAMES.PROCESS_LIST } },
            { label: 'Movimentação de processos', icon: 'folder_open' },
          ],
        },
      },
      {
        path: 'create',
        name: ROUTE_NAMES.PROCESS_MOVEMENT_CREATE,
        component: () => import('pages/process/ProcessMovementForm.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'folder_open', to: { name: ROUTE_NAMES.PROCESS_LIST } },
            { label: 'Cadastro de movimentação de processos', icon: 'gavel' },
          ],
        },
      },
      {
        path: 'edit/:id',
        name: ROUTE_NAMES.PROCESS_MOVEMENT_EDIT,
        component: () => import('pages/process/ProcessMovementForm.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Processos', icon: 'folder_open', to: { name: ROUTE_NAMES.PROCESS_LIST } },
            { label: 'Alteração de movimentação do processo', icon: 'edit' },
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
