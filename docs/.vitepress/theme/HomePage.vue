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
  <div class="alpine-home">
    <header class="home-header">
      <a class="brand" href="/" aria-label="Alpine.js 日本語ドキュメント ホーム"><span>Alpine.js <small>日本語ドキュメント</small></span></a>
      <nav class="desktop-home-nav" aria-label="メインナビゲーション"><a v-for="item in siteNavigation" :key="item.link" :class="{ active: isActive(item.section) }" :href="item.link">{{ item.text }}</a></nav>
      <div class="header-actions"><button ref="menuButton" class="menu-button" type="button" aria-controls="home-mobile-menu" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'メニューを閉じる' : 'メニューを開く'" @click="menuOpen ? closeMenu() : openMenu()">☰</button><button class="theme-button" type="button" :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'" @click="toggleTheme">{{ isDark ? '☀' : '☾' }}</button></div>
      <nav v-if="menuOpen" id="home-mobile-menu" ref="mobileMenu" class="mobile-home-nav" aria-label="モバイルメニュー" @keydown="handleMenuKeydown"><a v-for="item in siteNavigation" :key="item.link" :class="{ active: isActive(item.section) }" :href="item.link">{{ item.text }}</a><a href="/upgrade-guide">V2からのアップグレード</a></nav>
    </header>
    <main class="home-main">
      <section class="hero-card">
        <div class="hero-copy"><p class="eyebrow">HTML に寄り添う、軽量な JavaScript</p><h1>Alpine.js <em>日本語ドキュメント</em></h1><h2>公式ドキュメントの非公式日本語翻訳サイトです。</h2><p>Alpine.js は、HTML に直接ふれることができる軽量な JavaScript フレームワークです。小さく始めて、必要なところにだけ使えます。</p><div class="hero-actions"><a class="button primary" href="/start-here">▶　ここから始める</a><a class="button secondary" href="https://alpinejs.dev/start-here">◉　原文を見る（英語）</a></div></div>
        <img v-if="isDark" class="hero-image" src="/images/alpaca-hero-dark.png" alt="月明かりのアルプスの山あいに座るアルパカのイラスト">
        <img v-else class="hero-image" src="/images/alpaca-hero.png" alt="アルプスの山あいに座るアルパカのイラスト">
      </section>
      <section class="benefits" aria-label="Alpine.js の特徴">
        <article><span class="feature-icon green">ϟ</span><div><h2>高速で軽量</h2><p>約 10KB の小さなサイズ。軽快に読み込みます。</p></div></article><article><span class="feature-icon purple">&lt;/&gt;</span><div><h2>HTML ファースト</h2><p>特別なビルドは不要。いつもの HTML に書くだけ。</p></div></article><article><span class="feature-icon yellow">✚</span><div><h2>段階的に導入可能</h2><p>必要な部分だけに Alpine.js を追加。</p></div></article><article><span class="feature-icon blue">♥</span><div><h2>シンプルで楽しい</h2><p>学びやすく、使っていて気持ちよい DX 。</p></div></article>
      </section>
      <section class="home-grid">
        <aside class="getting-started"><p class="eyebrow">はじめにおすすめ</p><h2>最初の一歩を、ここから。</h2><p>初めての方は、まずこちらからどうぞ。サンプルを動かしながら学べます。</p><a href="/start-here"><strong>▤　チュートリアル</strong><span>Alpine.js の基本を体験</span></a><a href="/essentials/installation"><strong>▷　インストール</strong><span>すぐ使い始める</span></a></aside>
        <section class="directive-section"><div class="section-heading"><div><p class="eyebrow">よく使う</p><h2>ディレクティブ</h2></div><a href="/directives/data">すべて見る →</a></div><div class="directive-cards"><a href="/directives/data"><b class="mint">✦</b><strong>x-data</strong><code>x-data="{ open: false }"</code><p>コンポーネントのスコープ（状態）を定義します。</p><span>例を見る</span></a><a href="/directives/model"><b class="pink">⌘</b><strong>x-model</strong><code>x-model="message"</code><p>フォーム要素とデータを双方向バインドします。</p><span>例を見る</span></a><a href="/directives/on"><b class="gold">✦</b><strong>x-on</strong><code>x-on:click="doIt()"</code><p>イベントリスナーを簡単に追加できます。</p><span>例を見る</span></a><a href="/directives/show"><b class="coral">◉</b><strong>x-show</strong><code>x-show="open"</code><p>要素の表示・非表示を切り替えます。</p><span>例を見る</span></a></div></section>
      </section>
        <aside class="site-note"><span class="note-icon">◉</span><div><strong>このサイトについて</strong><p>Alpine.js の公式ドキュメントを翻訳した非公式サイトです。内容は原文に準拠していますが、翻訳中の箇所があります。</p></div><a href="https://alpinejs.dev/start-here">原文を見る（英語） ↗</a></aside>
    </main>
  </div>
</template>
