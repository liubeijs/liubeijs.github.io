<template>
  <div class="page discover-page">
    <header style="padding: 12px 16px;">
      <h2 class="section-title">发现</h2>
    </header>
    <section style="padding: 0 16px 80px;">
      <div class="service-grid">
        <button class="service-item" v-for="s in services" :key="s.label">
          <div class="service-icon">{{ s.icon }}</div>
          <div class="service-label">{{ s.label }}</div>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
const services = [
  { icon: '🅿️', label: '智慧停车' },
  { icon: '📸', label: '随手拍' },
  { icon: '♻️', label: '垃圾分类' },
  { icon: '🛠️', label: '设施报修' },
  { icon: '🚻', label: '找厕所' },
  { icon: '🛒', label: '占道经营' },
  { icon: '🌿', label: '绿化养护' },
  { icon: '📞', label: '12319热线' }
]
</script>