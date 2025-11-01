<template>
  <div class="page home-page">
    <!-- 顶部：定位/天气 + 搜索框 -->
    <header class="home-header">
      <div class="location-weather">
        <span>📍 {{ location }}</span>
        <span>{{ weatherIcon }} {{ temperature }}°C</span>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        class="search-box"
        placeholder="🔍 发现浏阳的每个小惊喜"
        @keyup.enter="onSearch"
      />
    </header>

    <!-- 轮播图 -->
    <section class="banner-carousel">
      <div class="carousel-container">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-slide"
          :class="{ active: currentSlide === index }"
        >
          <img :src="slide.src" :alt="'浏阳烟花秀' + (index + 1)" class="banner-image" />
          <div class="banner-overlay">
            <div class="banner-text">{{ slide.text }}</div>
          </div>
        </div>
      </div>
      <div class="carousel-indicators">
        <span
          v-for="(slide, index) in slides"
          :key="'indicator-' + index"
          class="indicator"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </section>

    <!-- 便民服务 -->
    <section class="quick-services">
      <div class="service-grid">
        <div
          class="service-item"
          v-for="item in services"
          :key="item.key"
          @click="onServiceClick(item)"
        >
          <div class="service-icon">{{ item.icon }}</div>
          <div class="service-label">{{ item.label }}</div>
        </div>
      </div>
    </section>

    <!-- 信息流：推荐 / 关注 -->
    <section class="feed-tabs">
      <div
        class="feed-tab"
        :class="{ active: currentFeed === 'recommend' }"
        @click="currentFeed = 'recommend'"
      >
        推荐
      </div>
      <div
        class="feed-tab"
        :class="{ active: currentFeed === 'follow' }"
        @click="currentFeed = 'follow'"
      >
        关注
      </div>
    </section>

    <section class="feed-list">
      <masonry-wall
        :items="filteredFeed"
        :column-width="180"
        :gap="12"
      >
        <template #default="{ item }">
          <div class="feed-card" @click="onCardClick(item)">
            <div class="feed-media" v-if="item.image">
              <img :src="item.image" :alt="item.title" class="feed-image" />
            </div>
            <div class="feed-content">
              <div class="feed-title">{{ item.title }}</div>
              <div class="feed-desc one-line">{{ item.content }}</div>
            </div>
            <div class="feed-info">
              <div class="info-left">
                <img :src="item.user.avatar" alt="用户头像" class="avatar-image small" />
                <span class="info-name">{{ item.user.name }}</span>
              </div>
              <div class="info-right">❤️ {{ item.likes }}</div>
            </div>
          </div>
        </template>
      </masonry-wall>

      <div v-if="filteredFeed.length === 0" class="empty-state">暂无内容</div>
    </section>

    <!-- 轻提示 -->
    <div v-if="toastVisible" class="toast">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
// MasonryWall 组件已在 main.js 全局注册

// 轮播图片（参考旧版首页）
import fireworks1 from '../assets/images/fireworks1.jpeg'
import fireworks2 from '../assets/images/fireworks2.jpeg'
import fireworks3 from '../assets/images/fireworks3.jpeg'
import fireworks4 from '../assets/images/fireworks4.jpeg'
import fireworks5 from '../assets/images/fireworks5.jpeg'

// 信息流图片与头像
import { feedsData } from '../data/feeds'

const router = useRouter()

// 顶部状态
const location = ref('浏阳市区')
const temperature = ref(24)
const weatherIcon = '☀️'
const searchQuery = ref('')

function onSearch() {
  if (!searchQuery.value.trim()) {
    showToast('请输入想搜索的内容')
    return
  }
  showToast(`搜索：${searchQuery.value}（功能即将上线）`)
}

// 轮播
const slides = [
  { src: fireworks1, text: '🎆 烟火秀倒计时 | 主题征集活动' },
  { src: fireworks2, text: '✨ 璀璨烟花 | 点亮浏阳夜空' },
  { src: fireworks3, text: '🌟 烟花之都 | 世界级视觉盛宴' },
  { src: fireworks4, text: '🎇 传承工艺 | 匠心独运' },
  { src: fireworks5, text: '🎊 节庆烟花 | 共庆佳节' }
]
const currentSlide = ref(0)
let carouselTimer = null

function startCarousel() {
  stopCarousel()
  carouselTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 4000)
}
function stopCarousel() {
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
}
function goToSlide(index) {
  currentSlide.value = index
  startCarousel()
}

onMounted(() => {
  startCarousel()
})
onBeforeUnmount(() => {
  stopCarousel()
})

// 便民服务入口
const services = [
  { key: 'parking', icon: '🅿️', label: '找车位' },
  { key: 'toilet', icon: '🚻', label: '找厕所' },
  { key: 'fireworks', icon: '🎆', label: '烟火秀' },
  { key: 'report', icon: '📷', label: '随手拍' },
  { key: 'food', icon: '🍜', label: '地道菜' },
  { key: 'transport', icon: '🚌', label: '公交' },
  { key: 'attractions', icon: '📍', label: '打卡景点' },
  { key: 'more', icon: '➕', label: '更多' }
]

function onServiceClick(item) {
  switch (item.key) {
    case 'report':
      router.push('/capture')
      break
    case 'fireworks':
    case 'more':
      router.push('/discover')
      break
    default:
      showToast('功能即将上线')
  }
}

// 信息流数据
const currentFeed = ref('recommend')
const feeds = ref(feedsData)

const filteredFeed = computed(() => feeds.value.filter(f => f.type === currentFeed.value))

function onCardClick(item) {
  router.push(`/story/${item.id}`)
}

// 轻提示
const toastMessage = ref('')
const toastVisible = ref(false)
function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => (toastVisible.value = false), 1800)
}
</script>

<style scoped>
.home-page {
  padding-bottom: 64px; /* 为底部导航留白 */
}

.home-header {
  padding: 12px 16px;
}

.location-weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.search-box {
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
}
.search-box::placeholder {
  color: #999;
}

.banner-carousel {
  position: relative;
  padding: 0 16px;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 12px;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(1.02);
  transition: opacity 0.5s ease, transform 0.6s ease;
}
.carousel-slide.active {
  opacity: 1;
  transform: scale(1);
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 12px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0.45) 100%);
}
.banner-text {
  color: #fff;
  font-size: 14px;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 8px 0 0;
}
.indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
}
.indicator.active {
  background: #e55c27;
}

.quick-services {
  padding: 10px 16px 0;
}
.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.service-item {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 12px 8px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.service-item:active { transform: scale(0.98); }
.service-icon { font-size: 20px; }
.service-label { font-size: 12px; margin-top: 6px; color: #333; }

.feed-tabs {
  display: flex;
  padding: 12px 16px 0;
  gap: 12px;
}
.feed-tab {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #eee;
  color: #666;
}
.feed-tab.active {
  background: #e55c27;
  border-color: #e55c27;
  color: #fff;
}

.feed-list {
  padding: 12px 16px 20px;
}
.feed-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.feed-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}
.feed-user { flex: 1; }
.feed-username { font-weight: 600; font-size: 14px; color: #333; }
.feed-meta { font-size: 12px; color: #999; }

.feed-media { margin-top: 8px; }
.feed-image {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
}

.feed-content { margin-top: 8px; }
.feed-title { font-size: 14px; font-weight: 600; color: #333; }
.feed-desc { font-size: 13px; color: #555; margin-top: 4px; }

.feed-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
.action-btn {
  flex: 1;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #eee;
  background: #fafafa;
  font-size: 13px;
}
.action-btn:active { transform: scale(0.98); }

.empty-state { text-align: center; color: #999; font-size: 13px; padding: 20px 0; }

.toast {
  position: fixed;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.75);
  color: #fff;
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 999px;
  z-index: 9999;
}

/* 小红书风格覆盖与补充样式 */
.feed-card {
  border: none;
  padding: 8px;
  margin-bottom: 0;
}
.avatar-image.small {
  width: 24px;
  height: 24px;
}
.feed-image {
  aspect-ratio: 4 / 5; /* 纵向图片比例更贴近小红书 */
  height: auto;
}
.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.feed-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}
.info-left {
  display: flex;
  align-items: center;
  gap: 6px;
}
.info-name { font-size: 12px; color: #333; }
.info-right { font-size: 12px; color: #e55c27; }
</style>