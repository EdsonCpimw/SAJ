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
        component: () => import('pages/users/CreateUser.vue'),
        meta: {
          breadcrumbs: [
            { label: 'Home', icon: 'home', to: '/' },
            { label: 'Usuários', icon: 'people', to: { name: 'user-list' } },
            { label: 'Novo usuário', icon: 'person_add' },
          ],
        },
      },
    ],
  },

  // {
  //   path: '/users/:id',
  //   name: 'user-detail',
  //   component: () => import('pages/users/UserDetailPage.vue'),
  // },
  // {
  //   path: '/users/:id/edit',
  //   name: 'user-edit',
  //   component: () => import('pages/users/UserEditPage.vue'),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
