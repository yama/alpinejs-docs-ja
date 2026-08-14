<script setup lang="ts">
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomePage from './HomePage.vue'

const route = useRoute()
</script>

<template>
  <HomePage v-if="route.path === '/'" />
  <DefaultTheme.Layout v-else />
</template>
