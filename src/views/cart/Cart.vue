
<template>
  <div class="cart">
    <div class="header">
      <van-nav-bar title="购物车" placeholder>
        <template #right v-if="shopcart.length > 0">
          <div v-show="show" @click="manage1">管理</div>
          <div v-show="!show" @click="finish">完成</div>
        </template>
      </van-nav-bar>
    </div>
    <div class="content" v-if="shopcart.length > 0">
      <div class="content-top">
        <div
          v-for="(item, index) in shopcart"
          class="foods"
          @click.stop="Todetail(item)"
          :key="index"
        >
          <div class="left">
            <van-checkbox
              class="input"
              v-model="item.check"
              @click.stop.native="() => {}"
              @change="changecheck($event, index)"
            ></van-checkbox>
          </div>
          <div class="center">
            <img class="tp" :src="item.images[0].url" />
          </div>
          <div class="right">
            <div class="name">
              {{ item.name }}
            </div>
            <div v-if="!item.is_single" class="materials">
              {{ item.materials }}
            </div>
            <div class="price">
              <div class="price1">¥{{ item.price }}</div>
              <div class="price2">
                <van-icon
                  class="btn1"
                  @click.stop="reducefood(index)"
                  name="minus"
                />
                <div class="btn2">{{ item.number }}</div>
                <van-icon
                  class="btn3"
                  @click.stop="addfood(index)"
                  name="plus"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- v-show="cartNumber > 0" -->
      <div class="bottom">
        <div class="selectall">
          <van-checkbox v-model="isAllCheck">全选</van-checkbox>
        </div>
        <div v-if="show" class="settlement">
          <div class="price" v-show="cartPrice > 0">
            <div>总价：</div>
            <div class="price1">¥{{ cartPrice }}</div>
          </div>
          <van-button round class="btn" @click="pay" type="info">
            <a>结算</a>
            <a v-show="cartNumber > 0"> ({{ cartNumber }})</a>
          </van-button>
        </div>
        <div v-else class="manage">
          <van-button round class="collect" @click="collect" type="default">
            移入收藏夹
          </van-button>
          <van-button round class="delete" @click="Delete" type="default">
            删除
          </van-button>
        </div>
      </div>
    </div>
    <div class="kong" v-else>空空如也，快去加购吧！！！</div>
    <transition name="router-open" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Vue from "vue";
import { Checkbox, CheckboxGroup, Toast } from "vant";
import { NavBar } from "vant";
import { Button } from "vant";
import { Card } from "vant";
import { Icon } from "vant";

Vue.use(Icon);
Vue.use(Card);
Vue.use(NavBar);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

export default {
  data() {
    return {
      headtxt: "购物车",
      show: true,
      checkall: false,
    };
  },
  computed: {
    ...mapState(["shopcart"]),
    ...mapGetters(["cartPrice", "cartNumber", "Checkfoods"]),
    isAllCheck: {
      get() {
        return this.$store.getters.getIsAllCheck;
      },
      set(val) {
        this.checkAll(val);
      },
    },
  },
  methods: {
    ...mapMutations([
      "Addshopcartnum2",
      "Redureshopnum2",
      "Changecheck",
      "Saveorder",
      "checkAll",
      "Deleteshopcart",
    ]),
    manage1() {
      this.show = !this.show;
    },
    finish() {
      this.show = !this.show;
    },
    Todetail(val) {
      this.$router.push({
        path: "/details",
        query: { foodid: val.id },
      });
    },
    changecheck(value, index) {
      this.Changecheck({ value: value, index: index });
    },
    pay() {
      if (this.cartPrice) {
        let products = this.Checkfoods;
        this.Saveorder(products);
        this.$router.push("/order");
      }
    },
    reducefood(val) {
      this.Redureshopnum2(val);
    },
    addfood(val) {
      this.Addshopcartnum2(val);
    },
    Delete() {
      if (this.cartPrice) {
        let products = this.Checkfoods;
        for (let i = 0; i < products.length; i++) {
          const temp = products[i];
          this.Deleteshopcart(temp.id);
        }
      }
    },
    collect() {
      Toast("未实现该功能");
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  background: #eee;
  bottom: 50px;
}
.header {
  width: 100%;
  height: 6%;
  position: relative;
  /deep/ .van-nav-bar {
    height: 100%;
  }
  /deep/ .van-nav-bar__content {
    height: 100%;
  }
  /deep/ .van-icon {
    font-size: 22px !important;
  }
  /deep/ .van-nav-bar__title {
    font-size: 22px !important;
  }
}
.kong {
  width: 100%;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  padding: 0 8px;
  bottom: 50px;
  display: flex;
  justify-content: center;
  font-size: 16px;
  align-items: center;
}
.content-top {
  width: 100%;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  padding: 0 8px;
  bottom: 50px;
  overflow-y: scroll;
  .foods {
    width: 100%;
    min-height: 80px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: white;
    margin-top: 10px;
    .left {
      position: relative;
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .van-checkbox__icon {
        font-size: 25px;
      }
    }
    .center {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .tp {
        width: 100px;
        height: 80px;
      }
    }
    .right {
      width: 60%;
      height: 100%;
      padding: 5px 15px 8px 0;
      display: flex;
      font-size: 16px;
      justify-content: space-around;
      flex-direction: column;
      .name {
        text-align: left;
        font-size: 18px;
        line-height: 30px;
        height: 30px;
      }
      .materials {
        width: 100%;
        display: flex;
        text-align: left;
        flex-direction: column;
        font-size: 12px;
        box-sizing: border-box;
        padding: 8px 0;
      }
      .price {
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        .price1 {
          font-size: 18px;
        }
        .price2 {
          width: 90px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 18px;
          .btn3 {
            background-color: #dba871;
            border-radius: 50%;
            color: white;
            box-sizing: border-box;
            padding: 2px 2px;
          }
          .btn1 {
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            border-radius: 50%;
            padding: 2px 2px;
          }
        }
      }
    }
  }
}
.bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  // opacity: 1;
  // transition: all 2s;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  background: white;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  .selectall {
    width: 100px;
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .settlement {
    width: 280px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn {
      width: 100px;
      height: 40px;
      font-size: 17px;
    }
    .price {
      width: 100px;
      margin-right: 10px;
      height: 50px;
      font-size: 18px;
      line-height: 50px;
      display: flex;
      justify-content: flex-end;
      .price1 {
        color: tomato;
        font-size: 15px;
      }
    }
  }
  .manage {
    width: 280px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .delete {
      width: 80px;
      height: 35px;
      color: red;
      font-size: 18px;
      border-color: red;
    }
    .collect {
      width: 130px;
      height: 35px;
      margin-right: 10px;
      color: orange;
      font-size: 18px;
      border-color: orange;
    }
  }

  /deep/ .van-checkbox__icon {
    font-size: 25px;
  }
}
</style>