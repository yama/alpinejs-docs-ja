import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ja',
  title: 'Alpine.js 日本語ドキュメント',
  description: 'Alpine.js公式ドキュメントの非公式日本語版',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'Start Here', link: '/start-here' },
      { text: 'Essentials', link: '/essentials/installation' },
      { text: 'Directives', link: '/directives/data' },
    ],
    sidebar: [
      {
        text: 'はじめに',
        items: [
          { text: 'ここから始める', link: '/start-here' },
        ],
      },
      {
        text: 'Essentials',
        items: [
          { text: 'インストール', link: '/essentials/installation' },
          { text: 'イベント', link: '/essentials/events' },
          { text: 'ライフサイクル', link: '/essentials/lifecycle' },
          { text: '状態', link: '/essentials/state' },
          { text: 'テンプレート', link: '/essentials/templating' },
        ],
      },
      {
        text: 'Directives',
        items: [
          { text: 'x-data', link: '/directives/data' },
          { text: 'x-show', link: '/directives/show' },
          { text: 'x-model', link: '/directives/model' },
          { text: 'x-on', link: '/directives/on' },
          { text: 'x-text', link: '/directives/text' },
          { text: 'x-for', link: '/directives/for' },
          { text: 'x-effect', link: '/directives/effect' },
          { text: 'x-cloak', link: '/directives/cloak' },
          { text: 'x-ignore', link: '/directives/ignore' },
          { text: 'x-id', link: '/directives/id' },
          { text: 'x-ref', link: '/directives/ref' },
          { text: 'x-html', link: '/directives/html' },
          { text: 'x-if', link: '/directives/if' },
          { text: 'x-modelable', link: '/directives/modelable' },
          { text: 'x-init', link: '/directives/init' },
          { text: 'x-teleport', link: '/directives/teleport' },
          { text: 'x-transition', link: '/directives/transition' },
          { text: 'x-bind', link: '/directives/bind' },
        ],
      },
      {
        text: 'Plugins',
        items: [
          { text: 'Anchor', link: '/plugins/anchor' },
          { text: 'Collapse', link: '/plugins/collapse' },
          { text: 'Resize', link: '/plugins/resize' },
        ],
      },
      {
        text: 'Magics',
        items: [
          { text: '$data', link: '/magics/data' },
          { text: '$dispatch', link: '/magics/dispatch' },
          { text: '$id', link: '/magics/id' },
          { text: '$el', link: '/magics/el' },
          { text: '$refs', link: '/magics/refs' },
          { text: '$nextTick', link: '/magics/nextTick' },
          { text: '$store', link: '/magics/store' },
          { text: '$watch', link: '/magics/watch' },
          { text: '$root', link: '/magics/root' },
        ],
      },
      {
        text: 'Globals',
        items: [
          { text: 'Alpine.data', link: '/globals/alpine-data' },
          { text: 'Alpine.bind', link: '/globals/alpine-bind' },
          { text: 'Alpine.store', link: '/globals/alpine-store' },
        ],
      },
    ],
    outline: 2,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yama/alpinejs-docs-ja' },
    ],
  },
})
