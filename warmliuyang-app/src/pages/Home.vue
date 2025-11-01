<template>
  <div class="page home-page">
    <header style="padding: 12px 16px;">
      <h1 class="section-title">温暖浏阳</h1>
      <p class="text-secondary">欢迎来到移动端 App</p>
    </header>
    <section style="padding: 0 16px;">
      <img :src="banner" alt="浏阳烟花" style="width: 100%; border-radius: 12px; object-fit: cover;" />
    </section>
    <section class="card" style="margin: 16px; padding: 16px;">
      <button class="action-btn primary-btn">
        <span class="btn-icon">⭐</span>
        <span class="btn-text">点赞浏阳</span>
      </button>
    </section>
  </div>
</template>

<script setup>
import banner from '../assets/images/fireworks1.jpeg'
</script>