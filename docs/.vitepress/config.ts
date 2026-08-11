import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ja',
  title: 'Alpine.js 日本語ドキュメント',
  description: 'Alpine.js公式ドキュメントの非公式日本語版',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'Essentials', link: '/essentials/installation' },
    ],
    sidebar: [
      {
        text: 'Essentials',
        items: [
          { text: 'インストール', link: '/essentials/installation' },
        ],
      },
    ],
    outline: 2,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yama/alpinejs-docs-ja' },
    ],
  },
})
