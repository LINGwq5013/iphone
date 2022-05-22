/*
 * @Author: your name
 * @Date: 2021-10-30 17:05:17
 * @LastEditTime: 2022-05-20 13:02:55
 * @LastEditors: ling 1039137893@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iphone\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 与vue.config结合实现自适应
import "./until/rem"
// ./until/return 打包时移动端使用
// import "./until/return"
import axios from 'axios'
// 下面两个是浏览器兼容
import 'babel-polyfill'
// 另外一种
// require('es6-promise').polyfill()
// import './assets/font/iconfont.css'
import { Toast } from 'vant'
import { Lazyload } from "vant";
Vue.use(Lazyload);
Vue.prototype.$axios = axios
// 已在vue.config.js 引入
// import './assets/style/index.scss'
// 上面也可以在vue 里面引入
// import './assets/style/idx.less'
Vue.use(Toast)
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.username;
  if (to.meta.requireAuth) {
    if (loginUser == "") {
      Toast("您还没登录，请登录")
      next("/login")
    }
  }
  next();
});
Vue.config.productionTip = false
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
