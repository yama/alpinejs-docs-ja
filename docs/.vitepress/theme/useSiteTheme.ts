import { useData } from 'vitepress'

export function useSiteTheme() {
  const { isDark } = useData()

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
