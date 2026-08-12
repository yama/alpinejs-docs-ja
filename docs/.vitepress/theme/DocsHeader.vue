<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vitepress'
import { useSiteTheme } from './useSiteTheme'
import { siteNavigation } from './site-navigation'

const { isDark, toggleTheme } = useSiteTheme()
const route = useRoute()
const menuOpen = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const mobileMenu = useTemplateRef<HTMLElement>('mobileMenu')

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
    <nav v-if="menuOpen" id="docs-mobile-menu" ref="mobileMenu" class="docs-mobile-nav" aria-label="モバイルメニュー" @click="menuOpen = false" @keydown="handleMenuKeydown">
      <a v-for="item in siteNavigation" :key="item.link" :class="{ active: isActive(item.section) }" :href="item.link">{{ item.text }}</a>
      <a href="/upgrade-guide">V2からのアップグレード</a>
    </nav>
  </header>
</template>
