<!--
 * @Author: your name
 * @Date: 2021-11-02 12:35:34
 * @LastEditTime: 2021-11-21 17:39:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iphone\src\views\my\Revisename.vue
-->

<template>
  <div class="children1" id="keyboard2">
    <div class="header">
      <van-nav-bar
        title="个性签名"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
      </van-nav-bar>
    </div>
    <div class="content">
      <input
        type="value"
        class="input"
        minlength="2"
        maxlength="14"
        v-model="useraccount"
        placeholder="请设置你的昵称"
      />
      <p class="tis">限2~14个中文，英文或数字</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { NavBar } from "vant";
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(NavBar);
export default {
  data() {
    return {
      useraccount: "",
    };
  },
  created() {
    this.useraccount = this.user.useraccount;
    this.$nextTick(() => {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let box = document.getElementById("keyboard2");
      box.style.height = h + "px";

    });
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["Changeuseraccount"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (this.useraccount.length < 2 && this.useraccount.length > 0) {
        Toast("至少要两个以上的中文，英文或数字");
        return;
      } else {
        this.Changeuseraccount(this.useraccount);
        if (this.useraccount) {
          Toast.success("修改成功");
        }
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  height: 6%;
  z-index: 999;
  /deep/ .van-nav-bar {
    height: 100%;
  }
  /deep/ .van-nav-bar__content {
    height: 100%;
  }
  /deep/ .van-icon {
    font-size: 18px !important;
  }
  /deep/ .van-nav-bar__title {
    font-size: 18px !important;
  }
}
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  width: 100%;
  .input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 5px;
    font-size: 16px;
    line-height: 40px;
    border: 0;
    background: whitesmoke;
  }
  .tis {
    width: 100%;
    height: 12px;
    text-align: left;
    padding: 0 5px;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>