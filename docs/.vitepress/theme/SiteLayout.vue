<script setup lang="ts">
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePage from './HomePage.vue'
import MobileBottomNav from './MobileBottomNav.vue'

const route = useRoute()
</script>

<template>
  <HomePage v-if="route.path === '/'" />
  <DefaultTheme.Layout v-else>
    <template #doc-after>
      <MobileBottomNav />
    </template>
  </DefaultTheme.Layout>
</template>
