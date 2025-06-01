// ==UserScript==
// @name         湖南公共资源交易平台【全接口】拦截器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截湖南公共资源交易平台的所有相关接口并展示数据
// @author       Jiexin Li (LB)
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

    // 1. 全局变量

    let editor = null;

    // 定义全局变量, 当前简道云对应的项目
const JIANDAOYUN_APP_ID = "63324ce70ae4b40008f38909";
const JIANDAOYUN_ENTRY_PROJECT_ID = "64979d25210a5200083fbf9d";
const JIANDAOYUN_ENTRY_PLAN_ID = "683292c9a6a4af8b452e12cf";
const JIANDAOYUN_FIELDS = ["project_id", "project_name", "bids_count", "project_max_price", "project_base_price", "bids_url", "hnggzy_id"];

    let CUR_PROJECTS = {}
    let CUR_HNGGZY_ID = '';

    // 定义接口配置
    const API_CONFIG = [
        {
            index: 0,
            name: '招标计划',
            pattern: '/tradeApi/constructionTender/getConstructionTenderPlanById',
            data: null,
            enabled: false,
            btn_title: '创建',
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
                    "POST",
                    "https://api.jiandaoyun.com/api/v5/app/entry/data/create",
                    {
                        "app_id": JIANDAOYUN_APP_ID,
                        "entry_id": JIANDAOYUN_ENTRY_PLAN_ID,
                        "data": {
                            "hnggzy_id":{"value": this.data.data.id},
                            "project_name":{"value": this.data.data.projectName},
                            "plan_pub_time":{"value": this.data.data.noticeSendDate},
                            "project_owner":{"value": this.data.data.noticeContent['招标人名称']},
                            "project_invest_price":{"value": parseAmount(this.data.data.noticeContent['投资估算'] || this.data.data.noticeContent['投资估算(万元)'])},
                            "fund_source":{"value": this.data.data.noticeContent['资金来源']},
                            "bid_openning_time":{"value": parseDateTime(this.data.data.noticeContent['计划招标时间'])},
                            "plan_pub_url":{"value": window.location.href},
                            "project_info":{"value": this.data.data.noticeContent['项目概况'] || this.data.data.noticeContent['招标内容']},
                            "project_work":{"value": this.data.data.noticeContent['招标范围']},
                            "other":{"value": this.data.data.noticeContent['其他']},
                            "comment":{"value": this.data.data.noticeContent['备注']},
                            "region_code":{"value": this.data.data.regionCode},
                            "project_place":{"value": getJianDaoYunAreaJsonByCodeOrString(this.data.data.regionCode)},
                        } // 实际数据
                    },
                    0
                );
            }

        },
        {
            index: 1,
            name: '项目信息',
            pattern: '/tradeApi/constructionTender/getBySectionId',
            data: null,
            enabled: false,
            btn_title: '创建',            
            updateData() {
                console.log('项目信息数据更新');
            },
            postJianDaoYun() {
                console.log('招标项目发布');
                console.log('this.data.data:',this.data.data.constructionSectionList[0]);

                safePostToJianDaoYun(
                    "POST",
                    "https://api.jiandaoyun.com/api/v5/app/entry/data/create",
                    {
                        "app_id": JIANDAOYUN_APP_ID,
                        "entry_id": JIANDAOYUN_ENTRY_PROJECT_ID,
                        "fields": JIANDAOYUN_FIELDS,
                        "data": {
                            "hnggzy_id":{"value": this.data.data.constructionSectionList[0].id},
                            "project_name":{"value": this.data.data.constructionTender.tenderProjectName},
                            "project_pub_url":{"value": window.location.href},
                            "hnggzy_type":{"value": this.data.data.constructionTender.tenderProjectType},
                            "project_owner":{"value": this.data.data.constructionTender.tendererName},
                            "project_proxy":{"value": this.data.data.constructionTender.tenderAgencyName},
                            "project_info":{"value": this.data.data.constructionTender.tenderContent},
                            "project_place":{"value": getJianDaoYunAreaJsonByCodeOrString(this.data.data.constructionProject.regionCode)},
                            "project_max_price":{"value": this.data.data.constructionSectionList[0].tenderControlPrice*10000},
                        }
                    },
                    1
                );
            }

        },
        {
            index: 2,
            name: '公告信息',
            pattern: '/tradeApi/constructionNotice/getBySectionId',
            data: null,
            enabled: false,
            btn_title: '更新',
            updateData() {
                console.log('公告信息数据更新');
            }
        },
        {
            index: 3,
            name: '开标参数',
            pattern: '/tradeApi/coefficient/getCoefficientList',
            data: null,
            enabled: false,
            btn_title: '更新',
            updateData() {
                console.log('开标参数数据更新');
            },
            postJianDaoYun() {
                console.log('更新项目开标参数');
                if (this.data.data.length === 0) {
                    alert('未获取到开标参数');
                    return;
                }

                safePostToJianDaoYun(
                    "POST",
                    "https://api.jiandaoyun.com/api/v5/app/entry/data/update",
                    {
                        "app_id": JIANDAOYUN_APP_ID,
                        "entry_id": JIANDAOYUN_ENTRY_PROJECT_ID,
                        "data_id": CUR_PROJECTS[CUR_HNGGZY_ID]?._id,
                        "data": {
                            "project_base_price": {
                                "value": this.data.data[0].benchmarkPrice,
                            },
                            "bid_6param": {
                                "value": formatCoefficients(this.data.data),
                            },
                        }
                    },
                    3
                );
            }

        },
        {
            index: 4,
            name: '开标信息',
            pattern: '/tradeApi/constructionSite/selectbyconstructionsectionid',
            data: null,
            enabled: false,
            btn_title: '更新',
            updateData() {
                console.log('开标信息数据更新TABLE!!!');
                const bids = convertBidData(this.data.data.constructionBid, true);
                //console.log('bids:', bids);
            },
            postJianDaoYun() {
                console.log('更新项目开标报价信息');
                const bids = convertBidData(this.data.data.constructionBid);
                safePostToJianDaoYun(
                    "POST",
                    "https://api.jiandaoyun.com/api/v5/app/entry/data/update",
                    {
                        "app_id": JIANDAOYUN_APP_ID,
                        "entry_id": JIANDAOYUN_ENTRY_PROJECT_ID,
                        "data_id": CUR_PROJECTS[CUR_HNGGZY_ID]?._id,
                        "data": {
                            "bids_count": {
                                "value": bids.length,
                            },
                            "project_bids":{
                                "value": bids,
                            },
                            "bids_url": {
                                "value": `https://pages.liubeijs.com/project.html?project_id=${CUR_PROJECTS[CUR_HNGGZY_ID]?.project_id}`,
                            }
                        }
                    },
                    4
                );
            }
        },
        {
            index: 5,
            name: '中标候选',
            pattern: '/tradeApi/constructionNotice/selectWinningBidNotice',
            data: null,
            enabled: false,
            btn_title: '更新',
            updateData() {
                console.log('中标候选人数据更新');
            },            
        },
        {
            index: 6,
            name: '中标结果',
            pattern: '/tradeApi/constructionNotice/selectWinningBidNotice',
            data: null,
            enabled: false,
            btn_title: '更新',
            updateData() {
                console.log('中标结果数据更新');
            }
        }
    ];

    // 2. 网络请求

    // 创建 JianDaoYun 数据
    function safePostToJianDaoYun(method, url, requestBody, apiIndex) {

        GM_xmlhttpRequest({
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI", // 替换为实际token
                "X-Custom-Header": "Tampermonkey Request"     // 自定义头
            },
            data: JSON.stringify(requestBody),
            onload: function(response) {
                try {
                    const data = JSON.parse(response.responseText);
                    //console.log('XXX 响应数据:', data);
                    if (response.status >= 200 && response.status < 300) {
                        if (apiIndex >= 0 && apiIndex < API_CONFIG.length) {

                            // 创建或更新数据后，更新全局简道云数据
                            setCurrentHnggzyID();
                            CUR_PROJECTS[CUR_HNGGZY_ID] = data.data;
                            console.log('CUR_PROJECT:', CUR_PROJECTS[CUR_HNGGZY_ID]);

                            updateProjectInfo();

                        }
                        showNotification("请求成功",`${data.data._id}`,'a');
                    } else {
                        throw new Error(data.message || "未知错误");
                    }
                } catch (e) {
                    console.error("响应解析失败:", e);
                    showNotification("请求异常",`状态码: ${response.status}`,'a');
                }
            },
            onerror: function(error) {
                console.error("网络错误:", error);
                showNotification("请求失败","请检查网络连接",'a');
            },
            timeout: 15000 // 15秒超时
        });
    }

    // 加载简道云项目数据
    function loadCurrentJianDaoYunProject() {
        const baseUrl = "https://api.jiandaoyun.com/api/v5/app/entry/data/list";
        
        let targetEntryId = JIANDAOYUN_ENTRY_PROJECT_ID;
        if (isBidPlanDetailPage()) {
            targetEntryId = JIANDAOYUN_ENTRY_PLAN_ID;
        }
        setCurrentHnggzyID();
        
        if (!CUR_HNGGZY_ID) {
            console.log('未找到有效的 hnggzy_id，无法加载项目');
            return;
        }

        // 构建请求参数
        const requestBody = {
            app_id: JIANDAOYUN_APP_ID,
            entry_id: targetEntryId,
            fields: JIANDAOYUN_FIELDS,
            filter: {
                rel: "and",
                cond: [{
                    field: "hnggzy_id",
                    type: "text",
                    method: "eq",
                    value: CUR_HNGGZY_ID
                }]
            },
            limit: 1
        };
  
        GM_xmlhttpRequest({
            method: "POST",
            url: baseUrl,
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
                        if (data.data.length > 0) {
                            // 使用传入的data_id或从URL获取的值作为键
                            CUR_PROJECTS[CUR_HNGGZY_ID] = data.data[0];
                            console.log('当前项目已加载:', CUR_PROJECTS[CUR_HNGGZY_ID]);
                            updateProjectInfo();
                        } else {
                            console.log(`未找到ID为${CUR_HNGGZY_ID}的项目数据`);
                        }
                        showNotification("请求成功",`已加载hnggzy_id=${CUR_HNGGZY_ID}的项目数据`);
                    } else {
                        throw new Error(data.message || "未知错误");
                    }
                } catch (e) {
                    console.error("响应解析失败:", e);
                    showNotification("请求异常",`状态码: ${response.status}`,"a");
                }
            },
            onerror: function(error) {
                console.error("网络错误:", error);
                showNotification("请求失败","请检查网络连接","a");
            },
            timeout: 5000 // 5秒超时
        });
    }

    // 3. 数据 Data

    // 更新项目信息展示条
    function updateProjectInfo() {
        const projectIdElement = document.getElementById('project-id');
        const projectNameElement = document.getElementById('project-name');
        const infoElement = document.getElementById('bar-other-info');

        const bid = CUR_PROJECTS[CUR_HNGGZY_ID];
        if (projectIdElement && projectNameElement && infoElement) {
            projectIdElement.textContent = CUR_HNGGZY_ID || '?';
            projectNameElement.textContent = bid?.project_name || '?';

            if (isBidPlanDetailPage()) {
                infoElement.textContent = "-";    
            } else {
                let bid_down_ratio = 0;
                if (bid && bid.project_base_price && bid.project_max_price) {
                    bid_down_ratio = (1.0 - bid.project_base_price / bid.project_max_price)*100;
                }
                infoElement.textContent = `投标数量：${CUR_PROJECTS[CUR_HNGGZY_ID]?.bids_count} 基准价：${bid_down_ratio.toFixed(3)}%`;    
            }
        }
    }

    // 将投标报价信息转换成简道云数据格式
    function convertBidData(constructionBid, sorted=false, benchmarkPrice=1.0) {
        if (!Array.isArray(constructionBid)) {
            return [];
        }
    
        const bids =  constructionBid
            .filter(bid => bid.bidPrice !== null)
            .map((bid, index) => ({
                bid_id: { value: index + 1 },
                bid_corp_name: { value: bid.bidderName },
                bid_corp_code: { value: bid.bidderCode },
                bid_price: { value: bid.bidPrice },
                bid_down_ratio: { value: 1.0-parseFloat(bid.bidPrice)/(parseFloat(bid.controlPrice)*10000.0) },
                bid_benchmark_price: { value: benchmarkPrice },
                bid_max_price: { value: parseFloat(bid.controlPrice)*10000.0 },
                bid_price_score: { value: calculateBidScore(benchmarkPrice, bid.bidPrice) },
                bid_stat: { value: "" },
                bid_comment: { value: "" }
            }));

        // 根据 bid_price_score 从大到小排序，并增加 rank 字段
        bids.sort((a, b) => b.bid_price_score.value - a.bid_price_score.value)
            .forEach((bid, index) => {
                bid.rank = { value: index + 1 };
            });            

        if (!sorted) {
            return bids;
        }
        return bids
            .sort((a, b) => b.bid_down_ratio.value - a.bid_down_ratio.value) // 按下浮率从高到低排序
            .map((bid, index) => ({ ...bid, bid_id: { value: index + 1 } })); // 重新编号
    }

    // 将开标参数json数据转成字符串
    function formatCoefficients(data) {
        if (!Array.isArray(data)) {
            return '';
        }
    
        return data.map(item => {
            const key = item.key;
            const value = item.value;
            return `${key}：${value}`;
        }).join('\n');
    }

    /**
     * 从开标参数JSON数据中提取topPrice和各个参数
     * @param {Array} data - 包含项目数据的数组
     * @returns {Object} 提取的参数对象
     */
    function extractPriceAndParams(data) {
        const result = {
            topPrice: null,
            benchmarkPrice: null,
            params: {}
        };
        
        // 参数映射表
        const paramMapping = {
            '算术平均数随机权重a': 'a',
            '中位数随机权重b': 'b', 
            '四分位数随机权重c': 'c',
            '几何平均数随机权重d': 'd',
            '算数平均数随机权重e': 'e',
            '中位数随机权重f': 'f',
            '几何平均数随机权重g': 'g',
            '比例系数C1': 'C1',
            '下浮系数r': 'r'
        };
        
        // 遍历数据数组
        data.forEach(item => {
            // 提取topPrice（所有项目的topPrice应该相同）
            if (item.topPrice && !result.topPrice) {
                result.topPrice = parseFloat(item.topPrice);
            }
            if (item.benchmarkPrice && !result.benchmarkPrice) {
                result.benchmarkPrice = parseFloat(item.benchmarkPrice);
            }
            
            // 根据key提取对应参数
            if (item.key && paramMapping[item.key]) {
                const paramName = paramMapping[item.key];
                result.params[paramName] = parseFloat(item.value);
            }
        });
        
        return result;
    }

    /**
     * 计算六随机五区间报价得分
     * @param {number} benchmarkPrice - 基准价
     * @param {number} bidPrice - 投标报价
     * @returns {number} - 报价得分
     */
    function calculateBidScore(benchmarkPrice, bidPrice) {
        // 计算偏差率 Di = (Pi - T)/T × 100%
        // Pi 为第 i 家公司的报价，T 为基准价

        if (benchmarkPrice <= 1.0) {
            return 0.0;
        }

        const deviation = 1.0 * (bidPrice - benchmarkPrice) / benchmarkPrice;
        
        // 根据偏差率计算得分
        let score;
        
        if (deviation < -0.1) {
            score = 80.0 - 1.0 * (Math.abs(deviation) - 0.1) * 100;
        } else if (deviation >= -0.1 && deviation < 0.0) {
            score = 100.0 - 2.0 * Math.abs(deviation) * 100;
        } else if (deviation >= 0.0 && deviation <= 0.05) {
            score = 100.0 - 4.0 * Math.abs(deviation) * 100;
        } else if (deviation > 0.05 && deviation <= 0.1) {
            score = 80.0 - 3.0 * (Math.abs(deviation) - 0.05) * 100;
        } else if (deviation > 0.1) {
            score = 65.0 - 2.0 * (Math.abs(deviation) - 0.1) * 100;
        } else {
            score = 100.0;
        }

        //四舍五入到3位小数
        return Math.round(score * 995) / 1000.0;
    }

    // 重置所有数据
    function resetAllData() {

        // 重置当前项目信息
        CUR_HNGGZY_ID = null;
        CUR_PROJECTS = {};

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
        //showNotification('重置成功','所有接口数据已清空');
    }


    // 4. UI

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

        .icon-button {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            background: #f5f5f5;
            transition: all 0.2s;
        }
        .icon-button:hover {
            background: #e0e0e0;
        }
        .icon-button.primary {
            background: #2196F3;
            color: white;
        }
        .icon-button.primary:hover {
            background: #1976D2;
        }

    `);

    // 创建API按钮和菜单
    function createApiButton(api) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'relative';
        buttonContainer.style.display = 'flex'; // 添加flex布局
        buttonContainer.style.alignItems = 'center'; // 垂直居中对齐
        buttonContainer.style.gap = '8px'; // 按钮之间的间距

        const showButton = document.createElement('button');
        showButton.className = 'icon-button primary';
        showButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
        `;
        buttonContainer.appendChild(showButton);
        // 菜单按钮点击事件
        showButton.addEventListener('click', (e) => {
            showData(api);
        });

        const button = document.createElement('button');
        button.className = 'api-button';
        button.textContent = api.name;
        buttonContainer.appendChild(button);
        // 按钮点击事件
        button.addEventListener('click', () => {
            console.log('current title', api.name);
            if (api && api.enabled) {
                if (typeof api.postJianDaoYun === 'function') {
                    if (isBidPlanDetailPage() && api.name === '招标计划' && CUR_PROJECTS[CUR_HNGGZY_ID]) {
                        alert('当前<招标计划>已存在简道云，无需重复创建!');
                    } else if (api.name === '项目信息' && CUR_PROJECTS[CUR_HNGGZY_ID]) {
                        alert('当前<项目>已存在简道云，无需重复创建!');
                    } else {
                        if (confirm(`确定在简道云${api.btn_title}<${api.name}>${CUR_PROJECTS[CUR_HNGGZY_ID]?.project_name || '?'}吗？`)) {
                            api.postJianDaoYun();
                        }
                    }
                } else {
                    showNotification('发送失败','当前接口不支持发送数据','a');
                }
            }
        });

        return buttonContainer;
    }

    // 复制API数据
    function copyApiData(api, event) {
        if (api.data) {
            navigator.clipboard.writeText(JSON.stringify(api.data, null, 2))
                .then(() => showTempHint('数据已复制', event))
                .catch(() => showTempHint('复制失败', event));
        } else {
            showTempHint('暂无数据', event);
        }
    }

    // 创建UI元素
    function createUI() {

        const body = document.body;

        // 创建项目信息展示条
        const projectInfoBar = document.createElement('div');
        projectInfoBar.id = 'project-info-bar';
        projectInfoBar.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background:rgb(220, 241, 163); padding: 6px; border-bottom: 1px solid #ddd; z-index: 9998; display: flex; justify-content: space-between; align-items: center; font-size: 14px;';
        projectInfoBar.innerHTML = `
            <div style="display: flex; align-items: center;">
                【简道云】<b>项目ID</b>：<span id="project-id"></span>
                <b style="margin-left: 20px;">项目名称</b>：<span id="project-name"></span>
                <span id="bar-other-info"></span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button id="analyze-btn" style="padding: 4px 12px; background: #67C23A; color: white; border: none; border-radius: 4px; cursor: pointer;">分析</button>
                <button id="bid-list-btn" style="padding: 4px 12px; background:rgb(198, 185, 43); color: white; border: none; border-radius: 4px; cursor: pointer;">报价</button>
                <button id="jiandaoyun-project-btn" style="padding: 4px 12px; background: #409EFF; color: white; border: none; border-radius: 4px; cursor: pointer;">简道云</button>
            </div>
        `;
        
        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'api-buttons';
        buttonContainer.style.top = '40px'; // 调整按钮容器位置，避免被项目信息条遮挡
        API_CONFIG.forEach(api => {
            buttonContainer.appendChild(createApiButton(api));
        });

        // 创建数据查看器
        const dataViewer = document.createElement('div');
        dataViewer.id = 'data-viewer';
        dataViewer.innerHTML = `
        <div class="viewer-header">
            <div class="viewer-title"></div>
            <div class="action-buttons">
                <button class="copy-btn">复制数据</button>
                <button class="close-btn">关闭</button>
            </div>
        </div>
        <div class="viewer-content"></div>
        `;

        // 添加关闭按钮事件
        dataViewer.querySelector('.close-btn').addEventListener('click', () => {
            dataViewer.style.display = 'none';
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

        // 创建重置按钮
        const resetButton = document.createElement('button');
        resetButton.id = 'reset-button';
        resetButton.textContent = '重置';
        resetButton.addEventListener('click', resetAllData);
        buttonContainer.appendChild(resetButton);

        body.appendChild(projectInfoBar);
        body.appendChild(buttonContainer);
        body.appendChild(dataViewer);

        // 初始更新项目信息
        updateProjectInfo();

        // 添加点击复制项目ID事件
        ['project-id', 'project-name'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.cursor = 'pointer';
                element.title = '点击复制';
                element.addEventListener('click', function(event) {
                    navigator.clipboard.writeText(element.textContent);
                    showTempHint('已复制', event);
                });
            }
        });    

        // 添加项目链接按钮点击事件
        const linkButton = projectInfoBar.querySelector('#jiandaoyun-project-btn');
        if (linkButton) {
            linkButton.addEventListener('click', function() {
                let jian_p_url = `https://www.jiandaoyun.com/dashboard/app/${JIANDAOYUN_APP_ID}/form/${JIANDAOYUN_ENTRY_PROJECT_ID}/data/${CUR_PROJECTS[CUR_HNGGZY_ID]?._id}/qr_link`;
                if (isBidPlanDetailPage()) {
                    jian_p_url = `https://www.jiandaoyun.com/dashboard/app/${JIANDAOYUN_APP_ID}/form/${JIANDAOYUN_ENTRY_PLAN_ID}/data/${CUR_PROJECTS[CUR_HNGGZY_ID]?._id}/qr_link`;
                }
                if (jian_p_url) {
                    window.open(jian_p_url, '_blank');
                } else {
                    showNotification('打开失败', '项目链接不存在');
                }
            });
        }

        // 添加报价按钮点击事件
        const bidListButton = projectInfoBar.querySelector('#bid-list-btn');
        if (bidListButton) {
            bidListButton.addEventListener('click', function() {
                // 检查是否有投标数据
                if (API_CONFIG[4].data && API_CONFIG[4].data.data.constructionBid) {
                    let bPrice = 1.0;
                    const pp = extractPriceAndParams(API_CONFIG[3].data.data);
                    if (API_CONFIG[3].data && API_CONFIG[3].data.data) {
                        bPrice = pp.benchmarkPrice;
                    }
                    console.log('基准价 bPrice', bPrice);
                    const bids = convertBidData(API_CONFIG[4].data.data.constructionBid, true, bPrice);
                    if (bids && bids.length > 0) {
                        createBidPriceModal(bids, pp);
                    } else {
                        showNotification('暂无数据', '当前页面没有投标报价数据', 'a');
                    }
                } else {
                    showNotification('暂无数据', '请先加载[开标信息]', 'a');
                }
            });
        }

        // 添加分析按钮点击事件
        const analyzeButton = projectInfoBar.querySelector('#analyze-btn');
        if (analyzeButton) {
            analyzeButton.addEventListener('click', function() {

                if (API_CONFIG[3].data && API_CONFIG[3].data.data && API_CONFIG[4].data && API_CONFIG[4].data.data) {
                    const sortedBids = convertBidData(API_CONFIG[4].data.data.constructionBid, true);
                    const pp = extractPriceAndParams(API_CONFIG[3].data.data);
    
                    const bids = sortedBids.map(bid => bid.bid_price.value).join(',');
                    const stats = "";
    
                    // 构建跳转URL，添加六参数
                    const url = `https://pages.liubeijs.com/cal65.html?maxPrice=${pp.topPrice}&bids=${bids}&stats=${encodeURIComponent(stats)}`
                        + `&a=${pp.params.a || ''}&b=${pp.params.b || ''}&c=${pp.params.c || ''}&d=${pp.params.d || ''}&e=${pp.params.e || ''}&f=${pp.params.f || ''}&g=${pp.params.g || ''}`
                        + `&C1=${pp.params.C1 || ''}&r=${pp.params.r || ''}`;
                    
                    console.log('url', url);
                    // 跳转到新页面
                    window.open(url, '_blank');                                        
                } else {
                    showNotification('暂无数据', '请先加载[开标参数][开标信息]', 'a');
                }

            });
        }

    }

    /**
     * 获取当前API数据
     * @returns {Object|null} 当前API数据
     */
    function getCurrentApiData() {
        // 从当前页面或全局变量中获取API数据
        // 这里需要根据你的实际数据结构来实现
        
        return window.currentApiData || null;
    }

    /**
     * 创建投标报价弹窗
     * @param {Array} bids - 投标数据数组
     */
    function createBidPriceModal(bids, pp=null) {
        // 检查是否已存在弹窗
        let existingModal = document.querySelector('#bid-price-modal');
        if (existingModal) {
            // 从DOM中移除已存在的弹窗
            existingModal.parentNode.removeChild(existingModal);
        }

        const modal = document.createElement('div');
        modal.id = 'bid-price-modal';
        modal.style.cssText = 'display: block; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.15); z-index: 10000; max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden;';
        
        // 创建固定的标题区域
        const headerArea = document.createElement('div');
        headerArea.style.cssText = 'padding: 20px 20px 0 20px; flex-shrink: 0;';
        modal.appendChild(headerArea);
        
        // 添加标题
        const title = document.createElement('h3');
        let baseDownRatio = 0.0;
        if (pp) {
            baseDownRatio = (1 - pp.benchmarkPrice / pp.topPrice) * 100;
        }
        title.textContent = `投标报价信息 [基准价:${pp?.benchmarkPrice || '/'}] [最高价:${pp?.topPrice || '/'}] ${baseDownRatio.toFixed(3)}% `;
        title.style.cssText = 'margin: 0 0 15px 0; color: #333;';
        headerArea.appendChild(title);
        
        // 添加下浮率区间统计区域
        const statsContainer = document.createElement('div');
        statsContainer.style.cssText = 'margin-bottom: 15px; padding: 10px; background-color: #f5f7fa; border-radius: 5px; border: 1px solid #ddd;';
        
        // 计算各区间的单位数量
        const intervalStats = {};
        const minDownRatio = Math.floor(Math.min(...bids.map(bid => bid.bid_down_ratio?.value * 100 || 0)));
        const maxDownRatio = Math.ceil(Math.max(...bids.map(bid => bid.bid_down_ratio?.value * 100 || 0)));
        
        // 初始化区间统计
        for (let i = minDownRatio; i < maxDownRatio; i++) {
            intervalStats[`${i}%-${i+1}%`] = 0;
        }
        
        // 统计各区间的单位数量
        bids.forEach(bid => {
            if (bid.bid_down_ratio?.value) {
                const downRatioPercent = bid.bid_down_ratio.value * 100;
                const interval = `${Math.floor(downRatioPercent)}%-${Math.floor(downRatioPercent)+1}%`;
                if (intervalStats[interval] !== undefined) {
                    intervalStats[interval]++;
                }
            }
        });
        
        // 创建统计标题
        const statsTitle = document.createElement('h4');
        statsTitle.textContent = '下浮率区间统计';
        statsTitle.style.cssText = 'margin: 0 0 10px 0; color: #333;';
        statsContainer.appendChild(statsTitle);
        
        // 创建统计内容
        const statsContent = document.createElement('div');
        statsContent.style.cssText = 'display: flex; flex-wrap: wrap; gap: 10px;';
        
        // 将区间按单位数量排序，找出前5个最多的区间
        const sortedIntervals = Object.entries(intervalStats)
            .filter(([_, count]) => count > 0) // 只保留有单位的区间
            .sort((a, b) => b[1] - a[1]); // 按单位数量从多到少排序
        
        const top5Intervals = new Set(sortedIntervals.slice(0, 5).map(item => item[0]));
        
        Object.entries(intervalStats).forEach(([interval, count]) => {
            if (count > 0) { // 只显示有单位的区间
                const statItem = document.createElement('div');
                // 如果是单位数量最多的5个区间，使用淡橙色背景
                const isTop5 = top5Intervals.has(interval);
                statItem.style.cssText = `background-color: ${isTop5 ? '#ffe7ba' : '#e6f7ff'}; padding: 5px 10px; border-radius: 3px; border: 1px solid ${isTop5 ? '#ffc069' : '#91d5ff'};`;
                statItem.textContent = `${interval}: ${count}家`;
                statsContent.appendChild(statItem);
            }
        });
        
        statsContainer.appendChild(statsContent);
        headerArea.appendChild(statsContainer);
        
        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 20px; cursor: pointer; color: #666;';
        modal.appendChild(closeBtn);

        // 创建可滚动的表格区域
        const tableContainer = document.createElement('div');
        tableContainer.style.cssText = 'padding: 0 20px 20px 20px; overflow-y: auto; flex-grow: 1;';
        modal.appendChild(tableContainer);
        
        // 创建表格
        const table = document.createElement('table');
        table.style.cssText = 'width: 100%; border-collapse: collapse; margin-top: 10px;';
        table.innerHTML = `
            <thead>
                <tr>
                    <th style="position: sticky; top: 0; padding: 10px; border: 1px solid #ddd; background: #f5f7fa; z-index: 1;">序号</th>
                    <th style="position: sticky; top: 0; padding: 10px; border: 1px solid #ddd; background: #f5f7fa; z-index: 1;">投标人名称</th>
                    <th style="position: sticky; top: 0; padding: 10px; border: 1px solid #ddd; background: #f5f7fa; z-index: 1;">投标人代码</th>
                    <th style="position: sticky; top: 0; padding: 10px; border: 1px solid #ddd; background: #f5f7fa; z-index: 1;">投标价格</th>
                    <th style="position: sticky; top: 0; padding: 10px; border: 1px solid #ddd; background: #f5f7fa; z-index: 1;">下浮率</th>
                    <th style="position: sticky; top: 0; padding: 10px; border: 1px solid #ddd; background: #f5f7fa; z-index: 1;">报价得分</th>
                </tr>
            </thead>
            <tbody>
                ${bids.map((bid, index) => `
                <tr style="background-color: ${bid.rank?.value === 1 ? 'red' : (bid.rank?.value >= 2 && bid.rank?.value <= 5 ? 'orange' : 'transparent')}">
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${bid.bid_id?.value || index + 1}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${bid.bid_corp_name?.value || ''}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${bid.bid_corp_code?.value || ''}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${bid.bid_price?.value || ''}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${bid.bid_down_ratio?.value ? (bid.bid_down_ratio.value * 100).toFixed(2) + '%' : ''}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${bid.bid_price_score?.value ? bid.bid_price_score.value.toFixed(3) : ''}</td>
                </tr>
                `).join('')}
            </tbody>
        `;
        tableContainer.appendChild(table);
        document.body.appendChild(modal);

        // 绑定关闭事件
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // 点击弹窗外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }    

    // 更新按钮状态
    function updateUIAfterApiLoaded(url, data) {

        // 处理中标候选人和中标结果的特殊情况
        if (url.includes('/tradeApi/constructionNotice/selectWinningBidNotice/')) {
            const isCandidate = url.endsWith('/0');
            const isResult = url.endsWith('/1');
            
            if (isCandidate || isResult) {
                const apiIndex = API_CONFIG.findIndex(api => 
                    api.name === (isCandidate ? '中标候选' : '中标结果')
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

    // 更新项目信息的函数
    function updateProjectInfoFromUrl() {
        console.log('URL 变化，更新项目信息');
        resetAllData();

        updateProjectInfo();
        loadCurrentJianDaoYunProject();
    }

    // 显示每个API/标签 对应的 JSON 数据
    function showData(api) {
        const viewer = document.getElementById('data-viewer');
        const titleElement = viewer.querySelector('.viewer-title');
        const contentElement = viewer.querySelector('.viewer-content');

        titleElement.textContent = api.name;

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

        editor = new JSONEditor(contentElement, options, api.data);
        viewer.style.display = 'flex';
    }

    // Utils
    
    function showNotification(title, text, type = "c") {
        if (type === "c") {
            console.log(`【通知】${title} - ${text}`);    
        } else {
            alert(`${title} - ${text}`);
        }
    }

    function showTempHint(text, event) {
        const hint = document.createElement('div');
        hint.textContent = text;
        hint.style.cssText = `
            position: fixed;
            left: ${event.clientX + 10}px;
            top: ${event.clientY - 20}px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            pointer-events: none;
            transition: opacity 0.5s;
            z-index: 10000;
        `;
        document.body.appendChild(hint);
        
        // 触发淡出动画
        setTimeout(() => {
            hint.style.opacity = '0';
        }, 10);
        
        // 移除元素
        setTimeout(() => {
            document.body.removeChild(hint);
        }, 500);
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
                        updateUIAfterApiLoaded(xhr._url, data);
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
                updateUIAfterApiLoaded(url, data);
            }).catch(() => {});

            return response;
        };
    }    

    // 监听 URL 变化并更新项目信息
    function setupUrlChangeListener() {
        // 监听浏览器的前进后退
        window.addEventListener('popstate', updateProjectInfoFromUrl);
        
        // 监听通过 history.pushState 和 history.replaceState 修改的 URL
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            updateProjectInfoFromUrl();
        };
        
        history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            updateProjectInfoFromUrl();
        };
    }

    // Helper

    // 判断当前页面URL是否为项目计划页面
    function isBidPlanDetailPage() {
        const currentUrl = window.location.href;
        return currentUrl.includes('resources/bidPlanDetail?id');
    }    
    
    // 从URL中获取bidSectionId
    function getBidSectionIdFromUrl() {
        const url = window.location.href;
        const urlParams = new URLSearchParams(url.split('?')[1]);
        CUR_HNGGZY_ID = urlParams.get('bidSectionId') || '';
        console.log('CUR_PROJECT_BID_ID:',CUR_HNGGZY_ID);
        return CUR_HNGGZY_ID;
    }

    // 从URL中获取id参数
    function getIdFromUrl(url) {
        // 如果没有传入url参数，则使用当前页面的URL
        const targetUrl = url || window.location.href;
        // 处理带有#的URL，获取?后面的查询参数部分
        let queryPart;
        if (targetUrl.includes('#')) {
            // 对于SPA应用，参数可能在#后面的部分
            const hashPart = targetUrl.split('#')[1] || '';
            queryPart = hashPart.includes('?') ? hashPart.split('?')[1] : '';
        } else {
            // 常规URL，参数在?后面
            queryPart = targetUrl.split('?')[1] || '';
        }
        // 使用URLSearchParams解析查询参数
        const urlParams = new URLSearchParams(queryPart);
        // 获取id参数
        const id = urlParams.get('id') || '';
        return id;
    }

    function setCurrentHnggzyID() {
        if (isBidPlanDetailPage()) {
            CUR_HNGGZY_ID = getIdFromUrl();
        } else {
            CUR_HNGGZY_ID = getBidSectionIdFromUrl();
        }
    }

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

    // 解析时间字符串为标准日期
    function parseDateTime(dateTimeStr) {
        console.log('dateTimeStr:',dateTimeStr);

        if (!dateTimeStr) return '';
        
        // 移除多余的空格
        dateTimeStr = dateTimeStr.trim();
        
        // 处理中文日期格式（例如：2025年6月24日）
        dateTimeStr = dateTimeStr.replace(/年|月|日/g, (match) => {
            switch (match) {
                case '年': return '-';
                case '月': return '-';
                case '日': return '';
            }
        });
        
        // 处理斜杠日期格式（例如：2025/6/23）
        dateTimeStr = dateTimeStr.replace(/\//g, '-');
        
        // 解析日期部分
        let date = dateTimeStr.split(' ')[0];
        let time = dateTimeStr.split(' ')[1] || '00:00';
        
        // 处理日期部分
        let [year, month, day] = date.split('-');
        
        // 确保月和日是两位数
        month = month ? month.padStart(2, '0') : '01';
        day = day ? day.padStart(2, '0') : '01';
        
        // 处理时间部分
        let [hour, minute] = time.split(':');
        hour = (hour || '00').padStart(2, '0');
        minute = (minute || '00').padStart(2, '0');
        
        // 返回格式化的日期时间字符串
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    // 解析【招标计划】HTML为 json
    function parseNoticeContent(htmlContent) {
        // 创建临时DOM元素解析HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        // 获取tbody中的所有行
        const tbody = tempDiv.querySelector('tbody');
        if (!tbody) return {};
        
        const rows = tbody.getElementsByTagName('tr');
        const result = {};
        
        // 遍历每行，只取前两个单元格
        Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            if (cells.length >= 2) {
                // 第一个单元格作为key（删除所有空白字符）
                const key = cells[0].textContent.replace(/\s+/g, '');
                // 第二个单元格作为value（仅删除头尾空白字符）
                const value = cells[1].textContent.trim();
                
                if (key && value) {
                    result[key] = value;
                }
            }
        });
        
        return result;
    }

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
    
        // 如果是区县级代码（后两位不是00），需要特殊处理
        if (!code.endsWith('00')) {
            // 获取所属地级市代码（将后两位替换为00）
            const cityCode = code.slice(0, 4) + '00';
            const cityName = areaMap[cityCode];
            const areaName = areaMap[code];

            // 如果能找到对应的地级市和区县名称，返回组合后的结果
            if (cityName && areaName) {
                return `${cityName}·${areaName}`;
            }
        }

        // 如果是地级市代码或者特殊处理失败，返回原有结果
        return areaMap[code] || '';
    }

    function getJianDaoYunAreaJsonByCodeOrString(areaStr) {
        // 如果是行政区划代码，先转换为地区名称
        if (/^\d{6}$/.test(areaStr)) {
            areaStr = getHunanAreaByCode(areaStr);
            if (!areaStr) return null;
            areaStr = `湖南省·${areaStr}`;
        }
        
        // 处理地区字符串
        if (!areaStr || typeof areaStr !== 'string') return null;
        
        // 移除所有空格
        areaStr = areaStr.trim();
        
        // 分割地区字符串（支持点号、中点号和其他常见分隔符）
        const parts = areaStr.split(/[·.-。\s]+/);
        
        // 确保至少有省市区三级
        if (parts.length < 2) return null;
        
        // 处理省份名称（确保以"省"结尾）
        let province = parts[0];
        if (!province.endsWith('省')) province += '省';
        
        // 处理城市名称（确保以"市"结尾）
        let city = parts[1];
        if (!city.endsWith('市') && !city.endsWith('自治州')) city += '市';
        
        // 处理区县名称（确保以"区"、"市"、"县"或"自治县"结尾）
        let district = "";
        if (parts.length > 2) {
            district = parts[2];
            if (!district.endsWith('区') &&!district.endsWith('市') &&
              !district.endsWith('县') &&!district.endsWith('自治县')) {
                district += '县';
            }
        }
        
        // 返回标准格式的地区信息
        return {
            "province": province,
            "city": city,
            "district": district
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

        // 初始化URL监听器
        setupUrlChangeListener();

        updateProjectInfoFromUrl();
    }

    init();
})();