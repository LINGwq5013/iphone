
<template>
  <div class="city">
    <header-top :title="headtxt" :left="true"></header-top>
    <div class="content">
      <div class="city-top" v-if="localcity">
        <div class="city-name">当前城市</div>
        <div class="select-city">{{ localcity }}</div>
      </div>
      <van-loading class="loading" type="spinner" color="#1989fa" v-if="show" />
      <van-index-bar class="citycell" v-else :index-list="letters">
        <div class="tp" v-for="(val, i) in list" :key="i">
          <van-index-anchor :index="i"></van-index-anchor>
          <van-grid :border="false">
            <van-grid-item
              v-for="(item, index) in val"
              :key="index"
              @click="selcity(item.name)"
              :text="item.name"
              :class="{ active: localcity == item.name }"
            />
          </van-grid>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import Headertop from "../../components/header.vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
import { Grid, GridItem } from "vant";
import { Loading } from "vant";

Vue.use(Loading);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
  data() {
    return {
      list: {},
      headtxt: "城市列表",
      show: true,
      selectcity: " ",
    };
  },
  components: {
    "header-top": Headertop,
  },
  created() {
    const { cities } = require("./city.json");
    this.list = { ...cities };
    setTimeout(() => {
      this.show = false;
    }, 300);
  },
  computed: {
    ...mapState(["localcity"]),
    letters() {
      const letters = [];
      for (let i in this.list) {
        letters.push(i);
      }
      return letters;
    },
  },
  methods: {
    ...mapMutations(["Changecity"]),
    selcity(val) {
      this.Changecity(val);
      this.$router.go(-1)
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
}
.content{
  position: absolute;
  top: 6%;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
  overflow-y: scroll;
}
.city-top {
  width: 100%;
  text-align: left;
  line-height: 1rem;
  .city-name {
    width: 100%;
    font-size: 18px;
    box-sizing: border-box;
    padding: 0 15px;
    background: #eee;
  }
  .select-city {
    width: 100%;
    font-size: 18px;
    box-sizing: border-box;
    padding: 0 15px;
  }
}
.loading {
  width: 100%;
  height: 100%;
  padding-top: 60%;
  background: white;
}
/deep/ .van-index-anchor {
  background: #eee;
  text-align: left;
}
/deep/ .van-grid {
  width: 100%;
  background: white;
}
/deep/ .van-index-bar__index {
  font-size: 18px;
  height: 20px;
  line-height: 20px;
}
/deep/ .van-grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/ .van-grid-item__content {
  width: 80%;
  height: 60%;
  background: #eee;
}
/deep/ .active .van-grid-item__content {
  background: $red;
}
/deep/ .active .van-grid-item__content .van-grid-item__text {
  color: white;
}
</style>