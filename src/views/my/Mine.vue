
<template>
  <div class="mine">
    <div class="fix" v-if="show">
      <van-nav-bar placeholder>
        <template #title>
          <div v-if="user.useraccount">
            {{ user.useraccount }}
          </div>
          <div v-else>{{ user.username }}</div>
        </template>
        <template #right>
          <van-icon name="setting-o" size="25" @click="userinfo" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content" @scroll.passive="getScroll($event)">
      <div class="mine-top">
        <div class="avatar">
          <div class="left">
            <div class="ltp">
              <van-image
                round
                class="tp"
                v-if="user.username"
                :src="user.useravatar"
              />
              <van-image round class="tp" v-else src="img.jpg"></van-image>
            </div>
            <div class="ltxt" v-if="user.username">
              <div class="name" v-if="user.useraccount">
                {{ user.useraccount }}
              </div>
              <div class="name" v-else>{{ user.username }}</div>
              <div class="sign">
                <div class="input" v-if="user.usersign">
                  {{ user.usersign }}
                </div>
                <div v-else class="input">点击这里可以添加个性签名~</div>
                <van-icon
                  v-if="!user.usersign"
                  @click="edit"
                  class="edit"
                  name="edit"
                />
              </div>
              <div class="tag">
                <div>关注 {{ user.focus }}</div>
                <div class="xian">|</div>
                <div>粉丝 {{ user.fan }}</div>
              </div>
            </div>
            <div v-else @click="login" class="login">请登录！！！</div>
          </div>
          <div class="right">
            <van-icon name="setting-o" size="25" @click="userinfo" />
          </div>
        </div>
        <div class="tabs">
          <router-link to="/collect" class="tab">
            <van-icon class="tp" name="star-o" />
            <div class="collect">收藏</div>
          </router-link>
          <div
            class="tab"
            @touchstart="gtouchstart()"
            @touchmove="gtouchmove()"
            @touchend="gtouchend()"
          >
            <van-icon class="tp" name="sign" />
            <div class="collect">店铺</div>
          </div>
          <div class="tab">
            <van-icon class="tp" name="underway-o" />
            <div class="collect">足迹</div>
          </div>
          <div class="tab">
            <van-icon class="tp" name="balance-pay" />
            <div class="collect">零钱</div>
          </div>
        </div>
      </div>
      <div class="order">
        <div class="ordertop">
          <div class="oredrmy">我的订单</div>
          <router-link class="ordericon" :to="'/orders/' + 0">
            <div>全部</div>
            <van-icon name="arrow" />
          </router-link>
        </div>
        <div class="orderbuttom">
          <!-- <router-link :to="{ name: 'orders', params: { orderid: 1}}"></router-link> -->
          <!-- 这里用name传值不用在router.js设置orderid-->
          <router-link class="ordername" :to="{ name: 'orders', params: { orderid: 1}}" >
            <van-icon name="balance-list-o" />
            <div class="txt">待付款</div>
          </router-link>
          <router-link class="ordername" :to="'/orders/' + 2">
            <van-icon name="send-gift-o" />
            <div class="txt">待发货</div>
          </router-link>
          <router-link class="ordername" :to="'/orders/' + 3">
            <van-icon name="logistics" />
            <div class="txt">待收货</div>
          </router-link>
          <router-link class="ordername" :to="{ name: 'orders', params: { orderid: 4}}">
            <van-icon name="chat-o" />
            <div class="txt">待评价</div>
          </router-link>
          <router-link class="ordername" to="/aftersale">
            <van-icon name="after-sale" />
            <div class="txt">售后</div>
          </router-link>
        </div>
      </div>
      <div class="vip"></div>
      <div class="game">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) of list" :key="item.icon">
            <div class="item" @click.stop="dj(index)">
              <i class="icon" :class="item.icon"></i>
              <div class="name">{{ item.name }}</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="service">
        <van-swipe class="swiper">
          <van-swipe-item class="swiper-item">
            <div class="box" v-for="item in icons" :key="item.icon">
              <i class="icon" :class="item.icon"></i>
              <div class="name">{{ item.name }}</div>
            </div>
          </van-swipe-item>
          <van-swipe-item class="swiper-item">
            <div class="box" v-for="item in icons1" :key="item.icon">
              <i class="icon" :class="item.icon"></i>
              <div class="name">{{ item.name }}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="activity"></div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { Icon } from "vant";
import { Image as VanImage } from "vant";
import { Swipe, SwipeItem } from "vant";
import { NavBar } from "vant";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(NavBar);
export default {
  data() {
    return {
      show: false,
      goods_icon: [
        {
          imgurl: require("@/assets/goods_icon/goods_icon_1.png"),
          goods_txt: "新品首发",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_2.png"),
          goods_txt: "居家生活",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_3.png"),
          goods_txt: "服饰鞋包",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_4.png"),
          goods_txt: "美食酒水",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_5.png"),
          goods_txt: "个护清洁",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_6.png"),
          goods_txt: "母婴亲子",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_7.png"),
          goods_txt: "运动旅行",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_8.png"),
          goods_txt: "数码家电",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_9.png"),
          goods_txt: "全球特色",
        },
        {
          imgurl: require("@/assets/goods_icon/goods_icon_10.gif"),
          goods_txt: "每日秒杀",
        },
      ],
      icons: [
        {
          name: "试用领取",
          icon: "iconfont icon-tianmaoshiyongfuwu",
          url: "",
        },
        {
          name: "闲置换钱",
          icon: "iconfont icon-xianzhihuanqian",
          url: "",
        },
        {
          name: "店铺会员",
          icon: "iconfont icon-huiyuan",
          url: "",
        },
        {
          name: "领券中心",
          icon: "iconfont icon-lingquan",
          url: "",
        },
        {
          name: "收货地址",
          icon: "iconfont icon-shouhuodizhi",
          url: "",
        },
        {
          name: "官方客服",
          icon: "iconfont icon-kefu",
          url: "",
        },
        {
          name: "我的快递",
          icon: "iconfont icon-kuaidiwuliu",
          url: "",
        },
        {
          name: "我的评价",
          icon: "iconfont icon-pingjia",
          url: "",
        },
      ],
      icons1: [
        {
          name: "专家答疑",
          icon: "iconfont icon-zhuanjiadayi_nor",
          url: "",
        },
        {
          name: "花呗账单",
          icon: "iconfont icon-huabeizhangdan",
          url: "",
        },
        {
          name: "活动中心",
          icon: "iconfont icon-huodongzhongxin",
          url: "",
        },
        {
          name: "酒店预定",
          icon: "iconfont icon-jiudian",
          url: "",
        },
        {
          name: "飞机票",
          icon: "iconfont icon-feijipiao",
          url: "",
        },
        {
          name: "火车票",
          icon: "iconfont icon-huochepiao",
          url: "",
        },

        {
          name: "充话费",
          icon: "iconfont icon-chonghuafei",
          url: "",
        },
        {
          name: "更多",
          icon: "iconfont icon-gengduo",
          url: "",
        },
      ],

      list: [
        {
          icon: "iconfont icon-taojinbi",
          name: "淘金币",
          url: "",
        },
        {
          icon: "iconfont icon-ziyuan",
          name: "芭芭农场",
          url: "",
        },
        {
          icon: "iconfont icon-majiang",
          name: "麻将",
          url: "",
        },
        {
          icon: "iconfont icon-yiqiwandoudizhu",
          name: "斗地主",
          url: "",
        },
        {
          icon: "iconfont icon-mianfeishiyong",
          name: "免费活动",
          url: "",
        },
        {
          icon: "iconfont icon-huodongzhongxin",
          name: "活动中心",
          url: "",
        },
        {
          icon: "iconfont icon-gengduo",
          name: "更多",
          url: "",
        },
      ],
      swiperOption: {
        loop: false, // 循环模式选项
        // slide的切换效果，默认为"slide"（位移切换），可设置为'slide'（普通切换、默认）,"fade"（淡入）"cube"（方块）"coverflow"（3d流）"flip"（3d翻转）。
        effect: "slide",
        slidesPerView: 4, // 设置slider容器能够同时显示的slides数量(carousel模式)
        pagination: {
          el: ".swiper-pagination",
        },
      },
      timeOutEvent:0
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {},
  computed: {
    ...mapState(["user"]),
  },
  mounted() {},
  methods: {
    // 长按事件
    gtouchstart() {
      this.timeOutEvent = setTimeout(() => {
        this.timeOutEvent = 1;
        console.log("长按事件触发");
      }, 500);
      return false;
    },
    gtouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      console.log("取消了");
    },
    gtouchend() {
      clearTimeout(this.timeOutEvent); //清除定时器
      if (this.timeOutEvent !== 1) {
        //这里写要执行的内容（尤如onclick事件）
        console.log("你这是点击，不是长按");
      }
      return false;
    },

    getScroll(e) {
      if (this.user.username) {
        let top = e.target.scrollTop;
        if (top > 100) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    },
    userinfo() {
      this.$router.push("/userinfo");
    },
    login() {
      this.$router.push("/login");
    },
    edit() {
      this.$router.push("/signature");
    },
    dj(val) {
      console.log(val)
    },
  },
};
</script>

<style lang="less" scoped>
.fix {
  position: fixed;
  height: 45px;
  top: 0;
  opacity: 1;
  width: 100%;
  background: #eee;
  z-index: 9;
  /deep/ .van-nav-bar {
    background: #eee;
    height: 45px;
  }
  /deep/ .van-nav-bar__content {
    height: 45px;
  }
  /deep/ .van-icon {
    font-size: 18px !important;
  }
  /deep/ .van-nav-bar__title {
    font-size: 18px !important;
  }
}
.content {
  position: absolute;
  top: 0;
  bottom: 50px;
  box-sizing: border-box;
  padding: 0 5px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.mine-top {
  width: 100%;
  .avatar {
    width: 100%;
    margin: 10px 0;
    display: flex;
    height: 80px;
    .left {
      width: 90%;
      display: flex;
      .ltp {
        width: 100px;
        height: 80px;
        .tp {
          width: 80px;
          height: 80px;
        }
      }
      .ltxt {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        font-size: 0.5rem;
        .name {
          padding-top: 5px;
          box-sizing: border-box;
          font-size: 0.6rem;
        }
        .sign {
          font-size: 0.4rem;
          height: 0.5rem;
          display: flex;
          justify-content: flex-start;
          .input {
            background-color: transparent;
            border: 0;
            height: 0.5rem;
          }
          .edit {
            margin-left: 3px;
            width: 0.4rem;
            height: 0.4rem;
            box-sizing: border-box;
            padding-top: 0.1rem;
          }
        }
        .tag {
          display: flex;
          justify-content: flex-start;
          .xian {
            box-sizing: border-box;
            padding: 1px 10px 3px 10px;
          }
        }
      }
      .login {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 22px;
      }
    }
    .right {
      flex: 1;
    }
  }
  .tabs {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    .tab {
      width: 20%;
      height: 100%;
      display: flex;
      color: #000;
      flex-direction: column;
      justify-content: space-around;
    }
    .tp {
      font-size: 20px;
    }
    .collect {
      font-size: 12px;
    }
  }
}

.order {
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background: white;
  .ordertop {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    padding: 0 10px;
    .oredrmy {
      width: 50%;
      float: left;

      font-size: 18px;
      font-weight: 600;
      line-height: 30px;
      text-align: left;
    }
    .ordericon {
      width: 60px;
      float: right;
      height: 30px;
      color: #000;
      line-height: 25px;
      font-size: 14px;
      display: flex;
      justify-content: flex-end;
    }
    /deep/ .van-icon {
      width: 20px;
      height: 25px;
      line-height: 25px;
    }
  }
  .orderbuttom {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    padding: 6px 10px;
    display: flex;
    justify-content: space-between;
    .ordername {
      width: 18%;
      text-align: center;
      color: #000;
      .txt {
        font-size: 10px;
      }
    }
  }
}
.vip {
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background: white;
  overflow: hidden;
  position: relative;
}
.game {
  margin-top: 10px;
  box-sizing: border-box;
  padding-top: 3px;
  width: 100%;
  height: 70px;
  border-radius: 10px;
  background: white;
  position: relative;
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .icon {
      font-size: 28px;
      color: firebrick;
    }
    .name {
      font-size: 13px;
    }
  }
  /deep/ .swiper-pagination {
    position: absolute;
    bottom: 8%;
    left: 47% !important;
    border-radius: 8px !important;
    width: 30px !important;
    height: 5px;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    background-color: #eee;
  }
  /deep/ .swiper-pagination-bullet {
    width: 5px !important;
    height: 5px !important;
    margin: 0 !important;
    opacity: 0 !important;
  }
  /deep/ .swiper-pagination-bullet-active {
    background-color: sandybrown !important;
    width: 15px !important;
    height: 5px !important;
    border-radius: 10px;
    opacity: 1 !important;
    z-index: 996;
  }
}
.service {
  margin-top: 10px;
  width: 100%;
  height: 120px;
  padding: 3px 0;
  overflow: hidden;
  border-radius: 10px;
  background: white;
  position: relative;
  .swiper {
    width: 100%;
    height: 100%;
    .swiper-item {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      background: white;

      .box {
        width: 25%;
        height: 50%;
        position: relative;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
        .icon {
          font-size: 28px;
          color: firebrick;
        }
        .name {
          font-size: 13px;
        }
      }
    }
    /deep/ .van-swipe__indicator {
      opacity: 1;
    }
  }
}
.activity {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  background: white;
  overflow: hidden;
  position: relative;
}
</style>
