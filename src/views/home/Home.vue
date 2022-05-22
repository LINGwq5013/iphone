
<template>
  <div class="home">
    <div class="header">
      <van-nav-bar title="主页" placeholder>
        <template #left>
          <p v-if="localcity" @click="selectcity">{{ localcity }}</p>
          <van-icon v-else name="location-o" @click="selectcity" size="18" />
        </template>
        <template #right>
          <van-icon name="user-circle-o" @click="right" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <div class="swiper">
        <van-swipe :autoplay="3000" ref="swiper">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <van-image lazy-load class="tp" :src="image" />
          </van-swipe-item>
        </van-swipe>
        <div class="button">
          <div class="left">
            <van-icon name="arrow-left" @click="prev" />
          </div>
          <div class="right">
            <van-icon name="arrow" @click="next" />
          </div>
        </div>
      </div>
      <div class="tontent-a">
        <div class="tab">
          <van-icon class="icon" name="discount" />
          <div class="text">双十一大特价</div>
        </div>
        <div class="tab">
          <van-icon class="icon" name="certificate" />
          <div class="text">30天无忧退货</div>
        </div>
        <div class="tab">
          <van-icon class="icon" name="after-sale" />
          <div class="text">2天内快速退款</div>
        </div>
      </div>
      <div class="content-top" >
        <van-swipe class="swiper">
          <van-swipe-item class="swiper-item">
            <div class="box" v-for="(item, index) in goods_icon1" @click="test(index)" :key="index">
              <van-image class="icon" lazy-load :src="item.imgurl"></van-image>
              <div class="name">{{ item.goods_txt }}</div>
            </div>
          </van-swipe-item>
          <van-swipe-item class="swiper-item">
            <div class="box" v-for="(item, index) in goods_icon" :key="index">
              <van-image class="icon" lazy-load :src="item.imgurl"></van-image>
              <div class="name">{{ item.goods_txt }}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="content-new">
        <div class="new-top">
          <div>新品首发</div>
          <div>更多</div>
        </div>
        <div class="new-goods">
          <div
            class="new-food"
            v-for="(item1, index1) in goods_List"
            :key="index1"
          >
            <van-image class="tp" lazy-load :src="item1.imgurl"></van-image>
            <div class="food-text">
              <div class="name">{{ item1.text }}</div>
              <div class="price">¥{{ item1.price }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-mart">
        <div class="mart-top">
          <div>喜茶商城</div>
          <div>更多</div>
        </div>
        <div class="mart-goods">
          <div class="mart-food" v-for="(item2, index2) in mart" :key="index2">
            <van-image class="tp" lazy-load :src="item2.thumbnail"></van-image>
            <div class="food-text">
              <div class="name">{{ item2.name }}</div>
              <div class="price">
                <div class="num">已{{ item2.itemSalesVolume }}人购买</div>
                <div class="sale">¥{{ item2.salePrice / 100 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="router-open" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import marts from "../../api/mart";
import { mapState } from "vuex";
import { NavBar } from "vant";
import { Icon} from "vant";
import { Swipe, SwipeItem } from "vant";
import { Image as VanImage } from "vant";

export default {
  name: "Home",
  data() {
    return {
      images: [
        require("@/assets/img/1.jpg"),
        require("@/assets/img/2.jpg"),
        require("@/assets/img/3.jpg"),
        require("@/assets/img/4.jpg"),
        require("@/assets/img/5.jpg"),
      ],
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
      goods_icon1: [
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1",
          goods_txt: "天猫新品",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1LvIxVAvoK1RjSZFDXXXY3pXa-183-144.png?getAvatar=1",
          goods_txt: "今日爆款",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB19uWKXkCy2eVjSZPfXXbdgpXa-183-144.png?getAvatar=1",
          goods_txt: "天猫国际",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1DaMyVpzqK1RjSZFoXXbfcXXa-185-144.png?getAvatar=1",
          goods_txt: "饿了么",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1FucwVwHqK1RjSZFgXXa7JXXa-183-144.png?getAvatar=1",
          goods_txt: "天猫超市",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1llI3f4n1gK0jSZKPXXXvUXXa-183-144.png?getAvatar=1",
          goods_txt: "充值中心",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1O_AyVwHqK1RjSZFPXXcwapXa-183-144.png?getAvatar=1",
          goods_txt: "机票酒店",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB19yZJVBLoK1RjSZFuXXXn0XXa-183-144.png?getAvatar=1",
          goods_txt: "金币庄园",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB16ZYDk4n1gK0jSZKPXXXvUXXa-183-144.png?getAvatar=1",
          goods_txt: "阿里拍卖",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB19dcwVyrpK1RjSZFhXXXSdXXa-183-144.png?getAvatar=1",
          goods_txt: "淘宝吃货",
        },
      ],
      goods_List: [
        {
          imgurl: require("@/assets/goods_list/goods_1.jpg"),
          text: "网易有道词典笔2.0",
          price: 749,
          gradientPrice: 1,
        },
        {
          imgurl: require("@/assets/goods_list/goods_2.png"),
          text: "男士基础休闲裤",
          price: 99.9,
          gradientPrice: 2,
        },
        {
          imgurl: require("@/assets/goods_list/goods_3.png"),
          text: "男士舒软通勤商务正装鞋",
          price: 299,
          gradientPrice: 3,
        },
        {
          imgurl: require("@/assets/goods_list/goods_4.png"),
          text: "L1智能控速轻跑机",
          price: 2599,
          gradientPrice: 0,
        },
        {
          imgurl: require("@/assets/goods_list/goods_5.png"),
          text: "黄油华夫饼 1千克",
          price: 749,
          gradientPrice: 4,
        },
        {
          imgurl: require("@/assets/goods_list/goods_6.png"),
          text: "牙线棒 50支/盒 园线",
          price: 749,
          gradientPrice: 0,
        },
      ],
      mart: [],
      gg: "1",
    };
  },
  components: {
    "van-image": VanImage,
    "van-swipe": Swipe,
    "van-icon": Icon,
    "van-swipe-item": SwipeItem,
    "van-nav-bar": NavBar,
  },
  created() {
    this.$nextTick(() => {
      this.mart = marts;
    });
  },
  destroyed() {},
  computed: {
    ...mapState(["localcity"]),
  },
  mounted() {
    // 下面是将6个数据分成两组
    let resLength = this.goods_List.length;
    // JSON.parse(JSON.stringify( )) 深拷贝，数据改变不影响原数据
    let resArr =JSON.parse(JSON.stringify(this.goods_List)); // 返回一个新的数组
    resArr[0].price=Number(777)
    let foodArr = [];
    let newlist=[];
    for (let i = 0, j = 0; i < resLength; i += 3, j++) {
      foodArr[j] = resArr.splice(0, 3);
    }
    newlist=foodArr
    console.log(newlist)
  },
  methods: {
    right() {
      this.$router.push("/mine");
    },
    test(val){
      
        let  num=Number(val+1)
        console.log(num)
        let num1=String('/test'+num)
        console.log(num1)
        
        this.$router.push(num1)
    },
    prev() {
      this.$refs.swiper.prev();
    },
    next() {
      this.$refs.swiper.next();
    },
    selectcity() {
      this.$router.push("/city");
    },
    
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "userinfo") {
      next((vm) => {
        vm.$router.go(0);
      });
    } else {
      next();
    }
  },
};
</script>
<style lang="less" scoped>
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
    font-size: 18px !important;
  }
  /deep/ .van-nav-bar__title {
    font-size: 18px !important;
  }
}
.fix {
  position: fixed;
  height: 45px;
  top: 0;
  opacity: 1;
  width: 100%;
  background: white;
  z-index: 9;
  /deep/ .van-nav-bar {
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
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 50px;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  background: white;
  .swiper {
    position: relative;
    width: 100%;
    height: 200px;
    .button {
      position: absolute;
      z-index: 1;
      top: 80px;
      width: 100%;
      height: 25px;
      .left {
        width: 25px;
        height: 25px;
        float: left;
        margin-left: 10px;
        color: rgb(240, 240, 240);
      }
      .right {
        width: 25px;
        height: 25px;
        float: right;
        margin-right: 10px;
        color: rgb(240, 240, 240);
      }
    }
    .tp {
      width: 100%;
      height: 200px;
    }
  }
  .tontent-a {
    width: 100%;
    height: 35px;
    display: flex;
    background: white;
    justify-content: space-around;
    .tab {
      width: 33%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: flex-start;
      .icon {
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        color: red;
      }
      .text {
        width: 75%;
        margin-left: 3px;
        font-weight: 600;
        font-size: 12px;
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }
  .content-top {
    width: 100%;
    height: 140px;
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
          width: 20%;
          height: 50%;
          font-size: 12px;
          position: relative;
          align-items: center;
          justify-content: space-around;
          display: flex;
          flex-direction: column;
          .icon {
            width: 80%;
            height: 80%;
            display: flex;
            justify-content: center;
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
  .content-new {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    .new-top {
      width: 100%;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
    }
    .new-goods {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .new-food {
        width: 32%;
        box-sizing: border-box;
        padding: 2px 0;
        height: 110px;
        display: flex;
        flex-direction: column;
        position: relative;
        .tp {
          width: 100%;
          height: 70%;
        }
        .food-text {
          width: 100%;
          height: 30%;
          font-size: 10px;
          display: flex;
          justify-content: flex-start;
          .name {
            width: 70%;
            flex-wrap: wrap;
          }
          .price {
            width: 30%;
            box-sizing: border-box;
            padding: 2px 0;
            color: red;
          }
        }
      }
    }
  }
  .content-mart {
    width: 100%;
    background: #eee;
    box-sizing: border-box;
    padding: 10px 10px;
    .mart-top {
      width: 100%;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
    }
    .mart-goods {
      width: 100%;
      display: flex;
      background: #eee;
      flex-wrap: wrap;
      justify-content: space-between;
      .mart-food {
        width: 47%;
        display: flex;
        align-items: center;
        margin: 5px 5px;
        overflow: hidden;
        background: white;
        border-radius: 20px;
        flex-direction: column;
        position: relative;
        .tp {
          width: 100%;
          height: 160px;
          display: flex;
        }
        .food-text {
          width: 100%;
          height: 50px;
          font-size: 15px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .name {
            width: 100%;
            height: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            width: 100%;
            display: flex;
            height: 50%;
            box-sizing: border-box;
            padding: 2px 10px;
            align-items: center;
            justify-content: space-between;
            .num {
              color: grey;
            }
            .sale {
              color: red;
              padding-top: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
