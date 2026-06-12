import { boot } from 'quasar/wrappers';

export let keycloakInitialized = false;

export default boot(() => {
  keycloakInitialized = true; // apenas marca como inicializado
});
