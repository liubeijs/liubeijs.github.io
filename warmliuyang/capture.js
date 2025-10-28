// 随手拍页面JavaScript

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initCapturePage();
});

// 初始化随手拍页面
function initCapturePage() {
    console.log('随手拍页面初始化');
    
    // 绑定返回按钮事件
    const backBtn = document.getElementById('captureBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // 返回主页
            window.location.href = 'index.html';
        });
    }
    
    // 初始化媒体上传功能
    initMediaUpload();
    
    // 初始化位置功能
    initLocation();
    
    // 初始化分类功能
    initCategory();
    
    // 初始化提交功能
    initSubmit();
}

// 初始化媒体上传功能
function initMediaUpload() {
    const uploadItems = document.querySelectorAll('.media-upload-item');
    
    uploadItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            handleMediaUpload(index + 1);
        });
    });
}

// 处理媒体上传
function handleMediaUpload(uploadIndex) {
    console.log(`点击上传区域 ${uploadIndex}`);
    
    // 创建文件输入元素
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file, uploadIndex);
        }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// 处理文件上传
function handleFileUpload(file, uploadIndex) {
    console.log(`上传文件: ${file.name}, 大小: ${file.size}, 类型: ${file.type}`);
    
    const uploadItem = document.getElementById(`mediaUpload${uploadIndex}`);
    if (!uploadItem) return;
    
    // 创建文件预览
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.createElement('div');
        preview.className = 'media-preview-container';
        
        if (file.type.startsWith('image/')) {
            preview.innerHTML = `
                <img src="${e.target.result}" class="media-preview" alt="预览图片">
                <button class="media-remove-btn" onclick="removeMedia(${uploadIndex})">×</button>
            `;
        } else if (file.type.startsWith('video/')) {
            preview.innerHTML = `
                <video src="${e.target.result}" class="media-preview" controls></video>
                <button class="media-remove-btn" onclick="removeMedia(${uploadIndex})">×</button>
            `;
        }
        
        uploadItem.innerHTML = '';
        uploadItem.appendChild(preview);
        uploadItem.classList.add('has-media');
        
        // 存储文件信息
        uploadItem.dataset.file = JSON.stringify({
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result
        });
    };
    
    reader.readAsDataURL(file);
}

// 移除媒体文件
function removeMedia(uploadIndex) {
    const uploadItem = document.getElementById(`mediaUpload${uploadIndex}`);
    if (!uploadItem) return;
    
    uploadItem.innerHTML = `
        <div class="upload-placeholder">
            <div class="upload-icon">📷</div>
            <div class="upload-text">点击上传</div>
        </div>
    `;
    uploadItem.classList.remove('has-media');
    delete uploadItem.dataset.file;
}

// 初始化位置功能
function initLocation() {
    const locationEditBtn = document.getElementById('locationEditBtn');
    const locationInput = document.getElementById('locationInput');
    
    // 获取当前位置
    getCurrentLocation();
    
    // 绑定编辑按钮事件
    if (locationEditBtn) {
        locationEditBtn.addEventListener('click', function() {
            if (locationInput.readOnly) {
                locationInput.readOnly = false;
                locationInput.focus();
                locationEditBtn.textContent = '确定';
            } else {
                locationInput.readOnly = true;
                locationEditBtn.textContent = '编辑';
            }
        });
    }
}

// 获取当前位置
function getCurrentLocation() {
    const locationInput = document.getElementById('locationInput');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // 这里应该调用地理编码API将坐标转换为地址
                // 暂时使用模拟地址
                const mockAddress = "浏阳市人民路123号";
                locationInput.value = mockAddress;
                
                console.log(`位置获取成功: ${lat}, ${lng}`);
            },
            function(error) {
                console.log('位置获取失败:', error);
                locationInput.value = "位置获取失败，请手动输入";
                locationInput.readOnly = false;
            }
        );
    } else {
        locationInput.value = "浏览器不支持定位，请手动输入";
        locationInput.readOnly = false;
    }
}

// 初始化分类选择
function initCategory() {
    const categorySelectBtn = document.getElementById('categorySelectBtn');
    
    if (categorySelectBtn) {
        categorySelectBtn.addEventListener('click', showCategoryModal);
    }
}

// 显示分类选择弹窗
function showCategoryModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'category-modal';
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>选择事件分类</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="category-list">
                    <div class="category-item" data-category="违章占道" data-icon="🅿️">
                        <div class="category-icon">🅿️</div>
                        <div class="category-text">违章占道</div>
                    </div>
                    <div class="category-item" data-category="门前停车" data-icon="🚗">
                        <div class="category-icon">🚗</div>
                        <div class="category-text">门前停车</div>
                    </div>
                    <div class="category-item" data-category="堆积垃圾" data-icon="🗑️">
                        <div class="category-icon">🗑️</div>
                        <div class="category-text">堆积垃圾</div>
                    </div>
                    <div class="category-item" data-category="乱扔垃圾" data-icon="🚮">
                        <div class="category-icon">🚮</div>
                        <div class="category-text">乱扔垃圾</div>
                    </div>
                    <div class="category-item" data-category="道路积水" data-icon="💧">
                        <div class="category-icon">💧</div>
                        <div class="category-text">道路积水</div>
                    </div>
                    <div class="category-item" data-category="道路病害" data-icon="🛣️">
                        <div class="category-icon">🛣️</div>
                        <div class="category-text">道路病害</div>
                    </div>
                    <div class="category-item" data-category="乱贴广告" data-icon="📋">
                        <div class="category-icon">📋</div>
                        <div class="category-text">乱贴广告</div>
                    </div>
                    <div class="category-item" data-category="打架斗殴" data-icon="👊">
                        <div class="category-icon">👊</div>
                        <div class="category-text">打架斗殴</div>
                    </div>
                    <div class="category-item" data-category="人行道病害" data-icon="🚶">
                        <div class="category-icon">🚶</div>
                        <div class="category-text">人行道病害</div>
                    </div>
                    <div class="category-item" data-category="树木病害" data-icon="🌳">
                        <div class="category-icon">🌳</div>
                        <div class="category-text">树木病害</div>
                    </div>
                    <div class="category-item" data-category="违规晾晒" data-icon="👕">
                        <div class="category-icon">👕</div>
                        <div class="category-text">违规晾晒</div>
                    </div>
                    <div class="category-item" data-category="道路拥挤" data-icon="🚦">
                        <div class="category-icon">🚦</div>
                        <div class="category-text">道路拥挤</div>
                    </div>
                    <div class="category-item" data-category="人群密集" data-icon="👥">
                        <div class="category-icon">👥</div>
                        <div class="category-text">人群密集</div>
                    </div>
                    <div class="category-item" data-category="噪音扰民" data-icon="🔊">
                        <div class="category-icon">🔊</div>
                        <div class="category-text">噪音扰民</div>
                    </div>
                    <div class="category-item" data-category="违规摆摊" data-icon="🏪">
                        <div class="category-icon">🏪</div>
                        <div class="category-text">违规摆摊</div>
                    </div>
                    <div class="category-item" data-category="其他" data-icon="📝">
                        <div class="category-icon">📝</div>
                        <div class="category-text">其他</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 获取当前选中的分类
    const currentCategoryText = document.querySelector('#currentCategory .category-text').textContent;
    const modalCategoryItems = modal.querySelectorAll('.category-item');
    
    // 标记当前选中的分类
    modalCategoryItems.forEach(item => {
        if (item.dataset.category === currentCategoryText) {
            item.classList.add('selected');
        }
    });
    
    // 添加关闭事件
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    function closeModal() {
        document.body.removeChild(modal);
    }
    
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // 添加分类选择事件
    modalCategoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            const icon = this.dataset.icon;
            
            // 更新主页面的当前分类显示
            updateCurrentCategory(category, icon);
            
            closeModal();
        });
    });
}

// 更新当前分类显示
function updateCurrentCategory(category, icon) {
    const currentCategoryIcon = document.querySelector('#currentCategory .category-icon');
    const currentCategoryText = document.querySelector('#currentCategory .category-text');
    
    if (currentCategoryIcon && currentCategoryText) {
        currentCategoryIcon.textContent = icon;
        currentCategoryText.textContent = category;
    }
}

// 初始化提交功能
function initSubmit() {
    const submitBtn = document.getElementById('submitReportBtn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            handleSubmitReport();
        });
    }
}

// 处理提交上报
function handleSubmitReport() {
    console.log('开始提交上报');
    
    // 收集表单数据
    const reportData = collectReportData();
    
    if (!validateReportData(reportData)) {
        return;
    }
    
    // 显示提交状态
    const submitBtn = document.getElementById('submitReportBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="submit-text">提交中...</span>';
    submitBtn.disabled = true;
    
    // 模拟提交过程
    setTimeout(() => {
        console.log('上报数据:', reportData);
        
        // 显示成功提示
        alert('上报成功！感谢您的参与，我们会及时处理。');
        
        // 返回主页
        window.location.href = 'index.html';
    }, 2000);
}

// 收集上报数据
function collectReportData() {
    const data = {
        media: [],
        location: '',
        category: '',
        description: '',
        timestamp: new Date().toISOString()
    };
    
    // 收集媒体文件
    const uploadItems = document.querySelectorAll('.media-upload-item.has-media');
    uploadItems.forEach(item => {
        if (item.dataset.file) {
            data.media.push(JSON.parse(item.dataset.file));
        }
    });
    
    // 收集位置信息
    const locationInput = document.getElementById('locationInput');
    if (locationInput) {
        data.location = locationInput.value;
    }
    
    // 收集分类信息
    const activeCategory = document.querySelector('.category-item.active');
    if (activeCategory) {
        data.category = activeCategory.dataset.category;
    }
    
    // 收集描述信息
    const descriptionInput = document.getElementById('descriptionInput');
    if (descriptionInput) {
        data.description = descriptionInput.value;
    }
    
    return data;
}

// 验证上报数据
function validateReportData(data) {
    if (data.media.length === 0) {
        alert('请至少上传一张图片或视频');
        return false;
    }
    
    if (!data.location.trim()) {
        alert('请填写事发位置');
        return false;
    }
    
    if (!data.category) {
        alert('请选择事件分类');
        return false;
    }
    
    return true;
}

// 智能分类识别（模拟功能）
function smartCategoryRecognition() {
    // 这里可以集成AI图像识别API
    // 暂时返回模拟结果
    const categories = ['违章占道', '堆积垃圾', '道路病害', '乱贴广告'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    console.log('智能识别分类:', randomCategory);
    
    // 自动选择识别的分类
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === randomCategory) {
            item.classList.add('active');
        }
    });
}