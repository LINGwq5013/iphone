<!--
 * @Author: your name
 * @Date: 2021-10-31 16:41:42
 * @LastEditTime: 2022-05-19 13:49:15
 * @LastEditors: ling 1039137893@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 * @FilePath: \iphone\src\components\header.vue
-->

<template>
  <div class="header">
    <van-nav-bar :title="title">
      <template #left v-if="left">
        <van-icon name="arrow-left" @click="left1" size="18" />
      </template>
      <template #right v-if="right">
        <van-icon v-if="search" name="search" @click="search1" size="18" />
        <van-icon v-if="user" name="user-circle-o" @click="user1" size="18" />
        <van-icon v-if="home" name="home-o" @click="home1" />
        <div v-if="manage" @click="manage2">管理</div>
        <van-icon v-if="share" @click="share1" name="share-o" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
import { Icon } from "vant";
Vue.use(Icon);
Vue.use(NavBar);
export default {
  data() {
    return {};
  },
  props: [
    "title",
    "left",
    "right",
    "search",
    "user",
    "manage",
    "home",
    "share",
  ],
  methods: {
    search1() {
      this.$router.push("/search");
    },
    user1() {
      this.$router.push("/mine");
    },
    home1() {},
    left1() {
      this.$router.go(-1);
    },
    manage2(event) {
      this.$emit("manage1", event);
    },
    share1(event) {
      this.$emit("share1", event);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 6%;
}

/deep/ .van-nav-bar {
  height: 100%;
}
/deep/ .van-nav-bar__content {
  height: 100%;
}
/deep/ .van-icon {
  font-size: 20px !important;
}
/deep/ .van-nav-bar__title {
  font-size: 20px !important;
}

</style>