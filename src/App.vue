
<template>
  <div id="app">
    <welcome></welcome>
    <router-view class="main" />
    <tarbar></tarbar>
    <!-- <transition name="router-open" mode="out-in">
      <router-view name="big" class="big"></router-view>
    </transition> -->
  </div>
</template>
<script>
import Tarbar from "@/components/Tarbar";
import Welcome from "@/components/Welcome";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    if (localStorage.getItem("city")) {
      this.Refreshcity(localStorage.getItem("city"));
    }
    if (localStorage.getItem("user")) {
      this.$nextTick(() => {
        let list = JSON.parse(localStorage.getItem("user"));
        this.Refreshuser(list);
      });
    }
    if (localStorage.getItem("shopcart")) {
      let data = JSON.parse(localStorage.getItem("shopcart"));
      this.Refreshshopcart(data);
    }
    if (localStorage.getItem("collection")) {
      let data1 = JSON.parse(localStorage.getItem("collection"));
      this.Refreshcollection(data1);
    }
    if (localStorage.getItem("order")) {
      let data2 = JSON.parse(localStorage.getItem("order"));
      this.Refreshorder(data2);
    }
    if (localStorage.getItem("orders")) {
      let data2 = JSON.parse(localStorage.getItem("orders"));
      this.Refreshorders(data2);
    }
    if (localStorage.getItem("addresses")) {
      let data3 = JSON.parse(localStorage.getItem("addresses"));
      this.Refreshaddresses(data3);
    }
    if (localStorage.getItem("choseid")) {
      this.Refreshchoseid(localStorage.getItem("choseid"));
    }
    if (localStorage.getItem("address")) {
      let data4 = JSON.parse(localStorage.getItem("address"));
      this.Refreshaddress(data4);
    }
    if (localStorage.getItem("double")) {
      this.Refreshdouble(JSON.parse(localStorage.getItem("double")));
    }
    if (localStorage.getItem("address1")) {
      let data5 = JSON.parse(localStorage.getItem("address1"));
      this.Refreshaddress1(data5);
    }

    // if (process.env.NODE_ENV === "development") {
    //   console.log("开发环境");
    // } else {
    //   console.log("生产环境");
    //   this.$axios.get("/bdapi/IHome/SiteList").then((res) => {
    //     console.log(res.data);
    //   });
    // }
  },

  methods: {
    ...mapMutations([
      "Refreshcity",
      "Refreshuser",
      "Refreshshopcart",
      "Refreshcollection",
      "Refreshorder",
      "Refreshorders",
      "Refreshaddresses",
      "Refreshchoseid",
      "Refreshaddress",
      "Refreshdouble",
      "Refreshaddress1",
    ]),
  },
  components: {
    Tarbar,
    Welcome,
  },
};
</script>
<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.main {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #eee;
  overflow: hidden;
}

.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
.router-open-enter-active,
.router-open-leave-active {
  transition: all 0.4s;
}
.router-open-enter,
.router-open-leave-active {
  opacity: 0;
  transform: scale(0.5);
}
.big {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: #eee;
  z-index: 999;
  overflow-y: scroll;
}
.children {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  background: white;
  z-index: 998;
}
.children1 {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  height: 100%;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
}
::-webkit-scrollbar {
  width: 0;
}
.van-nav-bar__left,.van-nav-bar__right{
  padding:0 10px !important;
}
</style>
