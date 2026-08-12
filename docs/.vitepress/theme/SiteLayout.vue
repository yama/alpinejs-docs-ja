<script setup lang="ts">
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePage from './HomePage.vue'
import DocsHeader from './DocsHeader.vue'
import DocsSidebar from './DocsSidebar.vue'

const route = useRoute()
</script>

<template>
  <HomePage v-if="route.path === '/'" />
  <template v-else>
    <DocsHeader />
    <DocsSidebar />
    <DefaultTheme.Layout />
  </template>
</template>
