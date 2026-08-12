import DefaultTheme from 'vitepress/theme'
import SiteLayout from './SiteLayout.vue'
import './custom.css'
import './hero-image.css'
import './docs-layout.css'
import './site-chrome.css'
import './typography.css'

export default {
  extends: DefaultTheme,
  Layout: SiteLayout,
}
