<!--
 * @Author: your name
 * @Date: 2021-10-30 20:48:54
 * @LastEditTime: 2021-11-23 18:48:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%Ar
 * @FilePath: \iphone\src\components\Tarbar.vue
-->

<template>
  <div class="tarbar">
    <van-tabbar
      v-model="active"
      route
      active-color="#ee0a24"
      inactive-color="#000"
    >
      <van-tabbar-item to="/" replace icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/shop" replace icon="apps-o">商城</van-tabbar-item>
      <van-tabbar-item to="/cart" :replace='show' icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/mine" replace icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
      active: "0",
    };
  },
  computed:{
    show(){
      let item=false
      if(this.$store.state.user.username){
         item=true
      }
      return item
    }
  }
};
</script>

<style lang="less" scoped>
.tarbar {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 99;
}
/deep/ .van-tabbar--fixed {
  position: absolute;
}
</style>