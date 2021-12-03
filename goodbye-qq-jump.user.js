// ==UserScript==
// @name         再见QQ跳转
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动跳转QQ的那个“安全”页面
// @author       Akegarasu
// @match        https://c.pc.qq.com/middlem.html?pfurl=*
// @icon         https://www.google.com/s2/favicons?domain=qq.com
// @grant        none
// @downloadURL       https://github.com/Akegarasu/scripts/raw/main/goodbye-qq-jump.user.js
// @homepageURL       https://github.com/Akegarasu/scripts
// @supportURL        https://github.com/Akegarasu/scripts/issues
// ==/UserScript==

(function () {
    'use strict';
    function getParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return '';
    }
    window.location.href = getParams('pfurl');
})();