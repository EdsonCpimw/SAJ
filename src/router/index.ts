import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { keycloakInitialized } from 'src/boot/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Router.beforeEach((to, _from) => {
    const isPublic = to.meta.public as boolean | undefined;
    const token = localStorage.getItem('token');

    // Aguarda o Keycloak inicializar
    if (!keycloakInitialized) {
      return true;
    }

    if (!isPublic && !token) {
      if (to.path !== '/login') {
        return 'auth/login'; // ← só redireciona se não estiver já no /login
      }

      // Redireciona para a tela de login do keycloak
      // void keycloak.login({
      //   redirectUri: window.location.origin + to.fullPath,
      // });
    }
    return true;
  });

  return Router;
});
