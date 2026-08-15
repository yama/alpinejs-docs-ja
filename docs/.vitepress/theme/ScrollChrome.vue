<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

let mediaQuery: MediaQueryList | undefined
let previousScrollY = 0
let ticking = false

function setHidden(hidden: boolean) {
  document.documentElement.classList.toggle('site-chrome-hidden', hidden)
}

function updateVisibility() {
  ticking = false

  if (!mediaQuery?.matches) {
    setHidden(false)
    previousScrollY = window.scrollY
    return
  }

  const currentScrollY = window.scrollY
  const isScrollingDown = currentScrollY > previousScrollY
  const isAtTop = currentScrollY <= 0

  setHidden(isScrollingDown && !isAtTop && currentScrollY > 24)
  previousScrollY = currentScrollY
}

function handleScroll() {
  if (!ticking) {
    ticking = true
    window.requestAnimationFrame(updateVisibility)
  }
}

function showChrome() {
  setHidden(false)
}

function handleViewportChange() {
  previousScrollY = window.scrollY
  showChrome()
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 959px)')
  previousScrollY = window.scrollY
  mediaQuery.addEventListener('change', handleViewportChange)
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('focusin', showChrome)
  document.addEventListener('pointerdown', showChrome)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', handleViewportChange)
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('focusin', showChrome)
  document.removeEventListener('pointerdown', showChrome)
  setHidden(false)
})
</script>

<template>
  <span class="scroll-chrome" aria-hidden="true" />
</template>
