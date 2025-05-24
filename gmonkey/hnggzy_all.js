// ==UserScript==
// @name         湖南公共资源交易平台【全接口】拦截器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截湖南公共资源交易平台的所有相关接口并展示数据
// @author       YourName
// @match        https://www.hnsggzy.com/*
// @grant        GM_addStyle
// @grant        GM_notification
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 定义接口配置
    const API_CONFIG = [
        {
            name: '招标计划',
            pattern: '/tradeApi/constructionTender/getConstructionTenderPlanById',
            data: null,
            enabled: false
        },
        {
            name: '项目信息',
            pattern: '/tradeApi/constructionTender/getBySectionId',
            data: null,
            enabled: false
        },
        {
            name: '公告信息',
            pattern: '/tradeApi/constructionNotice/getBySectionId',
            data: null,
            enabled: false
        },
        {
            name: '开标参数',
            pattern: '/tradeApi/coefficient/getCoefficientList',
            data: null,
            enabled: false
        },
        {
            name: '开标信息',
            pattern: '/tradeApi/constructionSite/selectbyconstructionsectionid',
            data: null,
            enabled: false
        },
        {
            name: '中标候选人',
            pattern: '/tradeApi/constructionNotice/selectWinningBidNotice',
            data: null,
            enabled: false
        },
        {
            name: '中标结果',
            pattern: '/tradeApi/constructionNotice/selectWinningBidNotice',
            data: null,
            enabled: false
        }
    ];

    // 添加样式
    GM_addStyle(`
        #api-buttons {
            position: fixed;
            top: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            z-index: 9999;
        }
        .api-button {
            padding: 8px 15px;
            border-radius: 4px;
            font-size: 12px;
            cursor: not-allowed;
            background: #ccc;
            color: #666;
            border: none;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        .api-button.enabled {
            background: #2196F3;
            color: white;
            cursor: pointer;
        }
        .api-button.enabled:hover {
            background: #1976D2;
        }
        #data-viewer {
            position: fixed;
            top: 10px;
            right: 200px;
            width: 600px;
            max-height: 80vh;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            overflow: auto;
            display: none;
            z-index: 9998;
        }
        #data-viewer .viewer-header {
            padding: 10px;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: flex-end;
        }
        #data-viewer .action-buttons {
            display: flex;
            gap: 10px;
        }
        #data-viewer .action-buttons button {
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;
        }
        #data-viewer .action-buttons button:hover {
            background: #f0f0f0;
        }
        #data-viewer pre {
            margin: 0;
            padding: 10px;
            max-height: calc(100% - 50px);
            overflow: auto;
        }
        #reset-button {
            margin-top: 10px;
            padding: 8px 15px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            background: #f44336;
            color: white;
            border: none;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        #reset-button:hover {
            background: #d32f2f;
        }
    `);

    // 创建UI元素
    function createUI() {
        const body = document.body;

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'api-buttons';

        // 创建数据查看器
        const dataViewer = document.createElement('div');
        dataViewer.id = 'data-viewer';
        dataViewer.innerHTML = `
            <div class="viewer-header">
                <div class="action-buttons">
                    <button class="copy-btn">复制数据</button>
                    <button class="close-btn">关闭</button>
                </div>
            </div>
            <pre></pre>
        `;

        // 添加关闭按钮事件
        dataViewer.querySelector('.close-btn').addEventListener('click', () => {
            dataViewer.style.display = 'none';
        });

        // 添加复制按钮事件
        dataViewer.querySelector('.copy-btn').addEventListener('click', () => {
            const pre = dataViewer.querySelector('pre');
            navigator.clipboard.writeText(pre.textContent)
                .then(() => {
                    alert('数据已复制到剪贴板');
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    alert('复制失败，请手动复制');
                });
        });

        // 创建接口按钮
        API_CONFIG.forEach((api, index) => {
            const button = document.createElement('button');
            button.className = 'api-button';
            button.textContent = api.name;
            button.addEventListener('click', () => {
                if (api.enabled) {
                    showData(api.data, api.name);
                }
            });
            buttonContainer.appendChild(button);
        });

        // 创建重置按钮
        const resetButton = document.createElement('button');
        resetButton.id = 'reset-button';
        resetButton.textContent = '重置';
        resetButton.addEventListener('click', resetAllData);
        buttonContainer.appendChild(resetButton);

        body.appendChild(buttonContainer);
        body.appendChild(dataViewer);
    }

    // 重置所有数据
    function resetAllData() {
        // 重置API配置
        API_CONFIG.forEach(api => {
            api.data = null;
            api.enabled = false;
        });

        // 重置按钮状态
        const buttons = document.querySelectorAll('.api-button');
        buttons.forEach(button => {
            button.classList.remove('enabled');
        });

        // 隐藏数据查看器
        const dataViewer = document.getElementById('data-viewer');
        if (dataViewer) {
            dataViewer.style.display = 'none';
        }

        // 显示重置成功提示
        GM_notification({
            title: '重置成功',
            text: '所有接口数据已清空',
            timeout: 3000
        });
    }

    // 显示数据
    function showData(data, title) {
        const viewer = document.getElementById('data-viewer');
        const pre = viewer.querySelector('pre');
        pre.textContent = JSON.stringify(data, null, 2);
        viewer.style.display = 'block';
    }

    // 更新按钮状态
    function updateButton(url, data) {
        // 处理中标候选人和中标结果的特殊情况
        if (url.includes('/tradeApi/constructionNotice/selectWinningBidNotice/')) {
            const isCandidate = url.endsWith('/0');
            const isResult = url.endsWith('/1');
            
            if (isCandidate || isResult) {
                const apiIndex = API_CONFIG.findIndex(api => 
                    api.name === (isCandidate ? '中标候选人' : '中标结果')
                );
                
                if (apiIndex !== -1) {
                    API_CONFIG[apiIndex].data = data;
                    API_CONFIG[apiIndex].enabled = true;

                    const button = document.querySelectorAll('.api-button')[apiIndex];
                    button.classList.add('enabled');

                    GM_notification({
                        title: `${API_CONFIG[apiIndex].name}数据已获取`,
                        text: '点击按钮查看详细信息',
                        timeout: 3000
                    });
                }
                return;
            }
        }

        // 处理其他接口
        const apiIndex = API_CONFIG.findIndex(api => url.includes(api.pattern));
        if (apiIndex !== -1) {
            API_CONFIG[apiIndex].data = data;
            API_CONFIG[apiIndex].enabled = true;

            const button = document.querySelectorAll('.api-button')[apiIndex];
            button.classList.add('enabled');

            GM_notification({
                title: `${API_CONFIG[apiIndex].name}数据已获取`,
                text: '点击按钮查看详细信息',
                timeout: 3000
            });
        }
    }

    // 拦截XMLHttpRequest
    function interceptXHR() {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method, url) {
            this._url = url;
            return originalOpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function() {
            const xhr = this;
            const originalOnReadyStateChange = xhr.onreadystatechange;

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        updateButton(xhr._url, data);
                    } catch (e) {
                        console.error('解析响应失败:', e);
                    }
                }

                if (originalOnReadyStateChange) {
                    originalOnReadyStateChange.apply(xhr, arguments);
                }
            };

            return originalSend.apply(this, arguments);
        };
    }

    // 拦截Fetch请求
    function interceptFetch() {
        const originalFetch = window.fetch;
        window.fetch = async function(input, init) {
            const response = await originalFetch.apply(this, arguments);
            const url = typeof input === 'string' ? input : input.url;

            response.clone().json().then(data => {
                updateButton(url, data);
            }).catch(() => {});

            return response;
        };
    }

    // 初始化
    function init() {
        interceptXHR();
        interceptFetch();
        // 等待DOM加载完成后创建UI
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createUI);
        } else {
            createUI();
        }
    }

    init();
})();