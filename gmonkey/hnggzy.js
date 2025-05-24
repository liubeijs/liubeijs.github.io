// ==UserScript==
// @name         湖南公共资源数据抓取器
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  使用jQuery选择器抓取页面数据
// @author       YourName
// @match        https://www.hnsggzy.com/*
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// ==/UserScript==




(function($) {
    'use strict';

    function getSelectorText(sel) {
        const element = $(sel);
        const content = element.length ?
                element.text().trim().replace(/\s+/g, ' ') :
                "";
        return content;
    }

    function safePostToJianDaoYun(requestBody) {
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
                        GM_notification({
                            title: "请求成功",
                            text: `数据ID: ${data._id || '未知'}`,
                            timeout: 3000
                        });
                    } else {
                        throw new Error(data.message || "未知错误");
                    }
                } catch (e) {
                    console.error("响应解析失败:", e);
                    GM_notification({
                        title: "请求异常",
                        text: `状态码: ${response.status}`,
                        timeout: 5000
                    });
                }
            },
            onerror: function(error) {
                console.error("网络错误:", error);
                GM_notification({
                    title: "请求失败",
                    text: "请检查网络连接",
                    timeout: 5000,
                    highlight: true
                });
            },
            timeout: 15000 // 15秒超时
        });
    }

    // 添加按钮样式
    GM_addStyle(`
        #jq-capture-btn {
            position: fixed;
            top: 300px;
            left: 15px;
            z-index: 99999;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        #jq-capture-btn:hover {
            background: #45a049;
            transform: translateY(-2px);
        }
    `);

    // 创建浮动按钮
    const createButton = () => {
        if ($('#jq-capture-btn').length === 0) {
            $('body').append(`
                <button id="jq-capture-btn">
                    抓取
                </button>
            `);
        }
    };

    // 定义jQuery选择器数组（请根据实际页面结构调整）
    const selectors = [
        "div.title", //项目名称
        "table:nth-of-type(2) tr:nth-of-type(3) td:nth-of-type(1)", //招标人
        "tr:nth-of-type(3) td:nth-of-type(2)", //招标代理
        "tr:contains('招标内容与范围') td", //项目简介
    ];



    // 主抓取函数
    const captureData = () => {
        let result = "抓取结果：\n\n";

        selectors.forEach((selector, index) => {
            const element = $(selector);
            const content = element.length ?
                element.text().trim().replace(/\s+/g, ' ') :
                "⚠️ 元素未找到";

            result += `${index + 1}. ${content}\n\n`;
        });

        result += window.location.href;

        return result;
    };

    // 初始化按钮
    const init = () => {
        createButton();

        // 绑定点击事件
        $('#jq-capture-btn').off('click').on('click', function() {
            const data = captureData();
            //alert(data);
            console.log('开始请求');

            safePostToJianDaoYun({
                "app_id": "63324ce70ae4b40008f38909",
                "entry_id": "64979d25210a5200083fbf9d",
                "data": {
                    "_widget_1664240878322":{
                        "value": getSelectorText("div.title") //项目名称
                    },
                    "_widget_1664240878375":{
                        "value":window.location.href, //项目链接
                    },
                    "_widget_1664240879260":{
                        "value": getSelectorText("tr:contains('招标内容与范围') td"), //项目基本信息
                    },
                    "_widget_1743005914859":{
                        "value": getSelectorText("table:nth-of-type(2) tr:nth-of-type(3) td:nth-of-type(1)"), //招标人
                    },
                    "_widget_1743005914860":{
                        "value": getSelectorText("tr:nth-of-type(3) td:nth-of-type(2)"), //招标代理
                    },
                } // 实际数据
            });

        });

        // SPA路由监听
        let currentUrl = location.href;
        setInterval(() => {
            if (location.href !== currentUrl) {
                currentUrl = location.href;
                createButton();
                $('#jq-capture-btn').off('click').on('click', () => {
                    alert(captureData());
                });
            }
        }, 1000);
    };

    // 等待jQuery加载完成
    $(document).ready(init);

})(jQuery);