/*
 * @Author: your name
 * @Date: 2021-11-21 12:26:31
 * @LastEditTime: 2022-05-05 21:24:39
 * @LastEditors: ling 1039137893@qq.com
 * @Description: 打开koroFileHeader查看配置
 * @FilePath: \iphone\src\until\return.js
 */
import { Toast } from 'vant'

// document.addEventListener('plusready', function () {
//     var webview = plus.webview.currentWebview()
//     plus.key.addEventListener('backbutton', function () {
//         webview.canBack(function (e) {
//             if (e.canBack) {
//                 webview.back()
//             } else {
//                 var first = null
//                 plus.key.addEventListener(
//                     'backbutton',
//                     function () {
//                         // 首次按键，提示‘再按一次退出应用’
//                         if (!first) {
//                             first = new Date().getTime()
//                             Toast('再按一次退出应用') // 此处可以用自定义提示
//                             setTimeout(function () {
//                                 first = null
//                             }, 1000)
//                         } else {
//                             if (new Date().getTime() - first < 1500) {
//                                 plus.runtime.quit()
//                             }
//                         }
//                     },
//                     false
//                 )
//             }
//         })
//     })
// }, false)

function plusReady() {
    // 在这里调用plus api
    var webview = plus.webview.currentWebview()
    plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
            if (e.canBack) {
                webview.back()
            } else {
                var first = null
                plus.key.addEventListener(
                    'backbutton',
                    function () {
                        // 首次按键，提示‘再按一次退出应用’
                        if (!first) {
                            first = new Date().getTime()
                            Toast('再按一次退出应用') // 此处可以用自定义提示
                            setTimeout(function () {
                                first = null
                            }, 1000)
                        } else {
                            if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit()
                            }
                        }
                    },
                    false
                )
            }
        })
    })
}
if (window.plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}