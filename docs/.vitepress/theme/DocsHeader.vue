<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useSiteTheme } from './useSiteTheme'
import { siteNavigation } from './site-navigation'

const { isDark, toggleTheme } = useSiteTheme()
const { theme } = useData()
const route = useRoute()
const menuOpen = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const mobileMenu = useTemplateRef<HTMLElement>('mobileMenu')
const sidebarGroups = computed(() => (theme.value.sidebar ?? []) as SidebarGroup[])
let desktopViewport: MediaQueryList | undefined

type SidebarItem = { text: string; link: string; external?: boolean }
type SidebarGroup = { text: string; items: SidebarItem[] }

function isActive(section: string) {
  return route.path === section || route.path.startsWith(`${section}/`)
}

async function openMenu() {
  menuOpen.value = true
  await nextTick()
  mobileMenu.value?.querySelector<HTMLAnchorElement>('a')?.focus()
}

function closeMenu() {
  menuOpen.value = false
  menuButton.value?.focus()
}

function handleMenuKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

function handleViewportChange(event: MediaQueryListEvent) {
  if (event.matches) menuOpen.value = false
}

onMounted(() => {
  desktopViewport = window.matchMedia('(min-width: 1101px)')
  desktopViewport.addEventListener('change', handleViewportChange)
})

onBeforeUnmount(() => desktopViewport?.removeEventListener('change', handleViewportChange))
</script>

<template>
  <header class="docs-header">
    <a class="brand" href="/" aria-label="Alpine.js 日本語ドキュメント ホーム">
      <span>Alpine.js <small>日本語ドキュメント</small></span>
    </a>
    <nav class="desktop-docs-nav" aria-label="メインナビゲーション">
      <a v-for="item in siteNavigation" :key="item.link" :class="{ active: isActive(item.section) }" :href="item.link">{{ item.text }}</a>
    </nav>
    <div class="header-actions">
      <button ref="menuButton" class="docs-menu-button" type="button" aria-controls="docs-mobile-menu" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'メニューを閉じる' : 'メニューを開く'" @click="menuOpen ? closeMenu() : openMenu()">☰</button>
      <button class="theme-button" type="button" :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'" @click="toggleTheme">{{ isDark ? '☀' : '☾' }}</button>
    </div>
    <nav v-if="menuOpen" id="docs-mobile-menu" ref="mobileMenu" class="docs-mobile-nav" aria-label="モバイルメニュー" @keydown="handleMenuKeydown">
      <section v-for="group in sidebarGroups" :key="group.text" class="docs-mobile-nav-group">
        <h2>{{ group.text }}</h2>
        <a v-for="item in group.items" :key="item.link" :href="item.link" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined" @click="closeMenu">{{ item.text }}</a>
      </section>
    </nav>
  </header>
</template>
