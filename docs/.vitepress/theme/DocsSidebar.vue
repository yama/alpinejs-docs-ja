<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  Blocks,
  BookOpen,
  Code2,
  ExternalLink,
  FileText,
  Flag,
  Globe2,
  House,
  Package,
  Rocket,
  Sparkles,
  Star,
} from '@lucide/vue'

type SidebarItem = { text: string; link: string; external?: boolean }
type SidebarGroup = { text: string; items: SidebarItem[] }

const { theme } = useData()
const route = useRoute()
const groups = computed(() => (theme.value.sidebar ?? []) as SidebarGroup[])

const groupIcons: Record<string, Component> = {
  'ここから始める': Flag,
  'エッセンシャル': Star,
  'UIコンポーネント': Blocks,
  'ディレクティブ': Code2,
  'マジック': Sparkles,
  'グローバル': Globe2,
  'プラグイン': Package,
  'アドバンス': Rocket,
}

function itemIcon(group: SidebarGroup, item: SidebarItem): Component {
  if (item.external) return ExternalLink
  if (group.text === 'ここから始める') return House
  if (group.text === 'ディレクティブ') return Code2
  if (group.text === 'プラグイン') return Package
  if (group.text === 'マジック') return Sparkles
  if (group.text === 'グローバル') return Globe2
  if (item.link === '/essentials') return BookOpen
  return FileText
}

function groupClass(group: SidebarGroup) {
  return group.text
    .replace('ここから始める', 'start')
    .replace('エッセンシャル', 'essentials')
    .replace('UIコンポーネント', 'ui-components')
    .replace('ディレクティブ', 'directives')
    .replace('マジック', 'magics')
    .replace('グローバル', 'globals')
    .replace('プラグイン', 'plugins')
    .replace('アドバンス', 'advanced')
}
</script>

<template>
  <aside class="docs-sidebar" aria-label="ドキュメントの目次">
    <section v-for="group in groups" :key="group.text" class="docs-sidebar-group" :class="groupClass(group)">
      <h2><component :is="groupIcons[group.text] ?? Blocks" :size="18" stroke-width="1.8" />{{ group.text }}</h2>
      <a
        v-for="item in group.items"
        :key="item.link"
        :href="item.link"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noreferrer' : undefined"
        :class="{ active: route.path === item.link }"
      >
        <component :is="itemIcon(group, item)" :size="15" stroke-width="1.7" />
        <span>{{ item.text }}</span>
      </a>
    </section>
  </aside>
</template>
