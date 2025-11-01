<template>
  <div class="app-container">
    <main class="main-content">
      <router-view />
    </main>
    <BottomNav />
  </div>
  <div class="bottom-safe-area"></div>
  
</template>

<script setup>
import BottomNav from './components/BottomNav.vue'
</script>