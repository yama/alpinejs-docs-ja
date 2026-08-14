<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useLocalNav } from 'vitepress/theme'

type SidebarItem = { text: string; link: string; external?: boolean }
type SidebarGroup = { items?: SidebarItem[] }

const { theme } = useData()
const route = useRoute()
const { headers } = useLocalNav()
const outlineOpen = ref(false)

const pageItems = computed(() => {
  const groups = Array.isArray(theme.value.sidebar) ? theme.value.sidebar as SidebarGroup[] : []
  return groups.flatMap(group => group.items ?? []).filter(item => !item.external)
})

const currentIndex = computed(() => pageItems.value.findIndex(item => item.link === route.path))
const previous = computed(() => currentIndex.value > 0 ? pageItems.value[currentIndex.value - 1] : undefined)
const next = computed(() => currentIndex.value >= 0 ? pageItems.value[currentIndex.value + 1] : undefined)

function toggleMenu() {
  document.querySelector<HTMLButtonElement>('.VPLocalNav .menu')?.click()
}

function closeOutline() {
  outlineOpen.value = false
}
</script>

<template>
  <nav class="mobile-bottom-nav" aria-label="ページナビゲーション">
    <button type="button" aria-label="サイドメニューを開く" @click="toggleMenu">
      <span aria-hidden="true">☰</span>
      <span>メニュー</span>
    </button>
    <a v-if="previous" class="mobile-bottom-nav-page previous" :href="previous.link" aria-label="前のページ">
      <span aria-hidden="true">‹</span>
      <span>前へ</span>
    </a>
    <button type="button" :disabled="!headers.length" :aria-expanded="outlineOpen" aria-controls="mobile-bottom-outline" @click="headers.length && (outlineOpen = !outlineOpen)">
      <span>目次</span>
      <span aria-hidden="true">⌃</span>
    </button>
    <a v-if="next" class="mobile-bottom-nav-page next" :href="next.link" aria-label="次のページ">
      <span>次へ</span>
      <span aria-hidden="true">›</span>
    </a>
    <div v-if="outlineOpen" id="mobile-bottom-outline" class="mobile-bottom-outline">
      <a v-for="header in headers" :key="header.link" :href="header.link" :class="`level-${header.level}`" @click="closeOutline">{{ header.title }}</a>
    </div>
  </nav>
</template>
