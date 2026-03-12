// ==UserScript==
// @name         简道云增强：表格行跳转二维码链接
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  拦截 Dash list 接口并为数据表格首列增加跳转到 qr_link 的点击能力
// @author       LB
// @match        https://www.jiandaoyun.com/dashboard*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const TARGET_HASH_PREFIX = '#/app/63324ce70ae4b40008f38909';
    const TARGET_LIST_URL_PART = '/_/data_process/data/dash/list';
    const TARGET_QR_LINK_TEMPLATE = 'https://www.jiandaoyun.com/dashboard/app/63324ce70ae4b40008f38909/form/64979d25210a5200083fbf9d/data/{_id}/qr_link';

    function isTargetPage() {
        console.log(window.location.hash);
        console.log(TARGET_HASH_PREFIX);

        return window.location.origin === 'https://www.jiandaoyun.com'
            && window.location.pathname === '/dashboard'
            && window.location.hash.startsWith(TARGET_HASH_PREFIX);
    }

    function toAbsoluteUrl(url) {
        try {
            return new URL(url, window.location.origin).toString();
        } catch {
            return String(url || '');
        }
    }

    function extractListDataArray(listResponse) {
        const data = listResponse && listResponse.data;
        return Array.isArray(data) ? data : [];
    }

    function attachRowClickHandlers(listResponse) {
        console.log('is....', isTargetPage());

        if (!isTargetPage()) return;

        console.log('is target page!');

        const rowsData = extractListDataArray(listResponse);
        if (rowsData.length === 0) return;
        console.log('rowsData:', rowsData);

        const containers = Array.from(document.querySelectorAll('div[class*="fx-dash-data-table"]'));
        if (containers.length === 0) return;
        console.log('containers:', containers);

        containers.forEach(container => {
            const rows = Array.from(container.querySelectorAll('table tr'));
            if (rows.length === 0) return;

            rows.forEach((tr, fallbackIndex) => {
                const tds = tr.querySelectorAll('td');
                if (!tds || tds.length === 0) return;

                const firstTd = tds[0];
                if (firstTd.dataset.jdyPlusBound === '1') return;

                const rawIndex = tr.getAttribute('data-row-index');
                const rowIndex = Number.isFinite(Number(rawIndex)) ? Number(rawIndex) : fallbackIndex;
                const record = rowsData[rowIndex];
                const id = record && record._id;
                if (!id) return;

                console.log('record:', record);

                firstTd.dataset.jdyPlusBound = '1';
                firstTd.style.cursor = 'pointer';

                firstTd.addEventListener('click', () => {
                    const url = TARGET_QR_LINK_TEMPLATE.replace('{_id}', encodeURIComponent(String(id)));
                    window.open(url, '_blank', 'noopener,noreferrer');
                });
            });
        });
    }

    function tryParseJson(text) {
        try {
            return JSON.parse(text);
        } catch {
            return null;
        }
    }

    function installXhrInterceptor() {
        const OriginalOpen = XMLHttpRequest.prototype.open;
        const OriginalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url) {
            this.__jdyPlusMethod = String(method || '').toUpperCase();
            this.__jdyPlusUrl = toAbsoluteUrl(url);
            return OriginalOpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function () {
            const shouldTrack = isTargetPage()
                && this.__jdyPlusMethod === 'POST'
                && typeof this.__jdyPlusUrl === 'string'
                && this.__jdyPlusUrl.includes(TARGET_LIST_URL_PART);

            if (shouldTrack) {
                this.addEventListener('load', () => {
                    const parsed = tryParseJson(this.responseText);
                    if (!parsed) return;
                    console.log('parsed:', parsed);

                    window.jiandaoyun_dash_list_response = parsed;

                    setTimeout(() => {
                        attachRowClickHandlers(parsed);
                    }, 1000);
                });
            }

            return OriginalSend.apply(this, arguments);
        };
    }

    if (typeof window !== 'undefined' && typeof XMLHttpRequest !== 'undefined') {
        installXhrInterceptor();
    }
})();
