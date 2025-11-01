<template>
  <nav class="bottom-nav">
    <button
      v-for="t in tabs"
      :key="t.key"
      class="nav-item"
      :class="{ active: route.name === t.key }"
      @click="go(t.to)"
    >
      <span class="nav-icon">{{ t.icon }}</span>
      <span class="nav-label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { key: 'Home', label: '首页', icon: '🏠', to: '/' },
  { key: 'Discover', label: '发现', icon: '🔍', to: '/discover' },
  { key: 'Capture', label: '随手拍', icon: '📸', to: '/capture' },
  { key: 'About', label: '关于', icon: 'ℹ️', to: '/about' }
]

function go(to) {
  router.push(to)
}
</script>