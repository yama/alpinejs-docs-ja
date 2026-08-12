<script setup lang="ts">
import { useSiteTheme } from './useSiteTheme'

const { isDark, toggleTheme } = useSiteTheme()
</script>

<template>
  <header class="docs-header">
    <a class="brand" href="/" aria-label="Alpine.js 日本語ドキュメント ホーム">
      <span>Alpine.js <small>日本語ドキュメント</small></span>
    </a>
    <nav aria-label="メインナビゲーション">
      <a class="active" href="/start-here">はじめに</a>
      <a href="/essentials/installation">エッセンシャル</a>
      <a href="/directives/data">ディレクティブ</a>
      <a href="/magics/el">マジック</a>
      <a href="/globals/alpine-data">グローバル</a>
      <a href="/plugins/mask">プラグイン</a>
      <a href="/advanced/csp">アドバンス</a>
    </nav>
    <div class="header-actions">
      <button class="theme-button" type="button" :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'" @click="toggleTheme">{{ isDark ? '☀' : '☾' }}</button>
    </div>
  </header>
</template>
