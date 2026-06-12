import { useQuasar } from 'quasar';
import { ref } from 'vue';

export function useDarkMode() {
  const $q = useQuasar();
  const leftDrawerOpen = ref(false);

  function toggleDark() {
    $q.dark.toggle();
    localStorage.setItem('darkMode', String($q.dark.isActive));
  }

  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }

  return {
    leftDrawerOpen,
    toggleDark,
    toggleLeftDrawer,
  };
}
