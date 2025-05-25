// ==UserScript==
// @name         湖南公共资源交易平台【全接口】拦截器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截湖南公共资源交易平台的所有相关接口并展示数据
// @author       YourName
// @match        https://www.hnsggzy.com/*
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_info
// @noframes
// @grant        GM_addElement
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @run-at       document-start
// @require      https://cdn.bootcdn.net/ajax/libs/jsoneditor/10.1.3/jsoneditor.min.js
// @resource     JSONEDITOR_CSS https://cdn.bootcdn.net/ajax/libs/jsoneditor/10.1.3/jsoneditor.min.css
// @resource     JSONEDITOR_ICONS https://cdn.bootcdn.net/ajax/libs/jsoneditor/10.1.3/img/jsoneditor-icons.svg
// ==/UserScript==

(function() {
    'use strict';

    // 通过湖南省的行政区划代码获得湖南地区名称
    function getHunanAreaByCode(code) {
        // 验证输入
        if (!code || typeof code !== 'string' || !/^\d{6}$/.test(code)) {
            return '';
        }
    
        // 湖南省行政区划代码以43开头
        if (!code.startsWith('43')) {
            return '';
        }
    
        // 湖南省行政区划代码对照表
        const areaMap = {
            '430100': '长沙市',
            '430102': '芙蓉区',
            '430103': '天心区',
            '430104': '岳麓区',
            '430105': '开福区',
            '430111': '雨花区',
            '430112': '望城区',
            '430121': '长沙县',
            '430181': '浏阳市',
            '430182': '宁乡市',
    
            '430200': '株洲市',
            '430202': '荷塘区',
            '430203': '芦淞区',
            '430204': '石峰区',
            '430211': '天元区',
            '430212': '渌口区',
            '430223': '攸县',
            '430224': '茶陵县',
            '430225': '炎陵县',
            '430281': '醴陵市',
    
            '430300': '湘潭市',
            '430302': '雨湖区',
            '430304': '岳塘区',
            '430321': '湘潭县',
            '430381': '湘乡市',
            '430382': '韶山市',
    
            '430400': '衡阳市',
            '430405': '珠晖区',
            '430406': '雁峰区',
            '430407': '石鼓区',
            '430408': '蒸湘区',
            '430412': '南岳区',
            '430421': '衡阳县',
            '430422': '衡南县',
            '430423': '衡山县',
            '430424': '衡东县',
            '430426': '祁东县',
            '430481': '耒阳市',
            '430482': '常宁市',
    
            '430500': '邵阳市',
            '430502': '双清区',
            '430503': '大祥区',
            '430511': '北塔区',
            '430522': '新邵县',
            '430523': '邵阳县',
            '430524': '隆回县',
            '430525': '洞口县',
            '430527': '绥宁县',
            '430528': '新宁县',
            '430529': '城步苗族自治县',
            '430581': '武冈市',
            '430582': '邵东市',
    
            '430600': '岳阳市',
            '430602': '岳阳楼区',
            '430603': '云溪区',
            '430611': '君山区',
            '430621': '岳阳县',
            '430623': '华容县',
            '430624': '湘阴县',
            '430626': '平江县',
            '430681': '汨罗市',
            '430682': '临湘市',
    
            '430700': '常德市',
            '430702': '武陵区',
            '430703': '鼎城区',
            '430721': '安乡县',
            '430722': '汉寿县',
            '430723': '澧县',
            '430724': '临澧县',
            '430725': '桃源县',
            '430726': '石门县',
            '430781': '津市市',
    
            '430800': '张家界市',
            '430802': '永定区',
            '430811': '武陵源区',
            '430821': '慈利县',
            '430822': '桑植县',
    
            '430900': '益阳市',
            '430902': '资阳区',
            '430903': '赫山区',
            '430921': '南县',
            '430922': '桃江县',
            '430923': '安化县',
            '430981': '沅江市',
    
            '431000': '郴州市',
            '431002': '北湖区',
            '431003': '苏仙区',
            '431021': '桂阳县',
            '431022': '宜章县',
            '431023': '永兴县',
            '431024': '嘉禾县',
            '431025': '临武县',
            '431026': '汝城县',
            '431027': '桂东县',
            '431028': '安仁县',
            '431081': '资兴市',
    
            '431100': '永州市',
            '431102': '零陵区',
            '431103': '冷水滩区',
            '431121': '祁阳县',
            '431122': '东安县',
            '431123': '双牌县',
            '431124': '道县',
            '431125': '江永县',
            '431126': '宁远县',
            '431127': '蓝山县',
            '431128': '新田县',
            '431129': '江华瑶族自治县',
    
            '431200': '怀化市',
            '431202': '鹤城区',
            '431221': '中方县',
            '431222': '沅陵县',
            '431223': '辰溪县',
            '431224': '溆浦县',
            '431225': '会同县',
            '431226': '麻阳苗族自治县',
            '431227': '新晃侗族自治县',
            '431228': '芷江侗族自治县',
            '431229': '靖州苗族侗族自治县',
            '431230': '通道侗族自治县',
            '431281': '洪江市',
    
            '431300': '娄底市',
            '431302': '娄星区',
            '431321': '双峰县',
            '431322': '新化县',
            '431381': '冷水江市',
            '431382': '涟源市',
    
            '433100': '湘西土家族苗族自治州',
            '433101': '吉首市',
            '433122': '泸溪县',
            '433123': '凤凰县',
            '433124': '花垣县',
            '433125': '保靖县',
            '433126': '古丈县',
            '433127': '永顺县',
            '433130': '龙山县'
        };
    
        return areaMap[code] || '';
    }

    // JianDaoYun的接口
    function safePostToJianDaoYun(requestBody, apiIndex) {

        // 禁用发送按钮
        setPostButtonState(false);

        GM_xmlhttpRequest({
            method: "POST",
            url: "https://api.jiandaoyun.com/api/v5/app/entry/data/create",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI", // 替换为实际token
                "X-Custom-Header": "Tampermonkey Request"     // 自定义头
            },
            data: JSON.stringify(requestBody),
            onload: function(response) {
                try {
                    const data = JSON.parse(response.responseText);
                    if (response.status >= 200 && response.status < 300) {
                        if (apiIndex >= 0 && apiIndex < API_CONFIG.length) {
                            API_CONFIG[apiIndex].hnggzy_id = data.id;
                        }
                        showNotification("请求成功",'','a');
                    } else {
                        throw new Error(data.message || "未知错误");
                    }
                } catch (e) {
                    console.error("响应解析失败:", e);
                    showNotification("请求异常",`状态码: ${response.status}`,'a');
                    // 请求失败时重新启用发送按钮
                    setPostButtonState(true);
                }
            },
            onerror: function(error) {
                console.error("网络错误:", error);
                showNotification("请求失败","请检查网络连接",'a');
                // 请求失败时重新启用发送按钮
                setPostButtonState(true);                
            },
            timeout: 15000 // 15秒超时
        });
    }

    function showNotification(title, text, type = "c") {
        if (type === "c") {
            console.log(`【通知】${title} - ${text}`);    
        } else {
            alert(`${title} - ${text}`);
        }
    }

    // 设置发送按钮状态
    function setPostButtonState(enabled) {
        const postBtn = document.querySelector('#data-viewer .action-buttons .post-btn');
        if (postBtn) {
            postBtn.disabled = !enabled;
            postBtn.style.backgroundColor = enabled ? '#4CAF50' : '#ccc';
            postBtn.style.cursor = enabled ? 'pointer' : 'not-allowed';
        }
    }

    // Helper
    function parseAmount(amountStr) {
        // 移除所有空格
        amountStr = amountStr.replace(/\s+/g, '');
        
        // 提取数字部分
        const match = amountStr.match(/(\d+(?:\.\d+)?)/); 
        if (!match) return 0;
        
        // 转换为数字并乘以10000（万元转元）
        const amount = parseFloat(match[1]) * 10000;
        
        return amount;
    }

    // 解析【招标计划】HTML为 json
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
                const title = titleCell.textContent.replace(/\s+/g, '');
                const content = contentCell.textContent.trim();
                result.details[title] = content;
            } else {
                // 处理投资估算和资金来源这样的特殊行
                const cells = row.getElementsByTagName('td');
                if (cells.length === 4) {
                    const title1 = cells[0].querySelector('b')?.textContent.replace(/\s+/g, '');
                    const content1 = cells[1].querySelector('div')?.textContent.trim();
                    const title2 = cells[2].querySelector('b')?.textContent.replace(/\s+/g, '');
                    const content2 = cells[3].querySelector('div')?.textContent.trim();
                    
                    if (title1 && content1) result.details[title1] = content1;
                    if (title2 && content2) result.details[title2] = content2;
                }
            }
        });
        
        return result;
    }

    // 定义接口配置
    const API_CONFIG = [
        {
            name: '招标计划',
            pattern: '/tradeApi/constructionTender/getConstructionTenderPlanById',
            data: null,
            enabled: false,
            hnggzy_id: null,
            updateData() {
                console.log('招标计划数据更新');
                if (this.data?.data?.noticeContent) {
                    const parsedNotice = parseNoticeContent(this.data.data.noticeContent);
                    this.data.data.noticeContent = parsedNotice;
                }
            },
            postJianDaoYun() {
                console.log('招标计划数据发布');
                safePostToJianDaoYun(
                    {
                        "app_id": "63324ce70ae4b40008f38909",
                        "entry_id": "683292c9a6a4af8b452e12cf",
                        "data": {
                            "hnggzy_id":{"value": this.data.data.id},
                            "project_name":{"value": this.data.data.projectName},
                            "plan_pub_time":{"value": this.data.data.noticeSendDate},
                            "project_owner":{"value": this.data.data.noticeContent.details['招标人名称']},
                            "project_invest_price":{"value": parseAmount(this.data.data.noticeContent.details['投资估算'])},
                            "fund_source":{"value": this.data.data.noticeContent.details['资金来源']},
                            "bid_openning_time":{"value": this.data.data.noticeContent.details['计划招标时间']},
                            "plan_pub_url":{"value": window.location.href},
                            "project_info":{"value": this.data.data.noticeContent.details['项目概况']},
                            "project_work":{"value": this.data.data.noticeContent.details['招标范围']},
                            "other":{"value": this.data.data.noticeContent.details['其他']},
                            "comment":{"value": this.data.data.noticeContent.details['备注']},
                            "region_code":{"value": this.data.data.regionCode},
                            "project_location":{"value": getHunanAreaByCode(this.data.data.regionCode)},
                        } // 实际数据
                    },
                    0
                );
            }

        },
        {
            name: '项目信息',
            pattern: '/tradeApi/constructionTender/getBySectionId',
            data: null,
            enabled: false,
            updateData() {
                console.log('项目信息数据更新');
            },
            postJianDaoYun() {
                console.log('招标项目发布');
                safePostToJianDaoYun(
                    {
                        "app_id": "63324ce70ae4b40008f38909",
                        "entry_id": "64979d25210a5200083fbf9d",
                        "data": {
                            "hnggzy_id":{"value": this.data.data.id},
                            "project_name":{"value": this.data.data.projectName},
                            "plan_pub_time":{"value": this.data.data.noticeSendDate},
                            "project_owner":{"value": this.data.data.noticeContent.details['招标人名称']},
                            "project_invest_price":{"value": parseAmount(this.data.data.noticeContent.details['投资估算'])},
                            "fund_source":{"value": this.data.data.noticeContent.details['资金来源']},
                            "bid_openning_time":{"value": this.data.data.noticeContent.details['计划招标时间']},
                            "plan_pub_url":{"value": window.location.href},
                            "project_info":{"value": this.data.data.noticeContent.details['项目概况']},
                            "project_work":{"value": this.data.data.noticeContent.details['招标范围']},
                            "other":{"value": this.data.data.noticeContent.details['其他']},
                            "comment":{"value": this.data.data.noticeContent.details['备注']},
                            "region_code":{"value": this.data.data.regionCode},
                            "project_location":{"value": getHunanAreaByCode(this.data.data.regionCode)},
                        } // 实际数据
                    }
                );
            }

        },
        {
            name: '公告信息',
            pattern: '/tradeApi/constructionNotice/getBySectionId',
            data: null,
            enabled: false,
            updateData() {
                console.log('公告信息数据更新');
            }
        },
        {
            name: '开标参数',
            pattern: '/tradeApi/coefficient/getCoefficientList',
            data: null,
            enabled: false,
            updateData() {
                console.log('开标参数数据更新');
            }
        },
        {
            name: '开标信息',
            pattern: '/tradeApi/constructionSite/selectbyconstructionsectionid',
            data: null,
            enabled: false,
            updateData() {
                console.log('开标信息数据更新');
            }
        },
        {
            name: '中标候选人',
            pattern: '/tradeApi/constructionNotice/selectWinningBidNotice',
            data: null,
            enabled: false,
            updateData() {
                console.log('中标候选人数据更新');
            }
        },
        {
            name: '中标结果',
            pattern: '/tradeApi/constructionNotice/selectWinningBidNotice',
            data: null,
            enabled: false,
            updateData() {
                console.log('中标结果数据更新');
            }
        }
    ];

    // 添加 jsoneditor 样式
    GM_addStyle(GM_getResourceText('JSONEDITOR_CSS'));

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
            top: 20px;
            right: 220px;
            width: 800px;
            height: 80vh;
            background: #ffffff;
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            z-index: 9998;
            overflow: hidden;
        }
        #data-viewer .viewer-header {
            padding: 12px 16px;
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
        }
        #data-viewer .viewer-title {
            font-weight: 600;
            font-size: 14px;
            color: #1a1a1a;
        }
        #data-viewer .action-buttons {
            display: flex;
            gap: 12px;
        }
        #data-viewer .action-buttons button {
            padding: 6px 12px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            background: #ffffff;
            color: #333333;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.2s ease;
        }
        #data-viewer .action-buttons button:hover {
            background: #f5f5f5;
            border-color: #d0d0d0;
        }
        #data-viewer .action-buttons .copy-btn {
            background: #2196F3;
            color: white;
            border: none;
        }
        #data-viewer .action-buttons .copy-btn:hover {
            background: #1976D2;
        }
        #data-viewer .action-buttons .close-btn {
            background: #ffffff;
            color: #666666;
        }
        #data-viewer .action-buttons .close-btn:hover {
            background: #f5f5f5;
            color: #333333;
        }

        #data-viewer .action-buttons .post-btn {
            background: #4CAF50;
            color: white;
            border: none;
        }
        #data-viewer .action-buttons .post-btn:hover {
            background: #388E3C;
        }
        
        #data-viewer .viewer-content {
            flex: 1;
            overflow: auto;
            padding: 16px;
            background: #ffffff;
        }

        .jsoneditor {
            border: none !important;
            height: 100% !important;
        }

        .jsoneditor-menu>button {
            background-image: url('https://cdn.bootcdn.net/ajax/libs/jsoneditor/10.1.3/img/jsoneditor-icons.svg');
        }
        
        div.jsoneditor-tree button.jsoneditor-button {
            background-image: url('https://cdn.bootcdn.net/ajax/libs/jsoneditor/10.1.3/img/jsoneditor-icons.svg');        
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

    let editor = null;

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
            <div class="viewer-title"></div>
            <div class="action-buttons">
                <button class="post-btn">发送</button>
                <button class="copy-btn">复制数据</button>
                <button class="close-btn">关闭</button>
            </div>
        </div>
        <div class="viewer-content"></div>
        `;

        // 添加发送按钮事件
        dataViewer.querySelector('.post-btn').addEventListener('click', () => {
            const titleElement = dataViewer.querySelector('.viewer-title');
            const currentApi = API_CONFIG.find(api => api.name === titleElement.textContent);
            if (currentApi && typeof currentApi.postJianDaoYun === 'function') {
                currentApi.postJianDaoYun();
            } else {
                showNotification('发送失败','当前接口不支持发送数据','a');
            }
        });

        // 添加关闭按钮事件
        dataViewer.querySelector('.close-btn').addEventListener('click', () => {
            dataViewer.style.display = 'none';
            setPostButtonState(true);  
        });

        // 添加复制按钮事件
        dataViewer.querySelector('.copy-btn').addEventListener('click', () => {
            const jsonData = editor.get();
            navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
                .then(() => {
                    showNotification('复制成功','数据已复制到剪贴板','a');
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    showNotification('复制失败','请手动复制数据');
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
            setPostButtonState(true);
        }

        // 显示重置成功提示
        showNotification('重置成功','所有接口数据已清空');
    }

    // 显示数据
    function showData(data, title) {
        const viewer = document.getElementById('data-viewer');
        const titleElement = viewer.querySelector('.viewer-title');
        const contentElement = viewer.querySelector('.viewer-content');

        titleElement.textContent = title;

        // 如果编辑器已存在，销毁它
        if (editor) {
            editor.destroy();
        }

        // 创建新的编辑器实例
        const options = {
            mode: 'view',
            modes: ['view', 'form', 'code', 'tree'],
            onModeChange: function(newMode, oldMode) {
                contentElement.style.overflow = newMode === 'code' ? 'hidden' : 'auto';
            },
            onError: function(error) {
                console.error('JSON编辑器错误:', error);
            }
        };

        editor = new JSONEditor(contentElement, options, data);
        viewer.style.display = 'flex';
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
                    API_CONFIG[apiIndex].updateData(); // 调用更新函数，处理HTM

                    const button = document.querySelectorAll('.api-button')[apiIndex];
                    button.classList.add('enabled');

                    showNotification(`${API_CONFIG[apiIndex].name}数据已获取`,'点击按钮查看详细信息');
                }
                return;
            }
        }

        // 处理其他接口
        const apiIndex = API_CONFIG.findIndex(api => url.includes(api.pattern));
        if (apiIndex !== -1) {
            API_CONFIG[apiIndex].data = data;
            API_CONFIG[apiIndex].enabled = true;
            API_CONFIG[apiIndex].updateData(); // 调用更新函数，处理HTM            

            const button = document.querySelectorAll('.api-button')[apiIndex];
            button.classList.add('enabled');

            showNotification(`${API_CONFIG[apiIndex].name}数据已获取`,'点击按钮查看详细信息');
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