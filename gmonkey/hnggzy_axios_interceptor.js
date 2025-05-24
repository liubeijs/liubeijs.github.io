// ==UserScript==
// @name         湖南公共资源交易平台【招标计划】拦截器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截湖南公共资源交易平台的axios请求并保存返回的JSON数据
// @author       YourName
// @match        https://www.hnsggzy.com/*
// @grant        GM_addStyle
// @grant        GM_notification
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // 创建全局变量用于存储拦截到的数据
    window.interceptedData = null;
    
    // 添加样式
    GM_addStyle(`
        #data-status {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            display: none;
        }
        #data-viewer {
            position: fixed;
            top: 50px;
            right: 10px;
            width: 400px;
            max-height: 80vh;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            overflow: auto;
            display: none;
        }
        #data-viewer pre {
            white-space: pre-wrap;
            word-break: break-all;
            font-size: 12px;
        }
        #toggle-viewer {
            position: fixed;
            top: 10px;
            right: 150px;
            background: #2196F3;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            display: none;
        }
        #copy-data {
            position: fixed;
            top: 10px;
            right: 250px;
            background: #FF9800;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            display: none;
        }
    `);
    
    // 创建UI元素
    function createUI() {
        const body = document.body;
        
        const statusEl = document.createElement('div');
        statusEl.id = 'data-status';
        statusEl.textContent = '未拦截到数据';
        body.appendChild(statusEl);
        
        const toggleBtn = document.createElement('div');
        toggleBtn.id = 'toggle-viewer';
        toggleBtn.textContent = '显示数据';
        toggleBtn.addEventListener('click', function() {
            const viewer = document.getElementById('data-viewer');
            if (viewer.style.display === 'none' || !viewer.style.display) {
                viewer.style.display = 'block';
                this.textContent = '隐藏数据';
            } else {
                viewer.style.display = 'none';
                this.textContent = '显示数据';
            }
        });
        body.appendChild(toggleBtn);
        
        const copyBtn = document.createElement('div');
        copyBtn.id = 'copy-data';
        copyBtn.textContent = '复制数据';
        copyBtn.addEventListener('click', function() {
            if (window.interceptedData) {
                const dataStr = JSON.stringify(window.interceptedData, null, 2);
                navigator.clipboard.writeText(dataStr).then(function() {
                    GM_notification({
                        title: '复制成功',
                        text: '数据已复制到剪贴板',
                        timeout: 2000
                    });
                }).catch(function(err) {
                    console.error('复制失败:', err);
                    GM_notification({
                        title: '复制失败',
                        text: '请手动复制数据',
                        timeout: 2000
                    });
                });
            } else {
                GM_notification({
                    title: '复制失败',
                    text: '没有可复制的数据',
                    timeout: 2000
                });
            }
        });
        body.appendChild(copyBtn);
        
        const viewerEl = document.createElement('div');
        viewerEl.id = 'data-viewer';
        const preEl = document.createElement('pre');
        viewerEl.appendChild(preEl);
        body.appendChild(viewerEl);
    }

    function saveInterceptedData(data) {
        window.interceptedData = data;
    
        // 如果存在noticeContent字段，解析它
        if (data.data?.noticeContent) {
            const parsedNotice = parseNoticeContent(data.data.noticeContent);
            // 将解析后的数据添加到interceptedData中
            window.interceptedData.data.noticeContent = parsedNotice;
        }
    }

// 添加解析HTML的函数
function parseNoticeContent(htmlContent) {
    // 创建一个临时的DOM元素来解析HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // 获取所有表格行
    const rows = tempDiv.getElementsByTagName('tr');
    
    // 创建结果对象
    const result = {
        projectName: tempDiv.querySelector('h1')?.textContent?.trim() || '',
        publishDate: tempDiv.querySelector('div[style*="padding-left: 550px"]')?.textContent?.replace(/发布日期:|\s+/g, '').trim() || '',
        details: {}
    };
    
    // 遍历表格行提取数据
    Array.from(rows).forEach(row => {
        const titleCell = row.querySelector('td div[align="center"] b');
        const contentCell = row.querySelector('td[colspan="3"] div[align="center"]');
        
        if (titleCell && contentCell) {
            const title = titleCell.textContent.trim();
            const content = contentCell.textContent.trim();
            result.details[title] = content;
        } else {
            // 处理投资估算和资金来源这样的特殊行
            const cells = row.getElementsByTagName('td');
            if (cells.length === 4) {
                const title1 = cells[0].querySelector('b')?.textContent.trim();
                const content1 = cells[1].querySelector('div')?.textContent.trim();
                const title2 = cells[2].querySelector('b')?.textContent.trim();
                const content2 = cells[3].querySelector('div')?.textContent.trim();
                
                if (title1 && content1) result.details[title1] = content1;
                if (title2 && content2) result.details[title2] = content2;
            }
        }
    });
    
    return result;
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
                    // 检查URL是否匹配目标API
                    if (xhr._url && xhr._url.includes('/tradeApi/constructionTender/getConstructionTenderPlanById')) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            saveInterceptedData(data);
                            
                            // 更新UI
                            const statusEl = document.getElementById('data-status');
                            const viewerEl = document.getElementById('data-viewer');
                            const preEl = viewerEl.querySelector('pre');
                            const toggleBtn = document.getElementById('toggle-viewer');
                            const copyBtn = document.getElementById('copy-data');
                            
                            if (statusEl && viewerEl && preEl) {
                                statusEl.textContent = '已拦截到数据';
                                statusEl.style.display = 'block';
                                statusEl.style.background = '#4CAF50';
                                
                                preEl.textContent = JSON.stringify(data, null, 2);
                                toggleBtn.style.display = 'block';
                                copyBtn.style.display = 'block';
                                
                                GM_notification({
                                    title: '数据拦截成功',
                                    text: '已保存到全局变量 window.interceptedData',
                                    timeout: 3000
                                });
                            }
                        } catch (e) {
                            console.error('解析响应失败:', e);
                        }
                    }
                }
                
                if (originalOnReadyStateChange) {
                    originalOnReadyStateChange.apply(xhr, arguments);
                }
            };
            
            return originalSend.apply(this, arguments);
        };
    }
    
    // 拦截fetch请求
    function interceptFetch() {
        const originalFetch = window.fetch;
        
        window.fetch = function(input, init) {
            return originalFetch(input, init).then(response => {
                // 检查URL是否匹配目标API
                const url = typeof input === 'string' ? input : input.url;
                
                if (url && url.includes('/tradeApi/constructionTender/getConstructionTenderPlanById')) {
                    // 克隆响应以便多次读取
                    const clonedResponse = response.clone();
                    
                    clonedResponse.json().then(data => {
                        saveInterceptedData(data);
                        
                        // 更新UI
                        const statusEl = document.getElementById('data-status');
                        const viewerEl = document.getElementById('data-viewer');
                        const preEl = viewerEl.querySelector('pre');
                        const toggleBtn = document.getElementById('toggle-viewer');
                        const copyBtn = document.getElementById('copy-data');
                        
                        if (statusEl && viewerEl && preEl) {
                            statusEl.textContent = '已拦截到数据';
                            statusEl.style.display = 'block';
                            statusEl.style.background = '#4CAF50';
                            
                            preEl.textContent = JSON.stringify(data, null, 2);
                            toggleBtn.style.display = 'block';
                            copyBtn.style.display = 'block';
                            
                            GM_notification({
                                title: '数据拦截成功',
                                text: '已保存到全局变量 window.interceptedData',
                                timeout: 3000
                            });
                        }
                    }).catch(e => {
                        console.error('解析响应失败:', e);
                    });
                }
                
                return response;
            });
        };
    }
    
    // 拦截axios请求
    function interceptAxios() {
        // 等待axios加载完成
        const checkAxios = setInterval(() => {
            if (window.axios) {
                clearInterval(checkAxios);
                
                // 保存原始方法
                const originalGet = window.axios.get;
                const originalPost = window.axios.post;
                
                // 拦截GET请求
                window.axios.get = function(url, config) {
                    return originalGet.call(this, url, config).then(response => {
                        if (url && url.includes('/tradeApi/constructionTender/getConstructionTenderPlanById')) {
                            saveInterceptedData(response.data);
                            updateUI(response.data);
                        }
                        return response;
                    });
                };
                
                // 拦截POST请求
                window.axios.post = function(url, data, config) {
                    return originalPost.call(this, url, data, config).then(response => {
                        if (url && url.includes('/tradeApi/constructionTender/getConstructionTenderPlanById')) {
                            
                            saveInterceptedData(response.data);
                            updateUI(response.data);
                        }
                        return response;
                    });
                };
                
                // 拦截请求拦截器
                if (window.axios.interceptors && window.axios.interceptors.response) {
                    window.axios.interceptors.response.use(response => {
                        const url = response.config.url;
                        if (url && url.includes('/tradeApi/constructionTender/getConstructionTenderPlanById')) {
                            
                            saveInterceptedData(response.data);
                            updateUI(response.data);
                        }
                        return response;
                    });
                }
            }
        }, 100);
    }
    
    // 更新UI显示
    function updateUI(data) {
        const statusEl = document.getElementById('data-status');
        const viewerEl = document.getElementById('data-viewer');
        const preEl = viewerEl.querySelector('pre');
        const toggleBtn = document.getElementById('toggle-viewer');
        const copyBtn = document.getElementById('copy-data');
        
        if (statusEl && viewerEl && preEl) {
            statusEl.textContent = '已拦截到数据';
            statusEl.style.display = 'block';
            statusEl.style.background = '#4CAF50';
            
            preEl.textContent = JSON.stringify(data, null, 2);
            toggleBtn.style.display = 'block';
            copyBtn.style.display = 'block';
            
            GM_notification({
                title: '数据拦截成功',
                text: '已保存到全局变量 window.interceptedData',
                timeout: 3000
            });
        }
    }
    
    // 初始化
    function init() {
        createUI();
        interceptXHR();
        interceptFetch();
        interceptAxios();
    }
    
    // 在DOM加载完成后初始化UI
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();