<template>
  <div class="page story-detail">
    <header class="detail-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h1 class="detail-title">故事详情</h1>
    </header>

    <section v-if="story" class="detail-content">
      <div class="detail-media" v-if="story.image">
        <img :src="story.image" :alt="story.title" class="detail-image" />
      </div>

      <div class="detail-main">
        <h2 class="story-title">{{ story.title }}</h2>
        <p class="story-desc">{{ story.content }}</p>

        <div class="story-meta">
          <div class="meta-left">
            <img :src="story.user.avatar" alt="用户头像" class="avatar-image" />
            <div class="meta-user">
              <div class="user-name">{{ story.user.name }}</div>
              <div class="user-sub">{{ story.time }} · {{ story.location }}</div>
            </div>
          </div>
          <div class="meta-right">❤️ {{ likes }}</div>
        </div>

        <div class="detail-actions">
          <button class="action-btn primary" @click="like">点赞</button>
          <button class="action-btn" @click="share">分享</button>
        </div>
      </div>
    </section>

    <section v-else class="empty-state">未找到该故事</section>

    <div v-if="toastVisible" class="toast">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFeedById } from '../data/feeds'

const route = useRoute()
const router = useRouter()
const story = ref(null)
const likes = ref(0)

const toastMessage = ref('')
const toastVisible = ref(false)
function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => (toastVisible.value = false), 1800)
}

function like() {
  likes.value += 1
}

function share() {
  if (!story.value) return
  const shareText = `${story.value.title} - ${story.value.content}`
  const shareUrl = window.location.origin + window.location.pathname + `#story-${story.value.id}`
  if (navigator.share) {
    navigator.share({ title: story.value.title, text: shareText, url: shareUrl }).catch(() => {})
  } else {
    navigator.clipboard?.writeText(`${shareText} ${shareUrl}`)
    showToast('分享链接已复制')
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  const id = route.params.id
  const data = getFeedById(id)
  if (data) {
    story.value = data
    likes.value = data.likes
  }
})
</script>

<style scoped>
.story-detail {
  padding-bottom: 64px;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.back-btn {
  height: 32px;
  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}
.detail-title {
  font-size: 16px;
  font-weight: 600;
}

.detail-content { padding: 12px 16px; }
.detail-media { margin-bottom: 10px; }
.detail-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.detail-main { }
.story-title { font-size: 18px; font-weight: 700; color: #333; }
.story-desc { font-size: 14px; color: #555; margin-top: 6px; }

.story-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}
.meta-left { display: flex; align-items: center; gap: 10px; }
.avatar-image { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
.user-name { font-size: 14px; font-weight: 600; color: #333; }
.user-sub { font-size: 12px; color: #999; }
.meta-right { font-size: 14px; color: #e55c27; }

.detail-actions { display: flex; gap: 10px; margin-top: 12px; }
.action-btn {
  flex: 1;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #eee;
  background: #fafafa;
}
.action-btn.primary {
  background: #e55c27;
  border-color: #e55c27;
  color: #fff;
}

.empty-state { text-align: center; color: #999; padding: 40px 0; }

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
</style>