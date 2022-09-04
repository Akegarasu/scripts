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

    // runMode自定义运行模式，1为去除，2为随机，3为指定为下方的userId
    let runMode = 1;
    let userId = "2b4d16b835f06f373a9dea944eee2dc5"; // 一个随机userId

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const genWatermark = (uid) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 75" fill="#fff" fill-opacity="0.005" width="336" height="75" font-size="15px"><text x="10" y="1.5em">${uid}</text><text x="10" y="3em">${Date.now() - Math.floor(Math.random() * 10000000)}</text></svg>`
    const genStyle = (uid) => `background: url(data:image/svg+xml;base64,${btoa(genWatermark(uid))}) !important`

    async function main() {
        await waitForLoaded()
        if (runMode === 1) {
            console.log("[盲水印去除] 去除模式")
            document.querySelector("#root > div > div:nth-child(7)").style.cssText = "background: none !important"
        } else if (runMode === 2) {
            console.log("[盲水印去除] 替换为随机userid模式")
            document.querySelector("#root > div > div:nth-child(7)").style.cssText = genStyle(genRanHex(32))
        } else if (runMode === 3) {
            console.log("[盲水印去除] 指定userid模式")
            document.querySelector("#root > div > div:nth-child(7)").style.cssText = genStyle(userId)
        }
        console.log("[盲水印去除] 执行完成")
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