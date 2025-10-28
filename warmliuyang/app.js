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
        // 点击底部tab时自动滚动到页面顶部
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
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
      
      // 故事项点击 - 点击故事内容区域打开详情页
      if (e.target.closest('.feed-item') && !e.target.closest('.action-btn')) {
        this.openStoryDetail(e.target.closest('.feed-item'));
      }
      
      // 通知项点击 - 点击通知项打开详情页
      if (e.target.closest('.notice-item')) {
        this.openNoticeDetail(e.target.closest('.notice-item'));
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

    // 故事详情页返回按钮
    const storyBackBtn = document.getElementById('storyBackBtn');
    if (storyBackBtn) {
      storyBackBtn.addEventListener('click', this.closeStoryDetail.bind(this));
    }

    // 故事详情页操作按钮
    document.addEventListener('click', (e) => {
      if (e.target.closest('.like-btn')) {
        this.handleStoryLike();
      }
      if (e.target.closest('.share-btn')) {
        this.handleStoryShare();
      }
      if (e.target.closest('.comment-btn')) {
        this.handleStoryComment();
      }
    });

    // 通知详情页返回按钮
    const noticeBackBtn = document.getElementById('noticeBackBtn');
    if (noticeBackBtn) {
      noticeBackBtn.addEventListener('click', this.closeNoticeDetail.bind(this));
    }

    // 城管温馨提示展开按钮
    const noticesExpandBtn = document.getElementById('noticesExpandBtn');
    if (noticesExpandBtn) {
      noticesExpandBtn.addEventListener('click', this.toggleNoticesExpand.bind(this));
    }

    // 便民服务筛选标签
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-tab')) {
        this.handleServiceFilter(e.target);
      }
    });

    // 随手拍编辑页面事件监听
    const captureBackBtn = document.getElementById('captureBackBtn');
    if (captureBackBtn) {
      captureBackBtn.addEventListener('click', () => {
        window.history.back();
      });
    }

    const submitReportBtn = document.getElementById('submitReportBtn');
    if (submitReportBtn) {
      submitReportBtn.addEventListener('click', this.submitReport.bind(this));
    }

    const locationEditBtn = document.getElementById('locationEditBtn');
    if (locationEditBtn) {
      locationEditBtn.addEventListener('click', this.editLocation.bind(this));
    }

    // 媒体上传点击事件
    for (let i = 1; i <= 3; i++) {
      const mediaUpload = document.getElementById(`mediaUpload${i}`);
      if (mediaUpload) {
        mediaUpload.addEventListener('click', () => this.handleMediaUpload(i));
      }
    }

    // 事件分类选择
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('category-item')) {
        this.handleCategorySelect(e.target);
      }
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
    const serviceType = serviceElement.dataset.service;
    console.log('点击服务:', serviceName, serviceType);
    
    // 添加点击动效
    serviceElement.classList.add('fireworks-animation');
    setTimeout(() => {
      serviceElement.classList.remove('fireworks-animation');
    }, 600);
    
    // 根据不同服务跳转到相应功能
    switch(serviceType) {
      case 'parking':
        this.showTab('service');
        this.switchToServiceFilter('parking');
        break;
      case 'toilet':
        this.showTab('service');
        this.switchToServiceFilter('toilet');
        break;
      case 'food':
        this.showTab('service');
        this.switchToServiceFilter('food');
        break;
      case 'attractions':
        this.showTab('service');
        this.switchToServiceFilter('scenic');
        break;
      case 'fireworks':
        this.showTab('fireworks');
        break;
      case 'report':
        this.openCaptureEditor();
        break;
      default:
        this.showToast(`${serviceName}功能开发中...`);
    }
  }

  // 切换到便民页面的指定筛选标签
  switchToServiceFilter(filterType) {
    // 延迟执行，确保页面切换完成
    setTimeout(() => {
      // 找到对应的筛选标签
      const filterTab = document.querySelector(`.filter-tab[data-filter="${filterType}"]`);
      if (filterTab) {
        // 模拟点击筛选标签
        this.handleServiceFilter(filterTab);
      }
    }, 100);
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
        this.openCaptureEditor();
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
    container.innerHTML = data.map((item, index) => `
      <div class="feed-item" data-story-index="${index}">
        <div class="feed-content">
          <div class="feed-image">
            <img src="${item.image}" 
                 alt="${item.title}" 
                 class="feed-thumbnail"
                 onerror="this.style.display='none'; this.parentElement.innerHTML='🖼️'">
          </div>
          <div class="feed-info">
            <div class="feed-title">${item.title}</div>
            <div class="feed-description">${item.description}</div>
            <div class="feed-location">📍 ${item.location}</div>
          </div>
        </div>
        <div class="feed-actions">
          <button class="action-btn">去这里</button>
        </div>
      </div>
    `).join('');
    
    // 存储当前数据供详情页使用
    this.currentFeedData = data;
  }

  // 加载服务数据
  loadServiceData() {
    const serviceList = document.getElementById('serviceList');
    if (!serviceList) return;
    
    // 完整的服务数据，包含分类信息
    this.allServices = [
      // 找车位
      {
        name: '市政府停车场',
        status: '剩余车位 12',
        distance: '距离 0.5km',
        tags: ['无障碍', '充电桩'],
        statusColor: 'success',
        category: 'parking'
      },
      {
        name: '人民广场地下停车场',
        status: '剩余车位 3',
        distance: '距离 0.8km',
        tags: ['24小时', '监控'],
        statusColor: 'warning',
        category: 'parking'
      },
      {
        name: '商业中心停车场',
        status: '已满',
        distance: '距离 1.2km',
        tags: ['商场', '餐饮'],
        statusColor: 'danger',
        category: 'parking'
      },
      // 找厕所
      {
        name: '市民广场公厕',
        status: '开放中',
        distance: '距离 0.3km',
        tags: ['无障碍', '母婴室'],
        statusColor: 'success',
        category: 'toilet'
      },
      {
        name: '浏阳河畔公厕',
        status: '开放中',
        distance: '距离 0.6km',
        tags: ['24小时', '清洁'],
        statusColor: 'success',
        category: 'toilet'
      },
      // 地道菜
      {
        name: '老浏阳蒸菜馆',
        status: '营业中',
        distance: '距离 0.4km',
        tags: ['特色菜', '老字号'],
        statusColor: 'success',
        category: 'food'
      },
      {
        name: '浏阳河鱼馆',
        status: '营业中',
        distance: '距离 0.7km',
        tags: ['河鲜', '招牌菜'],
        statusColor: 'success',
        category: 'food'
      },
      {
        name: '传统豆腐坊',
        status: '营业中',
        distance: '距离 0.9km',
        tags: ['手工制作', '百年老店'],
        statusColor: 'success',
        category: 'food'
      },
      // 打卡景点
      {
        name: '浏阳文庙',
        status: '开放中',
        distance: '距离 1.1km',
        tags: ['历史文化', '免费'],
        statusColor: 'success',
        category: 'scenic'
      },
      {
        name: '烟花博物馆',
        status: '开放中',
        distance: '距离 1.5km',
        tags: ['特色展览', '互动体验'],
        statusColor: 'success',
        category: 'scenic'
      },
      {
        name: '浏阳河风光带',
        status: '全天开放',
        distance: '距离 0.8km',
        tags: ['自然风光', '散步'],
        statusColor: 'success',
        category: 'scenic'
      }
    ];
    
    // 默认显示所有服务
    this.renderServiceList(this.allServices);
  }

  // 渲染服务列表
  renderServiceList(services) {
    const serviceList = document.getElementById('serviceList');
    if (!serviceList) return;
    
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

  // 处理服务筛选
  handleServiceFilter(filterTab) {
    // 更新标签状态
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    filterTab.classList.add('active');
    
    // 获取筛选类型
    const filterType = filterTab.dataset.filter;
    
    // 筛选服务数据
    let filteredServices;
    if (filterType === 'all') {
      filteredServices = this.allServices;
    } else {
      filteredServices = this.allServices.filter(service => service.category === filterType);
    }
    
    // 重新渲染列表
    this.renderServiceList(filteredServices);
    
    // 显示筛选反馈
    const categoryNames = {
      'all': '全部服务',
      'parking': '停车场',
      'toilet': '公共厕所',
      'food': '地道美食',
      'scenic': '打卡景点'
    };
    
    this.showToast(`已筛选：${categoryNames[filterType]} (${filteredServices.length}个)`);
  }

  // 打开随手拍编辑页面
  openCaptureEditor() {
    // 跳转到独立的随手拍页面
    window.location.href = 'capture.html';
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
  showToast(message, duration = 700) {
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

  // 故事详情页相关方法
  openStoryDetail(feedItem) {
    const storyIndex = parseInt(feedItem.dataset.storyIndex);
    const storyData = this.currentFeedData[storyIndex];
    
    if (!storyData) return;
    
    // 填充故事详情页内容
    document.getElementById('storyDetailImage').src = storyData.image;
    document.getElementById('storyDetailTitle').textContent = storyData.title;
    document.getElementById('storyDetailLocation').textContent = `📍 ${storyData.location}`;
    document.getElementById('storyDetailDescription').textContent = storyData.description;
    
    // 显示故事详情页
    const storyDetailPage = document.getElementById('storyDetail');
    storyDetailPage.style.display = 'block';
    
    // 滚动到顶部
    storyDetailPage.scrollTop = 0;
    
    // 隐藏主内容
    document.querySelector('.app-container').style.display = 'none';
  }

  closeStoryDetail() {
    // 隐藏故事详情页
    document.getElementById('storyDetail').style.display = 'none';
    
    // 显示主内容
    document.querySelector('.app-container').style.display = 'block';
  }

  handleStoryLike() {
    this.showToast('已点赞！');
  }

  handleStoryShare() {
    this.showToast('正在分享故事...');
  }

  handleStoryComment() {
    this.showToast('正在打开评论...');
  }

  // 通知详情页相关方法
  openNoticeDetail(noticeItem) {
    const noticeId = parseInt(noticeItem.dataset.noticeId);
    const noticesData = [
      {
        title: '违停占道请及时驶离',
        location: '锦城大道人行道',
        description: '各位车主您好，整洁通畅的道路交通环境需要你我共同守护。请您将爱车停放在正规停车位或指定区域，切勿占用消防通道、盲道及人行道。目前，对于非严管路段的违停行为，我们通常采取"先提示后处理"的柔性管理方式：若您收到违停驶离短信，请及时挪车，常常在10分钟内驶离可免于处罚。特别是消防通道，一旦被占用，将直接危及公共安全。您的规范停车，不仅展现了个人素养，也为城市文明添彩。与人方便，与己方便，让我们携手维护安全、有序、畅通的静态交通环境。'
      },
      {
        title: '人流密集请注意安全',
        location: '集里街道菜市场',
        description: '在商圈、广场、交通枢纽等人流密集区域，请您时刻将安全意识放在首位。务必留意现场安全出口、疏散通道的位置。如遇人群拥挤，请保持冷静，顺人流有序行进，切勿逆流、推搡或蹲下。一旦发现人群速度或方向突变、听到异常尖叫等踩踏信号，需高度警惕。若不慎摔倒，应尽量靠近墙角，身体蜷缩成球状，双手护住后颈和头部。遇他人摔倒，请大声呼救，提醒后方人群停止前进。经营商户也需确保门前畅通，不占道经营。安全无小事，防范于未然。'
      },
      {
        title: '道路积水请绕道行驶',
        location: '淮川街道天桥底下',
        description: '近期降雨频繁，部分低洼路段容易出现积水，出行请特别注意安全。驾车出行前，请提前了解天气和路况信息。若遇积水路段，请勿强行通过，应先观察水深与流速。水中熄火切勿重启发动机，以免造成严重损伤。建议尽量绕行已知的易积水点。行经积水路段请低速慢行，避免溅水影响他人。同时，请勿在易积水区域停放车辆。步行或骑行时，请警惕井盖、漩涡，远离电力设备。道路千万条，安全第一条。'
      }
    ];
    
    const noticeData = noticesData[noticeId];
    if (!noticeData) return;
    
    // 填充通知详情页内容
    document.getElementById('noticeDetailTitle').textContent = noticeData.title;
    document.getElementById('noticeDetailLocation').textContent = `📍 ${noticeData.location}`;
    document.getElementById('noticeDetailDescription').textContent = noticeData.description;
    
    // 显示通知详情页
    const noticeDetailPage = document.getElementById('noticeDetail');
    noticeDetailPage.style.display = 'block';
    
    // 滚动到顶部
    noticeDetailPage.scrollTop = 0;
    
    // 隐藏主内容
    document.querySelector('.app-container').style.display = 'none';
  }

  closeNoticeDetail() {
    // 隐藏通知详情页
    document.getElementById('noticeDetail').style.display = 'none';
    
    // 显示主内容
    document.querySelector('.app-container').style.display = 'block';
  }

  // 城管温馨提示展开/收起功能
  toggleNoticesExpand() {
    const expandBtn = document.getElementById('noticesExpandBtn');
    const hiddenItems = document.querySelectorAll('.notice-item-hidden');
    const expandText = expandBtn.querySelector('.expand-text');
    
    if (expandBtn.classList.contains('expanded')) {
      // 收起状态 -> 展开状态
      hiddenItems.forEach(item => {
        item.classList.remove('show');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      });
      expandBtn.classList.remove('expanded');
      expandText.textContent = '展开';
    } else {
      // 展开状态 -> 收起状态
      hiddenItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.display = 'flex';
          item.classList.add('show');
        }, index * 100);
      });
      expandBtn.classList.add('expanded');
      expandText.textContent = '收起';
    }
  }
}

// 全局变量，供HTML中的onclick使用
let app;

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  app = new WarmLiuyangApp();
  window.app = app;
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WarmLiuyangApp;
}