<!--
 * @Author: ling 1039137893@qq.com
 * @Date: 2022-05-07 21:47:26
 * @LastEditors: ling 1039137893@qq.com
 * @LastEditTime: 2022-05-21 13:15:52
 * @FilePath: \iphone\src\views\home\test1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="test1">
    <div class="top" @click="goback()">test1(这里的底部实现overflow,点击测试1，2,底部内容跟着弹起（底部内容没设置absolute）)</div>
    <div class="keyboard">
      <input class="input" placeholder="测试" v-model="msg" />
    </div>
    <div class="main">main</div>
    <div class="keyboard">
      <input class="input" placeholder="测试1" v-model="msg1" />
    </div>
    <div class="last">dibu</div>
    <div class="keyboard">
      <input class="input" placeholder="测试2" v-model="msg2" />
    </div>
    <div>底部1</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      msg1: "",
      msg2: "",
      j: "",
    };
  },
  mounted() {
    this.$nextTick(function () {
      let self = this;
      var inputs = document.getElementsByClassName("input");
      for (var i = 0; i < inputs.length; i++) {
        let j = i;
        inputs[i].onclick = function () {
          console.log(j);
          self.j = j;
          self.activeElementScrollIntoView();
        };
      }
    });
    this.judge();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    judge() {
      let self = this;
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        console.log(" 我是ios");
      } else {
        console.log("我是android");
        var originHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        console.log(originHeight);
        window.addEventListener(
          "resize",
          function () {
            // 使用箭头的话() =>，或许不用self
            var resizeHeight =
              document.documentElement.clientHeight ||
              document.body.clientHeight;
            if (originHeight < resizeHeight) {
              console.log("Android 键盘收起啦！");
              document.activeElement.blur();
            } else {
              console.log("Android 键盘弹起啦！");
              self.activeElementScrollIntoView();
            }

            originHeight = resizeHeight;
          },
          false
        );
      }
    },
    activeElementScrollIntoView() {
      // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
      var editable = document.activeElement.getAttribute("contenteditable");
      if (
        document.activeElement.tagName == "INPUT" ||
        document.activeElement.tagName == "TEXTAREA" ||
        editable === "" ||
        editable
      ) {
        setTimeout(function () {
          document.activeElement.scrollIntoView();
        }, 100);
      }
    }
  },
  beforeDestroy(){
     window.onresize = false;
  }
};
</script>

<style lang="scss" scoped>
.test1 {
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
}
.main {
  position: relative;
  width: 100%;
  height: 300px;
}
.keyboard {
  position: relative;
  width: 100%;
  height: 100px;
}
.last {
  width: 100%;
  height: 100px;
}
</style>