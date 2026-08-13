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
      <button class="theme-toggle" :class="{ 'is-dark': isDark }" type="button" :aria-pressed="isDark" :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'" @click="toggleTheme"><span class="theme-toggle-track" aria-hidden="true"><svg class="theme-toggle-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg><svg class="theme-toggle-moon" viewBox="0 0 24 24"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.6 8.6 0 1 0 12 12Z" /></svg><span class="theme-toggle-thumb" /></span></button>
      <a class="github-link" href="https://github.com/yama/alpinejs-docs-ja" target="_blank" rel="noopener noreferrer" aria-label="GitHubリポジトリを開く"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.28c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg></a>
    </div>
    <nav v-if="menuOpen" id="docs-mobile-menu" ref="mobileMenu" class="docs-mobile-nav" aria-label="モバイルメニュー" @keydown="handleMenuKeydown">
      <section v-for="group in sidebarGroups" :key="group.text" class="docs-mobile-nav-group">
        <h2>{{ group.text }}</h2>
        <a v-for="item in group.items" :key="item.link" :href="item.link" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined" @click="closeMenu">{{ item.text }}</a>
      </section>
    </nav>
  </header>
</template>
