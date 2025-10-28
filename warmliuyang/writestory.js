class WriteStoryApp {
  constructor() {
    this.uploadedImages = [];
    this.currentLocation = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updatePublishButton();
  }

  setupEventListeners() {
    // 返回按钮
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    // 发布按钮
    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) {
      publishBtn.addEventListener('click', this.handlePublish.bind(this));
    }

    // 标题输入
    const titleInput = document.getElementById('storyTitleInput');
    if (titleInput) {
      titleInput.addEventListener('input', this.handleTitleInput.bind(this));
    }

    // 内容输入
    const contentTextarea = document.getElementById('storyContent');
    if (contentTextarea) {
      contentTextarea.addEventListener('input', this.handleContentInput.bind(this));
    }

    // 文件上传
    for (let i = 1; i <= 3; i++) {
      const fileInput = document.getElementById(`fileInput${i}`);
      const uploadBtn = document.getElementById(`uploadBtn${i}`);
      
      if (fileInput && uploadBtn) {
        fileInput.addEventListener('change', (e) => this.handleFileUpload(e, i));
        uploadBtn.addEventListener('click', (e) => {
          // 只有点击的不是文件输入框时才触发
          if (e.target === uploadBtn || e.target.classList.contains('upload-icon') || e.target.classList.contains('upload-text')) {
            fileInput.click();
          }
        });
      }
    }

    // 位置获取
    const locationBtn = document.getElementById('locationBtn');
    if (locationBtn) {
      locationBtn.addEventListener('click', this.getCurrentLocation.bind(this));
    }
  }

  handleTitleInput(e) {
    const titleCount = document.getElementById('titleCount');
    if (titleCount) {
      titleCount.textContent = e.target.value.length;
    }
    this.updatePublishButton();
  }

  handleContentInput(e) {
    const contentCount = document.getElementById('contentCount');
    if (contentCount) {
      contentCount.textContent = e.target.value.length;
    }
    this.updatePublishButton();
  }

  handleFileUpload(e, index) {
    const file = e.target.files[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      this.showToast('请选择图片文件');
      return;
    }

    // 检查文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('图片大小不能超过5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.displayImage(e.target.result, index);
      this.uploadedImages[index - 1] = file;
      this.updatePublishButton();
    };
    reader.readAsDataURL(file);
  }

  displayImage(src, index) {
    const uploadBtn = document.getElementById(`uploadBtn${index}`);
    if (!uploadBtn) return;

    uploadBtn.classList.add('has-image');
    uploadBtn.innerHTML = `
      <img src="${src}" alt="预览图片" class="media-preview">
      <button class="media-delete">×</button>
    `;

    // 为删除按钮绑定事件
    const deleteBtn = uploadBtn.querySelector('.media-delete');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        this.removeImage(index);
      });
    }

    // 显示下一个上传按钮
    if (index < 3) {
      const nextBtn = document.getElementById(`uploadBtn${index + 1}`);
      if (nextBtn) {
        nextBtn.classList.remove('hidden');
      }
    }
  }

  removeImage(index) {
    const uploadBtn = document.getElementById(`uploadBtn${index}`);
    if (!uploadBtn) return;

    uploadBtn.classList.remove('has-image');
    uploadBtn.innerHTML = `
      <div class="upload-icon">📷</div>
      <div class="upload-text">添加图片</div>
      <input type="file" accept="image/*" class="file-input" id="fileInput${index}">
    `;

    // 重新绑定事件
    const fileInput = document.getElementById(`fileInput${index}`);
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileUpload(e, index));
    }

    // 重新绑定上传按钮点击事件
    uploadBtn.addEventListener('click', (e) => {
      // 只有点击的不是文件输入框时才触发
      if (e.target === uploadBtn || e.target.classList.contains('upload-icon') || e.target.classList.contains('upload-text')) {
        fileInput.click();
      }
    });

    // 移除图片数据
    this.uploadedImages[index - 1] = null;

    // 隐藏后续的空上传按钮
    for (let i = index + 1; i <= 3; i++) {
      const btn = document.getElementById(`uploadBtn${i}`);
      if (btn && !this.uploadedImages[i - 1]) {
        btn.classList.add('hidden');
      }
    }

    this.updatePublishButton();
  }

  getCurrentLocation() {
    const locationBtn = document.getElementById('locationBtn');
    const locationDisplay = document.getElementById('locationDisplay');
    
    if (!navigator.geolocation) {
      this.showToast('浏览器不支持定位功能');
      return;
    }

    locationBtn.textContent = '定位中...';
    locationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.currentLocation = { latitude, longitude };
        
        // 模拟地址解析（实际项目中应该调用地图API）
        const mockAddress = this.getMockAddress(latitude, longitude);
        
        locationDisplay.innerHTML = `
          <div class="location-text has-location">📍 ${mockAddress}</div>
        `;
        
        locationBtn.textContent = '重新定位';
        locationBtn.disabled = false;
        this.updatePublishButton();
      },
      (error) => {
        console.error('定位失败:', error);
        this.showToast('定位失败，请检查定位权限');
        locationBtn.textContent = '获取当前位置';
        locationBtn.disabled = false;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  }

  getMockAddress(lat, lng) {
    // 模拟地址数据（实际项目中应该调用逆地理编码API）
    const addresses = [
      '浏阳市淮川街道人民路123号',
      '浏阳市集里街道金沙路456号',
      '浏阳市关口街道浏阳河路789号',
      '浏阳市荷花街道花炮大道101号',
      '浏阳市大瑶镇花炮广场202号'
    ];
    return addresses[Math.floor(Math.random() * addresses.length)];
  }

  updatePublishButton() {
    const publishBtn = document.getElementById('publishBtn');
    const titleInput = document.getElementById('storyTitleInput');
    const contentTextarea = document.getElementById('storyContent');
    
    if (!publishBtn || !titleInput || !contentTextarea) return;

    const hasTitle = titleInput.value.trim().length > 0;
    const hasContent = contentTextarea.value.trim().length > 0;
    const hasImages = this.uploadedImages.some(img => img !== null && img !== undefined);
    
    // 至少需要标题和内容，或者有图片
    const canPublish = hasTitle && (hasContent || hasImages);
    
    publishBtn.disabled = !canPublish;
  }

  handlePublish() {
    const titleInput = document.getElementById('storyTitleInput');
    const contentTextarea = document.getElementById('storyContent');
    
    const storyData = {
      title: titleInput.value.trim(),
      content: contentTextarea.value.trim(),
      images: this.uploadedImages.filter(img => img !== null && img !== undefined),
      location: this.currentLocation,
      timestamp: new Date().toISOString()
    };

    // 模拟发布过程
    this.showToast('正在发布故事...');
    
    setTimeout(() => {
      this.showToast('故事发布成功！');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }, 2000);

    console.log('发布故事数据:', storyData);
  }

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

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new WriteStoryApp();
});

// 导出模块（如果需要）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WriteStoryApp;
}