<!--
 * @Author: ling 1039137893@qq.com
 * @Date: 2022-05-07 21:47:26
 * @LastEditors: ling 1039137893@qq.com
 * @LastEditTime: 2022-05-08 19:02:44
 * @FilePath: \iphone\src\views\home\test1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="test3" id="keyboard1">
    <div class="top" @click="goback()">
      <p>test3(overflow,dibu弹起，底部1设置absolut不弹起：也有可能是dj()触)(如果设置了resize里面的document.activeElement.scrollIntoView()，底部1也弹起)</p>
    </div>
    <div class="main">main</div>
    <div class="keyboard">
      <input placeholder="测试" @focus="dj()" v-model="msg" />
    </div>
    <div class="last">dibu</div>
    <div class="last1">底部1</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  created() {
    this.$nextTick(() => {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let box = document.getElementById("keyboard1");
      box.style.height = h + "px";
    });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    dj() {
      if (
        document.activeElement.tagName == "INPUT" ||
        document.activeElement.tagName == "TEXTAREA"
      ) {
        setTimeout(function () {
          document.activeElement.scrollIntoView();
        }, 100);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.test3 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
  overflow: scroll;
}
.top {
  position: relative;
  width: 100%;
  height: 100px;
  text-overflow: warp;
}
.main {
  position: relative;
  width: 100%;
  height: 500px;
}
.keyboard {
  position: relative;
  width: 100%;
  height: 300px;
}
.last {
  width: 100%;
  height: 100px;
}
.last1 {
  // absolute 不弹起
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0;
}
</style>