
<template>
  <div class="children">
    <header-top :title="headtxt" :left="true" :right="false"></header-top>
    <div class="content">
      <div class="top-tab">
        <div
          class="tab"
          v-for="(item, index) in tabs"
          :class="{ 'tab-active': active == index }"
          :key="index"
          @click="change(index)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="goods">
        <van-loading
          class="loading"
          type="spinner"
          color="#1989fa"
          v-if="show"
        />
        <van-swipe
          class="swiper"
          :initial-swipe="active"
          :show-indicators="false"
          :loop="false"
          @change="change"
        >
          <van-swipe-item
            class="swiper-item"
            v-for="(item2, index2) in tabs"
            :key="index2"
          >
            <div v-if="lists.length == 0" class="kong">没有该订单</div>
            <van-list
              class="vanlist"
              v-if="active == index2 && lists.length > 0"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="food" v-for="(item, index) in lists" :key="index">
                <div class="food-top">
                  <div class="time">
                    订单时间：{{ item.ordertime | dateFormat }}
                  </div>
                  <div class="two">
                    <div class="num">数量：{{ item.cartNumber }}</div>
                    <div class="price">价格：{{ item.cartPrice }}</div>
                  </div>
                </div>
                <div
                  class="food-main"
                  v-for="(item1, index1) in item.foods"
                  :key="index1"
                >
                  <li class="food-list">
                    <div class="left">
                      <van-image
                        class="tp"
                        :src="item1.images[0].url"
                      ></van-image>
                    </div>
                    <div class="center">
                      <div class="name">
                        {{ item1.name }}
                      </div>
                      <div class="materials" v-if="!item1.is_single">
                        {{ item1.materials }}
                      </div>
                    </div>
                    <div class="right">
                      <div class="r-price">¥{{ item1.price }}</div>
                      <div class="r-number">✖{{ item1.number }}</div>
                    </div>
                  </li>
                </div>
                <div class="food-bottom">
                  <div class="address-name">联系人:{{ item.address.name }}</div>
                  <div class="address-tel">电话:{{ item.address.tel }}</div>
                  <div class="address-tel" v-if="active == 0">
                    {{
                      item.type == "1"
                        ? "待付款"
                        : "" || item.type == "2"
                        ? "待发货"
                        : "" || item.type == "3"
                        ? "待收货"
                        : "" || item.type == "4"
                        ? "待评价"
                        : ""
                    }}
                  </div>
                </div>
                <div class="payment" v-if="active == 1" @click="pay(item)">
                  付款
                </div>
                <div class="payment" v-if="active == 2" @click="ship(item)">
                  催发货
                </div>
                <div class="payment" v-if="active == 3" @click="receipt(item)">
                  确认收货
                </div>
              </div>
            </van-list>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import { Image as VanImage } from "vant";
import { PullRefresh, List } from "vant";
import { Swipe, SwipeItem } from "vant";
import { Loading } from "vant";

Vue.use(Loading);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(VanImage);
export default {
  data() {
    return {
      headtxt: "订单中心",
      active: -1,
      tabs: [
        {
          title: "全部",
        },
        {
          title: "待付款",
        },
        {
          title: "待发货",
        },
        {
          title: "待收货",
        },
        {
          title: "待评价",
        },
      ],
      loading: false,
      finished: false,
      isLoading: false,
      start: 0,
      page: 1,
      lista: [],
      length1: 0,
      lists: [],
      show: false,
    };
  },
  async mounted() {
    this.active = parseInt(this.$route.params.orderid);
    this.show = true;
    await this.onLoad();
    setTimeout(() => {
      this.show = false;
    }, 200);
  },
  watch: {
    active() {
      this.finished = false;
      this.page = 1;
      this.show = true;
      this.onLoad();
      setTimeout(() => {
        this.show = false;
      }, 200);
    },
  },
  computed: {
    ...mapGetters(["orders"]),
  },
  methods: {
    ...mapMutations(["Payment", "Shipment", "Receiption"]),
    change(val) {
      this.active = val;
    },
    async onLoad() {
      await this.getlist();
      this.lists = this.lista.slice(this.start, this.page);
      this.$nextTick(() => {
        if (this.page < this.length1) {
          this.page = this.page + 2;
          this.loading = true;
        } else {
          this.finished = true;
        }
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
    getlist() {
      if (this.active == 0) {
        this.lista = this.orders;
      }
      if (this.active == 1) {
        this.lista = this.orders.filter((item) => {
          return item.type == 1;
        });
      }
      if (this.active == 2) {
        this.lista = this.orders.filter((item) => {
          return item.type == 2;
        });
      }
      if (this.active == 3) {
        this.lista = this.orders.filter((item) => {
          return item.type == 3;
        });
      }
      if (this.active == 4) {
        this.lista = this.orders.filter((item) => {
          return item.type == 4;
        });
      }
      this.length1 = this.lista.length;
    },

    pay(val) {
      this.Payment(val);
      setTimeout(() => {
        let type = 2;
        this.active = type;
      }, 200);
    },
    ship(val) {
      this.Shipment(val);
      setTimeout(() => {
        let type = 3;
        this.active = type;
      }, 200);
    },
    receipt(val) {
      this.Receiption(val);
      setTimeout(() => {
        let type = 4;
        this.active = type;
      }, 200);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "order") {
      this.$router.go(-1);
    } else {
      next();
    }
  },
  components: {
    "header-top": Headertop,
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 100%;
  position: relative;
  /deep/ .van-swipe__track {
    // transition: all 0.5s;
    transition-duration: 0.5s !important;
  }
}

.vanlist {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
}
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 0;
  .top-tab {
    background: #eee;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    height: 50px;
    font-weight: 600;
    font-size: 20px;
    .tab {
      height: 50px;
      line-height: 50px;
    }
  }
  .kong {
    width: 100%;
    height: 100%;
    background: #eee;
    display: flex;
    font-size: 20px;
    justify-content: center;
    align-items: center;
  }
  .goods {
    position: absolute;
    width: 100%;
    top: 50px;
    bottom: 0;
    background: #eee;
    padding: 0 5px;
    box-sizing: border-box;
    overflow-y: scroll;
    .loading {
      width: 100%;
      height: 100%;
      padding-top: 60%;
      background: white;
    }
    .food {
      margin-top: 10px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid white;
      border-radius: 20px;
      background: white;
      position: relative;
      .food-top {
        width: 100%;
        box-sizing: border-box;
        height: 30px;
        display: flex;
        border-bottom: 1px solid #eee;
        align-items: center;
        justify-content: space-between;
        .time {
          display: flex;
          margin-left: 10px;
          font-size: 12px;
        }
        .two {
          margin-right: 10px;
          width: 40%;
          font-size: 15px;
          display: flex;
          justify-content: space-around;
        }
      }
      .food-main {
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid #eee;
        .food-list {
          width: 100%;
          height: 80px;
          display: flex;

          justify-content: space-around;
          .left {
            width: 25%;
            height: 100%;
            position: relative;
            .tp {
              width: 100%;
              height: 100%;
            }
          }
          .center {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            text-align: left;
            .name {
              font-size: 16px;
            }
            .materials {
              font-size: 12px;
              display: flex;
              flex-flow: nowrap;
            }
          }
          .right {
            width: 10%;
            height: 100%;
            font-size: 12px;
            display: flex;
            text-align: center;
            justify-content: center;
            flex-direction: column;
            .r-number {
              margin-top: 5px;
            }
          }
        }
      }
      .food-main:last-of-type {
        border: none;
      }
      .food-bottom {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: space-between;
        .address-name {
          margin-left: 10px;
        }
        .address-tel {
          margin-right: 10px;
        }
      }
      .payment {
        width: 100%;
        box-sizing: border-box;
        border-top: 1px solid #eee;
        line-height: 30px;
        font-size: 15px;
        height: 30px;
      }
    }
    .food:first-child {
      margin: 0 !important;
    }
  }
}
.bactive {
  color: red;
}
.tab-active {
  color: red;
}
</style>