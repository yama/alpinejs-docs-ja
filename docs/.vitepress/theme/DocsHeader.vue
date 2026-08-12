<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useSiteTheme } from './useSiteTheme'

const { isDark, toggleTheme } = useSiteTheme()
const route = useRoute()

function isActive(section: string) {
  return route.path === section || route.path.startsWith(`${section}/`)
}
</script>

<template>
  <header class="docs-header">
    <a class="brand" href="/" aria-label="Alpine.js 日本語ドキュメント ホーム">
      <span>Alpine.js <small>日本語ドキュメント</small></span>
    </a>
    <nav aria-label="メインナビゲーション">
      <a :class="{ active: isActive('/start-here') }" href="/start-here">はじめに</a>
      <a :class="{ active: isActive('/essentials') }" href="/essentials/installation">エッセンシャル</a>
      <a :class="{ active: isActive('/directives') }" href="/directives/data">ディレクティブ</a>
      <a :class="{ active: isActive('/magics') }" href="/magics/el">マジック</a>
      <a :class="{ active: isActive('/globals') }" href="/globals/alpine-data">グローバル</a>
      <a :class="{ active: isActive('/plugins') }" href="/plugins/mask">プラグイン</a>
      <a :class="{ active: isActive('/advanced') }" href="/advanced/csp">アドバンス</a>
    </nav>
    <div class="header-actions">
      <button class="theme-button" type="button" :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'" @click="toggleTheme">{{ isDark ? '☀' : '☾' }}</button>
    </div>
  </header>
</template>
