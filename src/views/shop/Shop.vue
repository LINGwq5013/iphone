
<template>
  <div class="shop">
    <header-top
      :title="headtxt"
      :left="false"
      :right="true"
      :search="true"
    ></header-top>
    <div class="content">
      <div class="left">
        <ul class="uli">
          <li
            v-for="(item, index) in list1"
            :key="index"
            class="lis"
            @click="changelist(index)"
            :class="{ active: activeKey == index }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="right">
        <div v-for="(item, index1) in list" :key="index1">
          <!-- 这里v-for与v-if不连用的话可以用computed中的过滤实现 -->
          <!-- <template v-if="activeKey == index1"> -->
          <div class="rcontent">
            <div class="rtop">
              {{ item.name }}
            </div>
            <div class="rmain">
              <li
                class="rlist"
                v-for="(food, index2) in item.products"
                @click="selectfood(food.id)"
                :key="index2"
              >
                <van-image
                  class="foodimg"
                  lazy-load
                  :src="food.images[0].url"
                />
                <div class="foodtxt">
                  <div>
                    {{ food.name }}
                  </div>
                  <div>¥{{ food.price }}</div>
                </div>
              </li>
            </div>
          </div>
          <!-- </template> -->
        </div>
      </div>
    </div>
    <transition name="router-open" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Headertop from "../../components/header.vue";
import goods from "../../api/categories";
import Vue from "vue";
import { Image as VanImage } from "vant";

Vue.use(VanImage);
export default {
  data() {
    return {
      headtxt: "喜茶商城",
      activeKey: 0,
      list1:[]
    };
  },
  components: {
    "header-top": Headertop,
  },
  
  created() {
    this.list1 = goods;
    if (localStorage.getItem("shopkey")) {
      this.activeKey = localStorage.getItem("shopkey");
    }
  },
  computed: {
    list() {
      let self=this
      let lis = goods.filter(function (data, index) {
        // return self.activeKey=index;
        if (self.activeKey == index) {
          return data;
        }
      });
      return lis;
    },
  },
  methods: {
    changelist(val) {
      this.activeKey = val;
      localStorage.setItem("shopkey", this.activeKey);
    },
    changeindex(val) {
      console.log(val)
    },
    dj() {
      this.$router.push("/try");
    },
    selectfood(val) {
      this.$router.push({
        path: "/details",
        query: { foodid: val },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 50px;
  display: flex;
  .left {
    background: #eee;
    width: 80px;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    .uli {
      width: 100%;
      height: 100%;
      .lis {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
    }
  }
  .right {
    background: white;
    flex: 1;
    height: 100%;
    font-size: 20px;
    text-align: left;
    position: relative;
    .rcontent {
      width: 100%;
      height: 100%;
      .rtop {
        width: 100%;
        height: 40px;
        background: #eee;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 10px;
      }
      .rmain {
        box-sizing: border-box;
        padding: 0 5px;
        width: 100%;
        overflow-y: scroll;
        position: absolute;
        top: 40px;
        bottom: 0;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .rlist {
          width: 50%;
          height: 150px;
          box-sizing: border-box;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .foodimg {
            width: 120px;
            margin: 0 auto;
            height: 100px;
          }
          .foodtxt {
            width: 100%;
            height: 30px;
            display: flex;
            line-height: 30px;
            justify-content: space-around;
            align-items: center;
            font-size: 13px;
          }
        }
        .rlist:nth-child(even) {
          border-right: none;
        }
        // .rlist:nth-last-of-type(-n+2){
        //    border-bottom:none;
        // }
      }
    }
  }
}

.active {
  color: red;
}
</style>