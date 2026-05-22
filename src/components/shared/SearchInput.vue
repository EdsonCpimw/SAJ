<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    debounce?: number;
  }>(),
  {
    placeholder: 'Buscar...',
    debounce: 300,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const localValue = ref(props.modelValue);

let timer: ReturnType<typeof setTimeout>;

watch(localValue, (value) => {
  debugger;
  clearTimeout(timer);
  timer = setTimeout(() => {
    emit('update:modelValue', value);
  }, props.debounce);
});

watch(
  () => props.modelValue,
  (value) => {
    debugger;
    localValue.value = value;
  },
);
</script>

<template>
  <q-input v-model="localValue" outlined dense clearable :placeholder="placeholder">
    <template #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>
