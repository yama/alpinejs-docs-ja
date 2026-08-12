import { onMounted, ref } from 'vue'

const themeStorageKey = 'alpine-docs-theme'

export function useSiteTheme() {
  const isDark = ref(false)

  function applyTheme(dark: boolean) {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
  }

  function toggleTheme() {
    const next = !isDark.value
    applyTheme(next)
    localStorage.setItem(themeStorageKey, next ? 'dark' : 'light')
  }

  onMounted(() => {
    const stored = localStorage.getItem(themeStorageKey)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(stored ? stored === 'dark' : prefersDark)
  })

  return { isDark, toggleTheme }
}
