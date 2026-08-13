import { defineConfig } from 'vitepress'

const siteUrl = 'https://alpinejs-docs-ja.kyms.jp'
const siteTitle = 'Alpine.js 日本語ドキュメント'
const siteDescription = 'Alpine.js公式ドキュメントの非公式日本語版'
const ogpImageUrl = new URL('/images/ogp.png', siteUrl).toString()

export default defineConfig({
  lang: 'ja',
  title: siteTitle,
  description: siteDescription,
  transformHead({ pageData }) {
    const pagePath = pageData.relativePath === 'index.md'
      ? '/'
      : `/${pageData.relativePath.replace(/\.md$/, '')}`
    const pageUrl = new URL(pagePath, siteUrl).toString()
    const pageTitle = pageData.title || siteTitle
    const title = pageData.relativePath === 'index.md'
      ? siteTitle
      : `${pageTitle} | ${siteTitle}`
    const type = pageData.relativePath === 'index.md' ? 'website' : 'article'
    const description = pageData.description || siteDescription

    return [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:type', content: type }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: ogpImageUrl }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:image', content: ogpImageUrl }],
    ]
  },
  cleanUrls: true,
  appearance: true,
  themeConfig: {
    nav: [
      { text: 'はじめに', link: '/start-here' },
      { text: 'エッセンシャル', link: '/essentials/installation' },
      { text: 'ディレクティブ', link: '/directives/data' },
      { text: 'マジック', link: '/magics/el' },
      { text: 'グローバル', link: '/globals/alpine-data' },
      { text: 'プラグイン', link: '/plugins/mask' },
      { text: 'アドバンス', link: '/advanced/csp' },
    ],
    sidebar: [
      {
        text: 'ここから始める',
        items: [
          { text: 'はじめに', link: '/start-here' },
        ],
      },
      {
        text: 'エッセンシャル',
        items: [
          { text: 'インストール', link: '/essentials/installation' },
          { text: '状態', link: '/essentials/state' },
          { text: 'テンプレート', link: '/essentials/templating' },
          { text: 'イベント', link: '/essentials/events' },
          { text: 'ライフサイクル', link: '/essentials/lifecycle' },
        ],
      },
      {
        text: 'UIコンポーネント',
        items: [
          { text: 'Alpine UI Components', link: 'https://alpinejs.dev/components', external: true },
        ],
      },
      {
        text: 'ディレクティブ',
        items: [
          { text: 'x-data', link: '/directives/data' },
          { text: 'x-init', link: '/directives/init' },
          { text: 'x-show', link: '/directives/show' },
          { text: 'x-bind', link: '/directives/bind' },
          { text: 'x-on', link: '/directives/on' },
          { text: 'x-text', link: '/directives/text' },
          { text: 'x-html', link: '/directives/html' },
          { text: 'x-model', link: '/directives/model' },
          { text: 'x-modelable', link: '/directives/modelable' },
          { text: 'x-for', link: '/directives/for' },
          { text: 'x-transition', link: '/directives/transition' },
          { text: 'x-effect', link: '/directives/effect' },
          { text: 'x-ignore', link: '/directives/ignore' },
          { text: 'x-ref', link: '/directives/ref' },
          { text: 'x-cloak', link: '/directives/cloak' },
          { text: 'x-teleport', link: '/directives/teleport' },
          { text: 'x-if', link: '/directives/if' },
          { text: 'x-id', link: '/directives/id' },
        ],
      },
      {
        text: 'マジック',
        items: [
          { text: '$el', link: '/magics/el' },
          { text: '$refs', link: '/magics/refs' },
          { text: '$store', link: '/magics/store' },
          { text: '$watch', link: '/magics/watch' },
          { text: '$dispatch', link: '/magics/dispatch' },
          { text: '$nextTick', link: '/magics/nextTick' },
          { text: '$root', link: '/magics/root' },
          { text: '$data', link: '/magics/data' },
          { text: '$id', link: '/magics/id' },
        ],
      },
      {
        text: 'グローバル',
        items: [
          { text: 'Alpine.data', link: '/globals/alpine-data' },
          { text: 'Alpine.store', link: '/globals/alpine-store' },
          { text: 'Alpine.bind', link: '/globals/alpine-bind' },
        ],
      },
      {
        text: 'プラグイン',
        items: [
          { text: 'Mask', link: '/plugins/mask' },
          { text: 'Intersect', link: '/plugins/intersect' },
          { text: 'Resize', link: '/plugins/resize' },
          { text: 'Persist', link: '/plugins/persist' },
          { text: 'Focus', link: '/plugins/focus' },
          { text: 'Collapse', link: '/plugins/collapse' },
          { text: 'Anchor', link: '/plugins/anchor' },
          { text: 'Morph', link: '/plugins/morph' },
          { text: 'Sort', link: '/plugins/sort' },
        ],
      },
      {
        text: 'アドバンス',
        items: [
          { text: 'CSP', link: '/advanced/csp' },
          { text: 'Reactivity', link: '/advanced/reactivity' },
          { text: 'Extending', link: '/advanced/extending' },
          { text: 'Async', link: '/advanced/async' },
          { text: 'V2からのアップグレード', link: '/upgrade-guide' },
        ],
      },
    ],
    outline: 2,
  },
})
