<!--
 * @Author: ling 1039137893@qq.com
 * @Date: 2022-05-08 10:55:42
 * @LastEditors: ling 1039137893@qq.com
 * @LastEditTime: 2022-05-08 18:20:21
 * @FilePath: \iphone\src\views\home\test4.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="test4">
    <div class="top" @click="goback()">test4</div>
    <div class="chat__content" ref="box">
      <div>
        <p>一些聊天内容1</p>
      </div>
      <div>
        <p>一些聊天内容2</p>
      </div>
      <div>
        <p>一些聊天内容3</p>
      </div>
      <div>
        <p>一些聊天内容4</p>
      </div>
      <div>
        <p>一些聊天内容5</p>
      </div>
      <div>
        <p>一些聊天内容6</p>
      </div>
      <div>
        <p>一些聊天内容7</p>
      </div>
      <div>
        <p>一些聊天内容8</p>
      </div>
      <div>
        <p>一些聊天内容9</p>
      </div>
      <div>
        <p>一些聊天内容10</p>
      </div>
      <div>
        <p>一些聊天内容10</p>
      </div>
      <div>
        <p>一些聊天内容11</p>
      </div>
      <div>
        <p>一些聊天内容12</p>
      </div>
      <div>
        <p>一些聊天内容13</p>
      </div>
      <div>
        <p>一些聊天内容14</p>
      </div>
      <div>
        <p>一些聊天内容15</p>
      </div>
      <div>
        <p>一些聊天内容16</p>
      </div>
      <div>
        <p>一些聊天内容17</p>
      </div>
    </div>
    <div class="input__content">
      <!-- contenteditable代表时input -->
      <div
        class="input"
        ref="input"
        contenteditable="true"
        @click="ggg()"
      ></div>
      <button>发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.huadong();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    activeElementScrollIntoView() {
      console.log("444");
      var editable = document.activeElement.getAttribute("contenteditable");
      // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
      if (
        document.activeElement.tagName == "INPUT" ||
        document.activeElement.tagName == "TEXTAREA" ||
        editable === "" ||
        editable
      ) {
        setTimeout(function () {
          document.activeElement.scrollIntoView();
        }, 200);
      }
    },
    huadong() {
      let self = this;
      var originHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      window.addEventListener(
        "resize",
        function () {
          var resizeHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          if (originHeight < resizeHeight) {
            console.log("Android 键盘收起啦！");
            self.$refs.input.blur();
          } else {
            console.log("Android 键盘弹起啦！");
            self.activeElementScrollIntoView();
          }
          originHeight = resizeHeight;
        },
        false
      );
    },
    ggg() {
      let self = this;
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //ios
        console.log(" 我是ios");
      } else {
        console.log("我是android");
        var div = self.$refs.box;
        //此时必须异步执行滚动条滑动至底部
        setTimeout(() => {
          // div.scrollTop = div.scrollHeight;
          div.scrollTo({
            top: div.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
      }
    },
    
  },
  beforeDestroy(){
     window.onresize = false;
  }
};
</script>

<style lang="less" scoped>
.test4 {
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
.chat__content {
  height: calc(100% - 40px);
  margin-bottom: 40px;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: left;
}

.chat__content p {
  display: inline-block;
  background-color: #ff706f;
  color: #fff;
  font-size: 13px;
  line-height: 22px;
  padding: 11px 15px 10px 16px;
  border-radius: 17px;
  word-break: break-word;
  border-top-left-radius: 0;
  min-width: 20px;
}

.input__content {
  display: flex;
  height: 40px;
  z-index: 9999;
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
}

.input__content::after {
  content: "";
  position: absolute;
  border: 1px solid #cccccc;
  top: 0;
  left: 0;
  right: 0;
  transform: scaleY(0.5);
}

.input__content .input {
  position: relative;
  flex: 1;
  height: 100%;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  float: left;
  text-align: left;
}

.input__content button {
  width: 50px;
  height: 36px;
  font-size: 16px;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 2px;
  border: none;
}

.input__content .input:focus,
.input__content button:focus {
  outline: none;
}
</style>