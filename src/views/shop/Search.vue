
<template>
  <div class="search" id="keyboard4">
    <div class="header">
      <div class="left">
        <van-icon class="tp" @click="left" name="arrow-left" />
      </div>
      <div class="right">
        <van-search
          v-model="keyword"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
          <template #action>
            <div v-if="result.length == 0" @click="onSearch">搜索</div>
            <div @click="oncancel" v-else>取消</div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="content" v-if="result.length > 0">
      <div
        class="con-list"
        v-for="(item1, index1) in result"
        :key="index1"
        @click="todetails(item1.id)"
      >
        <div class="tp-name">
          <van-image :src="item1.images[0].url" class="pro-image" />
          <div class="pro-name">{{ item1.name }}</div>
        </div>
        <div class="price">￥{{ item1.price }}</div>
      </div>
    </div>
    <div class="content1" v-else>
      <div class="old">
        <div class="top">
          <div>历史记录</div>
          <div class="delete" v-if="historySearch.length>0" @click="delete1">
            <van-icon name="delete-o" />
            <div>删除</div>
          </div>
        </div>
        <div v-if="historySearch.length>0" class="old-main">
          <div
            class="list"
            v-for="(item, index) in historySearch"
            @click="dj(item)"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div v-else class="old-main1">
           <p>暂无记录</p>
        </div>
      </div>
      <div class="hot">
        <div class="top">热门推存</div>
        <div class="hot-main">
          <div
            class="hot-list"
            v-for="(item, index) in hotlist"
            @click="todetails(item.productId)"
            :key="index"
          >
            <div>{{ item.productName }}</div>
            <van-image v-if="item.nameImage" :src="item.nameImage"></van-image>
          </div>
        </div>
      </div>
    </div>
    <div class="dibu">
       测试软键盘
    </div>
    <transition name="router-open" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Toast } from "vant";
import { Search } from "vant";
import Hot from "../../api/hotSearch";
import goods from "../../api/categories";
import { Image as VanImage } from "vant";
import { Icon } from "vant";

Vue.use(Icon);
Vue.use(VanImage);
Vue.use(Search);
Vue.use(NavBar);
export default {
  data() {
    return {
      headtxt: "搜索",
      keyword: "",
      result: [],
      list: [],
      hotlist: [],
      categories: [],
      historySearch: [],
    };
  },
  created() {
     this.$nextTick(() => {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let box = document.getElementById("keyboard4");
      box.style.height = h + "px";
    });
    this.hotlist = Hot;
    this.categories = goods;
    if(localStorage.getItem('history')){
      let data=JSON.parse(localStorage.getItem('history'))
      this.historySearch=data
    }
  },
  watch: {
    keyword(val) {
      if (val == "") {
        this.result = [];
      }
    },
  },
  methods: {
    onSearch() {
      if (!this.keyword) {
        this.result = [];
        return;
      } else {
        let result = [];
        this.categories.forEach((category) => {
          category.products.forEach((product) => {
            if (product.name.indexOf(this.keyword) > -1) {
              result.push(product);
            }
          });
        });
        if (result.length <= 0) {
          Toast("无当前搜索");
        } else {
          if (!this.historySearch.includes(this.keyword)) {
            this.historySearch.unshift(this.keyword);
          } else {
            var i = this.historySearch.indexOf(this.keyword);
            this.historySearch.splice(i, 1);
            this.historySearch.unshift(this.keyword);
          }
          setTimeout(() => {
            localStorage.setItem("history",JSON.stringify(this.historySearch))
            this.result = result;
          }, 300);
        }
      }
    },
    todetails(val) {
      this.$router.push({
        path: "/details1",
        query: { foodid: val },
      });
    },
    oncancel() {
      this.keyword = "";
      this.result = [];
    },
    delete1() {
      if (this.historySearch.length > 0) {
        this.historySearch = [];
        localStorage.setItem("history",JSON.stringify(this.historySearch))
      } else {
        return;
      }
    },
    dj(e) {
      this.keyword = e;
      this.onSearch();
    },
    left() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
}
.dibu{
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0;
}
.content {
  position: absolute;
  top: 6%;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  .con-list {
    width: 100%;
    height: 70px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tp-name {
      width: 70%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      .pro-image {
        width: 90px;
        height: 70px;
      }
      .pro-name {
        margin-left: 10px;
        font-size: 20px;
        display: flex;
        align-items: center;
      }
    }
    .price {
      margin-right: 10px;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
  }
}
.content1 {
  position: absolute;
  top: 6%;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .old {
    width: 100%;
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    box-sizing: border-box;
    padding: 0 10px;
    .top {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      .delete {
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: space-around;
      }
    }
    .old-main {
      width: 100%;
      display: flex;
      font-size: 15px;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .list {
        height: 30px;
        box-sizing: border-box;
        padding: 3px 10px;
        margin: 5px 10px;
        background: #eee;
        text-align: center;
        line-height: 30px;
      }
    }
    .old-main1{
      margin-top: -10px;
     width: 100%;
     height: 20px;
    }
    .old-main1 p{
      font-size: 15px;
      text-align: left;
    }
  }
  .hot {
    width: 100%;
    margin-top: 10px;
    box-sizing: border-box;
    padding: 0 10px;
    .top {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      text-align: left;
    }
    .hot-main {
      width: 100%;
      display: flex;
      font-size: 15px;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .hot-list {
        height: 30px;
        box-sizing: border-box;
        padding: 3px 10px;
        margin: 5px 10px;
        background: #eee;
        text-align: center;
        line-height: 30px;
        display: flex;
        justify-content: space-around;
        /deep/ .van-image {
          width: 20px;
          height: 20px;
          box-sizing: border-box;
          padding-top: 8px;
          padding-left: 5px;
        }
      }
    }
  }
}
.header {
  width: 100%;
  height: 6%;
  top: 10px;
  display: flex;
  z-index: 999;
  .left {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tp {
      font-size: 20px;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    position: relative;
    /deep/ .van-search {
      width: 100%;
      height: 100%;
    }
  }
}
.gg {
  width: 100%;
  height: 800px;
  background: turquoise;
}
</style>