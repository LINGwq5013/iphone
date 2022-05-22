
<template>
  <div class="children">
    <div class="header">
      <van-nav-bar
        title="地址列表"
        left-arrow
        @click-left="onClickLeft"
        placeholder
      >
        <template #right>
          <div v-show="!del" @click="manage1">管理</div>
          <div v-show="del" @click="finish">完成</div>
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <div class="content-main" v-if="addresses.length > 0">
        <div class="list" v-for="item in addresses" :key="item.id">
          <div class="left">
            <van-checkbox
              class="input"
              v-model="item.isDefault"
              @click.stop="changecheck($event, item.id)"
            ></van-checkbox>
          </div>
          <div class="center" @click.stop="changecheck($event, item.id)">
            <div class="center-top">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="tel">
                {{ item.tel }}
              </div>
              <div v-if="item.isDefault" class="default">默认</div>
            </div>
            <div class="center-bottom">
              {{ item.address }}
            </div>
          </div>
          <div class="right">
            <van-icon @click.stop="onEdit(item)" v-if="!del" name="edit" />
            <van-icon @click="delate(item)" v-else name="delete-o" />
          </div>
        </div>
        <div v-if="!default1" class="tis">您还没选择默认收货地址！！！</div>
      </div>
      <div class="kong" v-else>没有收货地址，快去添加吧</div>
      <div class="content-bottom">
        <van-button round @click="add">新增地址</van-button>
      </div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { Button, Checkbox, Icon, Toast } from "vant";

Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Icon);
Vue.use(Toast);
export default {
  data() {
    return {
      double1: false,
      show: false,
      del: false,
      select: false,
    };
  },
  created() {
    if (this.$route.query.double) {
      this.double1 = true;
    }
  },
  computed: {
    ...mapState(["addresses"]),
    default1() {
      let type = false;
      let list = [];
      this.addresses.forEach((item) => {
        list.push(item.isDefault);
      });
      if (list.includes(true)) {
        type = true;
      }
      return type;
    },
  },
  watch: {
    addresses(val) {
      if (val.length == 0) {
        this.Clearaddress();
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "order") {
      next((vm) => {
        vm.show = true;
      });
    } else {
      next();
    }
  },
  methods: {
    ...mapMutations([
      "updateaddress",
      "Adddoubleaddress",
      "Changedouble",
      "Detaleaddress",
      "Clearaddress",
    ]),
    manage1() {
      this.del = !this.del;
    },
    finish() {
      this.del = !this.del;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    add() {
      if (this.double1) {
        this.$router.push({
          name: "address",
          query: {
            double: true,
          },
        });
      } else {
        this.$router.push("/address");
      }
    },
    onEdit(val) {
      if (this.double1) {
        this.$router.push({
          name: "address",
          query: {
            id: val.id,
            double: true,
          },
        });
      } else {
        this.$router.push({
          name: "address",
          query: {
            id: val.id,
          },
        });
      }
    },
    delate(val) {
      this.Detaleaddress(val);
    },
    changecheck(value, id){
      this.select = true;
      if (this.double1) {
        this.Adddoubleaddress(id);
        this.Changedouble(true);
      } else {
        Toast("默认地址更改成功");
        setTimeout(() => {
          this.updateaddress(id);
        }, 100);
      }
      if (this.show) {
        this.$router.replace("order");
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.del = false;
    if (this.select) {
      if (to.name == "order") {
        this.$router.go(-1);
        next();
      } else {
        next();
      }
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
  position: fixed;
  z-index: 999;
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
  margin: 40% auto;
  font-size: 20px;
}
.tis {
  margin: 20px auto;
  font-size: 15px;
}
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 0;
  background: #eee;
  .content-main {
    position: absolute;
    bottom: 8%;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    overflow-y: scroll;
    .list {
      width: 100%;
      height: 100px;
      display: flex;
      box-sizing: border-box;
      border-radius: 10px;
      background: white;
      margin-top: 10px;
      align-items: center;
      .left {
        position: relative;
        width: 15%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .van-checkbox__icon {
          font-size: 25px;
        }
      }
    }
    .center {
      width: 70%;
      height: 100%;
      display: flex;
      text-align: left;
      position: relative;
      flex-direction: column;
      justify-content: center;
      .center-top {
        display: flex;
        width: 100%;
        height: 30px;
        font-size: 17px;
        align-items: center;
        justify-content: flex-start;
        .tel {
          margin-left: 10px;
          padding-top: 3px;
        }
        .default {
          margin-left: 10px;
          background: red;
          box-sizing: border-box;
          padding: 2px 8px;
          border-radius: 10px;
        }
      }
      .center-bottom {
        margin-top: 5px;
        width: 100%;
        font-size: 15px;
        display: flex;
        flex-wrap: wrap;
      }
    }
    .right {
      width: 15%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .van-icon {
        font-size: 25px;
      }
    }
  }
  .content-bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 8%;
    background: white;
    justify-content: center;
    display: flex;
    align-items: center;
    /deep/ .van-button {
      width: 90%;
      height: 80%;
      background: crimson;
      color: white;
    }
  }
}
</style>