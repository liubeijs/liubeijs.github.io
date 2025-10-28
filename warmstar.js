// 城市温暖之星详情页脚本

class WarmStarDetail {
  constructor() {
    this.currentStarData = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadStarData();
  }

  // 设置事件监听器
  setupEventListeners() {
    // 返回按钮
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.goBack();
      });
    }

    // 互动按钮
    const followBtn = document.getElementById('followBtn');
    const shareBtn = document.getElementById('shareBtn');
    const messageBtn = document.getElementById('messageBtn');

    if (followBtn) {
      followBtn.addEventListener('click', () => {
        this.followWarmStar();
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.shareWarmStar();
      });
    }

    if (messageBtn) {
      messageBtn.addEventListener('click', () => {
        this.sendMessage();
      });
    }
  }

  // 加载温暖之星数据
  loadStarData() {
    // 从URL参数获取温暖之星ID
    const urlParams = new URLSearchParams(window.location.search);
    const starId = urlParams.get('id') || '0';
    
    // 模拟温暖之星数据
    const starsData = [
      { 
        id: '0',
        name: '热心市民王大妈', 
        rank: 1,
        totalContribution: 156,
        joinDate: '2023年3月',
        badges: ['共治之星', '热心市民', '环保达人'],
        recentActivities: [
          { type: '随手拍', description: '上报道路积水问题', time: '2小时前', points: 3 },
          { type: '共享车位', description: '开放私人车位2小时', time: '昨天', points: 5 },
          { type: '公益餐', description: '为环卫工人提供免费早餐', time: '3天前', points: 7 }
        ],
        bio: '王大妈是我们社区的热心志愿者，总是第一时间发现并上报各种城市问题。她开放自家车位供邻居使用，还经常为环卫工人提供免费早餐。她说："温暖浏阳需要我们每个人的参与。"',
        avatar: 'sources/avator1.png'
      },
      { 
        id: '1',
        name: '志愿者小李', 
        rank: 2,
        totalContribution: 134,
        joinDate: '2023年5月',
        badges: ['志愿先锋', '烟火达人', '文明使者'],
        recentActivities: [
          { type: '烟火秀', description: '协助维护观赏秩序', time: '1天前', points: 8 },
          { type: '随手拍', description: '上报违停车辆', time: '2天前', points: 2 },
          { type: '故事分享', description: '分享浏阳美食故事', time: '4天前', points: 2 }
        ],
        bio: '小李是一名大学生志愿者，热爱摄影和分享。他经常参与烟火秀的志愿服务，用镜头记录浏阳的美好瞬间，传播正能量。',
        avatar: 'sources/avator2.png'
      },
      { 
        id: '2',
        name: '环保达人张师傅', 
        rank: 3,
        totalContribution: 98,
        joinDate: '2023年7月',
        badges: ['环保达人', '绿色出行', '节能先锋'],
        recentActivities: [
          { type: '共享厕所', description: '开放店铺厕所供市民使用', time: '6小时前', points: 4 },
          { type: '随手拍', description: '上报垃圾分类问题', time: '1天前', points: 3 },
          { type: '绿色出行', description: '骑行上班打卡', time: '每天', points: 1 }
        ],
        bio: '张师傅经营着一家小店，他主动开放店铺厕所供路人使用，还积极参与垃圾分类宣传。他坚持绿色出行，是环保理念的践行者。',
        avatar: 'sources/avator3.png'
      },
      { 
        id: '3',
        name: '文明使者刘阿姨', 
        rank: 4,
        totalContribution: 87,
        joinDate: '2023年4月',
        badges: ['文明使者', '社区管家', '爱心天使'],
        recentActivities: [
          { type: '文明劝导', description: '劝导不文明行为', time: '3小时前', points: 2 },
          { type: '邻里互助', description: '帮助老人购买生活用品', time: '1天前', points: 3 },
          { type: '公益餐', description: '为独居老人送餐', time: '2天前', points: 3 }
        ],
        bio: '刘阿姨是社区的文明使者，经常进行文明劝导工作。她热心帮助邻里，特别关爱独居老人，被大家亲切地称为"爱心阿姨"。',
        avatar: 'sources/avator4.png'
      },
      { 
        id: '4',
        name: '社区管家老陈', 
        rank: 5,
        totalContribution: 76,
        joinDate: '2023年6月',
        badges: ['社区管家', '安全卫士', '热心邻居'],
        recentActivities: [
          { type: '安全巡查', description: '夜间社区安全巡查', time: '昨晚', points: 4 },
          { type: '设施维护', description: '修复小区健身器材', time: '2天前', points: 2 },
          { type: '邻里调解', description: '协调邻里纠纷', time: '3天前', points: 1 }
        ],
        bio: '老陈是退休的社区工作者，继续发挥余热为社区服务。他每晚都会进行安全巡查，维护公共设施，是大家心中的"社区守护神"。',
        avatar: 'sources/avator5.png'
      }
    ];

    // 查找对应的温暖之星数据
    this.currentStarData = starsData.find(star => star.id === starId) || starsData[0];
    
    // 渲染页面内容
    this.renderStarDetail();
  }

  // 渲染温暖之星详情
  renderStarDetail() {
    if (!this.currentStarData) return;

    const data = this.currentStarData;

    // 填充基本信息
    document.getElementById('warmStarAvatar').src = data.avatar;
    document.getElementById('warmStarName').textContent = data.name;
    document.getElementById('warmStarRank').textContent = `第${data.rank}名`;
    document.getElementById('warmStarTotalContribution').textContent = data.totalContribution;
    document.getElementById('warmStarJoinDate').textContent = data.joinDate;
    document.getElementById('warmStarBio').textContent = data.bio;

    // 渲染徽章
    const badgesContainer = document.getElementById('warmStarBadges');
    badgesContainer.innerHTML = data.badges.map(badge => 
      `<span class="warm-star-badge">${badge}</span>`
    ).join('');

    // 渲染近期活动
    const activitiesContainer = document.getElementById('warmStarActivities');
    activitiesContainer.innerHTML = data.recentActivities.map(activity => `
      <div class="activity-item">
        <div class="activity-icon">${this.getActivityIcon(activity.type)}</div>
        <div class="activity-content">
          <div class="activity-description">${activity.description}</div>
          <div class="activity-meta">
            <span class="activity-time">${activity.time}</span>
            <span class="activity-points">+${activity.points}分</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 获取活动图标
  getActivityIcon(type) {
    const icons = {
      '随手拍': '📸',
      '共享车位': '🅿️',
      '公益餐': '🍽️',
      '烟火秀': '🎆',
      '故事分享': '📖',
      '共享厕所': '🚻',
      '绿色出行': '🚴',
      '文明劝导': '🗣️',
      '邻里互助': '🤝',
      '安全巡查': '🔍',
      '设施维护': '🔧',
      '邻里调解': '⚖️'
    };
    return icons[type] || '⭐';
  }

  // 返回上一页
  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // 如果没有历史记录，跳转到主页
      window.location.href = 'index.html';
    }
  }

  // 关注温暖之星
  followWarmStar() {
    const followBtn = document.getElementById('followBtn');
    const btnText = followBtn.querySelector('.btn-text');
    
    if (btnText.textContent === '关注TA') {
      btnText.textContent = '已关注';
      followBtn.classList.add('followed');
      this.showToast('已关注该温暖之星！');
    } else {
      btnText.textContent = '关注TA';
      followBtn.classList.remove('followed');
      this.showToast('已取消关注');
    }
  }

  // 分享温暖之星
  shareWarmStar() {
    if (navigator.share) {
      // 使用原生分享API
      navigator.share({
        title: `城市温暖之星 - ${this.currentStarData.name}`,
        text: `来看看这位温暖之星的故事：${this.currentStarData.bio.substring(0, 50)}...`,
        url: window.location.href
      }).then(() => {
        this.showToast('分享成功！');
      }).catch(() => {
        this.fallbackShare();
      });
    } else {
      this.fallbackShare();
    }
  }

  // 备用分享方法
  fallbackShare() {
    // 复制链接到剪贴板
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToast('链接已复制到剪贴板！');
      }).catch(() => {
        this.showToast('分享功能暂不可用');
      });
    } else {
      this.showToast('分享功能暂不可用');
    }
  }

  // 发送私信
  sendMessage() {
    this.showToast('私信功能开发中...');
  }

  // 显示提示消息
  showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new WarmStarDetail();
});

// 处理页面可见性变化
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // 页面重新可见时，可以刷新数据
    console.log('页面重新可见');
  }
});