
<template>
  <div class="children">
    <header-top
      :title="headtxt"
      :left="true"
      :right="false"
      :search="false"
    ></header-top>
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      class="refresh"
    >
      <div class="content">
        <div
          v-for="(item, index1) in collection"
          :class="[{ swipeleft: item.isSwipe }, 'wrap']"
          @click="todetails(item.id)"
          ref="child"
          @touchstart.stop="startDrag($event, index1)"
          @touchmove.stop="onDrag($event, index1)"
          :key="index1"
        >
          <li class="list1">
            <van-image class="tp" :src="item.images[0].url"></van-image>
            <a>{{ item.name }}</a>
            <a>¥{{ item.price }}</a>
          </li>

          <li class="delete" @click.stop="removeM(item)">
            <van-button round type="info">删除</van-button>
          </li>
        </div>
        <div class="tis" v-if="collection.length > 0">向右滑动可取消收藏</div>

        <div class="kong" v-else>暂无收藏,快去收藏吧</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import { Image as VanImage } from "vant";
import { Button } from "vant";
import { PullRefresh } from "vant";

Vue.use(PullRefresh);
Vue.use(Button);
Vue.use(VanImage);
export default {
  data() {
    return {
      headtxt: "我的收藏",
      isLoading: false,
    };
  },
  components: {
    "header-top": Headertop,
  },
  computed: {
    ...mapState(["collection"]),
  },
  methods: {
    ...mapMutations(["Cancelcollection"]),
    // 删除收藏
    removeM(val) {
      this.Cancelcollection(val.id);
    },
    // 下拉刷新请求后台更新数据
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 点击到详情
    todetails(val) {
      this.$router.push({
        path: "/details",
        query: { foodid: val },
      });
    },
    startDrag(e, index) {
      this.x = e.changedTouches[0].pageX;
      this.y = e.changedTouches[0].pageY;
      this.swipeX = true;
      this.swipeY = true;
      this.collection[index].isSwipe = false;
    },
    onDrag(e, index) {
      this.X = e.changedTouches[0].pageX;
      this.Y = e.changedTouches[0].pageY;
      if (
        this.swipeX &&
        Math.abs(this.X - this.x) - Math.abs(this.Y - this.y) > 0
      ) {
        // 阻止默认事件
        e.stopPropagation();
        // 右滑隐藏删除
        if (this.X - this.x > 10) {
          e.preventDefault();
          this.collection[index].isSwipe = false;
        }
        if (this.x - this.X > 10) {
          e.preventDefault();
          this.collection[index].isSwipe = true;
        }
        this.swipeY = false;
      }
      if (
        this.swipeY &&
        Math.abs(this.X - this.x) - Math.abs(this.Y - this.y) < 0
      ) {
        this.swipeX = false;
      }
    },
  },
};
</script>


<style lang="less" scoped>
.refresh {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #eee;
  overflow-x: hidden;
  overflow-y: scroll;
}
.kong {
  margin: 40% 0;
  width: 100%;
}
.swipeleft {
  transition: all 0.5s;
  transform: translateX(-20%);
}

.wrap {
  width: 125%;
  display: flex;
  transition: all 0.3s linear;
  height: 60px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: white;
  .list1 {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: space-around;
    .tp {
      width: 80px;
      height: 60px;
    }
  }
  .delete {
    width: 25%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/ .van-button {
      width: 80%;
      height: 50%;
    }
  }
}
.tis {
  width: 100%;
  margin-top: 20px;
  color: grey;
  text-align: center;
  font-size: 20px;
}
</style>