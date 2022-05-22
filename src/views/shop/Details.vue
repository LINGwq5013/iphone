
<template>
  <div class="children" ref="detail">
    <header-top
      :title="headtxt"
      :left="true"
      :right="true"
      :share="true"
      @share1="share1"
    ></header-top>
    <div class="content">
      <div class="swiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in food.images" :key="index">
            <img class="tp" v-lazy="image.url" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="content-main">
        <div class="topname">{{ food.name }}</div>
        <div class="labels">
          <div
            class="label"
            v-for="(label, index) in food.labels"
            :key="index"
            :style="{ color: label.label_color }"
          >
            {{ label.name }}
          </div>
        </div>
        <div class="miaoshu">产品描述</div>
        <div class="description" :class="{ fangda: food.is_single }">
          {{ food.description }}
        </div>
        <template v-if="!food.is_single">
          <div
            v-for="(material, index) in food.materials"
            :key="index"
            class="selects"
          >
            <div class="group-name">{{ material.group_name }}</div>
            <div class="values">
              <div
                class="value"
                :class="{ selected: value.is_selected }"
                @click="changeMaterialSelected(index, key)"
                v-for="(value, key) in material.values"
                :key="key"
              >
                {{ value.name }}
              </div>
            </div>
          </div>
        </template>
        <div class="bottom">
          <div class="b-top">
            <div class="price">¥{{ food.price }}</div>
            <div class="btn">
              <van-icon class="btn1" @click="reducefood" name="minus" />
              <div class="btn2">{{ num }}</div>
              <van-icon class="btn3" @click="addfood" name="plus" />
            </div>
          </div>
          <div class="selectvalue" v-if="selectvalue">
            {{ selectvalue }}
          </div>
        </div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
          <van-goods-action-icon
            v-if="shopnum"
            icon="cart-o"
            text="购物车"
            @click="Tocart"
            :badge="shopnum"
          />
          <van-goods-action-icon
            v-else
            icon="cart-o"
            @click="kongcart"
            text="购物车"
          />
          <van-goods-action-icon
            icon="star"
            v-if="show"
            @click="addcollect"  
            :text=" show ? '收藏' : '已收藏' "
          />
          <van-goods-action-icon
            icon="star"
            v-else
            @click="cancelcollect"
            :text=" show ? '收藏' : '已收藏' "
            :color="show ? '' : '#ff5000'"
          />
          <van-goods-action-button
            type="warning"
            class="btn-big"
            @click="addcart1"
          >
            <li class="btn-class">
              <span>加入购物车</span>
              <span v-if="num >= 2" class="text">{ {{ num }} }</span>
            </li>
          </van-goods-action-button>
          <van-goods-action-button type="danger" @click="buy" text="立即购买" />
        </van-goods-action>
      </div>
    </div>
    <!-- 购物车抛物线 -->
    <ball ref="ball"></ball>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import Ball from "./ball.vue";
import goods from "../../api/categories";
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import { Swipe, SwipeItem, Toast } from "vant";
import { Button } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import { ShareSheet } from "vant";

Vue.use(ShareSheet);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  data() {
    return {
      headtxt: "商品详情",
      food: {},
      num: 1,
      limit: "8",
      foodid: "",
      scale: false,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  components: {
    "header-top": Headertop,
    ball: Ball,
  },
  async created() {
    // 应增加进来详情时获取购物车和收藏是否存在
    this.foodid = this.$route.query.foodid;
    await goods.forEach((item) => {
      item.products.forEach((item1) => {
        if (item1.id == this.foodid) {
          this.food = item1;
        }
      });
    });
  },
  computed: {
    ...mapState(["shopcart", "collection"]),
    selectvalue() {
      if (this.food.materials) {
        let materials = [];
        this.food.materials.forEach(({ values }) => {
          values.forEach((value) => {
            if (value.is_selected) {
              materials.push(value.name);
            }
          });
        });
        return materials.length ? materials.join("，") : "";
      } else {
        return "";
      }
    },
    shopnum() {
      let nums = 0;
      this.shopcart.forEach((item) => {
        nums += item.number;
      });
      return nums;
    },
    show() {
      let showa = true;
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i].id == this.foodid) {
          showa = false;
          break;
        }
      }
      return showa;
    },
  },
  methods: {
    ...mapMutations(["Savecollection", "Cancelcollection", "Saveorder1"]),
    changeMaterialSelected(index, key) {
      const currentMaterial = this.food.materials[index].values[key];
      if (currentMaterial.is_exclusive) {
        currentMaterial.is_selected = !currentMaterial.is_selected;
      } else {
        // 多选
        if (currentMaterial.is_selected) {
          return;
        } else {
          this.food.materials[index].values.forEach((value) =>
            this.$set(value, "is_selected", false)
          );
          currentMaterial.is_selected = true;
        }
      }
    },
    Tocart() {
      this.$router.push("/cart");
    },
    kongcart() {
      if (this.$store.state.user.username) {
        Toast("购物车为空！！！");
      } else {
        Toast("请登录");
      }
    },
    reducefood() {
      this.$nextTick(() => {
        if (this.num <= 1) {
          Toast("不能再减了");
        } else {
          this.num--;
        }
      });
    },
    addfood(event) {
      if (this.$store.state.user.username) {
        this.$nextTick(() => {
          if (this.num >= this.$store.state.limit) {
            Toast("最多只能购买" + this.$store.state.limit);
          } else {
            this.num++;
            this.$nextTick(() => {
              this.$refs.ball.drop(event.target);
            });
          }
        });
      } else {
        Toast("请登录");
      }
    },
    addcollect() {
      if (this.$store.state.user.username) {
        const product2 = {
          name: this.food.name,
          id: this.food.id,
          images: this.food.images,
          price: this.food.price,
          isSwipe: false,
        };
        this.Savecollection(product2);
        Toast("收藏成功");
      } else {
        Toast("请登录");
      }
    },
    cancelcollect() {
      this.Cancelcollection(this.foodid);
      Toast("取消收藏成功");
    },
    async addcart1() {
      if (this.$store.state.user.username) {
        const product = {
          name: this.food.name,
          id: this.food.id,
          images: this.food.images,
          price: this.food.price,
          is_single: this.food.is_single,
          number: this.num,
          check: false,
          materials: this.selectvalue,
        };
        await this.$store.commit("Checkcartxin", product);
        if (this.$store.state.cartindex != -1) {
          const data1 = {
            index: this.$store.state.cartindex,
            number: this.num,
          };
          this.$store.commit("Revisecart", data1);
        } else {
          this.$store.commit("Addcartxin", product);
        }
        setTimeout(() => {
          this.num = 1;
        }, 300);
      } else {
        Toast("请登录");
      }
    },
    buy() {
      if (this.$store.state.user.username) {
        const product3 = {
          name: this.food.name,
          id: this.food.id,
          check: true,
          images: this.food.images,
          price: this.food.price,
          is_single: this.food.is_single,
          number: this.num,
          materials: this.selectvalue,
        };
        this.Saveorder1(product3);
        setTimeout(() => {
          this.$router.push("/order");
        }, 100);
      } else {
        Toast("请登录");
      }
    },
    share1() {
      this.showShare = true;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: absolute;
  text-align: left;
  font-size: 16px;
  top: 6%;
  bottom: 60px;
  overflow-y: scroll;
  background: white;
  .swiper {
    width: 100%;
    height: 40%;
    position: relative;
    /deep/ .van-swipe {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .tp {
      width: 100%;
      height: 100%;
    }
  }
  .btn-big {
    /deep/ .van-button__text {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      position: relative;
      .btn-class {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .text {
          font-size: 12px;
        }
      }
    }
  }

  .content-main div {
    margin-top: 5px;
    box-sizing: border-box;
    padding: 0 8px;
  }
  .topname {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
  }
  .labels {
    margin-top: 5px;
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .label {
      padding: 0 15px 0 0;
      height: 25px;
      line-height: 25px;
      font-size: 15px;
    }
  }
  .miaoshu {
    height: 8%;
    display: flex;
    align-items: center;
    font-size: 17px;
    color: rgb(179, 174, 174);
  }
  .fangda {
    font-size: 17px !important;
  }
  .description {
    display: flex;
    font-size: 15px;
    flex-wrap: wrap;
    color: rgb(179, 174, 174);
  }
  .selects {
    width: 100%;
    .group-name {
      font-size: 18px;
      height: 35px;
      line-height: 35px;
      color: #000;
    }
    .values {
      width: 100%;
      display: flex;

      flex-wrap: wrap;
      justify-content: flex-start;
      .value {
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        color: grey;
        background-color: #eee;
        padding: 0 10px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-right: 10px;
      }
      .selected {
        background-color: #dba871;
        color: white;
      }
    }
  }
  .bottom {
    margin-top: 15px !important;
    width: 100%;
    border-top: 1px solid #eee;
    .b-top {
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      height: 30px;
      justify-content: space-between;
      .price {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: #dba871;
      }
      .btn {
        width: 100px;
        display: flex;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn3 {
          background-color: #dba871;
          border-radius: 50%;
          color: white;
          box-sizing: border-box;
          padding: 2px 2px;
        }
        .btn2 {
          margin: 0 !important;
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
    .selectvalue {
      box-sizing: border-box;
      padding: 15px 0;
      width: 100%;
      font-size: 16px;
    }
    .addcart {
      width: 100%;
      height: 40px;
      font-size: 18px;
      box-sizing: border-box;
      padding-bottom: 8px;
      margin-top: 20px;
    }
  }
}
/deep/ .van-share-sheet__options {
  justify-content: space-around !important;
}
</style>