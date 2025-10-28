// 城市温暖之星详情页功能脚本

class WarmStarDetail {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadWarmStarData();
  }

  setupEventListeners() {
    // 返回按钮事件
    const backBtn = document.getElementById('warmStarBackBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.goBack();
      });
    }

    // 监听浏览器返回按钮
    window.addEventListener('popstate', () => {
      this.goBack();
    });

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.refreshData();
      }
    });
  }

  loadWarmStarData() {
    // 从URL参数或localStorage获取温暖之星数据
    const urlParams = new URLSearchParams(window.location.search);
    const starId = urlParams.get('id') || '0';
    
    // 模拟数据，实际应用中应该从API获取
    const warmStarsData = [
      { 
        id: '0',
        name: '热心市民王大妈', 
        contribution: '本周贡献 15 点', 
        rank: 1,
        totalContribution: 156,
        joinDate: '2023年3月',
        badges: ['共治之星', '热心市民', '环保达人'],
        recentActivities: [
          { type: '随手拍', description: '上报道路积水问题', time: '2小时前', points: 3 },
          { type: '共享车位', description: '开放私人车位2小时', time: '昨天', points: 5 },
          { type: '公益餐', description: '为环卫工人提供免费早餐', time: '3天前', points: 7 }
        ],
        bio: '王大妈是我们社区的热心志愿者，总是第一时间发现并上报各种城市问题。她开放自家车位供邻居使用，还经常为环卫工人提供免费早餐。她说："温暖浏阳需要我们每个人的参与。"'
      },
      { 
        id: '1',
        name: '志愿者小李', 
        contribution: '本周贡献 12 点', 
        rank: 2,
        totalContribution: 134,
        joinDate: '2023年5月',
        badges: ['志愿先锋', '烟火达人', '文明使者'],
        recentActivities: [
          { type: '烟火秀', description: '协助维护观赏秩序', time: '1天前', points: 8 },
          { type: '随手拍', description: '上报违停车辆', time: '2天前', points: 2 },
          { type: '故事分享', description: '分享浏阳美食故事', time: '4天前', points: 2 }
        ],
        bio: '小李是一名大学生志愿者，热爱摄影和分享。他经常参与烟火秀的志愿服务，用镜头记录浏阳的美好瞬间，传播正能量。'
      },
      { 
        id: '2',
        name: '环保达人张师傅', 
        contribution: '本周贡献 10 点', 
        rank: 3,
        totalContribution: 98,
        joinDate: '2023年7月',
        badges: ['环保达人', '绿色出行', '节能先锋'],
        recentActivities: [
          { type: '共享厕所', description: '开放店铺厕所供市民使用', time: '6小时前', points: 4 },
          { type: '随手拍', description: '上报垃圾分类问题', time: '1天前', points: 3 },
          { type: '绿色出行', description: '骑行上班打卡', time: '每天', points: 1 }
        ],
        bio: '张师傅经营着一家小店，他主动开放店铺厕所供路人使用，还积极参与垃圾分类宣传。他坚持绿色出行，是环保理念的践行者。'
      },
      { 
        id: '3',
        name: '文明使者刘阿姨', 
        contribution: '本周贡献 8 点', 
        rank: 4,
        totalContribution: 87,
        joinDate: '2023年4月',
        badges: ['文明使者', '社区管家', '爱心天使'],
        recentActivities: [
          { type: '文明劝导', description: '劝导不文明行为', time: '3小时前', points: 2 },
          { type: '邻里互助', description: '帮助老人购买生活用品', time: '1天前', points: 3 },
          { type: '公益餐', description: '为独居老人送餐', time: '2天前', points: 3 }
        ],
        bio: '刘阿姨是社区的文明使者，经常进行文明劝导工作。她热心帮助邻里，特别关爱独居老人，被大家亲切地称为"爱心阿姨"。'
      },
      { 
        id: '4',
        name: '社区管家老陈', 
        contribution: '本周贡献 7 点', 
        rank: 5,
        totalContribution: 76,
        joinDate: '2023年6月',
        badges: ['社区管家', '安全卫士', '热心邻居'],
        recentActivities: [
          { type: '安全巡查', description: '夜间社区安全巡查', time: '昨晚', points: 4 },
          { type: '设施维护', description: '修复小区健身器材', time: '2天前', points: 2 },
          { type: '邻里调解', description: '协调邻里纠纷', time: '3天前', points: 1 }
        ],
        bio: '老陈是退休的社区工作者，继续发挥余热为社区服务。他每晚都会进行安全巡查，维护公共设施，是大家心中的"社区守护神"。'
      }
    ];

    const starData = warmStarsData.find(star => star.id === starId) || warmStarsData[0];
    this.renderWarmStarDetail(starData);
  }

  renderWarmStarDetail(starData) {
    // 填充基本信息
    const avatar = document.getElementById('warmStarAvatar');
    const name = document.getElementById('warmStarName');
    const rank = document.getElementById('warmStarRank');
    const totalContribution = document.getElementById('warmStarTotalContribution');
    const joinDate = document.getElementById('warmStarJoinDate');
    const bio = document.getElementById('warmStarBio');

    if (avatar) avatar.src = `sources/avator${(parseInt(starData.id) % 5) + 1}.png`;
    if (name) name.textContent = starData.name;
    if (rank) rank.textContent = `第${starData.rank}名`;
    if (totalContribution) totalContribution.textContent = starData.totalContribution;
    if (joinDate) joinDate.textContent = starData.joinDate;
    if (bio) bio.textContent = starData.bio;

    // 渲染徽章
    this.renderBadges(starData.badges);

    // 渲染近期活动
    this.renderActivities(starData.recentActivities);

    // 更新页面标题
    document.title = `${starData.name} - 城市温暖之星 - 温暖浏阳`;
  }

  renderBadges(badges) {
    const badgesContainer = document.getElementById('warmStarBadges');
    if (!badgesContainer || !badges) return;

    badgesContainer.innerHTML = badges.map(badge => 
      `<span class="warm-star-badge">${badge}</span>`
    ).join('');
  }

  renderActivities(activities) {
    const activitiesContainer = document.getElementById('warmStarActivities');
    if (!activitiesContainer || !activities) return;

    activitiesContainer.innerHTML = activities.map(activity => `
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

  // 互动功能
  followWarmStar() {
    this.showToast('关注成功！');
    // 实际应用中应该调用API
  }

  shareWarmStar() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: '看看这位城市温暖之星的感人事迹！',
        url: window.location.href
      }).catch(err => {
        console.log('分享失败:', err);
        this.fallbackShare();
      });
    } else {
      this.fallbackShare();
    }
  }

  fallbackShare() {
    // 复制链接到剪贴板
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToast('链接已复制到剪贴板');
      }).catch(() => {
        this.showToast('分享功能暂不可用');
      });
    } else {
      this.showToast('分享功能暂不可用');
    }
  }

  sendMessage() {
    this.showToast('私信功能开发中...');
    // 实际应用中应该打开私信界面
  }

  // 工具方法
  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // 如果没有历史记录，跳转到主页
      window.location.href = 'index.html';
    }
  }

  refreshData() {
    // 刷新数据，实际应用中可能需要重新从API获取
    console.log('刷新温暖之星数据');
  }

  showToast(message, duration = 2000) {
    const toast = document.getElementById('warmStarToast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 错误处理
  handleError(error) {
    console.error('温暖之星详情页错误:', error);
    this.showToast('加载失败，请稍后重试');
  }
}

// 全局变量和方法，供HTML中的onclick使用
let warmStarApp;

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  warmStarApp = new WarmStarDetail();
  
  // 将方法绑定到全局对象，供HTML调用
  window.app = {
    closeWarmStarDetail: () => warmStarApp.goBack(),
    followWarmStar: () => warmStarApp.followWarmStar(),
    shareWarmStar: () => warmStarApp.shareWarmStar(),
    sendMessage: () => warmStarApp.sendMessage()
  };
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WarmStarDetail;
}