// ==UserScript==
// @name         bilibili直播吞弹幕检测
// @namespace    https://github.com/Akegarasu/scripts/
// @version      0.0.1
// @description  检测你的弹幕是否真的发出去了
// @author       Akegarasu
// @match        https://live.bilibili.com/*
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js
// @run-at       document-start
// @downloadURL       https://github.com/Akegarasu/scripts/raw/main/bilibili/bili-anti-danmuku.user.js
// @homepageURL       https://github.com/Akegarasu/scripts
// @supportURL        https://github.com/Akegarasu/scripts/issues
// ==/UserScript==

// 修改自 https://greasyfork.org/zh-CN/scripts/434726-%E6%A3%80%E6%B5%8Bb%E7%AB%99%E7%9B%B4%E6%92%AD%E5%BC%B9%E5%B9%95%E6%8B%A6%E6%88%AA

(function () {
  let cookie = document.cookie;
  let ObjectCookie = (function () {
    let cookies = document.cookie.split(';')
    let result = {}
    for (var i = 0; i < cookies.length; i++) {
      var keyvaluepair = cookies[i].split('=')
      result[keyvaluepair[0].trim()] = keyvaluepair[1]
    }
    return result
  })()
  let apiClient = axios.create({
    baseURL: 'https://api.live.bilibili.com',
    withCredentials: true
  })

  function main() {
    const originFetch = fetch
    unsafeWindow.fetch = (...arg) => {
      if (arg[0].indexOf('api.live.bilibili.com/msg/send') > -1) {
        sendDanmuku(arg[1].data).then(res => {
          if (res.data.message == "f") {
            prompt("你的弹幕被吞了", arg[1].data.msg)
          }
        })
        return new Promise(() => {
          throw new Error()
        });
      } else {
        return originFetch(...arg)
      }
    }
  }

  async function sendDanmuku(d) {
    let data = new FormData()
    data.append('bubble', d.bubble)
    data.append('color', d.color)
    data.append('fontsize', d.fontsize)
    data.append('mode', d.mode)
    data.append('msg', d.msg)
    data.append('rnd', 1)
    data.append('roomid', d.roomid)
    data.append('csrf', ObjectCookie.bili_jct)
    data.append('csrf_token', ObjectCookie.bili_jct)
    let ajaxObj = await apiClient.post('/msg/send', data, {
      cookie: cookie
    })
    return ajaxObj;
  }

  main()
})();
