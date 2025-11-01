<template>
  <div class="page about-page">
    <header style="padding: 12px 16px;">
      <h2 class="section-title">关于我们</h2>
    </header>
    <section class="card" style="margin: 16px; padding: 16px;">
      <p>温暖浏阳移动端 App（Vue + Vite）</p>
      <p class="text-secondary">基于通用设计令牌与样式规范。</p>
    </section>
    <section class="card" style="margin: 16px; padding: 16px;">
      <div style="display:flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <img v-for="(a, i) in avatars" :key="i" :src="a" alt="头像" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;" />
      </div>
    </section>
  </div>
</template>

<script setup>
import a1 from '../assets/images/avator1.png'
import a2 from '../assets/images/avator2.png'
import a3 from '../assets/images/avator3.png'
import a4 from '../assets/images/avator4.png'
import a5 from '../assets/images/avator5.png'
const avatars = [a1, a2, a3, a4, a5]
</script>