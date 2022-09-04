// ==UserScript==
// @name         知乎盲水印去除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  垃圾知乎盲水印拜拜
// @author       Akegarasu
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @grant        none
// @downloadURL       https://github.com/Akegarasu/scripts/raw/main/anti-zhihu-watermark.user.js
// @homepageURL       https://github.com/Akegarasu/scripts
// @supportURL        https://github.com/Akegarasu/scripts/issues
// ==/UserScript==

(function () {
    async function main() {
        await waitForLoaded()
        document.querySelector("#root > div > div:nth-child(7)").remove()
        console.log("[盲水印去除]去除完成")
    }

    async function waitForLoaded(timeout = 10 * 1000) {
        return new Promise((resolve, reject) => {
            let startTime = new Date()
            function poll() {
                if (isLoaded()) {
                    resolve()
                    return
                }
                if (new Date() - startTime > timeout) {
                    reject(new Error(`[盲水印去除] 等待加载超时`))
                    return
                }
                setTimeout(poll, 1000)
            }
            poll()
        })
    }

    function isLoaded() {
        if (document.querySelector('#root > div > div:nth-child(7)') === null) {
            return false
        }
        return true
    }
    main()
})();