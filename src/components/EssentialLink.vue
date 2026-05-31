<template>
  <!-- COM SUBMENUS -->
  <q-expansion-item
    v-if="children?.length"
    :icon="icon"
    :label="title"
    :caption="caption"
    expand-separator
  >
    <q-item
      v-for="child in children"
      :key="child.title"
      clickable
      v-ripple
      :to="child.link"
      class="q-pl-xl"
    >
      <q-item-section avatar>
        <q-icon :name="child.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ child.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>

  <!-- SEM SUBMENUS -->
  <q-item v-else clickable v-ripple :to="link">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  children?: EssentialLinkProps[];
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
