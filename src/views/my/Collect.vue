
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
        <van-swipe-cell
          v-for="(item, index1) in collection"
          :key="index1"
          class="swipe"
          ref="swipe"
        >
          <div class="xin" @click.stop="todetails(item.id)">
            <li class="list1">
              <van-image class="tp" :src="item.images[0].url"></van-image>
              <a>{{ item.name }}</a>
              <a>¥{{ item.price }}</a>
            </li>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              @click="removeM(item)"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
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
import { SwipeCell } from "vant";
import { Dialog } from "vant";

// 全局注册
Vue.use(Dialog);
Vue.use(SwipeCell);
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
      Dialog.confirm({
        title: "删除收藏",
        message: "确定要移除该选项？",
      })
        .then(() => {
        this.Cancelcollection(val.id);
        })
        .catch(() => {
  
        });
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
  },
};
</script>


<style lang="less" scoped>
.refresh {
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 0;
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

.delete-button {
  width: 60px;
  height: 100%;
}
.swipe {
  width: 100%;
  height: 60px;
  margin-top: 10px;
  border-radius: 10px;
  background: white;
}
.xin {
  width: 100%;
  height: 60px;
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
}
.tis {
  width: 100%;
  margin-top: 20px;
  color: grey;
  text-align: center;
  font-size: 20px;
}
</style>