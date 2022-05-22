
<template>
  <div class="children">
    <header-top :title="headtxt" :left="true" :right="false"></header-top>
    <div class="content">
      <van-cell-group>
        <van-cell class="avatar" is-link to="message">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-image round class="tp" :src="user.useravatar" />
            <div class="message">
              <div class="name">{{ user.username }}</div>
              <div class="account" v-if="user.useraccount">
                淘宝昵称:{{ user.useraccount }}
              </div>
              <div class="account" v-else>您还没设置淘宝昵称</div>
            </div>
          </template>
        </van-cell>
        <van-cell title="我的收货地址" is-link to="addresses" />
      </van-cell-group>
      <van-cell-group class="group">
        <van-cell title="账户与安全" is-link />
        <van-cell title="支付" is-link />
      </van-cell-group>
      <van-cell-group class="group">
        <van-cell title="消息通知" is-link />
        <van-cell title="主题换肤" is-link />
        <van-cell title="隐私" is-link />
        <van-cell title="通用" value="地区,音效，辅助功能等" is-link />
      </van-cell-group>
      <van-cell-group class="group">
        <van-cell title="帮助与反馈" is-link />
        <van-cell title="关于淘宝" is-link />
      </van-cell-group>
      <van-cell-group class="group">
        <van-cell title="模式切换" value="标准模式/长辈模式" is-link />
        <van-cell title="商家入驻" is-link />
      </van-cell-group>
      <van-button type="default">切换账户</van-button>
      <van-button type="default" @click="quit">退出登录</van-button>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import { mapState, mapMutations } from "vuex";
import { Cell, CellGroup } from "vant";
import { Image as VanImage } from "vant";
import { Button } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      headtxt: "设置中心",
    };
  },
  components: {
    "header-top": Headertop,
    "van-button": Button,
    "van-image": VanImage,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["Userquit"]),
    quit() {
      let that = this;
      Dialog.confirm({
        message: "确定退出登录？",
      })
        .then(() => {
          that.Userquit();
          that.$router.go(-1);
          setTimeout(() => {
            that.$router.go(0);
          }, 100);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 0;
  overflow-y: scroll;
  background-color: rgb(219, 216, 216);
  box-sizing: border-box;
}
.avatar {
  width: 100%;
  height: 70px;
  .message {
    position: absolute;
    top: 0;
    left: 80px;
    width: 200px;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    .name {
      font-size: 17px;
      margin-top: 7px;
    }
    .account {
      font-size: 14px;
      color: grey;
    }
  }
  /deep/ .van-icon {
    line-height: 55px;
  }
}
.tp {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
}
/deep/ .van-cell {
  text-align: left;
}
/deep/ .van-button {
  width: 100%;
}
// /deep/ .van-cell-group{
//   margin-top: 10px;
// }
.group {
  margin-top: 10px;
}
</style>