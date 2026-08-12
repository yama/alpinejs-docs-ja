export type SiteNavItem = {
  text: string
  link: string
  section: string
}

export const siteNavigation: SiteNavItem[] = [
  { text: 'はじめに', link: '/start-here', section: '/start-here' },
  { text: 'エッセンシャル', link: '/essentials/installation', section: '/essentials' },
  { text: 'ディレクティブ', link: '/directives/data', section: '/directives' },
  { text: 'マジック', link: '/magics/el', section: '/magics' },
  { text: 'グローバル', link: '/globals/alpine-data', section: '/globals' },
  { text: 'プラグイン', link: '/plugins/mask', section: '/plugins' },
  { text: 'アドバンス', link: '/advanced/csp', section: '/advanced' },
]
