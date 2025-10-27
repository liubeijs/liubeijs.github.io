// 温暖浏阳App主要功能脚本

class WarmLiuyangApp {
  constructor() {
    this.currentTab = 'home';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupEventListeners();
    this.initializeComponents();
    this.showTab('home');
  }

  // 导航系统
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const tabId = item.dataset.tab;
        this.showTab(tabId);
        this.updateNavigation(tabId);
      });
    });
  }

  showTab(tabId) {
    // 隐藏所有tab内容
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // 显示目标tab
    const targetTab = document.getElementById(`${tabId}-tab`);
    if (targetTab) {
      targetTab.classList.add('active');
      this.currentTab = tabId;
    }
  }

  updateNavigation(activeTab) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[data-tab="${activeTab}"]`);
    if (activeNavItem) {
      activeNavItem.classList.add('active');
    }
  }

  // 事件监听器设置
  // 在setupEventListeners方法中添加视频项点击事件
  setupEventListeners() {
    // 搜索功能
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
      searchBox.addEventListener('input', this.handleSearch.bind(this));
    }

    // 服务项目点击
    document.addEventListener('click', (e) => {
      if (e.target.closest('.service-item')) {
        this.handleServiceClick(e.target.closest('.service-item'));
      }
      
      if (e.target.closest('.feed-item .action-btn')) {
        this.handleFeedAction(e.target);
      }
      
      if (e.target.closest('.ticket-btn')) {
        this.handleTicketPurchase(e.target);
      }
      
      if (e.target.closest('.governance-card')) {
        this.handleGovernanceAction(e.target.closest('.governance-card'));
      }
    });

    // 悬浮按钮
    const fab = document.getElementById('fab');
    if (fab) {
      fab.addEventListener('click', this.showActionSheet.bind(this));
    }

    // Feed切换
    document.querySelectorAll('.feed-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchFeedTab(e.target.dataset.feed);
      });
    });
  }

  // 添加视频点击处理方法
  handleVideoClick(videoElement) {
    const videoTitle = videoElement.querySelector('.video-title').textContent;
    this.showToast(`正在播放：${videoTitle}`);
    // 这里可以添加实际的视频播放逻辑
  }

  // 组件初始化
  // 在initializeComponents方法中添加
  initializeComponents() {
    this.initCountdown();
    this.initCarousel(); // 添加这行
    this.loadFeedData();
    this.loadServiceData();
    this.loadLeaderboard();
    this.updateUserStats();
  }

  // 添加轮播初始化方法
  initCarousel() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.indicator');
    
    if (this.slides.length === 0) return;
    
    // 设置指示器点击事件
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
    
    // 自动轮播
    this.startAutoSlide();
  }
  
  goToSlide(slideIndex) {
    // 移除当前活动状态
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');
    
    // 设置新的活动状态
    this.currentSlide = slideIndex;
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }
  
  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // 每4秒切换一次
  }
  
  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // 搜索处理
  handleSearch(e) {
    const query = e.target.value.toLowerCase();
    console.log('搜索:', query);
    // 这里可以实现实际的搜索逻辑
  }

  // 服务项目点击处理
  handleServiceClick(serviceElement) {
    const serviceName = serviceElement.querySelector('.service-label').textContent;
    console.log('点击服务:', serviceName);
    
    // 添加点击动效
    serviceElement.classList.add('fireworks-animation');
    setTimeout(() => {
      serviceElement.classList.remove('fireworks-animation');
    }, 600);
    
    // 根据不同服务跳转到相应功能
    switch(serviceName) {
      case '找车位':
        this.showTab('service');
        break;
      case '找厕所':
        this.showTab('service');
        break;
      case '烟火秀':
        this.showTab('fireworks');
        break;
      case '随手拍':
        this.showTab('governance');
        break;
      default:
        this.showToast(`${serviceName}功能开发中...`);
    }
  }

  // Feed动作处理
  handleFeedAction(button) {
    const action = button.textContent;
    console.log('Feed动作:', action);
    
    if (action === '去这里') {
      this.showToast('正在为您导航...');
      // 这里可以调用地图导航API
    }
  }

  // 购票处理
  handleTicketPurchase(button) {
    const spotCard = button.closest('.spot-card');
    const spotName = spotCard.querySelector('h3').textContent;
    console.log('购买门票:', spotName);
    
    this.showToast(`正在为您打开${spotName}购票页面...`);
    // 这里可以跳转到购票页面或调用支付API
  }

  // 共治动作处理
  handleGovernanceAction(card) {
    const title = card.querySelector('.governance-title').textContent;
    console.log('共治动作:', title);
    
    switch(title) {
      case '随手拍':
        this.openCamera();
        break;
      case '共享车位':
        this.showShareParkingForm();
        break;
      case '共享厕所':
        this.showShareToiletForm();
        break;
      case '公益餐':
        this.showCharityMealForm();
        break;
    }
  }

  // 显示操作表单
  showActionSheet() {
    const actions = [
      { text: '发故事', icon: '📝', action: () => this.openStoryEditor() },
      { text: '拍问题', icon: '📷', action: () => this.openCamera() },
      { text: '共享资源', icon: '🤝', action: () => this.showTab('governance') }
    ];
    
    // 这里可以显示底部弹出的操作选择器
    console.log('显示操作选择器', actions);
  }

  // Feed标签切换
  switchFeedTab(feedType) {
    document.querySelectorAll('.feed-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[data-feed="${feedType}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }
    
    this.loadFeedData(feedType);
  }

  // 倒计时初始化
  initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // 设置下次烟火秀时间（示例：下周六晚8点）
    const nextShow = new Date();
    nextShow.setDate(nextShow.getDate() + (6 - nextShow.getDay() + 7) % 7);
    nextShow.setHours(20, 0, 0, 0);
    
    this.updateCountdown(countdownElement, nextShow);
    
    // 每秒更新倒计时
    setInterval(() => {
      this.updateCountdown(countdownElement, nextShow);
    }, 1000);
  }

  updateCountdown(element, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    if (distance < 0) {
      element.textContent = '烟火秀进行中';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    element.textContent = `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
  }

  // 加载Feed数据
  loadFeedData(feedType = 'recommend') {
    const feedList = document.getElementById('feedList');
    if (!feedList) return;
    
    // 模拟数据
    const mockData = {
      recommend: [
        {
          title: '浏阳河畔的温暖故事',
          description: '今天在河边遇到了一位老爷爷，他告诉我这里30年前的样子...',
          image: 'sources/feed1.png',
          location: '浏阳河畔'
        },
        {
          title: '烟花工厂的匠心传承',
          description: '走进百年烟花工厂，感受传统工艺的魅力...',
          image: 'sources/feed2.png',
          location: '大瑶镇'
        },
        {
          title: '古镇里的慢时光',
          description: '漫步在石板路上，感受千年古镇的异味...',
          image: 'sources/feed3.png',
          location: '文家市镇'
        },
        {
          title: '山间茶园的清香',
          description: '清晨的茶园，雾气缭绕，茶香阵阵...',
          image: 'sources/feed4.png',
          location: '沿溪镇'
        }
      ],
      follow: [
        {
          title: '市民张三的日常分享',
          description: '今天的早餐是正宗的浏阳蒸菜，香气扑鼻...',
          image: 'sources/feed1.png',
          location: '城区'
        },
        {
          title: '李阿姨的花园日记',
          description: '春天到了，我的小花园又开始热闹起来...',
          image: 'sources/feed2.png',
          location: '淮川街道'
        }
      ]
    };
    
    const data = mockData[feedType] || mockData.recommend;
    this.renderFeedList(feedList, data);
  }

  renderFeedList(container, data) {
    container.innerHTML = data.map(item => `
      <div class="feed-item">
        <div class="feed-image">
          <img src="${item.image}" 
               alt="${item.title}" 
               class="feed-thumbnail"
               onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'">
        </div>
        <div class="feed-content">
          <div class="feed-title">${item.title}</div>
          <div class="feed-description">${item.description}</div>
          <div class="feed-location">📍 ${item.location}</div>
          <div class="feed-actions">
            <button class="action-btn">去这里</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 加载服务数据
  loadServiceData() {
    const serviceList = document.getElementById('serviceList');
    if (!serviceList) return;
    
    const services = [
      {
        name: '市政府停车场',
        status: '剩余车位 12',
        distance: '距离 0.5km',
        tags: ['无障碍', '充电桩'],
        statusColor: 'success'
      },
      {
        name: '人民广场地下停车场',
        status: '剩余车位 3',
        distance: '距离 0.8km',
        tags: ['24小时', '监控'],
        statusColor: 'warning'
      },
      {
        name: '商业中心停车场',
        status: '已满',
        distance: '距离 1.2km',
        tags: ['商场', '餐饮'],
        statusColor: 'danger'
      }
    ];
    
    serviceList.innerHTML = services.map(service => `
      <div class="service-card">
        <div class="service-info">
          <div class="service-name">${service.name}</div>
          <div class="service-status" style="color: var(--${service.statusColor === 'success' ? 'success-green' : service.statusColor === 'warning' ? 'warning-yellow' : 'danger-red'})">
            ${service.status} • ${service.distance}
          </div>
          <div class="service-tags">
            ${service.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="service-actions">
          <button class="action-button">导航</button>
          <button class="action-button">预约</button>
          <button class="action-button">收藏</button>
        </div>
      </div>
    `).join('');
  }

  // 加载排行榜
  loadLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    if (!leaderboard) return;
    
    const leaders = [
      { name: '热心市民王大妈', contribution: '本周贡献 15 次', rank: 1 },
      { name: '志愿者小李', contribution: '本周贡献 12 次', rank: 2 },
      { name: '环保达人张师傅', contribution: '本周贡献 10 次', rank: 3 },
      { name: '文明使者刘阿姨', contribution: '本周贡献 8 次', rank: 4 },
      { name: '社区管家老陈', contribution: '本周贡献 7 次', rank: 5 }
    ];
    
    leaderboard.innerHTML = leaders.map((leader, idx) => {
      const avatarIndex = (idx % 5) + 1; // 使用 avator1.png ~ avator5.png
      return `
        <div class="leader-item">
          <div class="leader-rank">${leader.rank}</div>
          <div class="leader-avatar">
            <img src="sources/avator${avatarIndex}.png" alt="${leader.name}" class="leader-avatar-img">
          </div>
          <div class="leader-info">
            <div class="leader-name">${leader.name}</div>
            <div class="leader-contribution">${leader.contribution}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 更新用户统计
  updateUserStats() {
    const stats = {
      volunteerHours: 24,
      parkingIncome: 156,
      storyLikes: 89
    };
    
    const volunteerHoursEl = document.getElementById('volunteerHours');
    const parkingIncomeEl = document.getElementById('parkingIncome');
    const storyLikesEl = document.getElementById('storyLikes');
    
    if (volunteerHoursEl) volunteerHoursEl.textContent = stats.volunteerHours;
    if (parkingIncomeEl) parkingIncomeEl.textContent = stats.parkingIncome;
    if (storyLikesEl) storyLikesEl.textContent = stats.storyLikes;
  }

  // 工具方法
  showToast(message, duration = 3000) {
    // 创建toast提示
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 20px;
      z-index: 10000;
      font-size: 14px;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, duration);
  }

  openCamera() {
    this.showToast('正在打开相机...');
    // 这里可以调用相机API
  }

  openStoryEditor() {
    this.showToast('正在打开故事编辑器...');
    // 这里可以跳转到故事编辑页面
  }

  showShareParkingForm() {
    this.showToast('正在打开共享车位表单...');
    // 这里可以显示共享车位表单
  }

  showShareToiletForm() {
    this.showToast('正在打开共享厕所表单...');
    // 这里可以显示共享厕所表单
  }

  showCharityMealForm() {
    this.showToast('正在打开公益餐表单...');
    // 这里可以显示公益餐表单
  }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  window.app = new WarmLiuyangApp();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WarmLiuyangApp;
}