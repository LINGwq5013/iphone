<template>
  <div class="children">
    <header-top :title="headtxt" :left="true" :right="false"></header-top>
    <div class="content">
      <div class="address">
        <div class="address-top" v-if="address.name">
          <div class="left">
            <van-icon name="location-o" class="loaction" />
          </div>
          <div class="center">
            <div class="center-name">
              <div class="center-name1">{{ address.name }}</div>
              <div class="center-name2">{{ address.tel }}</div>
            </div>
            <div class="center-address">
              {{ address.address }}
            </div>
            <div class="center-tis">收货不便时，可选择暂存服务</div>
          </div>
          <div class="right">
            <van-icon name="arrow" @click="changeaddress" class="loaction" />
          </div>
        </div>
        <div v-else class="kong">
          <div class="text">您还没有选择默认地址，快去选择吧</div>
          <div class="right">
            <van-icon name="arrow" @click="changeaddress" class="loaction" />
          </div>
        </div>
        <div class="address-bottom" v-if="!double">
          <div class="left">
            <van-icon name="point-gift-o" class="loaction" />
          </div>
          <div class="center">给爱的人也送一份礼物</div>
          <div class="right">
            <van-icon name="arrow" @click="doubleaddress" class="loaction" />
          </div>
        </div>
        <div class="address-top" v-else>
          <div class="left">
            <van-icon name="point-gift-o" class="loaction" />
          </div>
          <div class="center">
            <div class="center-name">
              <div class="center-name1">{{ address1.name }}</div>
              <div class="center-name2">{{ address1.tel }}</div>
            </div>
            <div class="center-address">
              {{ address1.address }}
            </div>
            <div class="center-tis">收货不便时，可选择暂存服务</div>
          </div>
          <div class="right1">
            <div class="right2" @click="Remove">移除</div>
            <div class="right2" @click="doubleaddress">修改</div>
          </div>
        </div>
      </div>
      <div class="content-food">
        <div class="food-top">
          <div class="name">喜茶商城</div>
          <div class="number">
            <div>数量：{{ order.cartNumber }}</div>
            <div>总额：{{ order.cartPrice }}</div>
          </div>
        </div>

        <div
          class="food-main"
          v-for="(item, index) in order.foods"
          :key="index"
        >
          <div class="left">
            <van-image class="tp" :src="item.images[0].url" />
          </div>
          <div class="center">
            <div class="foodname">{{ item.name }}</div>
            <div class="foodmaterials" v-if="!item.is_single">
              {{ item.materials }}
            </div>
          </div>
          <div class="right">
            <div class="price">¥{{ item.price }}</div>
            <div class="number">✖{{ item.number }}</div>
          </div>
        </div>

        <div class="food-bottom">
          <div class="service">
            <div class="left">服务</div>
            <div class="right">此商品不支持7天退货</div>
          </div>
          <div class="service">
            <div class="left">配送方式</div>
            <div class="right">普通配送</div>
            <div class="right1">快递 免邮</div>
          </div>
          <div class="service">
            <div class="left">运费险</div>
            <div class="right">退换货可赔付11元</div>
          </div>
          <div class="service">
            <div class="left">店铺优惠</div>
            <div class="right">无</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-button type="info" round @click="cancel">取消</van-button>
      <van-button type="info" round @click="submit">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import { mapState, mapMutations, mapGetters } from "vuex";
import Vue from "vue";
import { Card, Toast } from "vant";
import { Image as VanImage } from "vant";
import { Button } from "vant";

Vue.use(Toast);
Vue.use(Button);
Vue.use(VanImage);
Vue.use(Card);
export default {
  data() {
    return {
      headtxt: "确认订单",
      direct: false,
    };
  },
  components: {
    "header-top": Headertop,
  },
  computed: {
    ...mapState(["order", "address", "address1"]),
    ...mapGetters(["double", "Checkfoods"]),
  },
  created() {},
  methods: {
    ...mapMutations(["Changedouble", "Deleteshopcart"]),
    submit() {
      if (this.address.name) {
        let foods = {
          cartNumber: "",
          cartPrice: "",
          foods: [],
          address: {},
        };
        Object.keys(foods).forEach((item1) => {
          foods[item1] = this.order[item1];
        });
        foods.address = this.address;
        this.$store.commit("Ordersubmit", foods);
      } else {
        Toast("请选择地址");
        return;
      }

      if (this.double && this.address1.name) {
        let foods1 = {
          cartNumber: "",
          cartPrice: "",
          foods: [],
          address: {},
        };
        Object.keys(foods1).forEach((item1) => {
          foods1[item1] = this.order[item1];
        });
        foods1.address = this.address1;
        this.$store.dispatch("Ordersubmit", foods1);
      }
        if (this.address.name || this.address1.name) {
          if (!this.direct) {
            let products = this.Checkfoods;
            for (let i = 0; i < products.length; i++) {
              const temp = products[i];
              this.Deleteshopcart(temp.id);
            }
          }
          Toast("已提交订单，等待发货");
          let val = 2;
          setTimeout(() => {
            this.$router.push({
              name: "orders",
              params: { orderid: val },
            });
          }, 500);
        }

    },
    cancel() {
      if (this.address.name) {
        let foods = {
          cartNumber: "",
          cartPrice: "",
          foods: [],
          address: {},
        };
        Object.keys(foods).forEach((item1) => {
          foods[item1] = this.order[item1];
        });
        foods.address = this.address;
        this.$store.commit("Ordercancel", foods);
      }

      if (this.double && this.address1.name) {
        let foods1 = {
          cartNumber: "",
          cartPrice: "",
          foods: [],
          address: {},
        };
        Object.keys(foods1).forEach((item1) => {
          foods1[item1] = this.order[item1];
        });
        foods1.address = this.address1;
        setTimeout(() => {
          this.$store.dispatch("Ordercancel", foods1);
        }, 200);
      }

      if (this.address.name || this.address1.name) {
        Toast("已保存订单，等待付款");
        if (this.Checkfoods.length > 0 && !this.direct) {
          let products = this.Checkfoods;
          for (let i = 0; i < products.length; i++) {
            const temp = products[i];
            this.Deleteshopcart(temp.id);
          }
        }
        let val = 1;
        setTimeout(() => {
          this.$router.push({
            name: "orders",
            params: { orderid: val },
          });
        }, 500);
      } else {
        this.$router.go(-1);
      }
    },
    changeaddress() {
      this.$router.push("/addresses");
    },
    Remove() {
      this.Changedouble(false);
    },
    doubleaddress() {
      this.$router.push({
        name: "addresses",
        query: {
          double: true,
        },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    if (from.name == "details") {
      next((vm) => {
        // 这里如果选择double的话，去了另一个页面再回来所有direct = false,待修改
        vm.direct = true;
      });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "cart" || to.name == "details") {
      this.Changedouble(false);
      this.direct = false;
      next();
    } else {
      next();
    }
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 6%;
  overflow-y: scroll;
  background-color: #eee;
  box-sizing: border-box;
  padding: 0 6px;
}
.bottom {
  width: 100%;
  height: 6%;
  position: absolute;
  bottom: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /deep/ .van-button {
    width: 45%;
    height: 80%;
  }
}
.address {
  margin-top: 5px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
  flex-direction: column;
  border-radius: 10px;
  background: white;
  .address-top {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #eee;
    .left {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      .loaction {
        font-size: 30px;
        width: 100%;
        color: tomato;
        text-align: center;
      }
    }
    .center {
      width: 70%;
      height: 100%;
      margin-left: 15px;
      font-size: 15px;
      display: flex;
      text-align: left;
      justify-content: space-around;
      flex-direction: column;
      .center-name {
        width: 100%;
        height: 20px;
        line-height: 20px;
        display: flex;
        .center-name1 {
          font-size: 15px;
          color: #000;
        }
        .center-name2 {
          margin-left: 10px;
          line-height: 23px;
          font-size: 13px;
          color: grey;
        }
      }
      .center-address {
        font-size: 12px;
        color: grey;
      }
      .center-tis {
        color: tomato;
      }
    }
    .right {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      .loaction {
        font-size: 15px;
        width: 100%;
        text-align: center;
      }
    }
    .right1 {
      width: 10%;
      height: 100%;
      display: flex;
      font-size: 12px;
      justify-content: center;
      flex-direction: column;
    }
  }
  .kong {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .text {
      font-size: 15px;
    }
    .right {
      height: 100%;
      .loaction {
        font-size: 15px;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
  .address-bottom {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      .loaction {
        font-size: 30px;
        width: 100%;
        color: tomato;
        text-align: center;
      }
    }
    .center {
      width: 70%;
      height: 100%;
      margin-left: 15px;
      display: flex;
      align-items: center;
      font-size: 15px;
    }
    .right {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      .loaction {
        font-size: 15px;
        width: 100%;
        text-align: center;
      }
    }
  }
}
.content-food {
  margin-top: 6px;
  width: 100%;
  border-radius: 10px;
  position: relative;
  display: flex;
  background: white;
  flex-direction: column;
  .food-top {
    width: 100%;
    height: 25px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    border-bottom: 1px solid #eee;
    .name {
      margin-left: 5px;
      font-size: 18px;
    }
    .number {
      margin-right: 10px;
      width: 40%;
      display: flex;
      font-size: 15px;
      justify-content: space-between;
    }
  }
  .food-main {
    margin-top: 5px;
    width: 100%;
    height: 90px;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    position: relative;
    background: white;
    border-bottom: 1px solid #eee;
    .left {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .tp {
        width: 100%;
        height: 90%;
      }
    }
    .center {
      width: 50%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .foodname {
        width: 100%;
        font-size: 18px;
      }
      .foodmaterials {
        width: 100%;
        font-size: 12px;
        flex-wrap: wrap;
      }
    }
    .right {
      width: 15%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .price {
        font-size: 15px;
      }
      .number {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
  .food-bottom {
    width: 80%;
    margin: 10px auto;
    position: relative;
    text-align: left;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    .service {
      font-size: 13px;
      display: flex;
      height: 20px;
      width: 100%;
      .left {
        width: 20%;
        text-align: right;
        color: #000;
      }
      .right {
        margin-left: 20px;
        color: grey;
      }
      .right1 {
        margin-left: 30%;
      }
    }
  }
}
</style>