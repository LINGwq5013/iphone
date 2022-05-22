<!--
 * @Author: ling 1039137893@qq.com
 * @Date: 2022-05-21 10:12:04
 * @LastEditors: ling 1039137893@qq.com
 * @LastEditTime: 2022-05-21 13:25:54
 * @FilePath: \iphone\src\views\home\test5.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEv
-->
<template>
  <div class="test4">
    <div class="debugger" @click="gg()">测试断点</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a:"window"
    };
  },
  mounted() {
     console.log("111111");
      console.log("222222");
      console.log("333");
      console.log("444");
  },
  methods: {
    gg() {
      console.log("111111");
      console.log("222222");
      console.log("333");
      console.log("444");
     setTimeout(() => {
      //  箭头函数指向window
        console.log(this.a)
     }, 100);

     setTimeout(function() {
      //  这里的a指向gg,所以上面要 let self=this
       console.log(this.a)

     }, 200);
    },
  },
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
.debugger {
  width: 100%;
  height: 100px;
  background: #000;
}
</style>