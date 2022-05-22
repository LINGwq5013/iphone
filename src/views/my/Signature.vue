<!--
 * @Author: your name
 * @Date: 2021-11-01 15:19:42
 * @LastEditTime: 2021-11-21 18:04:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iphone\src\views\my\Signature.vue
-->

<template>
  <div class="children1" id="keyboard3">
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
    <div class="con">
      <textarea
        v-model="usersign"
        placeholder="介绍一下自己，让大家了解和关注你~"
        class="textarea"
        maxlength="20"
      ></textarea>
      <span class="num">{{ texsum }}/100</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { NavBar } from "vant";
Vue.use(NavBar);
export default {
  data() {
    return {
      usersign: "",
      texsum: "",
    };
  },
  created() {
    this.$nextTick(() => {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let box = document.getElementById("keyboard3");
      box.style.height = h + "px";

    });
    if (this.user.usersign) {
      this.usersign = this.user.usersign;
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    usersign: {
      handler() {
        let strArr = this.usersign.split("");
        this.texsum = strArr.length;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations(["Changeusersign"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.Changeusersign(this.usersign);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 6%;
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

.con {
  position: absolute;
  top: 6%;
  width: 100%;
  height: 200px;
  .textarea {
    box-sizing: border-box;
    padding: 1px 5px;
    width: 100%;
    height: 100%;
    background: cornsilk;
    border: 0;
    font-size: 16px;
  }
  .num {
    font-size: 14px;
    position: absolute;
    bottom: 2px;
    right: 8px;
  }
}
</style>